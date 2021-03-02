/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import settings from 'settings';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createFilter } from 'redux-persist-transform-filter';
import createSagaMiddleware from 'redux-saga';
import { version } from '../../package.json';
import createReducer from '../reducers';

let store;
export default function configureStore(initialState = {}, history) {
  // if clearLocalStorageInNewVersion 檢查舊版本即清除 localstorage.
  const oldVersion = localStorage.getItem('version');
  if (oldVersion !== version && settings.clearLocalStorageInNewVersion) {
    localStorage.clear();
  }
  localStorage.setItem('version', version);

  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};
  const logger = createLogger({ collapsed: true, diff: true });
  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (true && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const devOnlyMiddlewares = [logger];
  const commonMiddlewares = [sagaMiddleware, routerMiddleware(history)];
  let middlewares = [];

  if (process.env.ENVIRONMENT !== 'production') {
    middlewares = [...devOnlyMiddlewares];
  }
  middlewares = [...middlewares, ...commonMiddlewares];

  const enhancers = [applyMiddleware(...middlewares)];

  const migrations = {
    // 1: state => ({
    //   betslip: {
    //     ...state.betslip,
    //     comboPrice: undefined,
    //     multiplePrice: state.betslip.comboPrice,
    //   },
    // }),
  };

  const betslipBlacklistFilter = createFilter('betslip', [
    'priceChangeHandleType',
    'gameLimit',
    'betType',
    'oddsFormat',
    'keys',
    'entity',
  ]);
  const languageBlacklistFilter = createFilter('language', ['locale']);
  const accountBlacklistFilter = createFilter('account', ['lang']);

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    stateReconciler: autoMergeLevel2,
    migrate: createMigrate(migrations, { debug: false }),
    whitelist: ['betslip', 'account', 'language'],
    transforms: [
      betslipBlacklistFilter,
      accountBlacklistFilter,
      languageBlacklistFilter,
    ],
  };

  const persistedReduce = persistReducer(persistConfig, createReducer());

  store = createStore(
    persistedReduce,
    initialState,
    composeEnhancers(...enhancers),
  );

  const persistor = persistStore(store);

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }
  return { store, persistor };
}

export const getStore = () => store;

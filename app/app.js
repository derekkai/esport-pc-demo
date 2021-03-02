/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
import { CookiesProvider } from 'react-cookie';
// Import root app

import { PersistGate } from 'redux-persist/integration/react';
// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
import 'file-loader?name=web.config!./web.config';

import { getPlatformStatus } from 'helpers/api';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './store/configureStore';
// Import i18n messages
import { translationMessages } from './i18n';
import '!file-loader?name=[name].[ext]!./images/backgrounds/bg_full.jpg';
import App from './containers/App';

// Create redux store with history
const initialState = {};
const { store, persistor } = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = async messages => {
  // const result = await getPlatformStatus;

  if (true) {
    ReactDOM.render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LanguageProvider messages={messages}>
            <ConnectedRouter history={history}>
              <CookiesProvider>
                <App />
              </CookiesProvider>
            </ConnectedRouter>
          </LanguageProvider>
        </PersistGate>
      </Provider>,
      MOUNT_NODE,
    );
  } else {
    document.getElementsByClassName('app-loading')[0].remove();
    ReactDOM.render(<div className="maintain-bg" />, MOUNT_NODE);
  }
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

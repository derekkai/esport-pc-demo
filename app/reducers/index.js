/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from './language';
import betslip from './betslip';
import balanceHistory from './balanceHistory';
import global from './global';
import betHistory from './betHistory';
import news from './news';
import classifier from './classifier';
import upcomingGame from './upcomingGame';
import upcomingMarket from './upcomingMarket';
import resultGame from './resultGame';
import resultMarket from './resultMarket';
import account from './account';
import recommandGame from './recommandGame';
import live from './live';
import championGame from './championGame';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    ...injectedReducers,
    language: languageProviderReducer,
    router: connectRouter(history),
    betslip,
    balanceHistory,
    global,
    betHistory,
    news,
    classifier,
    upcomingGame,
    upcomingMarket,
    resultGame,
    resultMarket,
    account,
    recommandGame,
    live,
    championGame,
  });

  return rootReducer;
}

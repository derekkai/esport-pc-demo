import { call, takeEvery, select, put } from 'redux-saga/effects';
import { data as upcomingGameData} from 'data/upcomingGame';
import { data as recommandGameData} from 'data/recommandGame';
import { data as resultGameData } from 'data/resultGame';
import { data as resultMarketData} from 'data/resultMarket';
import { data as upcomingMarketData } from 'data/upcomingMarket';
import { data as marketGameInfoData } from 'data/marketGameInfo';
import settings from 'settings';
import { isEmpty } from 'lodash';
import history from 'utils/history';
import {
  REQUEST_LIVE_DATA,
  setLiveData,
  updateLiveData,
  REQUEST_DONATE_VIDEO_URL,
  setDonateVideoUrl,
  setGlobalDonateVideoUrl,
} from 'reducers/live';
import {
  setUpcomingMarketData,
  updateUpcomingMarketData,
} from 'reducers/upcomingMarket';
import { setResultMarketData } from 'reducers/resultMarket';
import {
  setUpcomingGameData,
  updateUpcomingGameData,
  SET_UPCOMING_GAME_DATE_RANGE,
  REQUEST_UPCOMING_GAME_DATA,
} from 'reducers/upcomingGame';
import {
  setChampionGameData,
  updateChampionGameData,
  SET_CHAMPION_GAME_DATE_RANGE,
  REQUEST_CHAMPION_GAME_DATA,
} from 'reducers/championGame';
import {
  setResultGameData,
  SET_RESULT_GAME_DATE_RANGE,
  REQUEST_RESULT_GAME_DATA,
} from 'reducers/resultGame';
import {
  setRecommandGameData,
  REQUEST_RECOMMAND_GAME_DATA,
  updateRecommandGameData,
} from 'reducers/recommandGame';
import {
  REQUEST_MARKET_GAMEINFO,
  setMarketGameInfo,
  setLoadingStatus,
  REQUEST_MARKET_LIST_DATA,
  updateMarketGameInfo,
} from 'reducers/global';
import { toSecondTimesStamp } from 'helpers/common';
import { REQUEST_NEWS_DATA, setNewsData } from 'actions/news';
import {
  getGameData,
  getMarketData,
  getResultGameData,
  getResultMarketData,
  getMarketGameInfo,
  getResultMarketGameInfo,
  getLiveData,
  getChampionData,
  getRecommandGame,
  getDonateVideoUrl,
} from 'helpers/commandSender';
import { getNewsData } from 'helpers/api';
import { addReceiver, unsubscribeHandler } from './websocket';
import {
  selectGameListType,
  selectClassifierSportSelect,
  selectClassifierCompetitionSelect,
  selectClassifierEntity,
  selectResultGameKeys,
  selectMarketGameId,
  selectUpcomingDateRangeTimestamp,
  selectChampionDateRangeTimestamp,
  selectResultDateRangeTimestamp,
  selectLiveLogin,
} from './selectors';

function* requestMarketListData() {
  const type = yield select(selectGameListType);
  const gameId = yield select(selectMarketGameId);
  // yield put(setLoadingStatus({ name: 'market', value: true }));
  switch (type) {
    case 'upcoming': {
      yield put(setUpcomingMarketData(upcomingMarketData.data));
      yield put(setLoadingStatus({ name: 'market', value: false }));
      // addReceiver(
      //   rid,
      //   setUpcomingMarketData,
      //   { subscribeName: 'upcomingMarket' },
      //   updateUpcomingMarketData,
      //   [setLoadingStatus({ name: 'market', value: false })],
      // );
      // yield call(getMarketData, rid, Number(gameId));
      break;
    }
    case 'result': {
      yield put(setResultMarketData(resultMarketData.data));
      yield put(setLoadingStatus({ name: 'market', value: false }));
      // addReceiver(rid, setResultMarketData, null, null, [
      //   setLoadingStatus({ name: 'market', value: false }),
      // ]);
      // yield call(getResultMarketData, rid, Number(gameId));
      break;
    }
    default:
      break;
  }
}

function* requestMarketGameInfo() {
  yield put(setMarketGameInfo(marketGameInfoData.data));
  yield put(setLoadingStatus({ name: 'marketGameInfo', value: false }));
  //
  // const paths = history.location.pathname.split('/');
  // const gameId = Number(paths[3]);
  // const type = yield select(selectGameListType);
  // yield put(setLoadingStatus({ name: 'marketGameInfo', value: true }));
  // const rid = `${Date.now()}@singleGameInfo`;
  // addReceiver(
  //   rid,
  //   setMarketGameInfo,
  //   { subscribeName: 'marketGameInfo' },
  //   updateMarketGameInfo,
  //   [setLoadingStatus({ name: 'marketGameInfo', value: false })],
  // );
  // switch (type) {
  //   case 'upcoming':
  //     yield call(getMarketGameInfo, rid, gameId);
  //     break;
  //   case 'result':
  //     yield call(getResultMarketGameInfo, rid, gameId);
  //     break;
  //   default:
  //     break;
  // }
}

function* requestLiveData() {
  // try {
  //   const rid = `${Date.now()}@live`;
  //   const liveLogin = yield select(selectLiveLogin);
  //   addReceiver(rid, setLiveData, { subscribeName: 'live' }, updateLiveData);
  //   yield call(getLiveData, rid);
  //   if (liveLogin) {
  //     yield call(requestDonateVideoUrl, { payload: { type: 2 } });
  //   }
  // } catch (e) {
  //   console.error(e);
  // }
}

function* requestDonateVideoUrl(action) {
  // try {
  //   const { type, gameId } = action.payload;
  //   const rid = `${Date.now()}@donateVideoUrl_type${type}`;
  //   if (type === 2) {
  //     addReceiver(rid, setGlobalDonateVideoUrl);
  //   } else {
  //     addReceiver(rid, setDonateVideoUrl);
  //   }
  //   yield call(getDonateVideoUrl, { rid, gameId, type });
  // } catch (e) {
  //   console.error(e);
  // }
}

export function* requestRecommandGameData() {
  yield put(setRecommandGameData(recommandGameData.data));
  yield put(setLoadingStatus({ name: 'recommand', value: false }));
  // try {
  //   const rid = `${Date.now()}@recommand`;
  //   yield put(setLoadingStatus({ name: 'recommand', value: true }));
  //   addReceiver(
  //     rid,
  //     setRecommandGameData,
  //     { subscribeName: 'recommand' },
  //     updateRecommandGameData,
  //     [setLoadingStatus({ name: 'recommand', value: false })],
  //   );
  //   yield call(getRecommandGame, rid);
  // } catch (e) {
  //   console.error(e);
  // }
}

function* requestNewsData() {
  // try {
  //   yield put(setLoadingStatus({ name: 'news', value: true }));
  //   const result = yield call(getNewsData);
  //   yield put(setLoadingStatus({ name: 'news', value: false }));
  //   const { IsSuccess, Data } = result;
  //   if (IsSuccess) {
  //     yield put(setNewsData(Data));
  //   }
  // } catch (e) {
  //   console.error(e);
  // }
}

export function* requestUpcomingGameData() {
  yield put(setUpcomingGameData(upcomingGameData.data));
  // yield put(setLoadingStatus({ name: 'upcomingGame', value: true }));
  // try {
  //   yield call(unsubscribeHandler, 'upcomingGame');
  //   const rid = `${Date.now()}@upcomingGame`;
  //
  //   const { sportId, competitionId } = yield call(createfilterData);
  //   const dateRange = yield select(selectUpcomingDateRangeTimestamp);
  //   const begin = toSecondTimesStamp(dateRange.from);
  //   const end = toSecondTimesStamp(dateRange.to);
  //
  //   addReceiver(
  //     rid,
  //     setUpcomingGameData,
  //     { subscribeName: 'upcomingGame' },
  //     updateUpcomingGameData,
  //     [setLoadingStatus({ name: 'upcomingGame', value: false })],
  //   );
  //   yield call(getGameData, {
  //     rid,
  //     sportId,
  //     competitionId,
  //     begin,
  //     end,
  //   });
  // } catch (e) {
  //   console.error(e);
  // }
}

export function* requestChampionGameData() {
  yield put(setLoadingStatus({ name: 'championGame', value: true }));
  // try {
  //   yield call(unsubscribeHandler, 'championGame');
  //   const rid = `${Date.now()}@championGame`;
  //
  //   const { sportId, competitionId } = yield call(createfilterData);
  //   const dateRange = yield select(selectChampionDateRangeTimestamp);
  //   const begin = toSecondTimesStamp(dateRange.from);
  //   const end = toSecondTimesStamp(dateRange.to);
  //
  //   addReceiver(
  //     rid,
  //     setChampionGameData,
  //     { subscribeName: 'championGame' },
  //     updateChampionGameData,
  //     [setLoadingStatus({ name: 'championGame', value: false })],
  //   );
  //   yield call(getChampionData, {
  //     rid,
  //     sportId,
  //     competitionId,
  //     begin,
  //     end,
  //   });
  // } catch (e) {
  //   console.error(e);
  // }
}

export function* requestResultGameData() {
  yield put(setResultGameData(resultGameData.data));
  yield put(setLoadingStatus({ name: 'resultGame', value: false }));
  // try {
  //   const rid = `${Date.now()}@resultGame`;
  //
  //   const { sportId, competitionId } = yield call(createfilterData);
  //   const dateRange = yield select(selectResultDateRangeTimestamp);
  //   const begin = toSecondTimesStamp(dateRange.from);
  //   const end = toSecondTimesStamp(dateRange.to);
  //   const keys = yield select(selectResultGameKeys);
  //
  //   addReceiver(rid, setResultGameData, null, null, [
  //     setLoadingStatus({ name: 'resultGame', value: false }),
  //   ]);
  //   yield call(getResultGameData, {
  //     rid,
  //     sportId,
  //     competitionId,
  //     skip: keys.length,
  //     begin,
  //     end,
  //   });
  // } catch (e) {
  //   console.error(e);
  // }
}

function* createfilterData() {
  let sportId;
  let competitionId;
  try {
    const sportSelect = yield select(selectClassifierSportSelect);
    const competitionSelect = yield select(selectClassifierCompetitionSelect);
    const entity = yield select(selectClassifierEntity);

    if (sportSelect === 0) {
      // 所有遊戲
      sportId = [...settings.sportIds];
    } else {
      // sport id
      competitionId = [];
      sportId = [];
      if (
        sportSelect !== 0 &&
        !competitionSelect[sportSelect] &&
        entity[sportSelect]
      ) {
        Object.values(entity[sportSelect].competition).forEach(el => {
          competitionId.push(el.id);
        });
        sportId.push(sportSelect);
      }

      // competition id
      if (!isEmpty(competitionSelect)) {
        Object.entries(competitionSelect).forEach(([key, value]) => {
          sportId.push(Number(key));
          competitionId = [...competitionId, ...value];
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
  return {
    sportId,
    competitionId,
  };
}
export default function* watchers() {
  yield takeEvery(REQUEST_RECOMMAND_GAME_DATA, requestRecommandGameData);
  yield takeEvery(REQUEST_MARKET_GAMEINFO, requestMarketGameInfo);

  yield takeEvery(REQUEST_MARKET_LIST_DATA, requestMarketListData);
  yield takeEvery(REQUEST_LIVE_DATA, requestLiveData);
  yield takeEvery(REQUEST_NEWS_DATA, requestNewsData);
  yield takeEvery(REQUEST_DONATE_VIDEO_URL, requestDonateVideoUrl);

  yield takeEvery(REQUEST_UPCOMING_GAME_DATA, requestUpcomingGameData);
  yield takeEvery(SET_UPCOMING_GAME_DATE_RANGE, requestUpcomingGameData);

  yield takeEvery(REQUEST_CHAMPION_GAME_DATA, requestChampionGameData);
  yield takeEvery(SET_CHAMPION_GAME_DATE_RANGE, requestChampionGameData);

  yield takeEvery(SET_RESULT_GAME_DATE_RANGE, requestResultGameData);
  yield takeEvery(REQUEST_RESULT_GAME_DATA, requestResultGameData);
}

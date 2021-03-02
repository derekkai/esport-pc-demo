import { takeEvery, put, call, take, select, fork } from 'redux-saga/effects';
import history from 'utils/history';
import {
  resetUpcomingGameDateRange,
  SET_UPCOMING_GAME_DATE_RANGE,
  clearUpcomingGameData,
  resetUpcomingGameUIState,
} from 'reducers/upcomingGame';
import {
  resetChampionGameDateRange,
  SET_CHAMPION_GAME_DATE_RANGE,
  clearChampionGameData,
} from 'reducers/championGame';
import {
  resetResultGameDateRange,
  SET_RESULT_GAME_DATE_RANGE,
  clearResultGameData,
} from 'reducers/resultGame';
import { resetClassifierSelection } from 'reducers/classifier';
import { getParameterByName, colorLog } from 'helpers/common';
import { setLoadingStatus, SET_GAME_LIST_TYPE } from 'reducers/global';
import Cookie from 'js-cookie';
import { SET_ACCOUNT_DATA } from 'reducers/account';
import { requestRecommandGameData } from 'reducers/recommandGame';
import { requestLiveData } from 'reducers/live';
import { requestUserInfo, requestUserLogin } from './account';
import { selectGameListType } from './selectors';
// import { startNewsPollingTask, startBalancePollingTask } from './worker';

// app inital handler.
function* initalApp() {
  colorLog('Inital App.', 'info');
  yield put(setLoadingStatus({ name: 'initalApp', value: true }));
  // yield put({ type: 'INITIALIZE_WEB_SOCKETS_CHANNEL' });
  // yield take('SERVER_CONNECTED');
  // yield call(tryToLogin);
  // colorLog('Try to login.', 'sub_info');
  // yield take(SET_ACCOUNT_DATA);
  // yield fork(startNewsPollingTask);
  // yield fork(startBalancePollingTask);
  yield put(requestRecommandGameData());
  yield put(requestLiveData());
  yield put(setLoadingStatus({ name: 'initalApp', value: false }));
  colorLog('Inital finish.', 'info');
}

// Game server login handler.
function* tryToLogin() {
  let AuthToken = getParameterByName('AuthToken');
  if (AuthToken) {
    const isUseHttps =
      process.env.ENVIRONMENT === 'beta2' ||
      process.env.ENVIRONMENT === 'production';
    Cookie.set('AuthToken', AuthToken, {
      expires: 1,
      sameSite: isUseHttps ? 'none' : undefined,
      secure: isUseHttps,
    });
    history.push('');
  } else {
    AuthToken = Cookie.get('AuthToken');
  }
  if (AuthToken) {
    yield call(requestUserInfo, AuthToken);
  }
  yield call(requestUserLogin, AuthToken);
}

// gameListType 改變時處理的附加任務。
function* gameListTypeChangeExtraTask() {
  // gamelist 切換分類後清除滾動暫存
  yield put(resetUpcomingGameUIState());
  const gameListType = yield select(selectGameListType);
  switch (gameListType) {
    case 'upcoming':
      yield put(resetUpcomingGameDateRange());
      break;
    case 'champion':
      yield put(resetChampionGameDateRange());
      break;
    case 'result':
      yield put(resetResultGameDateRange());
      break;
    default:
      break;
  }
}
/**
 * gamelist的時間塞選變更時後續任務
 */
function* handleDateRangeChange() {
  yield put(resetClassifierSelection());
  yield call(handleClearGameListData);
}

/**
 * 清除 gamelist 的資料
 */
export function* handleClearGameListData() {
  const gameListType = yield select(selectGameListType);
  switch (gameListType) {
    case 'upcoming': {
      yield put(clearUpcomingGameData());
      break;
    }
    case 'champion': {
      yield put(clearChampionGameData());
      break;
    }
    case 'result': {
      yield put(clearResultGameData());
      break;
    }
    default:
      break;
  }
}

export default function* watchers() {
  yield fork(initalApp);
  yield takeEvery(SET_GAME_LIST_TYPE, gameListTypeChangeExtraTask);
  yield takeEvery(
    [
      SET_UPCOMING_GAME_DATE_RANGE,
      SET_CHAMPION_GAME_DATE_RANGE,
      SET_RESULT_GAME_DATE_RANGE,
    ],
    handleDateRangeChange,
  );
}

import { call, takeEvery, select, put } from 'redux-saga/effects';
import {data} from 'data/classifier';
import history from 'utils/history';
import { gameListTabs } from 'settings';
import { toSecondTimesStamp } from 'helpers/common';
import {
  SET_CLASSIFIER_SPORT_SELECT,
  SET_CLASSIFIER_COMPETITION_SELECT,
  SELECT_ALL_COMPETITION,
  CLEAR_ALL_COMPETITION,
  setClassifierData,
  REQUEST_CLASSIFIER_DATA,
  updateClassifierData,
  setClassifierSportSelect,
  resetClassifierSelection,
} from 'reducers/classifier';
import { setLoadingStatus } from 'reducers/global';
import {
  SET_RESULT_GAME_DATE_RANGE,
  clearResultGameData,
} from 'reducers/resultGame';
import {
  SET_UPCOMING_GAME_DATE_RANGE,
  setUpcomingGameUIState,
} from 'reducers/upcomingGame';
import { SET_CHAMPION_GAME_DATE_RANGE } from 'reducers/championGame';
import { getClassifierData } from '../helpers/commandSender';
import { addReceiver, unsubscribeHandler } from './websocket';
import { handleClearGameListData } from './global';
import {
  selectGameListType,
  selectClassifierCompetitionSelect,
  selectUpcomingDateRangeTimestamp,
  selectChampionDateRangeTimestamp,
  selectResultDateRangeTimestamp,
  selectMainDataType,
} from './selectors';
import {
  requestUpcomingGameData,
  requestChampionGameData,
  requestResultGameData,
} from './request';

export function* requestClassifierData() {
  yield put(setClassifierData(data.data));
  // yield call(unsubscribeHandler, 'classifier');
  // yield put(resetClassifierSelection());
  // yield put(setLoadingStatus({ name: 'classifier', value: true }));
  // const rid = `${Date.now()}@classifier`;
  // const gameListType = yield select(selectGameListType);
  //
  // let begin;
  // let end;
  // switch (gameListType) {
  //   case 'upcoming': {
  //     const dateRange = yield select(selectUpcomingDateRangeTimestamp);
  //     begin = toSecondTimesStamp(dateRange.from);
  //     end = toSecondTimesStamp(dateRange.to);
  //     addReceiver(
  //       rid,
  //       setClassifierData,
  //       { subscribeName: 'classifier' },
  //       updateClassifierData,
  //       [setLoadingStatus({ name: 'classifier', value: false })],
  //     );
  //     break;
  //   }
  //   case 'champion': {
  //     const dateRange = yield select(selectChampionDateRangeTimestamp);
  //     begin = toSecondTimesStamp(dateRange.from);
  //     end = toSecondTimesStamp(dateRange.to);
  //     addReceiver(
  //       rid,
  //       setClassifierData,
  //       { subscribeName: 'classifier' },
  //       updateClassifierData,
  //       [setLoadingStatus({ name: 'classifier', value: false })],
  //     );
  //     break;
  //   }
  //   case 'result': {
  //     const dateRange = yield select(selectResultDateRangeTimestamp);
  //     begin = toSecondTimesStamp(dateRange.from);
  //     end = toSecondTimesStamp(dateRange.to);
  //     addReceiver(rid, setClassifierData, null, null, [
  //       setLoadingStatus({ name: 'classifier', value: false }),
  //     ]);
  //     break;
  //   }
  //   default:
  //     break;
  // }
  // yield call(getClassifierData, { rid, gameListType, begin, end });
}

function* classifierSelectChange() {
  yield put(setUpcomingGameUIState({ scrollTop: 0, displayItemCount: 12 }));
  yield call(handleClearGameListData);
  const type = yield select(selectGameListType);
  if (type === 'result') {
    yield put(clearResultGameData());
  }
  const mainDataType = yield select(selectMainDataType);
  if (mainDataType !== 'game') {
    // 檢查是否在game頁面
    history.push(`/${gameListTabs[type].value}`);
  } else {
    switch (type) {
      case 'upcoming':
        yield call(requestUpcomingGameData);
        break;
      case 'champion':
        yield call(requestChampionGameData);
        break;
      case 'result':
        yield call(requestResultGameData);
        break;
      default:
        break;
    }
  }
}

function* clearAllCompetition() {
  // 檢查是否有其他的 competition 在其他 sport 被選中
  const competitionSelect = yield select(selectClassifierCompetitionSelect);
  let resetFlag = true;
  const temp = Object.values(competitionSelect);

  for (let i = 0; i < temp.length; i += 1) {
    if (temp[i].length !== 0) {
      resetFlag = false;
      break;
    }
  }

  if (resetFlag) {
    // 完全重製選項
    yield put(setClassifierSportSelect(0));
  } else {
    // 選項改變
    yield call(classifierSelectChange);
  }
}

export default function* watchers() {
  yield takeEvery(SET_CLASSIFIER_SPORT_SELECT, classifierSelectChange);
  yield takeEvery(SET_CLASSIFIER_COMPETITION_SELECT, classifierSelectChange);
  yield takeEvery(SELECT_ALL_COMPETITION, classifierSelectChange);
  yield takeEvery(CLEAR_ALL_COMPETITION, clearAllCompetition);
  yield takeEvery(
    [
      REQUEST_CLASSIFIER_DATA,
      SET_RESULT_GAME_DATE_RANGE,
      SET_UPCOMING_GAME_DATE_RANGE,
      SET_CHAMPION_GAME_DATE_RANGE,
    ],
    requestClassifierData,
  );
}

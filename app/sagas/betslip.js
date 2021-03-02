import {
  call,
  takeEvery,
  select,
  put,
  fork,
  delay,
  take,
  cancel,
} from 'redux-saga/effects';
import {
  ADD_BET,
  updateBet,
  REQUEST_DO_BET,
  updateDoBetResult,
  setBetPrice,
  REQUEST_UPDATE_BET_EVENT_DATA,
  REMOVE_BETS,
  addBet,
  REQUEST_ADD_BET,
  setBetslipWaitingResponse,
  CLRAR_BETSLIP_DATA,
  RESET_BETSLIP,
  UPDATE_DO_BET_RESULT,
  resetBetslip,
} from 'reducers/betslip';
import { setAlert } from 'reducers/global';
import settings from 'settings';
import { doBet, getEventData } from '../helpers/commandSender';
import { addReceiver, unsubscribeHandler } from './websocket';
import {
  selectBetslipEntity,
  selectBetslipKeys,
  selectStake,
  selectBetType,
  selectSystemNum,
  selectPriceChangeHandleType,
  selectGameLimit,
  selectSystemBetCount,
  selectGlobalAlerts,
  selectIsLogin,
  selectShowResult,
} from './selectors';

function* checkBetStakeCorrent() {
  const betType = yield select(selectBetType);
  const entity = yield select(selectBetslipEntity);
  const stake = yield select(selectStake);

  let result = true;
  const temp = Object.values(entity);
  if (betType !== 'single' && (stake === '' || stake === 0)) {
    result = false;
  } else {
    for (let i = 0; i < temp.length; i += 1) {
      const bet = temp[i];
      if (bet.status === 'close') {
        result = false;
        break;
      } else if (betType === 'single' && bet.stake === 0) {
        result = false;
        break;
      }
    }
  }
  return result;
}

function* requestUpdateBetEventData(action) {
  // yield call(unsubscribeHandler, 'betslip');
  //
  // // 清除或重製注單直接取消訂閱即可
  // if (action.type === CLRAR_BETSLIP_DATA || action.type === RESET_BETSLIP)
  //   return;
  //
  // const eventIds = yield select(selectBetslipKeys);
  // if (eventIds.length > 0) {
  //   const entity = yield select(selectBetslipEntity);
  //   const rid = `${Date.now()}@Event`;
  //   const gameLimit = yield select(selectGameLimit);
  //   const gameIds = [];
  //   Object.keys(gameLimit).forEach(gameId => {
  //     gameIds.push(Number(gameId));
  //   });
  //   const marketIds = [];
  //   eventIds.forEach(eventId => {
  //     marketIds.push(entity[eventId].marketId);
  //   });
  //   addReceiver(rid, setBetPrice, { subscribeName: 'betslip' }, updateBet);
  //   yield call(getEventData, { rid, gameIds, eventIds, marketIds });
  // }
}

function* requestDoBet() {
  const isLogin = yield select(selectIsLogin);
  if (!isLogin) {
    yield put(setAlert({ type: 'loginStateError', value: true }));
    return;
  }

  const isBetStakeCorrent = yield call(checkBetStakeCorrent);
  if (!isBetStakeCorrent) {
    yield put(setAlert({ type: 'betslipStakeError', value: true }));
    return;
  }

  const entity = yield select(selectBetslipEntity);
  const betType = yield select(selectBetType);
  const mode = yield select(selectPriceChangeHandleType);
  const ServerMode = settings.betslipPriceChangeCodeMap[mode];
  const arrayData = Object.entries(entity);
  yield put(setBetslipWaitingResponse(true));
  switch (betType) {
    case 'single': {
      for (let i = 0; i < arrayData.length; i += 1) {
        const rid = `${Date.now()}@DoBet_type1_count${i}`;
        const event_id = Number(arrayData[i][0]);
        const { price, stake } = arrayData[i][1];
        addReceiver(rid, updateDoBetResult, {
          event_id,
          totalCount: arrayData.length,
        });
        yield call(doBet, {
          betType,
          rid,
          bets: [{ event_id, price }],
          stake,
          mode: ServerMode,
        });
      }
      break;
    }
    case 'multiple': {
      const rid = `${Date.now()}@DoBet_type2`;
      const stake = yield select(selectStake);
      const bets = [];
      for (let i = 0; i < arrayData.length; i += 1) {
        const event_id = Number(arrayData[i][0]);
        const { price } = arrayData[i][1];
        bets.push({ event_id, price });
      }
      addReceiver(rid, updateDoBetResult);
      yield call(doBet, {
        betType,
        rid,
        bets,
        stake,
        mode: ServerMode,
      });
      break;
    }
    case 'system': {
      const rid = `${Date.now()}@DoBet_type3`;
      const stake = yield select(selectStake);
      const sys_bet = yield select(selectSystemNum);
      const bets = [];
      const systemBetCount = yield select(selectSystemBetCount);
      for (let i = 0; i < arrayData.length; i += 1) {
        const event_id = Number(arrayData[i][0]);
        const { price } = arrayData[i][1];
        bets.push({ event_id, price });
      }
      addReceiver(rid, updateDoBetResult);
      yield call(doBet, {
        betType,
        rid,
        bets,
        stake: stake * systemBetCount,
        sys_bet,
        mode: ServerMode,
      });
      break;
    }
    default:
      break;
  }
  yield fork(doBetBetslipResetTask);
}

function* doBetBetslipResetTask() {
  while (true) {
    yield take(UPDATE_DO_BET_RESULT);
    const showResult = yield select(selectShowResult);
    if (showResult) {
      yield delay(3000);
      yield put(resetBetslip());
      yield cancel();
    }
  }
}

function* requestAddCheck(action) {
  const eventId = yield select(selectBetslipKeys);
  const gameLimit = yield select(selectGameLimit);
  if (
    eventId.length === settings.betslipBetCountMAX &&
    !gameLimit[action.payload.gameId]
  ) {
    const alerts = yield select(selectGlobalAlerts);
    if (!alerts.includes('betCountLimitError')) {
      yield put(setAlert({ type: 'betCountLimitError', value: true }));
    }
  } else {
    yield put(addBet(action.payload));
  }
}

export default function* watchers() {
  yield takeEvery(REQUEST_DO_BET, requestDoBet);
  yield takeEvery(
    [
      RESET_BETSLIP,
      CLRAR_BETSLIP_DATA,
      ADD_BET,
      REQUEST_UPDATE_BET_EVENT_DATA,
      REMOVE_BETS,
    ],
    requestUpdateBetEventData,
  );
  yield takeEvery(REQUEST_ADD_BET, requestAddCheck);
}

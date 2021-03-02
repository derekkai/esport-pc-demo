import { eventChannel } from 'redux-saga';
import { colorLog, displayMaintainPage } from 'helpers/common';
import { put, call, take, takeEvery, fork } from 'redux-saga/effects';
import { setServerOffline } from 'reducers/global';
import { unsubscribe } from 'helpers/commandSender';
import settings from 'settings';
import createWebSocket from '../helpers/webSocket';

const receivers = {};
const subscribes = {};
let ws;

const addReceiver = (
  rid,
  receiveAction,
  localParams,
  subscribeAction,
  otherActionList,
) => {
  const keyWrod = rid.split('@')[1];
  const conflicts = Object.keys(receivers).filter(receiverName =>
    receiverName.endsWith(keyWrod),
  );

  conflicts.forEach(receiverName => {
    delete receivers[receiverName];
  });

  receivers[rid] = {
    receiveAction,
    localParams,
    subscribeAction,
    otherActionList,
  };
};

const unsubscribeHandler = subscribeName => {
  Object.entries(subscribes).forEach(([key, value]) => {
    if (value.subscribeName === subscribeName) {
      colorLog(`Unsubscribe ${subscribeName}`);
      delete subscribes[key];
      const rid = `${Date.now()}@unsubscribe${subscribeName}`;
      unsubscribe(rid, key);
    }
  });
};

function* createEventChannel() {
  try {
    ws = yield call(createWebSocket);
    return eventChannel(emit => {
      ws.onmessage = message => emit(message);
      return () => {
        ws.close();
      };
    });
  } catch (e) {
    throw new Error(e);
  }
}

function* createCloseChannel() {
  try {
    return eventChannel(emit => {
      ws.onclose = func => emit(func);
      return () => {
        ws.close();
      };
    });
  } catch (e) {
    throw new Error(e);
  }
}

function* webSocketCloseListener() {
  const channel = yield call(createCloseChannel);
  yield take(channel);
  yield put(setServerOffline());
}

function* initializeWebSocketsChannel() {
  try {
    const channel = yield call(createEventChannel);
    yield put({ type: 'SERVER_CONNECTED' });
    yield fork(webSocketCloseListener);
    while (true) {
      const message = yield take(channel);
      const { rid, data, code } = JSON.parse(message.data);
      if (rid === '@login') {
        // login response
        if (code === settings.serverCode.ProductionMaintain) {
          yield call(displayMaintainPage);
        }
      }
      if (rid === '0') {
        // subscribe data
        const temp = Object.entries(data);
        for (let i = 0; i < temp.length; i += 1) {
          const [subid, others] = temp[i];
          if (subscribes[subid]) {
            yield put(subscribes[subid].action(others));
          }
        }
      } else if (receivers[rid]) {
        // normal response
        const {
          receiveAction,
          localParams,
          subscribeAction,
          otherActionList,
        } = receivers[rid];
        data.code = code;
        if (localParams) {
          data.localParams = localParams;
        }
        // creat subscribe channel
        if (
          data.subid &&
          subscribeAction &&
          localParams &&
          localParams.subscribeName
        ) {
          subscribes[data.subid] = {
            action: subscribeAction,
            subscribeName: localParams.subscribeName,
          };
        }
        // data receive action
        if (receiveAction) {
          yield put(receiveAction(data));
        }
        // other action after receive data
        if (otherActionList) {
          for (let i = 0; i < otherActionList.length; i += 1) {
            yield put(otherActionList[i]);
          }
        }
        delete receivers[rid];
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* watchers() {
  // yield takeEvery(
  //   'INITIALIZE_WEB_SOCKETS_CHANNEL',
  //   initializeWebSocketsChannel,
  // );
}

export { addReceiver, unsubscribeHandler };

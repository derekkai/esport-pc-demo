import { put, delay, select } from 'redux-saga/effects';
import { requestNewsData } from 'actions/news';
import { requestBalance } from 'reducers/account';
import settings from 'settings';
import { selectIsLogin } from './selectors';

export function* startNewsPollingTask() {
  while (true) {
    try {
      yield put(requestNewsData());
      yield delay(settings.updateNewsPollingTime);
    } catch (e) {
      console.error(e);
    }
  }
}

export function* startBalancePollingTask() {
  while (true) {
    try {
      const isLogin = yield select(selectIsLogin);
      if (isLogin) {
        yield put(requestBalance());
        yield delay(settings.updateBalancePollingTime);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

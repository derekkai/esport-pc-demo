import { useInjectSaga } from 'utils/injectSaga';
import websocket from './websocket';
import request from './request';
import global from './global';
import classifier from './classifier';
import account from './account';
import betslip from './betslip';

export default () => {
  useInjectSaga({ key: 'websocket', saga: websocket });
  useInjectSaga({ key: 'request', saga: request });
  useInjectSaga({ key: 'global', saga: global });
  useInjectSaga({ key: 'classifier', saga: classifier });
  useInjectSaga({ key: 'account', saga: account });
  useInjectSaga({ key: 'betslip', saga: betslip });
};

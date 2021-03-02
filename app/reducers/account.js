import produce from 'immer';
import { defaultServerLanguage, serverCode } from 'settings';

const prefix = 'account';
export const REQUEST_BALANCE = `${prefix}/REQUEST_BALANCE`;
export const REQUEST_USER_LOGIN = `${prefix}/REQUEST_USER_LOGIN`;
export const REQUEST_USER_INFO = `${prefix}/REQUEST_USER_INFO`;
export const SET_ACCOUNT_DATA = `${prefix}/SET_ACCOUNT_DATA`;
export const SET_BALANCE = `${prefix}/SET_BALANCE`;
export const SET_AUTHTOKEN = `${prefix}/SET_AUTHTOKEN`;
export const SET_USER_INFO = `${prefix}/SET_USER_INFO`;

/**
 * Request user login.
 * @param {string} payload authToken
 */
export const requestUserLogin = payload => ({
  type: REQUEST_USER_LOGIN,
  payload,
});

/**
 * Set current authToken in use.
 * @param {string} payload authToken
 */
export const setAuthToken = payload => ({
  type: SET_AUTHTOKEN,
  payload,
});

/**
 * Set account data.
 * @param {Object} payload account data
 */
export const setAccountData = payload => ({
  type: SET_ACCOUNT_DATA,
  payload,
});

/**
 * Request balance data.
 */
export const requestBalance = () => ({
  type: REQUEST_BALANCE,
});

/**
 * Set balance data.
 * @param {Object} payload balance data
 */
export const setBalance = payload => ({
  type: SET_BALANCE,
  payload,
});

/**
 * Request user information.
 */
export const requestUserInfo = () => ({
  type: REQUEST_USER_INFO,
});

/**
 * Set user information data.
 * @param {Object} payload user information data.
 */
export const setUserInfo = payload => ({
  type: SET_USER_INFO,
  payload,
});

const initalState = {
  isLogin: true,
  balance: 3500.0,
  AuthToken: '603ddda8c2372b000181654f',
  fullAccount: 'testtest',
  account: 'Derek',
  name: 'Derek',
  email: 'Derek@example.com',
  lang: 'zs',
  lastLoginTime: '2021-03-02T06:39:36.164Z',
  live_login: false,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ACCOUNT_DATA: {
        const { code, localParams, live_login } = action.payload;
        if (code === serverCode.OK) {
          draft.isLogin = true;
          draft.AuthToken = localParams.AuthToken;
          draft.live_login = live_login;
        }
        break;
      }
      case SET_BALANCE: {
        draft.balance = action.payload;
        break;
      }
      case SET_USER_INFO: {
        const {
          FullAccount,
          Account,
          Name,
          Email,
          LastLoginTime,
          Lang,
        } = action.payload;
        draft.fullAccount = FullAccount;
        draft.account = Account;
        draft.name = Name;
        draft.email = Email;
        draft.lang = Lang;
        draft.lastLoginTime = LastLoginTime;
        break;
      }
    }
  });

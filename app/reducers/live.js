import produce from 'immer';
import { subscribeDataHandler, gamelistDataHandler } from 'helpers/common';

const prefix = 'live';
export const SET_CURRENT_SELECT_GAME_ID = `${prefix}/SET_CURRENT_SELECT_GAME_ID`;
export const UPDATE_LIVE_DATA = `${prefix}/UPDATE_LIVE_DATA`;
export const REQUEST_LIVE_DATA = `${prefix}/REQUEST_LIVE_DATA`;
export const SET_LIVE_DATA = `${prefix}/SET_LIVE_DATA`;
export const SWITCH_THEATER = `${prefix}/SWITCH_THEATER`;
export const REQUEST_DONATE_VIDEO_URL = `${prefix}/REQUEST_DONATE_VIDEO_URL`;
export const SET_DONATE_VIDEO_URL = `${prefix}/SET_DONATE_VIDEO_URL`;
export const SET_GLOBAL_DONATE_VIDEO_URL = `${prefix}SET_GLOBAL_DONATE_VIDEO_URL`;
export const CLEAR_LIVE_DATA = `${prefix}/CLEAR_LIVE_DATA`;
export const SWITCH_LIVE = `${prefix}/SWITCH_LIVE`;

export const switchTheater = payload => ({
  type: SWITCH_THEATER,
  payload,
});

export const clearLiveData = () => ({
  type: CLEAR_LIVE_DATA,
});

export const requestDonateVideoUrl = payload => ({
  type: REQUEST_DONATE_VIDEO_URL,
  payload,
});

export const setGlobalDonateVideoUrl = payload => ({
  type: SET_GLOBAL_DONATE_VIDEO_URL,
  payload,
});

export const setDonateVideoUrl = payload => ({
  type: SET_DONATE_VIDEO_URL,
  payload,
});

/**
 * Set current live select game id.
 * @param {number} payload game id
 */
export const setCurrentSelectGameId = payload => ({
  type: SET_CURRENT_SELECT_GAME_ID,
  payload,
});

/**
 * Update live data.
 * @param {Object} payload update data.
 */
export const updateLiveData = payload => ({
  type: UPDATE_LIVE_DATA,
  payload,
});

/**
 * Request live data.
 */
export const requestLiveData = () => ({
  type: REQUEST_LIVE_DATA,
});

/**
 * Set live data.
 * @param {Object} payload live data.
 */
export const setLiveData = payload => ({
  type: SET_LIVE_DATA,
  payload,
});

export const switchLive = payload => ({
  type: SWITCH_LIVE,
  payload,
});

const initalState = {
  isTheaterOpen: false,
  isLiveOpen: false,
  currentSelectGameId: '',
  globalDonateVideoUrl: '',
  gameDonateVideoUrl: '',
  keys: [],
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SWITCH_THEATER: {
        const { isOpen, gameId } = action.payload;
        draft.isTheaterOpen = isOpen;
        if (gameId) draft.currentSelectGameId = gameId;
        break;
      }
      case SWITCH_LIVE: {
        const { value, gameId } = action.payload;
        draft.currentSelectGameId = value ? gameId : '';
        draft.isLiveOpen = value;
        break;
      }
      case SET_LIVE_DATA: {
        gamelistDataHandler(draft, action.payload, false);
        break;
      }
      case UPDATE_LIVE_DATA: {
        subscribeDataHandler(draft, action.payload, false);
        if (!draft.keys.includes(draft.currentSelectGameId)) {
          if (draft.keys.length > 0) {
            [draft.currentSelectGameId] = draft.keys;
          } else {
            draft.currentSelectGameId = '';
            draft.isTheaterOpen = false;
          }
        }
        break;
      }
      case SET_CURRENT_SELECT_GAME_ID:
        draft.currentSelectGameId = action.payload;
        break;
      case SET_DONATE_VIDEO_URL: {
        const { code, live_donate_url } = action.payload;
        if (code === 0) {
          draft.gameDonateVideoUrl = live_donate_url;
        }
        break;
      }
      case SET_GLOBAL_DONATE_VIDEO_URL: {
        const { code, live_donate_url } = action.payload;
        if (code === 0) {
          draft.globalDonateVideoUrl = live_donate_url;
        }
        break;
      }
      case CLEAR_LIVE_DATA: {
        draft.currentSelectGameId = '';
        draft.keys = [];
        draft.entity = {};
        break;
      }
    }
  });

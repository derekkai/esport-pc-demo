import produce from 'immer';
import settings from 'settings';
import {
  daysToTimestampRange,
  timestampRangeToDays,
  subscribeDataHandler,
  gamelistDataHandler,
} from 'helpers/common';

const { upcomingGameDefaultDays, upcomingGameDisplayMode } = settings;
const defaultDateRangeTimestamp = daysToTimestampRange(
  false,
  upcomingGameDefaultDays,
);

// actions type.
const prefix = 'upcomingGame';
export const SET_UPCOMING_GAME_DATA = `${prefix}/SET_UPCOMING_GAME_DATA`;
export const CLEAR_UPCOMING_GAME_DATA = `${prefix}/CLEAR_UPCOMING_GAME_DATA`;
export const UPDATE_UPCOMING_GAME_DATA = `${prefix}/UPDATE_UPCOMING_GAME_DATA`;
export const SET_GAME_LIST_ITEM_KEEP = `${prefix}/SET_GAME_LIST_ITEM_KEEP`;
export const RESET_UPCOMING_GAME_DATE_RANGE = `${prefix}/RESET_UPCOMING_GAME_DATE_RANGE`;
export const SET_UPCOMING_GAME_DATE_RANGE = `${prefix}/SET_UPCOMING_GAME_DATE_RANGE`;
export const REQUEST_UPCOMING_GAME_DATA = `${prefix}/REQUEST_UPCOMING_GAME_DATA`;
export const SET_UPCOMING_GAME_DISPLAY_MODE = `${prefix}/SET_UPCOMING_GAME_DISPLAY_MODE`;
export const SET_UPCOMING_GAME_UI_STATE = `${prefix}/SET_UPCOMING_GAME_UI_STATE`;
export const RESET_UPCOMING_GAME_UI_STATE = `${prefix}/RESET_UPCOMING_GAME_UI_STATE`;
export const SET_UPCOMING_FILTER_GAME_TYPE = `${prefix}/SET_UPCOMING_FILTER_GAME_TYPE`;

// action creaters.
export const setGameListItemKeep = payload => ({
  type: SET_GAME_LIST_ITEM_KEEP,
  payload,
});

/**
 * Set game upcoming data.
 * @param {Object} payload game data
 */
export const setUpcomingGameData = payload => ({
  type: SET_UPCOMING_GAME_DATA,
  payload,
});

/**
 * Clear game upcoming data.
 */
export const clearUpcomingGameData = () => ({
  type: CLEAR_UPCOMING_GAME_DATA,
});

/**
 * Update game upcoming data.
 * @param {Object} payload new game data
 */
export const updateUpcomingGameData = payload => ({
  type: UPDATE_UPCOMING_GAME_DATA,
  payload,
});

export const resetUpcomingGameDateRange = payload => ({
  type: RESET_UPCOMING_GAME_DATE_RANGE,
  payload,
});

export const setUpcomingGameDateRange = payload => ({
  type: SET_UPCOMING_GAME_DATE_RANGE,
  payload,
});

export const requestUpcomingGameData = () => ({
  type: REQUEST_UPCOMING_GAME_DATA,
});

export const setUpcomingGameDisplayMode = payload => ({
  type: SET_UPCOMING_GAME_DISPLAY_MODE,
  payload,
});

export const setUpcomingGameUIState = payload => ({
  type: SET_UPCOMING_GAME_UI_STATE,
  payload,
});

export const resetUpcomingGameUIState = () => ({
  type: RESET_UPCOMING_GAME_UI_STATE,
});

export const setUpcomingFilterGameType = payload => ({
  type: SET_UPCOMING_FILTER_GAME_TYPE,
  payload,
});

const initalState = {
  dateRangeDays: upcomingGameDefaultDays,
  dateRangeTimestamp: defaultDateRangeTimestamp,
  gameListItemKeep: 1,
  displayMode: upcomingGameDisplayMode.line, // 1: line, 2: grid
  // filterGameType: upcomingGameFilter.all,
  isDisplayLive: true,
  isDisplayPreMatch: true,
  prevUIState: {
    scrollTop: 0,
    displayItemCount: 12,
  },
  keys: [],
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_UPCOMING_GAME_DATA: {
        gamelistDataHandler(draft, action.payload, true);
        break;
      }
      case UPDATE_UPCOMING_GAME_DATA: {
        subscribeDataHandler(draft, action.payload, true);
        break;
      }
      case CLEAR_UPCOMING_GAME_DATA:
        draft.keys = [];
        draft.entity = {};
        break;
      case SET_GAME_LIST_ITEM_KEEP: {
        const { item } = action.payload;
        draft.gameListItemKeep = item;
        break;
      }
      case SET_UPCOMING_GAME_DATE_RANGE: {
        const { type, value } = action.payload;
        if (type === 'days') {
          draft.dateRangeDays = value;
          draft.dateRangeTimestamp = daysToTimestampRange(false, value);
        } else {
          draft.dateRangeTimestamp[type] = value;
          draft.dateRangeDays = timestampRangeToDays({
            ...draft.dateRangeTimestamp,
            [type]: value,
          });
        }
        break;
      }
      case RESET_UPCOMING_GAME_DATE_RANGE: {
        draft.dateRangeDays = upcomingGameDefaultDays;
        draft.dateRangeTimestamp = defaultDateRangeTimestamp;
        break;
      }
      case SET_UPCOMING_GAME_DISPLAY_MODE: {
        draft.displayMode = action.payload;
        break;
      }
      case SET_UPCOMING_GAME_UI_STATE: {
        draft.prevUIState = {
          ...draft.prevUIState,
          ...action.payload,
        };
        break;
      }
      case RESET_UPCOMING_GAME_UI_STATE: {
        draft.prevUIState = {
          scrollTop: 0,
          displayItemCount: 12,
        };
        break;
      }
      case SET_UPCOMING_FILTER_GAME_TYPE: {
        const { type } = action.payload;
        if (type === 'live') {
          draft.isDisplayLive = !draft.isDisplayLive;
          if (!draft.isDisplayLive && !draft.isDisplayPreMatch) {
            // 取消滾球時早盤必須為true
            draft.isDisplayPreMatch = true;
          }
        } else if (type === 'pre-match') {
          draft.isDisplayPreMatch = !draft.isDisplayPreMatch;
          if (!draft.isDisplayPreMatch && !draft.isDisplayLive) {
            // 取消早盤時滾球必須為true
            draft.isDisplayLive = true;
          }
        }
        break;
      }
    }
  });

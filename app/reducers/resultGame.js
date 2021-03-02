import produce from 'immer';
import settings from 'settings';
import {
  daysToTimestampRange,
  gamelistDataHandler,
  timestampRangeToDays,
} from 'helpers/common';

const { resultGameDefaultDays } = settings;
const defaultDateRangeTimestamp = daysToTimestampRange(
  true,
  resultGameDefaultDays,
);

// actions type.
const prefix = 'resultGame';
export const SET_RESULT_GAME_DATA = `${prefix}/SET_RESULT_GAME_DATA`;
export const CLEAR_RESULT_GAME_DATA = `${prefix}/CLEAR_RESULT_GAME_DATA`;
export const SET_RESULT_GAME_DATE_RANGE = `${prefix}/SET_RESULT_GAME_DATE_RANGE`;
export const RESET_RESULT_GAME_DATE_RANGE = `${prefix}/RESET_RESULT_GAME_DATE_RANGE`;
export const REQUEST_RESULT_GAME_DATA = `${prefix}/REQUEST_RESULT_GAME_DATA`;

/**
 * Set game result data.
 * @param {Object} payload game data
 */
export const setResultGameData = payload => ({
  type: SET_RESULT_GAME_DATA,
  payload,
});

/**
 * Clear game result data.
 */
export const clearResultGameData = () => ({
  type: CLEAR_RESULT_GAME_DATA,
});

export const setResultGameDateRange = payload => ({
  type: SET_RESULT_GAME_DATE_RANGE,
  payload,
});

export const resetResultGameDateRange = () => ({
  type: RESET_RESULT_GAME_DATE_RANGE,
});

export const requestResultGameData = () => ({
  type: REQUEST_RESULT_GAME_DATA,
});

const initalState = {
  dateRangeDays: resultGameDefaultDays,
  dateRangeTimestamp: defaultDateRangeTimestamp,
  keys: [],
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_RESULT_GAME_DATA: {
        gamelistDataHandler(draft, action.payload, true, false);
        break;
      }
      case SET_RESULT_GAME_DATE_RANGE: {
        const { type, value } = action.payload;
        if (type === 'days') {
          draft.dateRangeDays = value;
          draft.dateRangeTimestamp = daysToTimestampRange(true, value);
        } else {
          draft.dateRangeTimestamp[type] = value;
          draft.dateRangeDays = timestampRangeToDays({
            ...draft.dateRangeTimestamp,
            [type]: value,
          });
        }
        break;
      }
      case RESET_RESULT_GAME_DATE_RANGE: {
        draft.dateRangeDays = resultGameDefaultDays;
        draft.dateRangeTimestamp = defaultDateRangeTimestamp;
        break;
      }
      case CLEAR_RESULT_GAME_DATA:
        draft.keys = [];
        draft.entity = {};
        break;
    }
  });

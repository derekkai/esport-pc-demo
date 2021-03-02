import produce from 'immer';
import settings from 'settings';
import { daysToTimestampRange, timestampRangeToDays } from 'helpers/common';

const { betHistoryDefaultDays } = settings;
const defaultDateRangeTimestamp = daysToTimestampRange(
  true,
  betHistoryDefaultDays,
);

const prefix = 'betHistory';
export const REQUEST_BET_HISTORY = `${prefix}/REQUEST_BET_HISTORY`;
export const SET_BET_HISTORY = `${prefix}/SET_BET_HISTORY`;
export const SET_BET_HISTORY_DATE_RANGE = `${prefix}/SET_BET_HISTORY_DATE_RANGE`;
export const CLEAR_BET_HISTORY_DATA = `${prefix}/CLEAR_BET_HISTORY_DATA`;
export const RESET_BET_HISTORY_DATE_RANGE = `${prefix}/RESET_BET_HISTORY_DATE_RANGE`;
export const SET_BET_HISTORY_FILTER_BET_TYPE = `${prefix}/SET_BET_HISTORY_FILTER_BET_TYPE`;

/**
 * Request bet history data.
 */
export const requestBetHistory = () => ({
  type: REQUEST_BET_HISTORY,
});

/**
 * Set bet history data.
 * @param {array} payload bet history data.
 */
export const setBetHistory = payload => ({
  type: SET_BET_HISTORY,
  payload,
});

/**
 * Set bet history date range.
 * @param {Object} payload date range data.
 * @param {number} payload.from from date of range.
 * @param {number} payload.to end date of range.
 */
export const setBetHistoryDateRange = payload => ({
  type: SET_BET_HISTORY_DATE_RANGE,
  payload,
});

export const resetBetHistoryDateRange = () => ({
  type: RESET_BET_HISTORY_DATE_RANGE,
});
/**
 * Clear bet history data.
 */
export const clearBetHistoryData = () => ({
  type: CLEAR_BET_HISTORY_DATA,
});

export const setBetHistoryFilterBetType = payload => ({
  type: SET_BET_HISTORY_FILTER_BET_TYPE,
  payload,
});

export const initalState = {
  dateRangeDays: betHistoryDefaultDays,
  dateRangeTimestamp: defaultDateRangeTimestamp,
  filterBetType: settings.betHistoryDefaultBetType,
  entity: [],
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BET_HISTORY:
        draft.entity = action.payload;
        break;
      case SET_BET_HISTORY_DATE_RANGE: {
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
      case RESET_BET_HISTORY_DATE_RANGE: {
        draft.dateRangeDays = betHistoryDefaultDays;
        draft.dateRangeTimestamp = defaultDateRangeTimestamp;
        break;
      }
      case CLEAR_BET_HISTORY_DATA:
        draft.entity = [];
        break;
      case SET_BET_HISTORY_FILTER_BET_TYPE: {
        draft.filterBetType = action.payload;
        break;
      }
    }
  });

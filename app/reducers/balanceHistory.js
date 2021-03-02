import produce from 'immer';
import settings from 'settings';
import { daysToTimestampRange, timestampRangeToDays } from 'helpers/common';

const { balanceHistoryDefaultDays } = settings;
const defaultDateRangeTimestamp = daysToTimestampRange(
  true,
  balanceHistoryDefaultDays,
);

const prefix = 'balanceHistory';
export const REQUEST_BALANCE_HISTORY = `${prefix}/REQUEST_BALANCE_HISTORY`;
export const SET_BALANCE_HISTORY = `${prefix}/SET_BALANCE_HISTORY`;
export const SET_BALANCE_HISTORY_DATE_RANGE = `${prefix}/SET_BALANCE_HISTORY_DATE_RANGE`;
export const CLEAR_BALANCE_HISTORY = `${prefix}/CLEAR_BALANCE_HISTORY`;
export const RESET_BALANCE_HISTORY_DATE_RANGE = `${prefix}/RESET_BALANCE_HISTORY_DATE_RANGE`;

/**
 * Request balance history data.
 */
export const requestBalanceHistory = () => ({
  type: REQUEST_BALANCE_HISTORY,
});

/**
 * Set balance history data.
 * @param {Object} payload history data
 */
export const setBalanceHistory = payload => ({
  type: SET_BALANCE_HISTORY,
  payload,
});

/**
 * Clear balance history data.
 */
export const clearBalanceHistory = () => ({
  type: CLEAR_BALANCE_HISTORY,
});
/**
 * Set balance history date range.
 * @param {Object} payload date range data.
 * @param {number} payload.from from date of range.
 * @param {number} payload.to end date of range.
 */
export const setBalanceHistoryDateRange = payload => ({
  type: SET_BALANCE_HISTORY_DATE_RANGE,
  payload,
});

export const resetBalanceHistoryDateRange = () => ({
  type: RESET_BALANCE_HISTORY_DATE_RANGE,
});

export const initalState = {
  dateRangeDays: balanceHistoryDefaultDays,
  dateRangeTimestamp: defaultDateRangeTimestamp,
  keys: [],
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BALANCE_HISTORY: {
        const temp = action.payload;
        const keys = [];
        temp.forEach(el => {
          const { TransDate } = el;
          const key = TransDate.split(' ')[0];
          if (!keys.includes(key)) {
            keys.push(key);
            draft.entity[key] = {};
            let count = 0;
            let total = 0;
            let balance;
            const data = [];
            for (let i = 0; i < temp.length; i += 1) {
              if (temp[i].TransDate.startsWith(key)) {
                count += 1;
                total += temp[i].TransAmount;
                if (!balance) {
                  balance = temp[i].TransBalance;
                }
                data.push(temp[i]);
              }
            }

            draft.entity[key] = {
              count,
              total,
              balance,
              data,
            };
          }
        });
        draft.keys = keys;
        break;
      }
      case SET_BALANCE_HISTORY_DATE_RANGE: {
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
      case RESET_BALANCE_HISTORY_DATE_RANGE: {
        draft.dateRangeDays = balanceHistoryDefaultDays;
        draft.dateRangeTimestamp = defaultDateRangeTimestamp;
        break;
      }
      case CLEAR_BALANCE_HISTORY:
        draft.entity = {};
        draft.key = [];
        break;
    }
  });

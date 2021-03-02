import produce from 'immer';
import { pushIdBySort, reduceGroupData } from 'helpers/common';
import settings from 'settings';

const prefix = 'resultMarket';
export const SET_RESULT_MARKET_DATA = `${prefix}/SET_RESULT_MARKET_DATA`;
export const CLEAR_RESULT_MARKET_DATA = `${prefix}/CLEAR_RESULT_MARKET_DATA`;

/**
 * Set result market data.
 * @param {Object} payload market data.
 */
export const setResultMarketData = payload => ({
  type: SET_RESULT_MARKET_DATA,
  payload,
});

/**
 * Clear result market data.
 */
export const clearResultMarketData = () => ({
  type: CLEAR_RESULT_MARKET_DATA,
});

const initalState = {
  keys: {
    0: { label: 'All Games', value: [] },
  },
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_RESULT_MARKET_DATA: {
        let keys = { 0: { label: 'All Games', value: [] } };
        Object.values(action.payload.market).forEach(market => {
          if (market.event) {
            const { result } = Object.values(market.event)[0];
            if (result !== settings.EventStatus.NoResult) {
              pushIdBySort(
                action.payload.market,
                market,
                keys[0].value,
                'id' /*'order'*/,
              );
              const { group_id, group_name } = market;
              if (keys[group_id]) {
                pushIdBySort(
                  action.payload.market,
                  market,
                  keys[group_id].value,
                  // 'order',
                  'id',
                );
              } else {
                keys[group_id] = {
                  label: group_name,
                  value: [market.id],
                };
              }
            }
          }
        });
        keys = reduceGroupData(keys);
        draft.keys = keys;
        draft.entity = action.payload.market;
        break;
      }
      case CLEAR_RESULT_MARKET_DATA:
        draft.keys = {
          0: { label: 'All Games', value: [] },
        };
        draft.entity = {};
        break;
    }
  });

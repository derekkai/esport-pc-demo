import produce from 'immer';
import { pushIdBySort, reduceGroupData } from 'helpers/common';
import extend from 'extend';

const prefix = 'upcomingMarket';
export const SET_UPCOMING_MARKET_DATA = `${prefix}/SET_UPCOMING_MARKET_DATA`;
export const CLEAR_UPCOMING_MARKET_DATA = `${prefix}/CLEAR_UPCOMING_MARKET_DATA`;
export const UPDATE_UPCOMING_MARKET_DATA = `${prefix}/UPDATE_UPCOMING_MARKET_DATA`;

/**
 * Set upcoming market  data.
 * @param {Object} payload market data
 */
export const setUpcomingMarketData = payload => ({
  type: SET_UPCOMING_MARKET_DATA,
  payload,
});

/**
 * Clear upcoming market  data.
 */
export const clearUpcomingMarketData = () => ({
  type: CLEAR_UPCOMING_MARKET_DATA,
});

/**
 * Update upcoming Market data.
 * @param {Object} payload market update data.
 */
export const updateUpcomingMarketData = payload => ({
  type: UPDATE_UPCOMING_MARKET_DATA,
  payload,
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
      case SET_UPCOMING_MARKET_DATA: {
        // market 沒有 order 用 id 排序
        let keys = { 0: { label: 'All Games', value: [] } };
        Object.values(action.payload.market).forEach(market => {
          pushIdBySort(action.payload.market, market, keys[0].value, 'NameId');
          const { group_id, group_name } = market;
          if (keys[group_id]) {
            pushIdBySort(
              action.payload.market,
              market,
              keys[group_id].value,
              'NameId',
            );
          } else {
            keys[group_id] = {
              label: group_name,
              value: [market.id],
            };
          }
        });
        keys = reduceGroupData(keys);
        draft.keys = keys;
        draft.entity = action.payload.market;
        break;
      }
      case CLEAR_UPCOMING_MARKET_DATA:
        draft.keys = {
          0: { label: 'All Games', value: [] },
        };
        draft.entity = {};
        break;
      case UPDATE_UPCOMING_MARKET_DATA: {
        Object.values(action.payload.sport).forEach(sport => {
          Object.values(sport.region).forEach(region => {
            Object.values(region.competition).forEach(competition => {
              Object.values(competition.game).forEach(game => {
                if (!game) {
                  draft.entity = {};
                  draft.keys = {
                    0: { label: 'All Games', value: [] },
                  };
                } else {
                  Object.entries(game.market).forEach(([key, market]) => {
                    const marketId = Number(key);
                    if (!market) {
                      // remove market
                      // remove from  group
                      Object.entries(draft.keys).forEach(([groupId, group]) => {
                        const index = group.value.indexOf(marketId);
                        if (index !== -1) {
                          draft.keys[groupId].value.splice(index, 1);
                        }
                      });
                      delete draft.entity[marketId];
                    } else if (!state.keys[0].value.includes(marketId)) {
                      // add market
                      draft.entity[marketId] = market;
                      pushIdBySort(
                        draft.entity,
                        market,
                        draft.keys[0].value,
                        'order',
                      );
                      // check if new group name.
                      if (market.group_id) {
                        if (state.keys[market.group_id]) {
                          pushIdBySort(
                            draft.entity,
                            market,
                            draft.keys[market.group_id].value,
                            'order',
                          );
                        } else {
                          draft.keys[market.group_id] = {
                            label: market.group_name,
                            value: [marketId],
                          };
                        }
                      }
                    } else if (market.event) {
                      // update event
                      Object.entries(market.event).forEach(
                        ([eventId, event]) => {
                          if (!event) {
                            delete draft.entity[marketId].event[eventId];
                          } else if (draft.entity[marketId]?.event?.[eventId]) {
                            extend(
                              true,
                              draft.entity[marketId].event[eventId],
                              event,
                            );
                          } else {
                            if (!draft.entity[marketId].event) {
                              draft.entity[marketId].event = {};
                            }
                            draft.entity[marketId].event[eventId] = event;
                          }
                        },
                      );
                    }
                  });
                }
              });
            });
          });
        });
        break;
      }
    }
  });

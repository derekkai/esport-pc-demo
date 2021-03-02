import React from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
const Decimal = require('decimal.js');
/* eslint-disable no-param-reassign */

/**
 * Convert timestamp to a object with hours day minute and month.
 * @param {number} unix timestamp
 * @returns {Object} The object of hours, day, minute, month and year.
 */
export const timeConvert = unix => {
  const date = new Date(unix * 1000);
  const year = date.getFullYear();
  const hours = `0${date.getHours()}`.substr(-2);
  const day = `0${date.getDate()}`.substr(-2);
  const minute = `0${date.getMinutes()}`.substr(-2);
  const month = `0${date.getMonth() + 1}`.substr(-2);
  return {
    hours,
    day,
    minute,
    month,
    year,
  };
};

/**
 * Get only number of combinations.
 * @param {number} betCount number of bet.
 * @param {number} sys_bet min of system combinations.
 * @return {number} number of combinations.
 */
export const getBetslipOnlySystemCount = (betCount, sys_bet) => {
  const list = [];
  for (let index = 0; index < betCount; index += 1) {
    const lst = { items: [...list.filter(el => el.length < sys_bet)] };
    const nArr = [];
    nArr.push(1);
    list.push(nArr);
    for (let lstIndex = 0; lstIndex < lst.items.length; lstIndex += 1) {
      list.push(lst.items[lstIndex].concat(nArr));
    }
  }
  return list.filter(el => el.length === sys_bet).length;
};

/**
 * Calculation of betslip total price and system.
 * @param {string} betType bet type
 * @param {Array} eventsPrice array of events price
 * @param {number} sys_bet min system number
 */
export const betslipTotalPrice = (betType, eventsPrice, sys_bet) => {
  let systems = {};
  let totalPrice = 0;
  if (betType === 'system') {
    const list = [];
    for (let index = 0; index < eventsPrice.length; index += 1) {
      const lst = { items: [...list.filter(el => el.length < sys_bet)] };
      const nArr = [];
      nArr.push(eventsPrice[index]);
      list.push(nArr);
      for (let lstIndex = 0; lstIndex < lst.items.length; lstIndex += 1) {
        list.push(lst.items[lstIndex].concat(nArr));
      }
    }

    systems = { items: [...list.filter(el => el.length === sys_bet)] };
    for (let index = 0; index < systems.items.length; index += 1) {
      let arrayForCalcPrice = 1;
      for (let callistIndex = 0; callistIndex < sys_bet; callistIndex += 1) {
        const calPrice = systems.items[index][callistIndex];
        arrayForCalcPrice = new Decimal(arrayForCalcPrice)
          .mul(new Decimal(calPrice))
          .toNumber();
      }
      totalPrice = new Decimal(totalPrice)
        .add(new Decimal(arrayForCalcPrice))
        .toNumber();
    }
  } else {
    let arrayForCalcPrice = 1;
    for (let index = 0; index < eventsPrice.length; index += 1) {
      arrayForCalcPrice = new Decimal(arrayForCalcPrice)
        .mul(new Decimal(eventsPrice[index]))
        .toNumber();
      totalPrice = arrayForCalcPrice;
    }
  }
  return {
    systems: systems.items,
    price: totalPrice,
  };
};

/**
 * Get value of parameter in url.
 * @param {string} name parameter name
 * @param {string} url url
 */

export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return undefined;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * Return a date range
 * @param {boolean} isPast true for return past date or false as future
 * @param {number} day day
 */
export const daysToTimestampRange = (isPast, day) => {
  try {
    const today = new Date();
    // to entire date.
    today.setDate(today.getDate() - 1);
    today.setHours(24);
    today.setMinutes(0);
    today.setSeconds(0);

    const anotherDay = new Date(today);
    if (isPast) {
      anotherDay.setDate(anotherDay.getDate() - day);
      today.setHours(23);
      today.setMinutes(59);
      return {
        from: anotherDay.getTime(),
        to: today.getTime(),
      };
    }
    anotherDay.setHours(23);
    anotherDay.setMinutes(59);
    anotherDay.setDate(anotherDay.getDate() + day);
    return {
      from: today.getTime(),
      to: anotherDay.getTime(),
    };
  } catch (e) {
    console.error(e);
    return {
      from: 0,
      to: 0,
    };
  }
};

export const timestampRangeToDays = ({ from, to }) => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((from - to) / oneDay));
};

/**
 * millisecond to second
 * @param {number} unix millisecond timestamp
 */
export const toSecondTimesStamp = unix => Math.floor(unix / 1000);

/**
 * colorful console log.
 * @param {any} message message
 * @param {string} type text type
 */
export const colorLog = (message, type) => {
  let background;

  switch (type) {
    case 'sub_info':
      background = '#00b359';
      break;
    case 'info':
      background = '#0066cc';
      break;
    case 'warn':
      background = '#ffcc00';
      break;
    case 'error':
      background = '  #ff6666';
      break;
    default:
      background = '#6699ff';
      break;
  }
  const styles = `background: ${background}; color: #fff; font-size: 14px;`;
  console.log(`%c${message}`, styles);
};

/**
 * 將ID依照propsName大小插入目標的陣列
 * @param {Object} origin 取得其他ID對應的propName
 * @param {Object} target ID的實體
 * @param {Array} storage 目標的陣列
 * @param {string} propsName 比較的欄位名稱
 * @param {boolean} isDesc 升冪或降冪
 */
export const pushIdBySort = (
  origin,
  target,
  storage,
  propsName,
  isDesc = true,
) => {
  const { id } = target;
  const propsValue = target[propsName];
  let lastElement = true;
  for (let i = 0; i < storage.length; i += 1) {
    const condition = isDesc
      ? origin[storage[i]][propsName] > propsValue
      : origin[storage[i]][propsName] < propsValue;

    if (condition) {
      lastElement = false;
      storage.splice(i, 0, id);
      break;
    }
  }
  if (lastElement) {
    storage.push(id);
  }
};

export function subscribeDataHandler(draft, data, needSort) {
  try {
    Object.values(data.sport || {}).forEach(sport => {
      Object.values(sport.region || {}).forEach(region => {
        Object.values(region.competition || {}).forEach(competition => {
          Object.entries(competition.game || {}).forEach(
            ([gameKey, gameValue]) => {
              const gameId = Number(gameKey);
              if (gameValue === null) {
                // 刪除 game
                printLog('remove', 'game', gameId);
                delete draft.entity[gameId];
                _.pull(draft.keys, Number(gameId));
              } else {
                // 更新 game
                if (gameValue.id) {
                  const { market, ...gameProperties } = gameValue;
                  printLog('update', 'game', gameId);
                  if (!draft.keys.includes(gameId)) {
                    if (!needSort) {
                      draft.keys.push(gameId);
                    } else {
                      pushIdBySort(
                        draft.entity,
                        gameProperties,
                        draft.keys,
                        'start_ts',
                      );
                    }
                  }
                  draft.entity[gameId] = {
                    ...draft.entity[gameId],
                    ...gameProperties,
                    sportName: sport.name,
                    competitionName: competition.name,
                  };
                }

                if (draft.entity[gameId]) {
                  if (gameValue.market === null) {
                    // game 上鎖
                    printLog('close', 'market', gameId);
                    draft.entity[gameId].market = null;
                  } else if (gameValue.market) {
                    _.toPairs(gameValue.market).forEach(
                      ([marketKey, marketValue]) => {
                        // 處理每一項 market
                        const marketId = Number(marketKey);
                        if (
                          marketValue === null &&
                          draft.entity[gameId]?.market
                        ) {
                          // 刪除 market
                          printLog('remove', 'market', marketId);
                          delete draft.entity[gameId].market[marketId];
                          if (!_.findKey(draft.entity[gameId].market)) {
                            // 無任何 market 刪除 market
                            delete draft.entity[gameId].market;
                          }
                        } else if (marketValue) {
                          if (marketValue.id) {
                            // 更新 market
                            const { event, ...marketProperties } = marketValue;
                            printLog('update', 'market', marketId);
                            draft.entity[gameId].market = {
                              ...draft.entity[gameId]?.market,
                              [marketId]: {
                                ...draft.entity[gameId]?.market?.[marketId],
                                ...marketProperties,
                              },
                            };
                          }
                          if (
                            marketValue.event &&
                            draft.entity[gameId]?.market?.[marketId]
                          ) {
                            _.toPairs(marketValue.event).forEach(
                              ([eventKey, eventProperties]) => {
                                // 處理每一項 event
                                const eventId = Number(eventKey);
                                if (
                                  eventProperties === null &&
                                  draft.entity[gameId]?.market[marketId]?.event
                                ) {
                                  // 刪除 event
                                  printLog('remove', 'event', eventId);
                                  delete draft.entity[gameId].market[marketId]
                                    .event[eventId];
                                } else {
                                  // 更新 event
                                  printLog('update', 'event', eventId);
                                  draft.entity[gameId].market[
                                    marketId
                                  ].event = {
                                    ...draft.entity[gameId].market?.[marketId]
                                      ?.event,
                                    [eventId]: {
                                      ...draft.entity[gameId]?.market?.[
                                        marketId
                                      ]?.event?.[eventId],
                                      ...eventProperties,
                                    },
                                  };
                                }
                              },
                            );
                          }
                        }
                      },
                    );
                  }
                }
              }
            },
          );
        });
      });
    });
  } catch (e) {
    console.error(e);
  }

  function printLog(type, layer, id) {
    const color = {
      remove: '#DB5753',
      update: '#7279DB',
      close: 'gray',
    };
    console.log(
      `%c#${type.toUpperCase()}: ${type} ${layer} with ID: ${id} ↓`,
      `color: ${color[type]}`,
    );
  }
}

// live recommand
export const gamelistDataHandler = (draft, data, needSort, isDesc) => {
  try {
    const sortDataStore = { ...draft.entity };
    _.values(data?.sport || {}).forEach(sport => {
      _.values(sport.competition).forEach(competition => {
        _.values(competition.game).forEach(game => {
          draft.entity[game.id] = {
            ...game,
            sportName: sport.name,
            competitionName: competition.name,
          };
          if (needSort) {
            sortDataStore[game.id] = { start_ts: game.start_ts };
            pushIdBySort(sortDataStore, game, draft.keys, 'start_ts', isDesc);
          } else {
            draft.keys.push(game.id);
          }
        });
      });
    });
  } catch (e) {
    console.error(e);
  }
};

export const browserChecker = () => {
  // Opera 8.0+
  const isOpera =
    (!!window.opr && !!window.opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(' OPR/') >= 0;

  // Firefox 1.0+
  const isFirefox = typeof InstallTrigger !== 'undefined';

  // Safari 3.0+ "[object HTMLElementConstructor]"
  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function(p) {
      return p.toString() === '[object SafariRemoteNotification]';
    })(
      !window.safari ||
        (typeof safari !== 'undefined' && window.safari.pushNotification),
    );

  // Internet Explorer 6-11
  const isIE = /*@cc_on!@*/ false || !!document.documentMode;

  // Edge 20+
  const isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1 - 71
  const isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  // Blink engine detection
  const isBlink = (isChrome || isOpera) && !!window.CSS;

  return {
    isOpera,
    isFirefox,
    isSafari,
    isIE,
    isEdge,
    isChrome,
    isBlink,
  };
};

export const reduceGroupData = group => {
  if (group.Others && group[0].value.length === group.Others.value.length) {
    const { Others, ...result } = group;
    return result;
  }
  return group;
};

export const displayMaintainPage = () => {
  ReactDOM.render(
    <div className="maintain-bg" />,
    document.getElementById('app'),
  );
};

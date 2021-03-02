import produce from 'immer';
import { isEmpty, pull, findKey } from 'lodash';
import extend from 'extend';

const prefix = 'classifier';
export const SET_CLASSIFIER_DATA = `${prefix}/SET_CLASSIFIER_DATA`;
export const RESET_CLASSIFIER_SELECTION = `${prefix}/RESET_CLASSIFIER_SELECTION`;
export const UPDATE_CLASSIFIER_DATA = `${prefix}/UPDATE_CLASSIFIER_DATA`;
export const SWITCH_CLASSIFIER = `${prefix}/SWITCH_CLASSIFIER`;
export const SET_CLASSIFIER_COMPETITION_SELECT = `${prefix}/SET_CLASSIFIER_COMPETITION_SELECT`;
export const SET_CLASSIFIER_SPORT_SELECT = `${prefix}/SET_CLASSIFIER_SPORT_SELECT`;
export const SELECT_ALL_COMPETITION = `${prefix}/SELECT_ALL_COMPETITION`;
export const CLEAR_ALL_COMPETITION = `${prefix}/CLEAR_ALL_COMPETITION`;
export const REQUEST_CLASSIFIER_DATA = `${prefix}/REQUEST_CLASSIFIER_DATA`;

/**
 * Request classifier data.
 */
export const requestClassifierData = () => ({
  type: REQUEST_CLASSIFIER_DATA,
});

/**
 * Set classifier data.
 * @param {Object} payload classifier data
 */
export const setClassifierData = payload => ({
  type: SET_CLASSIFIER_DATA,
  payload,
});

/**
 * Set classifier selection.
 * @param {Object} payload
 * @param {number} payload.sportId select sport id
 * @param {number} payload.competition select competition id
 */
export const setClassifierCompetitionSelect = payload => ({
  type: SET_CLASSIFIER_COMPETITION_SELECT,
  payload,
});

/**
 * Set classifier casual view sport.
 * @param {number} payload sport id
 */
export const setClassifierSportSelect = payload => ({
  type: SET_CLASSIFIER_SPORT_SELECT,
  payload,
});

/**
 * Select all competition in single sport.
 * @param {number} payload sport id
 */
export const selectAllCompetition = payload => ({
  type: SELECT_ALL_COMPETITION,
  payload,
});

/**
 * Clear all competition in single sport.
 * @param {number} payload sport id
 */
export const clearAllCompetition = payload => ({
  type: CLEAR_ALL_COMPETITION,
  payload,
});

/**
 * Reset classifier selection.
 */
export const resetClassifierSelection = () => ({
  type: RESET_CLASSIFIER_SELECTION,
});

/**
 * Update classifier data.
 * @param {Object} payload update data
 */
export const updateClassifierData = payload => ({
  type: UPDATE_CLASSIFIER_DATA,
  payload,
});

export const switchClassifier = payload => ({
  type: SWITCH_CLASSIFIER,
  payload,
});

const initalState = {
  entity: {},
  competitionSelect: {},
  sportSelect: 0,
  moveOut: false,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_CLASSIFIER_DATA: {
        const data = action.payload?.sport || {};
        draft.entity = data;
        break;
      }
      case SET_CLASSIFIER_COMPETITION_SELECT: {
        const { sportId, competitionId } = action.payload;
        if (
          state.competitionSelect[sportId] &&
          state.competitionSelect[sportId].includes(competitionId)
        ) {
          pull(draft.competitionSelect[sportId], competitionId);
          if (isEmpty(draft.competitionSelect[sportId])) {
            // 如果選項的competition為空刪除整個項目
            delete draft.competitionSelect[sportId];
            if (draft.sportSelect === sportId) {
              // 如果刪除的sport為sportSelect
              const newSportSelect = findKey(draft.competitionSelect) || 0;
              draft.sportSelect = Number(newSportSelect);
            }
          }
        } else {
          draft.competitionSelect = {
            ...draft.competitionSelect,
            [sportId]: [
              ...(draft.competitionSelect[sportId] || []),
              competitionId,
            ],
          };
        }
        break;
      }
      case SET_CLASSIFIER_SPORT_SELECT: {
        Object.entries(state.competitionSelect).forEach(([key, value]) => {
          if (value.length === 0) {
            delete draft.competitionSelect[key];
          }
        });
        if (action.payload === 0) {
          draft.competitionSelect = {};
        }
        draft.sportSelect = action.payload;
        break;
      }
      case SELECT_ALL_COMPETITION: {
        const sportId = action.payload;
        const newSelect = [];
        Object.values(state.entity[sportId].competition).forEach(el => {
          newSelect.push(el.id);
        });
        draft.competitionSelect[sportId] = newSelect;
        break;
      }
      case CLEAR_ALL_COMPETITION: {
        if (isEmpty(state.competitionSelect)) {
          draft.sportSelect = 0;
          draft.competitionSelect = {};
        }
        const sportId = action.payload;
        draft.competitionSelect[sportId] = [];
        break;
      }
      case RESET_CLASSIFIER_SELECTION:
        draft.sportSelect = 0;
        draft.competitionSelect = {};
        break;
      case UPDATE_CLASSIFIER_DATA: {
        Object.entries(action.payload?.sport || {}).forEach(
          ([sportId, sportValue]) => {
            Object.entries(sportValue.region || {}).forEach(
              ([, regionValue]) => {
                Object.entries(regionValue.competition || {}).forEach(
                  ([competitionId, competitionValue]) => {
                    Object.entries(competitionValue.game || {}).forEach(
                      ([gameId, gameValue]) => {
                        if (gameValue === null) {
                          // 刪除game
                          if (
                            draft.entity[sportId]?.competition?.[competitionId]
                              ?.game?.[gameId]
                          ) {
                            // game存在
                            delete draft.entity[sportId].competition[
                              competitionId
                            ].game[gameId];
                            if (
                              isEmpty(
                                draft.entity[sportId].competition[competitionId]
                                  .game,
                              )
                            ) {
                              // 檢查此competitionId是否還有其他game，沒有則刪除
                              delete draft.entity[sportId].competition[
                                competitionId
                              ];
                              // 檢查是否有被選取
                              pull(
                                draft.competitionSelect[sportId],
                                competitionId,
                              );
                              if (isEmpty(draft.entity[sportId].competition)) {
                                // 檢查此sportId是否還有其他competition，沒有則刪除
                                delete draft.entity[sportId];
                                // 檢查是否有被選取
                                delete draft.competitionSelect[sportId];
                              }
                            }
                          }
                        } else {
                          // 產生一組不包含region的新資料
                          const newData = {
                            [sportId]: {
                              ...sportValue,
                              competition: {
                                [competitionId]: {
                                  ...competitionValue,
                                  game: {
                                    [gameId]: gameValue,
                                  },
                                },
                              },
                            },
                          };
                          extend(true, draft.entity, newData);
                        }
                      },
                    );
                  },
                );
              },
            );
          },
        );
        break;
      }
      case SWITCH_CLASSIFIER: {
        const { moveOut } = action.payload;
        draft.moveOut = moveOut;
        break;
      }
    }
  });

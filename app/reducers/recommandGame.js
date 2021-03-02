import produce from 'immer';
import { subscribeDataHandler, gamelistDataHandler } from 'helpers/common';

const prefix = 'recommandGame';
export const REQUEST_RECOMMAND_GAME_DATA = `${prefix}/REQUEST_RECOMMAND_GAME_DATA`;
export const SET_RECOMMAND_GAME_DATA = `${prefix}/SET_RECOMMAND_GAME_DATA`;
export const UPDATE_RECOMMAND_GAME_DATA = `${prefix}/UPDATE_RECOMMAND_GAME_DATA`;
export const SELECT_RECOMMAND_GAME_INDEX = `${prefix}/SELECT_RECOMMAND_GAME_INDEX`;
/**
 * Request recommand game.
 */
export const requestRecommandGameData = () => ({
  type: REQUEST_RECOMMAND_GAME_DATA,
});

/**
 * Set recommand data.
 * @param {Object} payload recommand game data.
 */
export const setRecommandGameData = payload => ({
  type: SET_RECOMMAND_GAME_DATA,
  payload,
});

/**
 * Update recommand game data.
 * @param {Object} payload recommand game update data.
 */
export const updateRecommandGameData = payload => ({
  type: UPDATE_RECOMMAND_GAME_DATA,
  payload,
});

export const selectRecommandGameIndex = payload => ({
  type: SELECT_RECOMMAND_GAME_INDEX,
  payload,
});

const initialState = {
  activeGameIndex: 0,
  keys: [],
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_RECOMMAND_GAME_DATA: {
        gamelistDataHandler(draft, action.payload, false);
        break;
      }
      case UPDATE_RECOMMAND_GAME_DATA: {
        subscribeDataHandler(draft, action.payload, false);
        break;
      }
      case SELECT_RECOMMAND_GAME_INDEX: {
        draft.activeGameIndex = action.payload;
        break;
      }
    }
  });

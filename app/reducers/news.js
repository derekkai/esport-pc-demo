import { handleActions } from 'redux-actions';
import { SET_NEWS_DATA } from 'actions/news';

const initalState = {
  entity: [],
};

export default handleActions(
  {
    [SET_NEWS_DATA]: (state, { payload }) => ({
      ...state,
      entity: [...payload],
    }),
  },
  initalState,
);

import { createSelector } from 'reselect';

const selectKeys = state => {
  const { gameListType } = state.global;
  switch (gameListType) {
    case 'upcoming':
      return state.upcomingMarket.keys;
    case 'result':
      return state.resultMarket.keys;
    default:
      return [];
  }
};

const makeTabs = createSelector(
  selectKeys,
  state => {
    const result = {};
    Object.entries(state).forEach(([key, value]) => {
      result[key] = { label: value.label, value: key };
    });
    return Object.entries(result).sort();
  },
);

export { makeTabs };

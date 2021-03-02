import { createSelector } from 'reselect';

const selectEntity = state => state.betHistory.entity;
const selectFilterBetType = state => state.betHistory.filterBetType;
export const makeFilterEntity = createSelector(
  selectEntity,
  selectFilterBetType,
  (entity, filterBetType) =>
    entity.filter(betslip => {
      if (filterBetType === 'all') return true;
      return betslip.BetTypeName.toLowerCase() === filterBetType;
    }),
);

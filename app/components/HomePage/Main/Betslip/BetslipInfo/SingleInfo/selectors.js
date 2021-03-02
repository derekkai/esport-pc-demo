import { createSelector } from 'reselect';

const selectEntity = state => state.betslip.entity;

const makeInfo = createSelector(
  selectEntity,
  state => {
    let totalSingleStake = 0;
    let totalPotentialWin = 0;
    let count = 0;
    Object.values(state).forEach(el => {
      totalSingleStake += el.stake;
      totalPotentialWin += el.stake * el.price;
      count += 1;
    });
    totalPotentialWin = Number(totalPotentialWin.toFixed(2));
    return { totalSingleStake, totalPotentialWin, count };
  },
);

export { makeInfo };

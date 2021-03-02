import { createSelector } from 'reselect';
import { betslipTotalPrice } from 'helpers/common';

const selectEntity = state => state.betslip.entity;

const makePrice = createSelector(
  selectEntity,
  entity => {
    const eventsPrice = [];
    Object.values(entity).forEach(el => {
      eventsPrice.push(el.price);
    });
    const { price } = betslipTotalPrice('multiple', eventsPrice);
    return price;
  },
);

export { makePrice };

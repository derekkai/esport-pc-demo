import { createSelector } from 'reselect';
import { betslipTotalPrice } from 'helpers/common';

const selectEntity = state => state.betslip.entity;
const selectSystemNum = state => state.betslip.systemNum;

const makeInfo = createSelector(
  selectEntity,
  selectSystemNum,
  (entity, systemNum) => {
    const eventsPrice = [];

    Object.values(entity).forEach(el => {
      eventsPrice.push(el.price);
    });

    const { price, systems } = betslipTotalPrice(
      'system',
      eventsPrice,
      systemNum,
    );

    return {
      count: systems.length,
      price,
    };
  },
);

export { makeInfo };

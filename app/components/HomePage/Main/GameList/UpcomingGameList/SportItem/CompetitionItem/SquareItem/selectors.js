import { createSelector } from 'reselect';
const selectMarket = (state, props) =>
  state.upcomingGame.entity[props.gameId]?.market;

const makeMarket = () =>
  createSelector(
    selectMarket,
    market => {
      if (!market) {
        return undefined;
      }
      const { id } =
        Object.values(market).find(
          el =>
            el?.market_type === 'MatchResult' ||
            el?.market_type === 'MatchWinner',
        ) || {};

      return market[id];
    },
  );

export { makeMarket };

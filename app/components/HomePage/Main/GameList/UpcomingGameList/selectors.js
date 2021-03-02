import { createSelector } from 'reselect';

const selectEntity = state => state.upcomingGame.entity;
const selectKey = state => state.upcomingGame.keys;
const selectIsDisplayLive = state => state.upcomingGame.isDisplayLive;
const selectIsDisplayPreMatch = state => state.upcomingGame.isDisplayPreMatch;
const selectDisplayItemCount = state =>
  state.upcomingGame.prevUIState.displayItemCount;

export const makeFilterKeys = createSelector(
  selectEntity,
  selectKey,
  selectIsDisplayLive,
  selectIsDisplayPreMatch,
  selectDisplayItemCount,
  (entity, keys, isDisplayLive, isDisplayPreMatch, displayItemCount) => {
    let gameTree = {};
    keys
      .filter(gameId => {
        const { type } = entity[gameId];
        switch (type) {
          case 0:
            return isDisplayPreMatch;
          case 1:
            return isDisplayLive;
          default:
            return false;
        }
      })
      .filter((_, index) => index < displayItemCount)
      .forEach(gameId => {
        const {
          sportName,
          competitionName,
          sport: { id: sportId },
          competition: { id: competitionId },
        } = entity[gameId];

        const sportKey = `${sportId}:${sportName}`;
        const competitionKey = `${competitionId}:${competitionName}`;
        gameTree = {
          ...gameTree,
          [sportKey]: {
            ...(gameTree?.[sportKey] || {}),
            [competitionKey]: [
              ...(gameTree?.[sportKey]?.[competitionKey] || []),
              gameId,
            ],
          },
        };
      });

    return gameTree;
  },
);

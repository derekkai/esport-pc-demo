import { createSelector } from 'reselect';

const selectCompetition = (state, props) => props.data.competition;
const selectClassifierCompetitionSelect = (state, props) =>
  state.classifier.competitionSelect[props.sportId];
const selectSportId = (state, props) => props.sportId;
const selectView = state => state.classifier.sportSelect;

const makeSportCount = () =>
  createSelector(
    selectCompetition,
    state => {
      let totalCount = 0;
      Object.values(state).forEach(el => {
        if (el.game) {
          totalCount += Object.keys(el.game).length;
        }
      });
      return totalCount;
    },
  );

const makeIsSelectAll = () =>
  createSelector(
    selectCompetition,
    selectClassifierCompetitionSelect,
    (competitions, competitionSelect) => {
      if (!competitionSelect) return false;
      return Object.keys(competitions).length === competitionSelect.length;
    },
  );

const makeActive = () =>
  createSelector(
    [selectView, selectClassifierCompetitionSelect, selectSportId],
    (sportSelect, competitionSelect, id) => {
      if (id === sportSelect || competitionSelect) {
        return true;
      }
      return false;
    },
  );

export { makeSportCount, makeIsSelectAll, makeActive };

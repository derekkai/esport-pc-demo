import { connect } from 'react-redux';
import { setClassifierCompetitionSelect } from 'reducers/classifier';
import Component from './CompetitionItem';

const mapStateToProps = (state, props) => {
  const competitionSelect =
    state.classifier.competitionSelect[props.sportId] || [];
  return {
    hideCheckBox:
      state.classifier.sportSelect === props.sportId &&
      !state.classifier.competitionSelect[props.sportId],
    isSelect: competitionSelect.includes(props.competitionId),
  };
};

const mapDispatchToProps = dispatch => ({
  setClassifierCompetitionSelect: param =>
    dispatch(setClassifierCompetitionSelect(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

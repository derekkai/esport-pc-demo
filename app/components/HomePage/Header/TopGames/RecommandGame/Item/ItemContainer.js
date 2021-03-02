import { connect } from 'react-redux';
import { selectRecommandGameIndex } from 'reducers/recommandGame';
import Component from './Item';

const mapStateToProps = (state, props) => {
  const gameInfo = state.recommandGame.entity[props.gameId];
  const sportId = gameInfo.sport.id;
  return {
    team1Name: gameInfo.team1_name,
    team2Name: gameInfo.team2_name,
    startTs: gameInfo.start_ts,
    sportId,
    activeGameIndex: state.recommandGame.activeGameIndex,
  };
};

const mapDispatchToProps = dispatch => ({
  selectRecommandGameIndex: param => dispatch(selectRecommandGameIndex(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

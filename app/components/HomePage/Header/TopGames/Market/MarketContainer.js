import { connect } from 'react-redux';
import Component from './Market';

const mapStateToProps = (state, props) => {
  const gameInfo = state.recommandGame.entity[props.gameId];
  return {
    team1Name: gameInfo.team1_name,
    team2Name: gameInfo.team2_name,
    team1Id: gameInfo.team1_id,
    team2Id: gameInfo.team2_id,
    gameId: gameInfo.id,
    sportId: gameInfo.sport.id,
    market: state.recommandGame.entity[props.gameId].market,
  };
};

export default connect(mapStateToProps)(Component);

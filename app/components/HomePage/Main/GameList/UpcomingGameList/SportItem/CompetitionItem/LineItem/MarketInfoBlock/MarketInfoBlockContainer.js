import { connect } from 'react-redux';
import { addBet } from 'reducers/betslip';
import Component from './MarketInfoBlock';

const mapStateToProps = (state, props) => {
  const gameInfo = state.upcomingGame.entity[props.gameId];
  return {
    market: gameInfo?.market,
    sportId: gameInfo?.sport?.id,
    team1Name: gameInfo?.team1_name,
    team2Name: gameInfo?.team2_name,
    gameId: gameInfo?.id,
  };
};

const mapDispathToProps = dispatch => ({
  addBet: param => dispatch(addBet(param)),
});

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(Component);

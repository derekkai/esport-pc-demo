import { connect } from 'react-redux';
import { addBet } from 'reducers/betslip';
import Component from './LineItem';

const mapStateToProps = (state, props) => {
  const gameInfo = state.upcomingGame.entity[props.gameId];
  try {
    return {
      haveVideo: state.live.keys.includes(props.gameId),
      sportId: gameInfo?.sport?.id,
      gameId: gameInfo?.id,
      marketsCount: gameInfo?.markets_count,
    };
  } catch (e) {
    console.error(e);
    console.error(props.gameId);
    return null;
  }
};

const mapDispathToProps = dispatch => ({
  addBet: param => dispatch(addBet(param)),
});

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(Component);

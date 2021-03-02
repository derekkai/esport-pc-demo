import { connect } from 'react-redux';
import { addBet } from 'reducers/betslip';
import Component from './SquareItem';
import { makeMarket } from './selectors';

const makeMapStateToProps = () => {
  console.log('test');
  const getMarket = makeMarket();
  const mapStateToProps = (state, props) => {
    try {
      const gameInfo = state.upcomingGame.entity[props.gameId];
      return {
        haveVideo: state.live.keys.includes(props.gameId),
        market: getMarket(state, props),
        competitionName: gameInfo?.competitionName,
        sportId: gameInfo?.sport.id,
        team1Name: gameInfo?.team1_name,
        team2Name: gameInfo?.team2_name,
        team1Id: gameInfo?.team1_id,
        team2Id: gameInfo?.team2_id,
        team1Score: gameInfo?.stats?.team1_value || 0,
        team2Score: gameInfo?.stats?.team2_value || 0,
        type: gameInfo?.type,
        startTs: gameInfo?.start_ts,
        gameId: gameInfo?.id,
        marketsCount: gameInfo?.markets_count,
      };
    } catch (e) {
      console.error(e);
      console.error(props.gameId);
      return {};
    }
  };
  return mapStateToProps;
};

const mapDispathToProps = dispatch => ({
  addBet: param => dispatch(addBet(param)),
});

export default connect(
  makeMapStateToProps,
  mapDispathToProps,
)(Component);

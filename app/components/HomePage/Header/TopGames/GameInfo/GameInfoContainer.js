import { connect } from 'react-redux';
import Component from './GameInfo';
import { makeMarket } from './selectors';

const mapStateToProps = (state, props) => {
  const market = makeMarket(state, props);
  const gameInfo = state.recommandGame.entity[props.gameId];
  return {
    haveVideo: state.live.keys.includes(props.gameId),
    market,
    team1Name: gameInfo.team1_name,
    team2Name: gameInfo.team2_name,
    team1Id: gameInfo.team1_id,
    team2Id: gameInfo.team2_id,
    sportId: gameInfo.sport.id,
    competitionName: gameInfo.competitionName,
    startTs: gameInfo.start_ts,
    gameId: gameInfo.id,
    team1Score: gameInfo.stats?.team1_value || 0,
    team2Score: gameInfo.stats?.team2_value || 0,
    type: gameInfo.type,
    marketsCount: gameInfo.markets_count,
  };
};

export default connect(mapStateToProps)(Component);

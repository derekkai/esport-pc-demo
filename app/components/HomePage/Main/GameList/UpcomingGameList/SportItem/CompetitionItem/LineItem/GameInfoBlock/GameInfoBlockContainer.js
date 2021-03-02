import { connect } from 'react-redux';
import Component from './GameInfoBlock';

const mapStateToProps = (state, props) => {
  const gameInfo = state.upcomingGame.entity[props.gameId];
  const isMarketResult = Boolean(
    Object.values(gameInfo?.market || {}).find(
      market => market?.market_type === 'MatchResult',
    ),
  );

  try {
    return {
      haveVideo: state.live.keys.includes(props.gameId),
      isMarketResult,
      team1Name: gameInfo?.team1_name,
      team2Name: gameInfo?.team2_name,
      team1Id: gameInfo?.team1_id,
      team2Id: gameInfo?.team2_id,
      type: gameInfo?.type,
      startTs: gameInfo?.start_ts,
      team1Score: gameInfo?.stats?.team1_value || 0,
      team2Score: gameInfo?.stats?.team2_value || 0,
    };
  } catch (e) {
    console.error(e);
    console.error(props.gameId);
    return {};
  }
};

export default connect(mapStateToProps)(Component);

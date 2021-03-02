import { connect } from 'react-redux';
import Component from './Item';

const mapStateToProps = (state, props) => {
  const gameInfo = state.resultGame.entity[props.gameId];
  return {
    sportId: gameInfo?.sport.id,
    competitionName: gameInfo?.competitionName,
    startTs: gameInfo?.start_ts,
    team1Score: gameInfo?.stats?.team1_value || 0,
    team2Score: gameInfo?.stats?.team2_value || 0,
    team1Name: gameInfo?.team1_name,
    team2Name: gameInfo?.team2_name,
    team1Id: gameInfo?.team1_id,
    team2Id: gameInfo?.team2_id,
    gameId: gameInfo?.id,
    isChampion: !gameInfo?.team2_id,
    matchStatus: gameInfo?.MatchStatus,
  };
};

export default connect(mapStateToProps)(Component);

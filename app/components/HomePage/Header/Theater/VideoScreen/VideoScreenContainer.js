import { connect } from 'react-redux';
import { switchTheater } from 'reducers/live';
import Component from './VideoScreen';

const mapStateToProps = state => {
  const gameInfo = state.live.entity[state.live.currentSelectGameId];
  return {
    competitionName: gameInfo?.competitionName,
    gameId: gameInfo?.id,
    videoUrl: gameInfo?.video_url,
    team1Id: gameInfo?.team1_id,
    team2Id: gameInfo?.team2_id,
    team1Name: gameInfo?.team1_name,
    team2Name: gameInfo?.team2_name,
    sportId: gameInfo?.sport.id,
    marketsCount: gameInfo?.markets_count,
  };
};

const mapDispatchToProps = dispatch => ({
  switchTheater: param => dispatch(switchTheater(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

import { connect } from 'react-redux';
import Component from './Item';

const mapStateToProps = (state, props) => {
  try {
    const gameInfo = state.championGame.entity[props.gameId];
    return {
      gameId: gameInfo?.id,
      competitionName: gameInfo?.team1_name,
      // competitionIcon: gameInfo?.team1_id,
      sportId: gameInfo?.sport.id,
      event: gameInfo?.event,
      markets: gameInfo?.market,
      startTs: gameInfo?.start_ts,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default connect(mapStateToProps)(Component);

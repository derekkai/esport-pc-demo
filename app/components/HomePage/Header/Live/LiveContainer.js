import { connect } from 'react-redux';
import { switchLive } from 'reducers/live';
import Component from './Live';

const mapStateToProps = state => ({
  in: state.live.isLiveOpen,
  gameId: state.live.currentSelectGameId,
  src:
    state.live.currentSelectGameId === 0
      ? state.live.globalDonateVideoUrl
      : state.live.gameDonateVideoUrl,
});

const mapDispatchToProps = dispatch => ({
  switchLive: param => dispatch(switchLive(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

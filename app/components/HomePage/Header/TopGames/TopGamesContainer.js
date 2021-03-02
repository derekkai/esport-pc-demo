import { connect } from 'react-redux';
import { switchLive } from 'reducers/live';
import Component from './TopGames';

const mapStateToProps = state => ({
  loading: !state.global.loadDown.recommand,
  keys: state.recommandGame.keys,
  activeGameIndex: state.recommandGame.activeGameIndex,
  isGlobalDonateVideoAvailable: Boolean(state.live.globalDonateVideoUrl),
});

const mapDispatchToProps = dispatch => ({
  switchLive: param => dispatch(switchLive(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

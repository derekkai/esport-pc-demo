import { connect } from 'react-redux';
import { requestMarketGameInfo } from 'reducers/global';
import Component from './Header';

const mapStateToProps = state => {
  const recommandGameId =
    state.recommandGame.keys[state.recommandGame.activeGameIndex];
  const recommandSportId =
    state.recommandGame.entity[recommandGameId]?.sport?.id || 0;
  return {
    recommandSportId,
    marketSportId: state.global.marketGameInfo.sport.id,
    mainDataType: state.global.mainDataType,
    isTheaterOpen: state.live.isTheaterOpen,
    isLiveOpen: state.live.isLiveOpen,
  };
};

const mapDispatchToProps = dispatch => ({
  requestMarketGameInfo: () => dispatch(requestMarketGameInfo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

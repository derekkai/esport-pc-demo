import { connect } from 'react-redux';
import {
  clearUpcomingGameData,
  requestUpcomingGameData,
  setUpcomingGameDisplayMode,
  setUpcomingGameUIState,
  setUpcomingFilterGameType,
} from 'reducers/upcomingGame';
import { clearLoadDownStatus } from 'reducers/global';
import { makeFilterKeys } from './selectors';
import Component from './UpcomingGameList';

const mapStateToProps = state => {
  const { isDisplayLive, isDisplayPreMatch } = state.upcomingGame;
  return {
    isDisplayLive,
    isDisplayPreMatch,
    keys: makeFilterKeys(state),
    loading: state.global.loading.upcomingGame,
    prevScrollTop: state.upcomingGame.prevUIState.scrollTop,
    displayItemCount: state.upcomingGame.prevUIState.displayItemCount,
    displayMode: state.upcomingGame.displayMode,
  };
};

const mapDispatchToProps = dispatch => ({
  setUpcomingFilterGameType: param =>
    dispatch(setUpcomingFilterGameType(param)),
  clearLoadDownStatus: param => dispatch(clearLoadDownStatus(param)),
  clearUpcomingGameData: () => dispatch(clearUpcomingGameData()),
  requestUpcomingGameData: () => dispatch(requestUpcomingGameData()),
  setUpcomingGameUIState: param => dispatch(setUpcomingGameUIState(param)),
  setUpcomingGameDisplayMode: param =>
    dispatch(setUpcomingGameDisplayMode(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

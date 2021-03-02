import { connect } from 'react-redux';
import {
  clearChampionGameData,
  requestChampionGameData,
} from 'reducers/championGame';
import { clearLoadDownStatus } from 'reducers/global';
import Component from './ChampionGameList';

const mapStateToProps = state => ({
  keys: state.championGame.keys,
  loading: state.global.loading.championGame,
});

const mapDispatchToProps = dispatch => ({
  clearLoadDownStatus: param => dispatch(clearLoadDownStatus(param)),
  clearChampionGameData: () => dispatch(clearChampionGameData()),
  requestChampionGameData: () => dispatch(requestChampionGameData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

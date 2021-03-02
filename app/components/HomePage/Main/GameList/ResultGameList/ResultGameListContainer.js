import { connect } from 'react-redux';
import {
  setResultGameDateRange,
  clearResultGameData,
  requestResultGameData,
} from 'reducers/resultGame';
import { clearLoadDownStatus } from 'reducers/global';
import Component from './ResultGameList';

const mapStateToProps = state => ({
  keys: state.resultGame.keys,
  resultDateRange: state.resultGame.dateRangeDays,
  loading: state.global.loading.resultGame,
});

const mapDispatchToProps = dispatch => ({
  clearLoadDownStatus: param => dispatch(clearLoadDownStatus(param)),
  requestResultGameData: () => dispatch(requestResultGameData()),
  setResultGameDateRange: param => dispatch(setResultGameDateRange(param)),
  clearResultGameData: () => dispatch(clearResultGameData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

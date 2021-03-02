import { connect } from 'react-redux';
import {
  requestBetHistory,
  setBetHistoryDateRange,
  resetBetHistoryDateRange,
  setBetHistoryFilterBetType,
} from 'reducers/betHistory';
import { closeModal } from 'reducers/global';
import Component from './BetHistory';
import { makeFilterEntity } from './selectors';

const mapStateToProps = state => ({
  dateRangeDays: state.betHistory.dateRangeDays,
  entity: makeFilterEntity(state),
  filterBetType: state.betHistory.filterBetType,
  loading: state.global.loading.betHistory,
  in: state.global.modal === 'betHistory',
});

/*eslint-disable prettier/prettier*/
const mapDispatchToProps = dispatch => ({
  setBetHistoryFilterBetType: param => dispatch(setBetHistoryFilterBetType(param)),
  resetBetHistoryDateRange: () => dispatch(resetBetHistoryDateRange()),
  requestBetHistory: param => dispatch(requestBetHistory(param)),
  setBetHistoryDateRange: param => dispatch(setBetHistoryDateRange(param)),
  close: param => dispatch(closeModal(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

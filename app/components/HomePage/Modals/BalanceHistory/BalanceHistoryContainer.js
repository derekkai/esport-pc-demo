import { connect } from 'react-redux';
import {
  requestBalanceHistory,
  setBalanceHistoryDateRange,
  resetBalanceHistoryDateRange,
} from 'reducers/balanceHistory';
import { closeModal } from 'reducers/global';
import Component from './BalanceHistory';

const mapStateToProps = state => ({
  dateRangeDays: state.balanceHistory.dateRangeDays,
  keys: state.balanceHistory.keys,
  loading: state.global.loading.balanceHistory,
  in: state.global.modal === 'balanceHistory',
});

/*eslint-disable prettier/prettier*/
const mapDispatchToProps = dispatch => ({
  resetBalanceHistoryDateRange: () => dispatch(resetBalanceHistoryDateRange()),
  setBalanceHistoryDateRange: param => dispatch(setBalanceHistoryDateRange(param)),
  requestBalanceHistory: () => dispatch(requestBalanceHistory()),
  close: param => dispatch(closeModal(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

import { connect } from 'react-redux';
import {
  setBetType,
  clearBetslipData,
  removeBetsKey,
  requestUpdateBetEventData,
} from 'reducers/betslip';
import { switchCalculator } from 'reducers/global';
import Component from './Betslip';

const mapStateToProps = state => ({
  betType: state.betslip.betType,
  keys: state.betslip.keys,
  betCount: Object.keys(state.betslip.entity).length,
  showResult: state.betslip.showResult,
  isWaitingResponse: state.betslip.isWaitingResponse,
  isSuccess: state.betslip.isSuccess,
  failCode: state.betslip.failCode,
  isCalculatorOpen: state.global.isCalculatorOpen,
});

const mapDispatchToProps = dispatch => ({
  switchCalculator: () => dispatch(switchCalculator()),
  removeBetsKey: param => dispatch(removeBetsKey(param)),
  clearBetslipData: () => dispatch(clearBetslipData()),
  setBetType: param => dispatch(setBetType(param)),
  requestUpdateBetEventData: () => dispatch(requestUpdateBetEventData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

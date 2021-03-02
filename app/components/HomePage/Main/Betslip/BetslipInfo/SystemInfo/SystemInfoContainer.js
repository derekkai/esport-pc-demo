import { connect } from 'react-redux';
import { updateStake, setSystemBetCount } from 'reducers/betslip';
import Component from './SystemInfo';
import { makeInfo } from './selectors';

const mapStateToProps = state => ({
  stake: state.betslip.stake,
  ...makeInfo(state),
});

const mapDispatchToProps = dispatch => ({
  setSystemBetCount: param => dispatch(setSystemBetCount(param)),
  updateStake: param => dispatch(updateStake(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

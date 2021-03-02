import { connect } from 'react-redux';
import {
  removeBet,
  updateSingleStake,
  setPriceNeverChange,
} from 'reducers/betslip';
import Component from './BetCard';

const mapStateToProps = (state, props) => ({
  ...state.betslip.entity[props.eventId],
  betType: state.betslip.betType,
});

const mapDispatchToProps = dispatch => ({
  removeBet: param => dispatch(removeBet(param)),
  updateSingleStake: param => dispatch(updateSingleStake(param)),
  setPriceNeverChange: param => dispatch(setPriceNeverChange(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

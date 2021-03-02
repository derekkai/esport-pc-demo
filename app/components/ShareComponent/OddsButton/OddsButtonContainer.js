import { connect } from 'react-redux';
import { removeBet, requestAddBet } from 'reducers/betslip';
import Component from './OddsButton';

const mapStateToProps = (state, props) => ({
  isInBetslip: state.betslip.keys.includes(props.eventId),
});

const mapDispathToProps = dispatch => ({
  requestAddBet: param => dispatch(requestAddBet(param)),
  removeBet: param => dispatch(removeBet(param)),
});

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(Component);

import { connect } from 'react-redux';
import { requestDoBet } from 'reducers/betslip';
import Component from './BetslipInfo';

const mapStateToProps = state => {
  return {
    betCount: state.betslip.keys.length,
    betType: state.betslip.betType,
    priceChangeHandleType: state.betslip.priceChangeHandleType,
    priceNeverChange: state.betslip.priceNeverChange,
  };
};

const mapDispatchToProps = dispatch => ({
  requestDoBet: () => dispatch(requestDoBet()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

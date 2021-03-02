import { connect } from 'react-redux';
import { setOddsFormat, setPriceChangeHandleType } from 'reducers/betslip';
import Component from './Setting';

const mapStateToProps = state => ({
  oddsFormat: state.betslip.oddsFormat,
  priceChangeHandleType: state.betslip.priceChangeHandleType,
});

const mapDispatchToProps = dispatch => ({
  setPriceChangeHandleType: param => dispatch(setPriceChangeHandleType(param)),
  setOddsFormat: param => dispatch(setOddsFormat(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

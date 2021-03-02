import { connect } from 'react-redux';
import { setSystemNum } from 'reducers/betslip';
import Component from './SystemNumBar';
import { makeItems } from './selectors';

const mapStateToProps = state => ({
  items: makeItems(state),
  systemNum: state.betslip.systemNum,
});

const mapDispatchToProps = dispatch => ({
  setSystemNum: param => dispatch(setSystemNum(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

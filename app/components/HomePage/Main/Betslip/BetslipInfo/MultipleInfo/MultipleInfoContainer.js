import { connect } from 'react-redux';
import { updateStake } from 'reducers/betslip';
import Component from './MultipleInfo';
import { makePrice } from './selectors';

const mapStateToProps = state => ({
  price: makePrice(state),
  stake: state.betslip.stake,
});

const mapDispatchToProps = dispatch => ({
  updateStake: param => dispatch(updateStake(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

import { connect } from 'react-redux';
import { removeBetEntity } from 'reducers/betslip';
import Component from './BetList';

const mapStateToProps = state => ({
  keys: state.betslip.keys,
});

const mapDispatchToProps = dispatch => ({
  removeBetEntity: param => dispatch(removeBetEntity(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

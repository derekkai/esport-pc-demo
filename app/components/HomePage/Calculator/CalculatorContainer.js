import { connect } from 'react-redux';
import { switchCalculator } from 'reducers/global';
import Component from './Calculator';

const mapStateToProps = state => ({
  in: state.global.isCalculatorOpen,
});

const mapDispatchToProps = dispatch => ({
  switchCalculator: () => dispatch(switchCalculator()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

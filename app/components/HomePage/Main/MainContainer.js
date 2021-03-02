import { connect } from 'react-redux';
import { switchClassifier } from 'reducers/classifier';
import Component from './Main';

const mapStateToProps = state => ({
  moveOut: state.classifier.moveOut,
});

const mapDispatchToProps = dispatch => ({
  switchClassifier: param => dispatch(switchClassifier(param)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

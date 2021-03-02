import { connect } from 'react-redux';
import { requestClassifierData } from 'reducers/classifier';
import Component from './Classifier';

const mapStateToProps = state => ({
  data: state.classifier.entity,
  gameListType: state.global.gameListType,
  isLoading: state.global.loading.classifier,
});

const mapDispatchToProps = dispatch => ({
  requestClassifierData: () => dispatch(requestClassifierData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

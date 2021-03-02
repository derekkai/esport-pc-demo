import { connect } from 'react-redux';
import { setMainDataType, setGameListType } from 'reducers/global';
import Component from './HomePage';

const mapStateToProps = state => ({
  mainDataType: state.global.mainDataType,
  gameListType: state.global.gameListType,
  loading: state.global.loading.initalApp,
});

const mapDispatchToProps = dispatch => ({
  setGameListType: param => dispatch(setGameListType(param)),
  setMainDataType: param => dispatch(setMainDataType(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

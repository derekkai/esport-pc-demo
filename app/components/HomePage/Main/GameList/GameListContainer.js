import { connect } from 'react-redux';
import { resetClassifierSelection } from 'reducers/classifier';
import Component from './GameList';

const mapStateToProps = state => ({
  gameListType: state.global.gameListType,
});

const mapDispatchToProps = dispatch => ({
  resetClassifierSelection: () => dispatch(resetClassifierSelection()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

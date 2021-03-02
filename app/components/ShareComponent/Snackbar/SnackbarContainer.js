import { connect } from 'react-redux';
import { setAlert } from 'reducers/global';
import Component from './Snackbar';

const mapDispatchToProps = dispatch => ({
  setAlert: param => dispatch(setAlert(param)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);

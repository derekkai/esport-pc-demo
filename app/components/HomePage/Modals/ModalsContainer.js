import { connect } from 'react-redux';
import Component from './Modals';

const mapStateToProps = state => ({
  modal: state.global.modal,
  offline: state.global.offline,
});

export default connect(mapStateToProps)(Component);

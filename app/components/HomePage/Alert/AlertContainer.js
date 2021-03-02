import { connect } from 'react-redux';
import Component from './Alert';

const mapStateToProps = state => ({
  alerts: state.global.alerts,
});

export default connect(mapStateToProps)(Component);

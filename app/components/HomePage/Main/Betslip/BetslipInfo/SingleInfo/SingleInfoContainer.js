import { connect } from 'react-redux';
import Component from './SingleInfo';
import { makeInfo } from './selectors';

const mapStateToProps = state => ({
  ...makeInfo(state),
});

export default connect(mapStateToProps)(Component);

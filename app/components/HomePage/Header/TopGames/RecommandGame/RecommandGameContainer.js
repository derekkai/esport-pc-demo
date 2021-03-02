import { connect } from 'react-redux';
import Component from './RecommandGame';

const mapStateToProps = state => ({
  keys: state.recommandGame.keys,
});

export default connect(mapStateToProps)(Component);

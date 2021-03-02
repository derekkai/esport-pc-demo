import { connect } from 'react-redux';
import Component from './Theater';

const mapStateToProps = state => {
  return {
    currentSelectGameId: state.live.currentSelectGameId,
    in: state.live.isTheaterOpen,
    sportId: state.live.entity[state.live.currentSelectGameId]?.sport?.id,
  };
};

export default connect(mapStateToProps)(Component);

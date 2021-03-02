import { connect } from 'react-redux';
import Component from './CompetitionItem';

const mapStateToProps = state => ({
  displayMode: state.upcomingGame.displayMode,
});

export default connect(mapStateToProps)(Component);

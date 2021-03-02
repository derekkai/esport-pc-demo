import { connect } from 'react-redux';
import { openModal } from 'reducers/global';
import Component from './News';

const mapStateToProps = state => ({
  entity: state.news.entity,
});

const mapDispatchToProps = dispatch => ({
  openModal: param => dispatch(openModal(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

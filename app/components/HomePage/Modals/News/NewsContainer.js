import { connect } from 'react-redux';
import { requestNewsData } from 'actions/news';
import { closeModal } from 'reducers/global';
import Component from './News';

const mapStateToProps = state => ({
  entity: state.news.entity,
  in: state.global.modal === 'news',
});

const mapDispatchToProps = dispatch => ({
  requestNewsData: () => dispatch(requestNewsData()),
  close: param => dispatch(closeModal(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

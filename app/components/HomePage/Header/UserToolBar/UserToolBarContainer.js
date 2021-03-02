import { connect } from 'react-redux';
import { switchClassifier } from 'reducers/classifier';
import { openModal } from 'reducers/global';
import { requestUserInfo } from 'reducers/account';
import Component from './UserToolBar';

const mapStateToProps = state => ({
  isLogin: state.account.isLogin,
  account: state.account.account,
  balance: state.account.balance,
});

const mapDispatchToProps = dispatch => ({
  requestUserInfo: () => dispatch(requestUserInfo()),
  openModal: param => dispatch(openModal(param)),
  switchClassifier: param => dispatch(switchClassifier(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

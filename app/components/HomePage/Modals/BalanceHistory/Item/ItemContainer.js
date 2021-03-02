import { connect } from 'react-redux';
import Component from './Item';

const mapStateToProps = (state, props) => {
  const { count, total, balance, data } = state.balanceHistory.entity[
    props.date
  ];
  return {
    count,
    total,
    balance,
    data,
  };
};

export default connect(mapStateToProps)(Component);

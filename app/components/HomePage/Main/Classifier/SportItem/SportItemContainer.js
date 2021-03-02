import { connect } from 'react-redux';
import {
  setClassifierSportSelect,
  selectAllCompetition,
  clearAllCompetition,
} from 'reducers/classifier';
import Component from './SportItem';
import { makeSportCount, makeIsSelectAll, makeActive } from './selectors';

const makeMapStateToProps = () => {
  const getSportCount = makeSportCount();
  const getIsSelectAll = makeIsSelectAll();
  const getActive = makeActive();
  const mapStateToProps = (state, props) => {
    return {
      sportCount: getSportCount(state, props),
      isSelectAll: getIsSelectAll(state, props),
      active: getActive(state, props),
      mainDataType: state.global.mainDataType,
      gameListType: state.global.gameListType,
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  setClassifierSportSelect: param => dispatch(setClassifierSportSelect(param)),
  selectAllCompetition: param => dispatch(selectAllCompetition(param)),
  clearAllCompetition: param => dispatch(clearAllCompetition(param)),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(Component);

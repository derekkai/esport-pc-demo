import { connect } from 'react-redux';
import {
  requestMarketListData,
  setMarketGameInfoGameId,
} from 'reducers/global';
import { clearResultMarketData } from 'reducers/resultMarket';
import { clearUpcomingMarketData } from 'reducers/upcomingMarket';
import Component from './MarketList';
import { makeTabs } from './selectors';

const mapStateToProps = state => {
  const { gameListType } = state.global;
  let data;
  let groups;
  switch (gameListType) {
    case 'upcoming':
      data = state.upcomingMarket.entity;
      groups = state.upcomingMarket.keys;
      break;
    case 'result':
      data = state.resultMarket.entity;
      groups = state.resultMarket.keys;
      break;
    default:
      data = {};
      break;
  }
  return {
    sportId: state.global.marketGameInfo.sport.id,
    groups,
    data,
    tabs: makeTabs(state),
    gameId: state.global.marketGameInfo.id,
    team1Name: state.global.marketGameInfo.team1_name,
    team2Name: state.global.marketGameInfo.team2_name,
    loading: !state.global.loadDown.market,
  };
};

const mapDispatchToProps = dispatch => ({
  clearUpcomingMarketData: () => dispatch(clearUpcomingMarketData()),
  clearResultMarketData: () => dispatch(clearResultMarketData()),
  setMarketGameInfoGameId: param => dispatch(setMarketGameInfoGameId(param)),
  requestMarketListData: () => dispatch(requestMarketListData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

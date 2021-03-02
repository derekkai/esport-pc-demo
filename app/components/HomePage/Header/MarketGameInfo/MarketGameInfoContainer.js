import { connect } from 'react-redux';
import { colorLog } from 'helpers/common';
import history from 'utils/history';
import { clearMarketGameInfo } from 'reducers/global';
import Component from './MarketGameInfo';

const mapStateToProps = state => {
  try {
    const { marketGameInfo } = state.global;
    if (state.global.marketPageError) {
      const { pathname } = state.router.location;
      if (pathname.includes('market')) {
        colorLog('Push to root', 'warn');
        if (pathname.includes('result')) {
          history.replace({ pathname: '/result' });
        } else {
          history.push('');
        }
      }
    }
    return {
      team1Name: marketGameInfo.team1_name,
      team2Name: marketGameInfo.team2_name,
      team1Id: marketGameInfo.team1_id,
      team2Id: marketGameInfo.team2_id,
      team1Score: marketGameInfo.stats?.team1_value || 0,
      team2Score: marketGameInfo.stats?.team2_value || 0,
      isClosed: marketGameInfo.is_closed,
      gameId: marketGameInfo.id,
      type: marketGameInfo.type,
      haveVideo: state.live.keys.includes(marketGameInfo.id),
      startTs: marketGameInfo.start_ts,
      competitionName: marketGameInfo.competitionName,
      isLoading: !state.global.loadDown.marketGameInfo,
      sportId: marketGameInfo.sport.id,
      isChampion: !marketGameInfo.team2_id,
      gameListType: state.global.gameListType,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};

const mapDispatchToProps = dispatch => ({
  clearMarketGameInfo: () => dispatch(clearMarketGameInfo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

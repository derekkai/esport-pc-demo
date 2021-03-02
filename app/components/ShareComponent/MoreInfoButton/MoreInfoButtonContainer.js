import { connect } from 'react-redux';
import {
  switchTheater,
  switchLive,
  requestDonateVideoUrl,
} from 'reducers/live';
import { setMarketGameInfoSportId } from 'reducers/global';
import Component from './MoreInfoButton';

const mapStateToProp = (state, props) => ({
  haveDonateVideo: state.live.entity[props.gameId]?.donate_video,
});

const mapDispatchToProps = dispatch => ({
  requestDonateVideoUrl: param => dispatch(requestDonateVideoUrl(param)),
  switchLive: param => dispatch(switchLive(param)),
  switchTheater: param => dispatch(switchTheater(param)),
  setMarketGameInfoSportId: param => dispatch(setMarketGameInfoSportId(param)),
});

export default connect(
  mapStateToProp,
  mapDispatchToProps,
)(Component);

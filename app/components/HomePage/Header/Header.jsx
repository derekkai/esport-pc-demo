import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Switch, Route } from 'react-router-dom';
import LiveContainer from './Live/LiveContainer';
import MarketGameInfoContainer from './MarketGameInfo/MarketGameInfoContainer';
import TopGamesContainer from './TopGames/TopGamesContainer';
import TheaterContainer from './Theater/TheaterContainer';
import style from './Header.scss';
import UserToolBarContainer from './UserToolBar/UserToolBarContainer';

const images = require.context('../../../images/backgrounds', true);

const Header = ({
  recommandSportId,
  mainDataType,
  requestMarketGameInfo,
  isTheaterOpen,
  isLiveOpen,
  marketSportId,
}) => {
  useEffect(() => {
    if (mainDataType === 'market') {
      requestMarketGameInfo();
    }
  }, [mainDataType]);
  let img_src;
  if (mainDataType === 'game') {
    try {
      img_src = images(`./img_bg_${recommandSportId}.jpg`);
    } catch (e) {
      img_src = images(`./img_bg_0.jpg`);
    }
  } else {
    try {
      img_src = images(`./img_bg_${marketSportId}.jpg`);
    } catch (e) {
      if (marketSportId && marketSportId !== 0) {
        img_src = images(`./img_bg_0.jpg`);
      }
    }
  }

  return (
    <div className={style.container}>
      <UserToolBarContainer />
      <TheaterContainer />
      <LiveContainer />
      <div
        className={classNames(
          style.block,
          isTheaterOpen || isLiveOpen ? style.collapse : style[mainDataType],
        )}
      >
        <div
          className={mainDataType === 'game' ? style.mainBg : style.marketBg}
          style={{ backgroundImage: `url(${img_src})` }}
        />
        <Switch>
          <Route path="/:type/market/:id" component={MarketGameInfoContainer} />
          <Route path="" component={TopGamesContainer} />
        </Switch>
      </div>
    </div>
  );
};

Header.propTypes = {
  recommandSportId: PropTypes.number.isRequired,
  mainDataType: PropTypes.string.isRequired,
  requestMarketGameInfo: PropTypes.func.isRequired,
  isTheaterOpen: PropTypes.bool.isRequired,
  isLiveOpen: PropTypes.bool.isRequired,
  marketSportId: PropTypes.number.isRequired,
};

export default Header;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withResizeDetector } from 'react-resize-detector';
import { Switch, Route } from 'react-router-dom';
import style from './Main.scss';
import ClassifierContainer from './Classifier/ClassifierContainer';
import GameListContainer from './GameList/GameListContainer';
import MarketListContainer from './MarketList/MarketListContainer';
import BetslipContainer from './Betslip/BetslipContainer';

const Main = ({ width, moveOut, switchClassifier }) => {
  const handleMaskClick = () => {
    switchClassifier({
      moveOut: false,
    });
  };

  useEffect(() => {
    if (width >= 1366) {
      switchClassifier({
        moveOut: false,
      });
    }
  }, [width]);

  return (
    <div className={style.container}>
      <div className={classNames(style.leftBlock, moveOut && style.moveOut)}>
        <ClassifierContainer />
      </div>
      {moveOut && (
        <div aria-hidden className={style.mask} onClick={handleMaskClick} />
      )}
      <div className={style.rightBlock}>
        <Switch>
          <Route path="/:type/market/:id" component={MarketListContainer} />
          <Route path="" component={GameListContainer} />
        </Switch>
        <BetslipContainer />
      </div>
    </div>
  );
};

Main.propTypes = {
  width: PropTypes.number,
  moveOut: PropTypes.bool.isRequired,
  switchClassifier: PropTypes.func.isRequired,
};

export default withResizeDetector(Main);

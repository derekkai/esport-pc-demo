import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import NavBar from 'components/ShareComponent/NavBar/NavBar';
import settings from 'settings';
import UpcomingGameListContainer from './UpcomingGameList/UpcomingGameListContainer';
import ChampionGameListContainer from './ChampionGameList/ChampionGameListContainer';
import ResultGameList from './ResultGameList/ResultGameListContainer';
import style from './GameList.scss';

const GameList = ({ gameListType, resetClassifierSelection }) => {
  const handleGameTypeNavClick = () => {
    resetClassifierSelection();
  };

  return (
    <div className={style.container}>
      <div className={style.toolbar}>
        <NavBar
          className={style.navbar}
          data={settings.gameListTabs}
          value={gameListType}
          isButtonNav={false}
          onChange={handleGameTypeNavClick}
        />
      </div>
      <div className={style.content}>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <UpcomingGameListContainer {...props} />}
          />
          <Route
            path="/champion"
            render={props => <ChampionGameListContainer {...props} />}
          />
          <Route
            path="/result"
            render={props => <ResultGameList {...props} />}
          />
        </Switch>
      </div>
    </div>
  );
};

GameList.propTypes = {
  gameListType: PropTypes.string.isRequired,
  resetClassifierSelection: PropTypes.func.isRequired,
};

export default GameList;

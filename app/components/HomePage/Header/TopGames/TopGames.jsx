import React from 'react';
import PropTypes from 'prop-types';
import HeaderFlag from 'components/ShareComponent/HeaderFlag/HeaderFlag';
import { CSSTransition } from 'react-transition-group';
import GameInfo from './GameInfo/GameInfoContainer';
import Market from './Market/MarketContainer';
import style from './TopGames.scss';
import RecommandGameContainer from './RecommandGame/RecommandGameContainer';

const TopGames = ({
  loading,
  keys,
  activeGameIndex,
  switchLive,
  isGlobalDonateVideoAvailable,
}) => {
  const handleTopLiveClick = () => {
    switchLive({ gameId: 0, value: true });
  };
  return (
    <div className={style.container}>
      <RecommandGameContainer />
      <div className={style.rightBlock}>
        <div className={style.titleBlock}>
          <HeaderFlag className={style.flag} text="Top games" isTag />
          {isGlobalDonateVideoAvailable && (
            <HeaderFlag
              active
              className={style.flag}
              text="Top live"
              isButton
              onClick={handleTopLiveClick}
            />
          )}
        </div>
        {true && (
          <>
            {keys.map(
              (gameId, index) =>
                gameId && ( // TODO game server may have wrong here.
                  <CSSTransition
                    key={gameId}
                    timeout={300}
                    classNames="top-game"
                    in={activeGameIndex === index}
                    unmountOnExit
                  >
                    <div className={style.content}>
                      <GameInfo gameId={gameId} />
                      <Market gameId={gameId} />
                    </div>
                  </CSSTransition>
                ),
            )}
          </>
        )}
      </div>
    </div>
  );
};

TopGames.propTypes = {
  loading: PropTypes.bool.isRequired,
  keys: PropTypes.array.isRequired,
  activeGameIndex: PropTypes.number.isRequired,
  switchLive: PropTypes.func.isRequired,
  isGlobalDonateVideoAvailable: PropTypes.bool.isRequired,
};

export default TopGames;

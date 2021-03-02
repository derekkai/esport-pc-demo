import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EmptyIcon from 'components/ShareComponent/EmptyIcon/EmptyIcon';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { unsubscribeHandler } from 'sagas/websocket';
import Loading from 'components/ShareComponent/Loading/Loading';
import { Scrollbars } from 'react-custom-scrollbars';
import style from './ChampionGameList.scss';
import ItemContainer from './Item/ItemContainer';

const ChampionGameList = ({
  keys,
  requestChampionGameData,
  clearLoadDownStatus,
  clearChampionGameData,
  loading,
}) => {
  const [isEmpty, setIsEmpty] = useState(true);

  const handleSetItemIsAllEmpty = value => {
    setIsEmpty(value);
  };

  useEffect(() => {
    requestChampionGameData();
    return () => {
      unsubscribeHandler('championGame');
      clearChampionGameData();
      clearLoadDownStatus('championGame');
    };
  }, []);

  return (
    <div className={style.container}>
      {loading && <Loading className={style.loading} />}
      {!loading && isEmpty && <EmptyIcon type="game" />}
      <Scrollbars
        autoHide
        renderView={props => <div {...props} className={style.scrollView} />}
      >
        <TransitionGroup component="ul">
          {keys.map(gameId => (
            <CSSTransition
              timeout={{
                appear: 0,
                enter: 300,
                exit: 0,
              }}
              unmountOnExit
              classNames="GameList"
              key={gameId}
            >
              <ItemContainer
                key={gameId}
                gameId={gameId}
                handleSetItemIsAllEmpty={handleSetItemIsAllEmpty}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Scrollbars>
    </div>
  );
};

ChampionGameList.propTypes = {
  keys: PropTypes.array.isRequired,
  requestChampionGameData: PropTypes.func.isRequired,
  clearLoadDownStatus: PropTypes.func.isRequired,
  clearChampionGameData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ChampionGameList;

import React from 'react';
import PropTypes from 'prop-types';
import HeaderFlag from 'components/ShareComponent/HeaderFlag/HeaderFlag';
import ItemContainer from './Item/ItemContainer';
import style from './RecommandGame.scss';

const RecommandGame = ({ keys }) => {
  return (
    <div className={style.container}>
      <div className={style.titleBlock}>
        <HeaderFlag text="Recommend games" isTag />
      </div>
      <ul>
        {keys.map(
          (gameId, index) =>
            gameId && (
              <ItemContainer key={gameId} gameId={gameId} index={index} />
            ),
        )}
      </ul>
    </div>
  );
};

RecommandGame.propTypes = {
  keys: PropTypes.array.isRequired,
};

export default RecommandGame;

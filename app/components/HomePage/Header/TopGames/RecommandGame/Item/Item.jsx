import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { timeConvert } from 'helpers/common';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import style from './Item.scss';

const Item = ({
  gameId,
  team1Name,
  team2Name,
  startTs,
  sportId,
  selectRecommandGameIndex,
  activeGameIndex,
  index,
}) => {
  const { year, hours, day, minute, month } = timeConvert(startTs);
  const date = `${year}.${month}.${day} ${hours}:${minute}`;

  const handleItemClick = () => {
    selectRecommandGameIndex(index);
  };

  return (
    <li
      aria-hidden
      className={classNames(
        style.container,
        activeGameIndex === index && style.active,
      )}
      onClick={handleItemClick}
      id={gameId}
    >
      <div>
        <SportIcon
          className={style.sportIcon}
          sportId={sportId}
          type="light_blue"
        />
      </div>
      <div className={style.content}>
        <div className={style.gameName}>{`${team1Name} vs ${team2Name}`}</div>
        <div className={style.date}>{date}</div>
      </div>
    </li>
  );
};

Item.propTypes = {
  gameId: PropTypes.number.isRequired,
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string.isRequired,
  startTs: PropTypes.number.isRequired,
  sportId: PropTypes.number.isRequired,
  selectRecommandGameIndex: PropTypes.func.isRequired,
  activeGameIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default Item;

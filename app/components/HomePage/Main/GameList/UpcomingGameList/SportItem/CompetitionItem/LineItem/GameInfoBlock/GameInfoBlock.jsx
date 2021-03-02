import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import GameStatusDisplay from 'components/ShareComponent/GameStatusDisplay/GameStatusDisplay';
import dynamicMessage from 'helpers/language';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import PropTypes from 'prop-types';
import { timeConvert } from 'helpers/common';
import style from './GameInfoBlock.scss';

const GameInfoBlock = ({
  haveVideo,
  type,
  startTs,
  team1Score,
  team2Score,
  team1Id,
  team2Id,
  team1Name,
  team2Name,
  isMarketResult,
}) => {
  const { hours, day, minute, month } = timeConvert(startTs);
  const time = `${month}/${day} ${hours}:${minute}`;

  return (
    <div className={style.container}>
      <div className={style.side}>
        <GameStatusDisplay
          haveVideo={haveVideo}
          type={type}
          timestamp={startTs}
        />
        <div className={style.text}>
          <FormattedMessage {...dynamicMessage(time)} />
        </div>
      </div>
      <div className={style.content}>
        <div className={style.section}>
          <div className={style.teamScoreText}>{team1Score}</div>
          <TeamIcon
            className={style.icon}
            teamId={team1Id}
            teamName={team1Name}
            size="small"
          />
          <div className={style.teamNameText}>
            <div className={style.text}>{team1Name}</div>
          </div>
        </div>
        {isMarketResult && (
          <div className={classNames(style.section, style.draw)}>X(Draw)</div>
        )}
        <div className={style.section}>
          <div className={style.teamScoreText}>{team2Score}</div>
          <TeamIcon
            className={style.icon}
            teamId={team2Id}
            teamName={team2Name}
            size="small"
          />
          <div className={style.teamNameText}>
            <div className={style.text}>{team2Name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

GameInfoBlock.propTypes = {
  haveVideo: PropTypes.bool.isRequired,
  type: PropTypes.number.isRequired,
  startTs: PropTypes.number.isRequired,
  team1Score: PropTypes.number.isRequired,
  team2Score: PropTypes.number.isRequired,
  team1Id: PropTypes.number.isRequired,
  team2Id: PropTypes.number.isRequired,
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string.isRequired,
  isMarketResult: PropTypes.bool.isRequired,
};

export default GameInfoBlock;

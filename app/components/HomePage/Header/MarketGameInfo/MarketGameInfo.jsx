import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import dynamicMessage from 'helpers/language';
import MoreInfoButtonContainer from 'components/ShareComponent/MoreInfoButton/MoreInfoButtonContainer';
import { timeConvert } from 'helpers/common';
import GameStatusDisplay from 'components/ShareComponent/GameStatusDisplay/GameStatusDisplay';
import SportIcom from 'components/ShareComponent/SportIcon/SportIcon';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import style from './MarketGameInfo.scss';

const MarketGameInfo = ({
  clearMarketGameInfo,
  isLoading,
  sportId,
  competitionName,
  team1Name,
  team2Name,
  team1Id,
  team2Id,
  type,
  haveVideo,
  team1Score,
  team2Score,
  startTs,
  isClosed,
  gameId,
  isChampion,
  gameListType,
}) => {
  const { hours, day, minute, month } = timeConvert(startTs);
  const time = `${month}/${day} ${hours}:${minute}`;

  useEffect(
    () => () => {
      clearMarketGameInfo();
    },
    [],
  );

  return (
    <div className={style.wrapper}>
      {!isLoading && (
        <div className={style.container}>
          <div className={style.leftBlock}>
            <NavLink
              className={style.arrowBtn}
              to={`/${gameListType === 'upcoming' ? '' : gameListType}`}
            />
            <SportIcom
              sportId={sportId}
              className={style.sportIcon}
              type="white"
            />
            <div>{competitionName}</div>
          </div>
          <div className={style.teamMatchBlock}>
            {isChampion ? (
              <div className={style.championNameContainer}>
                <TeamIcon
                  className={style.teamIcon}
                  teamId={team1Id}
                  teamName={team1Name}
                />
                <div>{team1Name}</div>
              </div>
            ) : (
              <>
                <div className={classNames(style.flag, style.left)}>
                  <div className={style.teamName}>{team1Name}</div>
                  <div className={style.circle}>
                    <TeamIcon teamId={team1Id} teamName={team1Name} />
                  </div>
                </div>
                <div className={style.middleArea}>
                  <div className={style.timeBlock}>
                    <FormattedMessage {...dynamicMessage(time)} />
                  </div>
                  <div className={style.scoreBlock}>
                    <div>{team1Score}</div>
                    <div className={style.divider}>:</div>
                    <div>{team2Score}</div>
                  </div>
                  <div className={style.gameStatusBlock}>
                    {!isClosed && (
                      <GameStatusDisplay
                        haveVideo={haveVideo}
                        type={type}
                        isDark
                        timestamp={startTs}
                      />
                    )}
                  </div>
                </div>
                <div className={classNames(style.flag, style.right)}>
                  <div className={style.circle}>
                    <TeamIcon teamId={team2Id} teamName={team2Name} />
                  </div>
                  <div className={style.teamName}>
                    <span>{team2Name}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={style.rightBlock}>
            <MoreInfoButtonContainer
              type="video"
              disable={haveVideo}
              gameId={gameId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

MarketGameInfo.propTypes = {
  clearMarketGameInfo: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  sportId: PropTypes.number.isRequired,
  competitionName: PropTypes.string,
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string.isRequired,
  team1Id: PropTypes.number.isRequired,
  team2Id: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
  haveVideo: PropTypes.bool.isRequired,
  team1Score: PropTypes.number.isRequired,
  team2Score: PropTypes.number.isRequired,
  startTs: PropTypes.number.isRequired,
  isClosed: PropTypes.bool.isRequired,
  gameId: PropTypes.number.isRequired,
  isChampion: PropTypes.bool.isRequired,
  gameListType: PropTypes.string.isRequired,
};

export default MarketGameInfo;

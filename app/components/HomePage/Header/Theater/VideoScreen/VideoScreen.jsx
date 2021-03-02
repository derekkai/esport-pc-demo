import React from 'react';
import classNames from 'classnames';
import MoreInfoButtonContainer from 'components/ShareComponent/MoreInfoButton/MoreInfoButtonContainer';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import style from './VideoScreen.scss';

const VideoScreen = ({
  videoUrl,
  switchTheater,
  team1Name,
  team2Name,
  team1Id,
  team2Id,
  competitionName,
  sportId,
  gameId,
  marketsCount,
}) => {
  const handleCloseBtnClick = () => {
    switchTheater(false);
  };

  return (
    <div className={style.contianer}>
      <div className={style.header}>
        <div>
          <SportIcon
            sportId={75}
            className={style.sportIcon}
            type="light_blue"
          />
          <div className={style.competitionName}>{competitionName}</div>
        </div>
        <MoreInfoButtonContainer
          type="market"
          dataType="upcoming"
          disable={marketsCount === 0}
          gameId={gameId}
          sportId={sportId}
        />
      </div>
      <div className={style.content}>
        <div className={classNames(style.flag, style.left)}>
          <div className={style.circle}>
            <TeamIcon teamId={team1Id} teamName={team1Name} />
          </div>
          <div className={style.teamName}>
            <div className={style.text}>{team1Name}</div>
          </div>
        </div>
        <div className={style.videoWrapper}>
          <iframe
            title="live"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            src={videoUrl}
          />
          <div
            aria-hidden
            type="button"
            className={style.closeBtn}
            onClick={handleCloseBtnClick}
          />
        </div>
        <div className={classNames(style.flag, style.right)}>
          <div className={style.circle}>
            <TeamIcon teamId={team2Id} teamName={team2Name} />
          </div>
          <div className={style.teamName}>
            <div className={style.text}>{team2Name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoScreen;

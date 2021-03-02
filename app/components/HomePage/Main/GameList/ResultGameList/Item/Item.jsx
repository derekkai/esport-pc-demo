import React from 'react';
import PropTypes from 'prop-types';
import settings from 'settings';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import MoreInfoButtonContainer from 'components/ShareComponent/MoreInfoButton/MoreInfoButtonContainer';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import Chip from 'components/ShareComponent/Chip/Chip';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import Card from 'components/ShareComponent/Card/Card';
import { timeConvert } from 'helpers/common';
import style from './Item.scss';

const Item = ({
  startTs,
  sportId,
  competitionName,
  team1Score,
  team2Score,
  team1Id,
  team2Id,
  team1Name,
  team2Name,
  gameId,
  isChampion,
  matchStatus,
}) => {
  const { hours, day, minute, month } = timeConvert(startTs);
  const time = `${month}/${day} ${hours}:${minute}`;
  let winFlag = 0; // 0. hide, 1. left, 2. right 3. draw 4. live

  switch (matchStatus) {
    case settings.MatchStatus.Started:
      winFlag = 4;
      break;
    case settings.MatchStatus.Completed: {
      if (Number(team1Score) > Number(team2Score)) {
        winFlag = 1;
      } else if (Number(team1Score) < Number(team2Score)) {
        winFlag = 2;
      } else {
        winFlag = 3;
      }
      break;
    }
    case settings.MatchStatus.Canceled:
      winFlag = 5;
      break;
    default:
      break;
  }

  const renderLeftTag = value => {
    switch (value) {
      case 1:
        return <Chip className={style.chip} size="md" type="Won" />;
      case 2:
        return <Chip className={style.chip} size="md" type="Lost" />;
      case 3:
        return <Chip className={style.chip} size="md" type="Draw" />;
      case 4:
        return <Chip className={style.chip} size="md" type="Live" />;
      case 5:
        return <Chip className={style.chip} size="md" type="CXL" />;
      default:
        return undefined;
    }
  };

  const renderRightTag = value => {
    switch (value) {
      case 2:
        return <Chip className={style.chip} size="md" type="Won" />;
      case 1:
        return <Chip className={style.chip} size="md" type="Lost" />;
      case 3:
        return <Chip className={style.chip} size="md" type="Draw" />;
      case 4:
      case 5:
        return undefined;
      default:
        return undefined;
    }
  };

  return (
    <div className={style.container} gameid={gameId}>
      <Card>
        <Card.Header>
          <div className={style.header}>
            <div>
              <SportIcon
                className={style.sportIcon}
                sportId={sportId}
                type="deep_blue"
              />
              <span>{competitionName}</span>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className={style.content}>
            <div className={style.vsLayout}>
              <div className={style.middle}>
                <div className={style.left}>
                  <span>
                    <FormattedMessage {...dynamicMessage(time)} />
                  </span>
                </div>
                {isChampion ? (
                  <div className={style.championNameContainer}>
                    <TeamIcon
                      className={style.teamIcon}
                      teamId={team1Id}
                      teamName={team1Name}
                    />
                    <span>{team1Name}</span>
                  </div>
                ) : (
                  <>
                    <div className={style.teamBlock}>
                      <div className={style.flagContainer}>
                        {renderLeftTag(winFlag)}
                      </div>
                      <TeamIcon
                        className={style.teamIcon}
                        teamId={team1Id}
                        teamName={team1Name}
                      />
                      <div className={style.teamNameContainer}>
                        <span>{team1Name}</span>
                      </div>
                    </div>
                    <div className={style.scoreBlock}>
                      <span>{team1Score}</span>
                      <span>:</span>
                      <span>{team2Score}</span>
                    </div>
                    <div className={style.teamBlock}>
                      <div className={style.teamNameContainer}>
                        <span>{team2Name}</span>
                      </div>
                      <TeamIcon
                        className={style.teamIcon}
                        teamId={team2Id}
                        teamName={team2Name}
                      />
                      <div className={style.flagContainer}>
                        {renderRightTag(winFlag)}
                      </div>
                    </div>
                  </>
                )}
                <div className={style.right}>
                  <MoreInfoButtonContainer
                    type="market"
                    dataType="result"
                    gameId={gameId}
                    sportId={sportId}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

Item.propTypes = {
  startTs: PropTypes.number.isRequired,
  sportId: PropTypes.number.isRequired,
  competitionName: PropTypes.string,
  team1Score: PropTypes.number.isRequired,
  team2Score: PropTypes.number.isRequired,
  team1Id: PropTypes.number.isRequired,
  team2Id: PropTypes.number.isRequired,
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string.isRequired,
  gameId: PropTypes.number.isRequired,
  isChampion: PropTypes.bool.isRequired,
  matchStatus: PropTypes.number.isRequired,
};

export default Item;

import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import settings from 'settings';
import style from './TeamIcon.scss';

const TeamIcon = ({ className, teamId, teamName, size = 'medium' }) => {
  const [renderDefaultIcon, setRenderDefaultIcon] = useState(true);
  const [renderTeamIcon, setRenderTeamIcon] = useState(true);
  const [isTeamIconLoaded, setIsTeamIconLoaded] = useState(false);

  const teamIconUrl = `${settings.teamIconCdnUrl}${Math.floor(
    teamId / 2000,
  )}/${teamId}.png`;
  /* Team Icon miss report */
  const url = `http://dev-api.fastbet518.com/api/ESPMember/SetSquadron/${teamId}`;

  const handleSendLog = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(err => {
      console.log('error:', err);
    });
  };

  const getTeamNameFirstWord = () => {
    if (teamName) {
      for (let i = 0; i < teamName.length; i += 1) {
        const char = teamName.charAt(i);
        if (/^[A-Za-z0-9\u4E00-\u9FA5]+$/.test(char)) {
          return char;
        }
      }
    }
    return undefined;
  };

  const handleImageError = () => {
    setRenderTeamIcon(false);
    handleSendLog();
  };

  const handleOnLoad = () => {
    setRenderDefaultIcon(false);
    setIsTeamIconLoaded(true);
  };

  return (
    <div className={classNames(className, style.wrapper, style[size])}>
      {renderDefaultIcon && (
        <div className={style.defaultIcon}>
          <span>{getTeamNameFirstWord()}</span>
        </div>
      )}
      {renderTeamIcon && (
        <img
          role={teamId}
          className={classNames(style.icon, !isTeamIconLoaded && style.hide)}
          src={teamIconUrl}
          alt={teamName}
          onError={handleImageError}
          onLoad={handleOnLoad}
        />
      )}
    </div>
  );
};

TeamIcon.propTypes = {
  className: PropTypes.string,
  teamId: PropTypes.number,
  teamName: PropTypes.string,
  size: PropTypes.string,
};

export default TeamIcon;

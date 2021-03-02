import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import style from './MoreInfoButton.scss';

const MoreInfoButton = ({
  requestDonateVideoUrl,
  setMarketGameInfoSportId,
  sportId,
  type,
  disable,
  gameId,
  switchTheater,
  dataType = 'upcoming',
  haveDonateVideo,
  switchLive,
}) => {
  const handleVideoBtnClick = () => {
    if (haveDonateVideo) {
      switchLive({ gameId, value: true });
      requestDonateVideoUrl({ type: 3, gameId });
    } else {
      switchTheater({
        isOpen: true,
        gameId,
      });
    }
  };

  const handleMarketPageBtnClick = () => {
    setMarketGameInfoSportId(sportId);
  };

  switch (type) {
    case 'video': {
      if (disable) return null;
      return (
        <button
          type="button"
          onClick={handleVideoBtnClick}
          className={style.container}
        >
          <div className={style.videoIcon} />
          <span className={style.label}>
            <FormattedMessage {...dynamicMessage('Video')} />
          </span>
        </button>
      );
    }
    case 'market': {
      return (
        <NavLink
          to={disable ? '' : `/${dataType}/market/${gameId}`}
          className={classNames(style.container, disable && style.disable)}
          onClick={handleMarketPageBtnClick}
        >
          <div className={style.moreIcon} />
          <span className={style.label}>
            <FormattedMessage {...dynamicMessage('More')} />
          </span>
        </NavLink>
      );
    }
    default:
      return null;
  }
};

MoreInfoButton.propTypes = {
  setMarketGameInfoSportId: PropTypes.func.isRequired,
  sportId: PropTypes.number,
  type: PropTypes.string.isRequired,
  disable: PropTypes.bool,
  gameId: PropTypes.number.isRequired,
  switchTheater: PropTypes.func.isRequired,
  dataType: PropTypes.string,
};

export default MoreInfoButton;

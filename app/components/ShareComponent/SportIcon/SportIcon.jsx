import React, { lazy, Suspense, useState } from 'react';
import PropTypes from 'prop-types';
import settings from 'settings';

const SportIcon = ({ sportId, className, type = 'color', viewBox }) => {
  const [imgSrc, setImgSrc] = useState('');
  const id = settings.sportIds.includes(sportId) ? sportId : 0;
  if (sportId === undefined) return null;
  if (type === 'svg') {
    const SVG = lazy(() => import(`images/logo-svg/icon_${id}.svg`));

    return (
      <Suspense fallback={<span />}>
        <SVG viewBox={viewBox} className={className} />
      </Suspense>
    );
  }

  try {
    import(`images/logo-${type}/icon_${sportId}.png`).then(image => {
      setImgSrc(image.default);
    });
  } catch (e) {
    console.log(e);
  }

  return imgSrc !== '' ? (
    <img className={className} src={imgSrc} alt="" />
  ) : (
    <div className={className} />
  );
};

SportIcon.propTypes = {
  className: PropTypes.string,
  sportId: PropTypes.any,
  type: PropTypes.string,
};

export default SportIcon;

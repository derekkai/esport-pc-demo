import React from 'react';
import { withCSSTransition } from 'HOCs/hocs';
import style from './Live.scss';

const Live = ({ src, switchLive }) => {
  const handleCloseBtnClick = () => {
    switchLive({ value: false });
  };

  return (
    <div className={style.container}>
      <div className={style.videoWrapper}>
        <iframe
          title="live"
          src={src}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
        <div
          aria-hidden
          type="button"
          className={style.closeBtn}
          onClick={handleCloseBtnClick}
        />
      </div>
    </div>
  );
};

export default withCSSTransition(Live, 'Live');

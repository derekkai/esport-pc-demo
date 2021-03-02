import React from 'react';
import { withCSSTransition } from 'HOCs/hocs';
import style from './Theater.scss';
import VideoScreen from './VideoScreen/VideoScreenContainer';

const images = require.context('../../../../images/backgrounds', true);

const Theater = ({ currentSelectGameId, sportId }) => {
  let img_src;
  try {
    img_src = images(`./img_bg_${sportId}_b.jpg`);
  } catch (e) {
    img_src = images(`./img_bg_0_b.jpg`);
  }

  return (
    <div
      className={style.container}
      style={{ backgroundImage: `url(${img_src})` }}
    >
      {currentSelectGameId !== '' && <VideoScreen />}
      <div className={style.background} />
    </div>
  );
};

export default withCSSTransition(Theater, 'theater');

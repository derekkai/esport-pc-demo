import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './AddBetSlideAnimation.scss';

const AddBetSlideAnimation = ({
  start,
  onFinish,
  x,
  originWidth,
  maxWidth,
  duration,
}) => {
  const [distance, setDistance] = useState(0);
  const [width, setWidth] = useState(originWidth);
  const headerEL3 = useRef(null);

  useEffect(() => {
    if (start) {
      const left = headerEL3.current.clientWidth;
      setDistance(left);
      setWidth(maxWidth || originWidth);
      setTimeout(() => {
        onFinish();
        setDistance(0);
      }, duration);
    }
  }, [start]);

  return (
    <div
      ref={headerEL3}
      className={style.track}
      style={{ width: `100vw - ${x}px` }}
    >
      <div
        className={style.train}
        style={{
          left: `${distance}px`,
          width: `${width}px`,
          transitionDuration: `${duration}ms, ${duration / 3}ms`,
        }}
      />
    </div>
  );
};

AddBetSlideAnimation.propTypes = {
  start: PropTypes.bool.isRequired,
  onFinish: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  originWidth: PropTypes.number.isRequired,
  maxWidth: PropTypes.number,
  duration: PropTypes.number.isRequired,
};

export default AddBetSlideAnimation;

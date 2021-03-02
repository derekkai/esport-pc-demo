import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Arrow from 'components/ShareComponent/Arrow/Arrow';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import style from './SystemNumBar.scss';

const SystemNumBar = ({ items, systemNum, setSystemNum }) => {
  const scrollbar = useRef(null);

  useEffect(() => {
    if (scrollbar.current) {
      scrollbar.current.view.onmousewheel = e => {
        e.preventDefault();
        const currentScrollDelta = scrollbar.current.getScrollLeft();
        if (e.deltaY > 0) {
          scrollbar.current.scrollLeft(currentScrollDelta + 85);
        } else {
          scrollbar.current.scrollLeft(currentScrollDelta - 85);
        }
      };
    }
  }, []);

  const handleNumItemClick = value => () => {
    setSystemNum(value);
  };

  const handleLeftArrowClick = () => {
    scrollbar.current.scrollLeft(scrollbar.current.getScrollLeft() - 85);
  };

  const handleRightArrowClick = () => {
    scrollbar.current.scrollLeft(scrollbar.current.getScrollLeft() + 85);
  };

  const activeIndex = items.find(item => item.value === systemNum);
  if (!activeIndex) {
    setSystemNum(2);
  }
  return (
    <div className={style.container}>
      <Arrow
        className={style.leftArrow}
        forceDirection="left"
        onClick={handleLeftArrowClick}
      />
      <Scrollbars
        autoHide
        ref={scrollbar}
        renderThumbHorizontal={props => (
          <div {...props} style={{ display: 'none' }} />
        )}
      >
        <div className={style.list}>
          {items.map(el => (
            <button
              key={el.value}
              className={classNames(
                style.item,
                activeIndex?.value === el.value && style.active,
              )}
              type="button"
              onClick={handleNumItemClick(el.value)}
            >
              <span>{el.label}</span>
            </button>
          ))}
        </div>
      </Scrollbars>
      <Arrow
        className={style.rightArrow}
        direction="right"
        onClick={handleRightArrowClick}
      />
    </div>
  );
};

SystemNumBar.propTypes = {
  items: PropTypes.array.isRequired,
  systemNum: PropTypes.number.isRequired,
  setSystemNum: PropTypes.func.isRequired,
};

export default SystemNumBar;

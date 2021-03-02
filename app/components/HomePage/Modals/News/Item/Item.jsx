import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { timeConvert } from 'helpers/common';
import { newsTypeMap } from 'settings';
import ModalsTemplate from 'components/ShareComponent/ModalsTemplate/ModalsTemplate';
import style from './Item.scss';

const Item = ({ data }) => {
  const [bodyHeight, setBodyHeight] = useState('auto');
  const pRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const { Type, Title, Content, PublishDateTime } = data;

  const icon = newsTypeMap[Type];
  const timestamp = new Date(PublishDateTime).getTime();
  const { hours, day, minute, month } = timeConvert(timestamp / 1000);
  const time = `${month}/${day} ${hours}:${minute}`;

  const handleArrowBtnClick = () => {
    setExpanded(prevState => !prevState);
  };

  useEffect(() => {
    if (pRef?.current) {
      setBodyHeight(`${pRef.current.clientHeight}px`);
    }
  }, []);

  return (
    <ModalsTemplate.Item>
      <ModalsTemplate.ItemHeader
        arrowOnClick={handleArrowBtnClick}
        expanded={expanded}
      >
        <div className={classNames(style.icon, style[icon])} />
        <h4>{Title}</h4>
        <span className={style.time}>{time}</span>
      </ModalsTemplate.ItemHeader>
      <ModalsTemplate.ItemBody
        innerstyle={{
          height: expanded ? `${bodyHeight}` : '0px',
        }}
      >
        <p ref={pRef} className={style.content}>
          {Content}
        </p>
      </ModalsTemplate.ItemBody>
    </ModalsTemplate.Item>
  );
};

Item.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Item;

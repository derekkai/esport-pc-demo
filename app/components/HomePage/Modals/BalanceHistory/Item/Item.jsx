import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { balanceDecimalPlaceDisplay } from 'settings';
import { FormattedMessage } from 'react-intl';
import ModalsTemplate from 'components/ShareComponent/ModalsTemplate/ModalsTemplate';
import Chip from 'components/ShareComponent/Chip/Chip';
import dynamicMessage from 'helpers/language';
import style from './Item.scss';

const Item = ({ count, total, balance, data, date }) => {
  const [expanded, setExpanded] = useState(false);
  const half = Math.ceil(data.length / 2);
  const handleArrowBtnClick = () => {
    setExpanded(prevState => !prevState);
  };

  const renderItems = () => {
    const leftArray = data.slice(0, half);
    const rightArray = data.slice(half, data.length);

    const createList = array => (
      <ul className={style.list}>
        {array.map(el => {
          const isNegative = el.TransAmount < 0;
          const time = el.TransDate.split(' ')[1];
          return (
            <li key={el.TransDate}>
              <div>
                <span>{time}</span>
              </div>
              <div>
                <span>
                  <FormattedMessage {...dynamicMessage(el.TransReason)} />
                </span>
              </div>
              <div>
                <span
                  className={isNegative ? style.negative : style.positive}
                >{`${el.TransAmount} ¥`}</span>
              </div>
              <div>
                <span>{`${el.TransBalance} ¥`}</span>
              </div>
            </li>
          );
        })}
      </ul>
    );

    return (
      <>
        {createList(leftArray)}
        {createList(rightArray)}
      </>
    );
  };
  const isNegative = total < 0;

  return (
    <ModalsTemplate.Item>
      <ModalsTemplate.ItemHeader
        className={style.header}
        arrowOnClick={handleArrowBtnClick}
        expanded={expanded}
      >
        <div>
          <span>{date}</span>
        </div>
        <div>
          <span>
            <FormattedMessage {...dynamicMessage('Count')} /> :
          </span>
          <span>{count}</span>
        </div>
        <div>
          <span>
            <FormattedMessage {...dynamicMessage('Total')} /> :
          </span>
          <Chip
            className={style.chip}
            size="sm"
            type={isNegative ? 'Lost' : 'Won'}
            text={`${total.toFixed(balanceDecimalPlaceDisplay)} ¥`}
          />
        </div>
        <div>
          <span>
            <FormattedMessage {...dynamicMessage('Balance')} />
          </span>
          <span>{` : ${balance} ¥`}</span>
        </div>
      </ModalsTemplate.ItemHeader>
      <ModalsTemplate.ItemBody
        className={style.body}
        innerstyle={{ height: expanded ? `${half * 40}px` : '0px' }}
      >
        {renderItems(date)}
      </ModalsTemplate.ItemBody>
    </ModalsTemplate.Item>
  );
};

Item.propTypes = {
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
};

export default Item;

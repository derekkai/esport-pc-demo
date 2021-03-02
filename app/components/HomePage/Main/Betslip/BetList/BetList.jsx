import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import style from './BetList.scss';
import BetCardContainer from './BetCard/BetCardContainer';

const BetList = ({ keys, removeBetEntity }) => {
  const handleItemOnExited = eventId => () => {
    setTimeout(() => {
      removeBetEntity(eventId);
    }, 0);
  };

  return (
    <TransitionGroup className={style.content} component="ul">
      {keys.map(eventId => (
        <CSSTransition
          timeout={300}
          classNames="bet-card"
          key={eventId}
          onExited={handleItemOnExited(eventId)}
        >
          <BetCardContainer key={eventId} eventId={eventId} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

BetList.propTypes = {
  keys: PropTypes.array.isRequired,
  removeBetEntity: PropTypes.func.isRequired,
};

export default BetList;

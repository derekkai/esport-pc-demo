import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import style from './HeaderFlag.scss';

const HeaderFlag = ({
  className,
  text,
  active,
  isTag = false,
  onClick = () => {},
  isButton = false,
  value,
}) => {
  const handleClick = () => {
    if (!isTag) {
      onClick(value);
    }
  };

  return isButton ? (
    <button
      type="button"
      className={classNames(
        className,
        isTag && style.tag,
        style.container,
        active && style.active,
      )}
      onClick={handleClick}
    >
      <span className={style.content}>
        <FormattedMessage {...dynamicMessage(text)} />
      </span>
      <div className={style.background} />
    </button>
  ) : (
    <NavLink
      exact
      to={`/${value}`}
      className={classNames(
        className,
        isTag && style.tag,
        style.container,
        active && style.active,
      )}
      onClick={handleClick}
    >
      <span className={style.content}>
        <FormattedMessage {...dynamicMessage(text)} />
      </span>
      <div className={style.background} />
    </NavLink>
  );
};

HeaderFlag.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  isTag: PropTypes.bool,
  onClick: PropTypes.func,
  isButton: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HeaderFlag;

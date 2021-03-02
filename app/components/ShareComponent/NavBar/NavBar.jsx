import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './NavBar.scss';
import HeaderFlag from '../HeaderFlag/HeaderFlag';
import Item from './Item/Item';

const NavBar = ({
  className,
  data,
  value,
  isButtonNav,
  onChange,
  isFlag = true,
  disableValue = [],
}) => {
  let list;
  if (Array.isArray(data)) {
    list = data;
  } else {
    list = Object.entries(data);
  }
  return (
    <ul className={classNames(style.container, className)}>
      {list.map(([key, el]) =>
        isFlag ? (
          <li key={key}>
            <HeaderFlag
              onClick={onChange}
              text={el.label}
              active={key === value}
              isButton={isButtonNav}
              value={el.value}
            />
          </li>
        ) : (
          <Item
            disable={disableValue.includes(el.value)}
            onClick={onChange}
            key={key}
            text={el.label}
            value={el.value}
            active={key === value}
          />
        ),
      )}
    </ul>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  isButtonNav: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  isFlag: PropTypes.bool,
  disableValue: PropTypes.array,
};

export default NavBar;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import classNames from 'classnames';
import style from './Select.scss';

const Select = ({
  data,
  value,
  onChange,
  className,
  maxHeight = 400,
  maxValue,
}) => {
  const [expanded, setExpanded] = useState(false);
  const activeLabel = data.find(el => el.value === value);
  const handleOptionClick = key => () => {
    onChange(key);
    setExpanded(false);
  };

  const handleOnClick = () => {
    setExpanded(prevState => !prevState);
  };

  const handleFocusChange = isFocus => () => {
    setTimeout(() => {
      setExpanded(isFocus);
    }, 200);
  };

  return (
    <div className={classNames(style.container, className)}>
      <button
        type="button"
        onClick={handleOnClick}
        onFocus={handleFocusChange(true)}
        onBlur={handleFocusChange(false)}
      >
        <span>
          <FormattedMessage {...dynamicMessage(activeLabel.label)} values={activeLabel.insertValue} />
        </span>
        <div className={style.arrow} />
      </button>
      {expanded && (
        <div className={style.menuWrapper}>
          <Scrollbars autoHide autoHeight autoHeightMax={maxHeight}>
            <ul className={style.menu}>
              {data
                .filter(item => !maxValue || item.value <= maxValue)
                .map(el => (
                  <li
                    key={el.value}
                    aria-hidden
                    onClick={handleOptionClick(el.value)}
                    className={classNames(
                      style.option,
                      el.value === value && style.active,
                    )}
                  >
                    <span>
                      <FormattedMessage {...dynamicMessage(el.label)} values={el.insertValue} />
                    </span>
                  </li>
                ))}
            </ul>
          </Scrollbars>
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  maxHeight: PropTypes.number,
  maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
export default Select;

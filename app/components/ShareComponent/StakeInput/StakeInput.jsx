import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import style from './StakeInput.scss';

const StakeInput = ({
  intl,
  className,
  stake,
  onChange = () => {},
  readOnly,
  placeholder,
}) => {
  const displayStake = stake === 0 ? '' : stake;

  const handleInputChange = event => {
    const newStake = event.target.value;
    if (!Number.isNaN(Number(newStake)) && newStake.length <= 7) {
      onChange(newStake);
    }
  };

  return (
    <input
      readOnly={readOnly}
      className={classNames(style.input, className)}
      placeholder={intl.formatMessage({ id: placeholder || 'Stake' })}
      value={displayStake}
      onChange={handleInputChange}
    />
  );
};

StakeInput.propTypes = {
  intl: PropTypes.object,
  className: PropTypes.string,
  stake: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default injectIntl(StakeInput);

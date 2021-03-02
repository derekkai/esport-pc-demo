import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withCSSTransition } from 'HOCs/hocs';
import dynamicMessage from 'helpers/language';
import Checkbox from 'components/ShareComponent/Checkbox/Checkbox';
import NavBar from 'components/ShareComponent/NavBar/NavBar';
import settings from 'settings';
import style from './Setting.scss';

const Setting = ({
  oddsFormat,
  setOddsFormat,
  setPriceChangeHandleType,
  priceChangeHandleType,
  setSettingExpanded,
}) => {
  const handleOddFormatItemClick = value => () => {
    setOddsFormat(value);
  };

  const handleRadioBtnClick = value => () => {
    setPriceChangeHandleType(value);
  };

  const handleCloseBtnClick = () => {
    setSettingExpanded(false);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.topBlock}>
          <NavBar
            className={style.navs}
            value={oddsFormat}
            data={settings.oddsFormat}
            isFlag={false}
            onChange={handleOddFormatItemClick}
          />
          <button
            type="button"
            className={style.closeBtn}
            onClick={handleCloseBtnClick}
          />
        </div>
        <div className={style.content}>
          <ul className={style.list}>
            <li>
              <h6>
                <FormattedMessage
                  {...dynamicMessage('Automatically accept price changes')}
                />
              </h6>
            </li>
            {Object.values(settings.betslipPriceChangeRadioGroup).map(el => (
              <li key={el.value}>
                <Checkbox
                  isSelect={el.value === priceChangeHandleType}
                  onClick={handleRadioBtnClick(el.value)}
                  shape="circle"
                />
                <span>
                  <FormattedMessage {...dynamicMessage(el.label)} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

Setting.propTypes = {
  oddsFormat: PropTypes.string.isRequired,
  setOddsFormat: PropTypes.func.isRequired,
  setPriceChangeHandleType: PropTypes.func.isRequired,
  priceChangeHandleType: PropTypes.string.isRequired,
  setSettingExpanded: PropTypes.func.isRequired,
};

export default withCSSTransition(Setting, 'Setting');

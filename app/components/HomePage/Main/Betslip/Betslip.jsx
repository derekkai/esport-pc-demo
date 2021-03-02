import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import dynamicMessage from 'helpers/language';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import EmptyIcon from 'components/ShareComponent/EmptyIcon/EmptyIcon';
import NavBar from 'components/ShareComponent/NavBar/NavBar';
import Card from 'components/ShareComponent/Card/Card';
import HeaderFlag from 'components/ShareComponent/HeaderFlag/HeaderFlag';
import settings from 'settings';
import betSuccessGif from 'images/elements/bet_success.gif';
import betFailGif from 'images/elements/bet_fail.gif';
import betProgress from 'images/elements/bet_progress.gif';
import style from './Betslip.scss';
import SystemNumBarContainer from './SystemNumBar/SystemNumBarContainer';
import BetslipInfoContainer from './BetslipInfo/BetslipInfoContainer';
import SettingContainer from './Setting/SettingContainer';
import BetListContainer from './BetList/BetListContainer';

const Betslip = ({
  showResult,
  isSuccess,
  betCount,
  betType,
  setBetType,
  clearBetslipData,
  keys,
  removeBetsKey,
  requestUpdateBetEventData,
  isWaitingResponse,
  failCode,
  switchCalculator,
  isCalculatorOpen,
}) => {
  const [isSettingExpanded, setSettingExpanded] = useState(false);
  const [disableBetTypes, setDisableBetTypes] = useState([]);
  const [isCalculatorExpanded, setCalculatorExpanded] = useState(false);

  useEffect(() => {
    if (betCount > 0) {
      requestUpdateBetEventData();
    }
  }, []);

  useEffect(() => {
    if (keys.length < 2) {
      setDisableBetTypes(['system', 'multiple']);
    } else if (keys.length < 3) {
      setDisableBetTypes(['system']);
    } else {
      setDisableBetTypes([]);
    }
  }, [keys]);

  const handleBetTypeItemClick = value => () => {
    setBetType(value);
  };

  const handleSettingBtnClick = () => {
    setSettingExpanded(prevState => !prevState);
    setCalculatorExpanded(false);
  };

  const handleClearBtnClick = () => {
    for (let i = keys.length - 1; i >= 0; i -= 1) {
      setTimeout(() => {
        removeBetsKey(keys[i]);
      }, 100 * (keys.length - i));
    }
    clearBetslipData();
  };

  const handleCalculatorBtnClick = () => {
    switchCalculator();
  };

  const renderDoBetState = () => {
    if (showResult) {
      return (
        <div className={style.resultIconContainer}>
          <img src={isSuccess ? betSuccessGif : betFailGif} alt="" />
          <span className={classNames(isSuccess ? style.success : style.fail)}>
            {Object.values(settings.serverCode).includes(failCode) ? (
              <FormattedMessage
                {...dynamicMessage(`ServerMessage${failCode}`)}
              />
            ) : (
              <FormattedMessage {...dynamicMessage('Place bet fail.')} />
            )}
          </span>
        </div>
      );
    }
    if (isWaitingResponse) {
      return (
        <div className={style.resultIconContainer}>
          <img src={betProgress} alt="" />
          <span>
            <FormattedMessage {...dynamicMessage('Processing...')} />
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <HeaderFlag text="Betslip" isTag />
        <div>
          <button
            type="button"
            className={classNames(
              style.calculatorBtn,
              isCalculatorOpen && style.active,
            )}
            onClick={handleCalculatorBtnClick}
          />
          <button
            type="button"
            className={classNames(
              style.settingBtn,
              isSettingExpanded && style.active,
            )}
            onClick={handleSettingBtnClick}
          />
          <button
            type="button"
            className={style.clearBtn}
            onClick={handleClearBtnClick}
          />
        </div>
      </div>
      <div className={classNames(style.cardWrapper)}>
        <Card
          className={classNames(
            (isSettingExpanded || isCalculatorExpanded) && style.blur,
          )}
        >
          <Card.Header>
            <div className={style.cardHeader}>
              <NavBar
                className={style.navs}
                data={settings.betslipBetTypeItems}
                value={betType}
                isFlag={false}
                onChange={handleBetTypeItemClick}
                disableValue={disableBetTypes}
              />
            </div>
          </Card.Header>
          <Card.Body className={style.cardBody}>
            {betType === 'system' && <SystemNumBarContainer />}
            {renderDoBetState()}
            <div
              className={classNames(
                style.scrollBarWrapper,
                betCount === 0 && style.hide,
              )}
            >
              <Scrollbars
                autoHide
                className={classNames(
                  betType === 'system'
                    ? style.systemScrollView
                    : style.scrollView,
                )}
              >
                <BetListContainer />
              </Scrollbars>
              <BetslipInfoContainer betCount={betCount} />
            </div>
            {betCount === 0 && <EmptyIcon type="betslip" />}
          </Card.Body>
        </Card>
        <SettingContainer
          in={isSettingExpanded}
          setSettingExpanded={setSettingExpanded}
        />
      </div>
    </div>
  );
};

Betslip.propTypes = {
  showResult: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  betCount: PropTypes.number.isRequired,
  betType: PropTypes.string.isRequired,
  setBetType: PropTypes.func.isRequired,
  clearBetslipData: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  removeBetsKey: PropTypes.func.isRequired,
  requestUpdateBetEventData: PropTypes.func.isRequired,
  isWaitingResponse: PropTypes.bool.isRequired,
  failCode: PropTypes.number.isRequired,
  switchCalculator: PropTypes.func.isRequired,
  isCalculatorOpen: PropTypes.bool.isRequired,
};

export default Betslip;

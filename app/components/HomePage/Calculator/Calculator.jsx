import React, { useMemo, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import { betslipTotalPrice, getBetslipOnlySystemCount } from 'helpers/common';
import { Scrollbars } from 'react-custom-scrollbars';
import Select from 'components/ShareComponent/Select/Select';
import StakeInput from 'components/ShareComponent/StakeInput/StakeInput';
import Checkbox from 'components/ShareComponent/Checkbox/Checkbox';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import {
  betslipSystemCountMIN,
  betslipBetCountMAX,
  stakeDecimalPlaceDisplay,
} from 'settings';
import classNames from 'classnames';
import { withCSSTransition } from 'HOCs/hocs';
import style from './Calculator.scss';

const Calculator = ({ switchCalculator }) => {
  const [pick, setPick] = useState('2/3');
  const [stake, setStake] = useState(0);
  const [systemNum, betCount] = pick.split('/');
  const betStates = ['won', 'lost', 'returned'];
  const [betslipResultData, setBetslipResultData] = useState({});
  const count = useMemo(
    () => getBetslipOnlySystemCount(Number(betCount), Number(systemNum)),
    [betCount, systemNum],
  );
  const systemPicker = useMemo(() => {
    const result = [];
    for (let i = betslipSystemCountMIN; i <= betslipBetCountMAX; i += 1) {
      for (let j = betslipSystemCountMIN - 1; j < i; j += 1) {
        result.push({
          label: `Take {1} in {0}`,
          value: `${j}/${i}`,
          insertValue: { 0: i, 1: j },
        });
      }
    }
    return result;
  }, []);
  const eachStake = (stake / count).toFixed(stakeDecimalPlaceDisplay);

  useEffect(() => {
    initBetslipResultData();
  }, [pick]);

  const initBetslipResultData = () => {
    const temp = {};
    for (let i = 0; i < Number(betCount); i += 1) {
      temp[i + 1] = {
        id: i + 1,
        price: 1.0,
        state: 'won',
      };
    }
    setBetslipResultData(temp);
  };

  const SystemInfo = useMemo(() => {
    const prices = [];
    Object.values(betslipResultData).forEach(bet => {
      switch (bet.state) {
        case 'won': {
          prices.push(bet.price);
          break;
        }
        case 'lost': {
          break;
        }
        case 'returned': {
          prices.push(1);
          break;
        }
        default:
          break;
      }
    });
    return betslipTotalPrice('system', prices, Number(systemNum));
  }, [betslipResultData, systemNum]);

  const handleSystemNumSelectChange = value => {
    setPick(value);
  };

  const handleCloseBtnClick = () => {
    switchCalculator();
  };

  const handleStakeInputChange = newStake => {
    setStake(newStake);
  };

  const handleResetBtnClick = () => {
    setStake(0);
    initBetslipResultData();
    setPick('2/3');
  };

  const createTableRow = () => {
    const element = [];
    Object.values(betslipResultData).forEach(bet => {
      element.push(
        <li className={style.item} key={bet.id}>
          <div className={style.id}>{bet.id}</div>
          <input
            className={style.input}
            value={bet.price}
            onChange={handlePriceInputChange(bet.id)}
          />
          {betStates.map(state => (
            <Checkbox
              isSelect={state === bet.state}
              key={state}
              shape="circle"
              className={style.checkbox}
              onClick={handleCheckboxChange(state, bet.id)}
            />
          ))}
        </li>,
      );
    });
    return element;
  };

  const handleCheckboxChange = (type, id) => () => {
    setBetslipResultData({
      ...betslipResultData,
      [id]: {
        ...betslipResultData[id],
        state: type,
      },
    });
  };

  const handlePriceInputChange = id => e => {
    let price = e.target.value || 0;
    if (price.length > 1 && price.startsWith('0')) {
      price = price.substr(1);
    }
    if (checkPrice(price)) {
      setBetslipResultData({
        ...betslipResultData,
        [id]: {
          ...betslipResultData[id],
          price,
        },
      });
    }
  };

  const checkPrice = price => {
    const priceNum = Number(price);
    if (
      Number.isNaN(priceNum) ||
      priceNum > 10 ||
      priceNum < 0 ||
      price.length > 5
    ) {
      return false;
    }
    return true;
  };

  return (
    <Draggable handle=".handle" scale={1}>
      <div className={style.container}>
        <div className={classNames(style.header, 'handle')}>
          <div className={style.title}>
            <FormattedMessage {...dynamicMessage('System calculator')} />
          </div>
          <div
            aria-hidden
            type="button"
            className={style.closeBtn}
            onClick={handleCloseBtnClick}
          />
        </div>
        <div className={style.body}>
          <Select
            className={style.select}
            data={systemPicker}
            value={pick}
            onChange={handleSystemNumSelectChange}
            maxHeight={376}
          />
          <StakeInput
            onChange={handleStakeInputChange}
            stake={stake}
            placeholder="Total Stake"
          />
          <div className={style.table}>
            <div className={style.tableHeader}>
              <div className={classNames(style.side)}>
                <FormattedMessage {...dynamicMessage('Odds')} />
              </div>
              {betStates.map(state => (
                <div
                  key={state}
                  className={classNames(style.icon, style[state])}
                />
              ))}
            </div>
            <div className={style.tableBody}>
              <Scrollbars autoHide autoHeight autoHeightMax={280}>
                <ul className={style.list}>{createTableRow()}</ul>
              </Scrollbars>
            </div>
          </div>
        </div>
        <div className={style.footer}>
          <div className={style.section}>
            <div className={style.label}>
              <FormattedMessage {...dynamicMessage('Combinations')} /> :
            </div>
            <div className={style.value}>{count}</div>
          </div>
          <div className={style.section}>
            <div className={style.label}>
             <FormattedMessage {...dynamicMessage('Stake per combination')} /> :
            </div>
            <div className={style.value}>{eachStake}</div>
          </div>
          <div className={style.section}>
            <div className={style.label}>
              <FormattedMessage {...dynamicMessage('Winnings')} /> :
            </div>
            <div className={style.value}>
              {((stake / count) * SystemInfo.price).toFixed(
                stakeDecimalPlaceDisplay,
              )}
            </div>
          </div>
          <div
            aria-hidden
            type="button"
            className={style.resetBtn}
            onClick={handleResetBtnClick}
          >
            <FormattedMessage {...dynamicMessage('Reset')} />
          </div>
        </div>
      </div>
    </Draggable>
  );
};

Calculator.propTypes = {
  switchCalculator: PropTypes.func.isRequired,
};

export default withCSSTransition(Calculator, 'Calculator');

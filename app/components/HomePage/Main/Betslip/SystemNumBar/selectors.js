import React from 'react';
import { createSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { getBetslipOnlySystemCount } from 'helpers/common';
import dynamicMessage from 'helpers/language';

const selectKeys = state => state.betslip.keys;

const makeItems = createSelector(
  selectKeys,
  keys => {
    const betCount = keys.length;
    const systemPriceList = [];

    for (let i = 2; i < betCount; i += 1) {
      const count = getBetslipOnlySystemCount(betCount, i);
      systemPriceList.push({ count });
    }

    const systemNumSelectItem = [];
    systemPriceList.forEach((el, key) => {
      systemNumSelectItem.push({
        label: (
          <FormattedMessage
            {...dynamicMessage('{0}/{2}({1})')}
            values={{ 0: key + 2, 1: el.count, 2: betCount }}
          />
        ),
        value: key + 2,
      });
    });
    return systemNumSelectItem;
  },
);

export { makeItems };

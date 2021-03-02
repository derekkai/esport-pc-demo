import produce from 'immer';
import { DEFAULT_LOCALE } from '../i18n';

const prefix = 'app';
export const CHANGE_LOCALE = `${prefix}/CHANGE_LOCALE`;

export const changeLocale = languageLocale => ({
  type: CHANGE_LOCALE,
  locale: languageLocale,
});

export const initialState = {
  locale: DEFAULT_LOCALE,
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
    }
  });

export default languageProviderReducer;

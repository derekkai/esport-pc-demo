import { defineMessages } from 'react-intl';

const dynamicMessage = message => {
  let id = message;
  if (!id) {
    id = 'undefined';
  }

  return defineMessages({
    [message]: {
      id,
      defaultMessage: message,
    },
  })[message];
};

export default dynamicMessage;

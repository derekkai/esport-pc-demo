const post = (url, option) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...option,
  });

const get = (url, option) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...option,
  });

export const getBalance = AuthToken =>
  post(`${process.env.API_URL}/ESPMember/GetMemberClientBalance`, {
    body: JSON.stringify({
      AuthID: AuthToken,
    }),
  }).then(res => res.json());

export const getUserInfo = AuthToken =>
  post(`${process.env.API_URL}/ESPMember/GetMemberClientDetail`, {
    body: JSON.stringify({
      AuthID: AuthToken,
    }),
  }).then(res => res.json());

export const getBalanceHistory = (AuthToken, StartDateTs, EndDateTs) =>
  post(`${process.env.API_URL}/ESPMember/GetMemberWallet`, {
    body: JSON.stringify({
      AuthToken,
      StartDateTs,
      EndDateTs,
    }),
  }).then(res => res.json());

export const getBetHistory = (AuthToken, StartDateTs, EndDateTs, Lang) =>
  post(`${process.env.API_URL}/ESPMember/GetMemberTransbetResult`, {
    body: JSON.stringify({
      AuthToken,
      StartDateTs,
      EndDateTs,
      Lang,
    }),
  }).then(res => res.json());

export const getNewsData = () =>
  get(`${process.env.API_URL}/ESPMember/GetAnnouncement/ESP`).then(res =>
    res.json(),
  );

export const getPlatformStatus = get(
  `${process.env.API_URL}/GamePlatform/CheckGamePlatformStatus/esp`,
).then(res => res.json());

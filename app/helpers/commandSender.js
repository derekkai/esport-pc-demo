import settings from 'settings';
import { webSocket } from './webSocket';

const getClassifierData = ({ rid, gameListType, begin, end }) => {
  let command;
  switch (gameListType) {
    case 'upcoming':
      command = {
        command: 'get_info',
        rid,
        params: {
          championship: false,
          infoType: 'gameList',
          filter: {
            sport: {
              id: settings.sportIds,
            },
            game: {
              type: [0, 1, 2],
              start_ts: {
                begin,
                end,
              },
            },
          },
          outputfields: {
            sport: ['id', 'alias', 'name'],
            competition: ['id', 'name'],
            game: ['id'],
          },
          subscribe: true,
        },
      };
      break;
    case 'result':
      command = {
        command: 'get_result',
        rid,
        params: {
          championship: true,
          filter: {
            skip: 0,
            limit: 0,
            sport: {
              id: settings.sportIds,
            },
            game: {
              start_ts: {
                begin,
                end,
              },
            },
          },
          outputfields: {
            sport: ['id', 'alias', 'name'],
            competition: ['id', 'name'],
            game: ['id'],
          },
        },
      };
      break;
    case 'champion':
      command = {
        command: 'get_info',
        rid,
        params: {
          championship: true,
          infoType: 'game',
          filter: {
            sport: {
              id: settings.sportIds,
            },
            game: {
              start_ts: {
                begin,
                end,
              },
            },
          },
          outputfields: {
            sport: ['id', 'alias', 'name'],
            competition: ['id', 'name'],
            game: ['id'],
          },
          subscribe: true,
        },
      };
      break;
    default:
      command = {};
  }
  webSocket().send(JSON.stringify(command));
};

const getChampionData = ({ rid, sportId, competitionId, begin, end }) => {
  const command = {
    command: 'get_info',
    rid,
    params: {
      championship: true,
      infoType: 'game',
      filter: {
        sport: {
          id: sportId,
        },
        competition: {
          id: competitionId,
        },
        game: {
          start_ts: {
            begin,
            end,
          },
        },
      },
      outputfields: {
        sport: ['id', 'name'],
        competition: ['id', 'name'],
        game: [
          'id',
          'type',
          'markets_count',
          'start_ts',
          'team1_name',
          'team1_id',
        ],
        market: ['id', 'market_type', 'name'],
        event: ['id', 'price', 'name'],
      },
      subscribe: true,
    },
  };
  webSocket().send(JSON.stringify(command));
};

const getGameData = ({ rid, sportId, competitionId, begin, end }) => {
  const command = {
    command: 'get_info',
    rid,
    params: {
      championship: false,
      infoType: 'game',
      filter: {
        sport: {
          id: sportId,
        },
        competition: {
          id: competitionId,
        },
        game: {
          start_ts: {
            begin,
            end,
          },
        },
        market: {
          market_type: [
            'MatchWinner',
            'MatchResult',
            'Map1Winner',
            'Map2Winner',
            'Game1Winner',
            'Game2Winner',
          ],
        },
      },
      outputfields: {
        sport: ['id', 'name'],
        competition: ['id', 'name'],
        game: [
          'id',
          'type',
          'markets_count',
          'start_ts',
          'team1_name',
          'team2_name',
          'team1_id',
          'team2_id',
          'stats',
          'donate_video',
        ],
        market: ['id', 'market_type', 'name', 'order'],
        event: ['id', 'price', 'name', 'order'],
      },
      subscribe: true,
    },
  };
  webSocket().send(JSON.stringify(command));
};

const getMarketData = (rid, gameId) => {
  const command = {
    command: 'get_info',
    rid,
    params: {
      infoType: 'game',
      filter: {
        game: {
          id: [gameId],
        },
      },
      outputfields: {
        market: [
          // 'id',
          // 'name',
          // 'type',
          // 'group_id',
          // 'group_name',
          // 'market_type',
          // 'order',
          // 'base',
        ],
        event: ['id', 'name', 'price', 'base', 'order', 'result'],
      },
      subscribe: true,
    },
  };
  webSocket().send(JSON.stringify(command));
};

const getResultGameData = ({
  rid,
  sportId,
  competitionId,
  skip,
  begin,
  end,
}) => {
  const command = {
    command: 'get_result',
    rid,
    params: {
      filter: {
        skip,
        limit: 30,
        sport: {
          id: sportId,
        },
        competition: {
          id: competitionId,
        },
        game: {
          start_ts: {
            begin,
            end,
          },
        },
      },
      outputfields: {
        sport: ['id', 'name'],
        competition: ['id', 'name'],
        game: [],
      },
    },
  };
  webSocket().send(JSON.stringify(command));
};

const getResultMarketData = (rid, gameId) => {
  const command = {
    command: 'get_result',
    rid,
    params: {
      infoType: 'game',
      filter: {
        skip: 0,
        limit: 0,
        sport: {
          id: settings.sportIds,
        },
        game: {
          id: [gameId],
        },
      },
      outputfields: {
        market: [],
        event: [],
      },
    },
  };
  webSocket().send(JSON.stringify(command));
};

const getResultMarketGameInfo = (rid, gameId) => {
  const command = {
    command: 'get_result',
    rid,
    params: {
      filter: {
        skip: 0,
        limit: 0,
        sport: {
          id: settings.sportIds,
        },
        game: {
          id: [gameId],
        },
      },
      outputfields: {
        sport: ['name'],
        competition: ['name'],
        game: [
          'id',
          'team1_name',
          'team2_name',
          'team1_id',
          'team2_id',
          'start_ts',
          'final_score',
          'is_closed',
          'stats',
        ],
      },
    },
  };
  webSocket().send(JSON.stringify(command));
};

const getMarketGameInfo = (rid, gameId) => {
  const command = {
    command: 'get_info',
    rid,
    params: {
      infoType: 'game',
      filter: {
        skip: 0,
        limit: 0,
        sport: {
          id: settings.sportIds,
        },
        game: {
          id: [gameId],
        },
      },
      outputfields: {
        sport: ['name'],
        competition: ['name'],
        game: [
          'id',
          'team1_name',
          'team2_name',
          'team1_id',
          'team2_id',
          'type',
          'start_ts',
          'final_score',
          'stats',
        ],
      },
      subscribe: true,
    },
  };
  webSocket().send(JSON.stringify(command));
};

const getEventData = ({ rid, gameIds, eventIds, marketIds }) => {
  const command = {
    command: 'get_info',
    rid,
    params: {
      infoType: 'event',
      filter: {
        game: {
          id: gameIds,
        },
        event: {
          id: eventIds,
        },
        market: {
          id: marketIds,
        },
      },
      outputfields: {
        game: ['id'],
        market: ['id'],
        event: ['id', 'price', 'name'],
      },
      subscribe: true,
    },
  };
  webSocket().send(JSON.stringify(command));
};

const doBet = ({ betType, rid, bets, stake, sys_bet, mode }) => {
  try {
    const command = {
      command: 'do_bet',
      params: {
        type: settings.betTypeCodeMap[betType],
        mode,
        bets,
        amount: stake,
        sys_bet,
      },
      rid,
    };
    webSocket().send(JSON.stringify(command));
  } catch (e) {
    console.error(e);
  }
};

const login = (rid, AuthToken, lang) => {
  console.log('lang', lang);
  try {
    const command = {
      command: 'restore_login',
      params: {
        source: 1,
        production: 'ESP',
        auth_token: AuthToken,
        lang,
      },
      rid,
    };
    webSocket().send(JSON.stringify(command));
  } catch (e) {
    console.error(e);
  }
};

const unsubscribe = (rid, subid) => {
  try {
    const command = {
      command: 'unsubscribe',
      params: {
        subid,
      },
      rid,
    };
    webSocket().send(JSON.stringify(command));
  } catch (e) {
    console.error(e);
  }
};

const getLiveData = rid => {
  try {
    const command = {
      command: 'get_info',
      rid,
      params: {
        infoType: 'game',
        liveVideo: true,
        filter: {
          sport: {
            id: settings.sportIds,
          },
          game: {
            type: [1],
            video_url: true,
          },
          market: {
            market_type: ['MatchWinner'],
          },
        },
        outputfields: {
          sport: ['id'],
          competition: ['id', 'name'],
          game: [
            'id',
            'video_url',
            'team1_id',
            'team1_name',
            'team2_id',
            'team2_name',
            'video_id3',
            'start_ts',
            'markets_count',
            'donate_video',
          ],
        },
        subscribe: true,
      },
    };
    webSocket().send(JSON.stringify(command));
  } catch (e) {
    console.error(e);
  }
};

const getRecommandGame = rid => {
  try {
    const command = {
      command: 'get_info',
      rid,
      params: {
        infoType: 'recommendedGames',
        filter: {
          market: {
            market_type: [
              'MatchWinner',
              'MatchResult',
              'Map1Winner',
              'Map2Winner',
              'Map3Winner',
              'Map4Winner',
              'Game1Winner',
              'Game2Winner',
              'Game3Winner',
              'Game4Winner',
            ],
          },
        },
        outputfields: {
          sport: ['id', 'name'],
          competition: ['id', 'name'],
          game: [
            'id',
            'type',
            'markets_count',
            'start_ts',
            'team1_name',
            'team2_name',
            'team1_id',
            'team2_id',
            'stats',
          ],
          market: [],
          event: ['id', 'price', 'name', 'order'],
        },
        subscribe: true,
      },
    };
    webSocket().send(JSON.stringify(command));
  } catch (e) {
    console.error(e);
  }
};

const getDonateVideoUrl = ({ rid, gameId, type }) => {
  try {
    const command = {
      command: 'get_live_donate_url',
      rid,
      params: {
        type,
        game_id: gameId,
      },
    };
    webSocket().send(JSON.stringify(command));
  } catch (e) {
    console.error(e);
  }
};

export {
  getMarketGameInfo,
  getResultMarketGameInfo,
  getClassifierData,
  getGameData,
  getMarketData,
  getResultGameData,
  getResultMarketData,
  getEventData,
  doBet,
  login,
  unsubscribe,
  getRecommandGame,
  getLiveData,
  getChampionData,
  getDonateVideoUrl,
};

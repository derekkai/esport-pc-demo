let socket;

const createWebSocket = async () => {
  // socket = await new Promise((resolve, reject) => {
  //   const websocket = new WebSocket(process.env.GAME_SERVER_URL);
  //   websocket.onopen = () => {
  //     resolve(websocket);
  //   };
  //
  //   websocket.onerror = evt => {
  //     reject(evt);
  //   };
  // }).then(websocket => websocket);
  return socket;
};

export const webSocket = () => socket;

export default createWebSocket;

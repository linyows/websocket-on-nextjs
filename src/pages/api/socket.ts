import { NextApiRequest, NextApiResponse } from 'next';
import { Server, Socket } from 'socket.io';

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (res.socket.server.io) {
    console.log(`socket.io is already running`);
  } else {
    console.log(`socket.io is initializing`);
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on(`connection`, (socket: Socket) => {
      socket.on(`input-change`, (msg) => {
        console.log(msg);
        socket.broadcast.emit(`update-input`, msg);
      });
    });
  }
  res.end();
};

export default SocketHandler;

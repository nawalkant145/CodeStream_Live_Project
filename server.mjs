import express from 'express';
const app = express();
import http from 'http';
const path = await import('path');

import { Server } from 'socket.io';
import { ACTIONS } from './src/Actions.mjs';


const server = http.createServer(app);
const io = new Server(server);


const userSocketMap = {};
function getAllConnectedClients(roomId) {
    // Map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}


io.on('connection', (socket) => {
    console.log('socket connected', socket.id);


    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });


    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
         socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
     });


     socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });
     
    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});
  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

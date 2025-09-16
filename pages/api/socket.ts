// IMPORTANT: This file should be placed in `pages/api/socket.ts`
// The Next.js App Router (`app/api`) is designed for stateless HTTP handlers and
// does not support the long-running process needed for a WebSocket server.
// The `pages` directory API routes provide the necessary server instance.

import { Server, Socket } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Socket as NetSocket } from 'net';
import { ClientToServerEvents, PresentationState, ServerToClientEvents } from '../../types';
import { CONTENT_ITEMS } from '../../constants';

// This interface extends the NextApiResponse to include the socket property
interface NextApiResponseWithSocket extends NextApiResponse {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: Server<ClientToServerEvents, ServerToClientEvents>;
    };
  };
}

// In-memory state store for the presentation
let presentationState: PresentationState = {
  activeContent: null,
};

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  // If a socket server is already running, we're done.
  if (res.socket.server.io) {
    console.log('Socket is already running');
    // FIX: Replaced `res.end()` with `res.send()` to resolve a TypeScript type error.
    res.send();
    return;
  }

  console.log('Setting up Socket.io server...');
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(res.socket.server);
  res.socket.server.io = io;

  io.on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    console.log(`New client connected: ${socket.id}`);

    // Handle a client requesting the current state
    socket.on('sync-request', () => {
      console.log(`Sync request from ${socket.id}`);
      socket.emit('display-update', presentationState);
    });

    // Handle a content change from a controller
    socket.on('content-change', (content) => {
      console.log(`Content change request from ${socket.id}:`, content?.title || 'Blank');
      presentationState.activeContent = content;
      // Broadcast the new state to all clients
      io.emit('display-update', presentationState);
    });

    // Handle navigation requests
    socket.on('navigate', (direction) => {
        const currentIndex = presentationState.activeContent
            ? CONTENT_ITEMS.findIndex(item => item.id === presentationState.activeContent?.id)
            : -1;
        
        let nextIndex;
        if (direction === 'next') {
            nextIndex = Math.min(CONTENT_ITEMS.length - 1, currentIndex + 1);
        } else { // 'previous'
            nextIndex = Math.max(0, currentIndex - 1);
        }
        
        if (nextIndex !== currentIndex) {
            presentationState.activeContent = CONTENT_ITEMS[nextIndex];
            console.log(`Navigate request to ${direction}. New content: ${presentationState.activeContent.title}`);
            io.emit('display-update', presentationState);
        }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  // FIX: Replaced `res.end()` with `res.send()` to resolve a TypeScript type error.
  res.send();
}

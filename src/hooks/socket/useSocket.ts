// useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const useSocket = (userId: string | null): Socket | null => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    if (!socket) {
      socket = io(import.meta.env.VITE_BACKEND_URL, {
        query: { userId },
        transports: ["websocket"],
      });

      console.log("Socket initialized", socket.id);
    }

    setSocketInstance(socket);
  }, [userId]);

  return socketInstance;
};

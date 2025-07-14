import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (userId: string | null) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      query: { userId },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return socketRef.current;
};

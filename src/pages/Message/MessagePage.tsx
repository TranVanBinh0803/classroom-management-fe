import { Avatar, Box, Typography, IconButton, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { UserType } from "~/apis/services/auth/Auth";
import { useGetPersonalConversation } from "./api/useGetPersonalConversation";
import { useAtom } from "jotai";
import { user } from "~/atoms/AuthAtoms";
import { useSendMessage } from "./api/useSendMessage";
import { useSocket } from "~/hooks/socket/useSocket";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

type Message = {
  senderId: string;
  text: string;
};

type Conversation = {
  id: string;
  participants: UserType[];
  lastMessage?: string;
  messages?: Message[];
};

export default function MessagePage() {
  const [getUser] = useAtom(user);
  const currentUserId = getUser?.id || "";
  const socket = useSocket(currentUserId);
  const location = useLocation();
  const conversationFromState = location.state?.conversation;

  const { data: response } = useGetPersonalConversation(currentUserId);
  const [conversations, setConversations] = useState<Conversation[]>(
    response?.data
  );

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [message, setMessage] = useState("");

  const { mutate: sendMessageApi } = useSendMessage(
    selectedConversation?.id || ""
  );

  const handleSend = () => {
    if (!message.trim() || !selectedConversation) return;

    const newMessage = {
      senderId: currentUserId,
      text: message,
    };

    sendMessageApi(newMessage, {
      onSuccess: () => {
        const updatedConversations = conversations?.map((conversation) => {
          if (conversation.id === selectedConversation.id) {
            const existingMessages = conversation.messages || [];
            const newMessages = [...existingMessages, newMessage];
            return {
              ...conversation,
              lastMessage: message,
              messages: newMessages,
            };
          }
          return conversation;
        });

        setConversations(updatedConversations);
        const updatedSelected = updatedConversations.find(
          (c) => c.id === selectedConversation.id
        );
        setSelectedConversation(updatedSelected || null);

        if (socket) {
          socket.emit("sendMessage", {
            conversationId: selectedConversation.id,
            senderId: currentUserId,
            text: message,
          });
          console.log("client send message");
        }
        setMessage("");
      },
      onError: () => {
        toast.error("Send message error");
      },
    });
  };

  useEffect(() => {
    if (response?.data) {
      setConversations(response.data);

      if (conversationFromState) {
        const matched = response.data.find(
          (c: any) => c.id === conversationFromState.id
        );
        if (matched) setSelectedConversation(matched);
      }
    }
  }, [response, conversationFromState]);

  useEffect(() => {
    if (!socket || !currentUserId || !selectedConversation) return;

    socket.emit("join", selectedConversation.id);

    return () => {
      socket.emit("leave", selectedConversation.id);
    };
  }, [socket, currentUserId, selectedConversation?.id]);

  console.log("socket:", socket);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = ({ conversationId, senderId, text }: any) => {
      console.log("Received message from socket:", {
        conversationId,
        senderId,
        text,
      });

      setConversations((prevConversations) => {
        return prevConversations?.map((conversation) => {
          if (conversation.id === conversationId) {
            const existingMessages = conversation.messages || [];
            const newMessage = { senderId, text };
            const updatedMessages = [...existingMessages, newMessage];

            return {
              ...conversation,
              lastMessage: text,
              messages: updatedMessages,
            };
          }
          return conversation;
        });
      });

      setSelectedConversation((prevSelected) => {
        if (prevSelected && prevSelected.id === conversationId) {
          const existingMessages = prevSelected.messages || [];
          const newMessage = { senderId, text };
          const updatedMessages = [...existingMessages, newMessage];

          return {
            ...prevSelected,
            lastMessage: text,
            messages: updatedMessages,
          };
        }
        return prevSelected;
      });
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f3f3f3",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 250,
          backgroundColor: "#f7f7f7",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          Conversations
        </Typography>

        {conversations?.map((c) => {
          const otherUser = c.participants.find((p) => p.id !== currentUserId);
          if (!otherUser) return null;
          return (
            <Box
              key={c.id}
              onClick={() => {
                setSelectedConversation(c);
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                backgroundColor:
                  selectedConversation?.id === c.id ? "#ddd" : "#f0f0f0",
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ width: 28, height: 28 }}>
                  {otherUser.avatar}
                </Avatar>
                <Typography variant="body2" fontWeight={500}>
                  {otherUser.name || "Instructor"}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {c.lastMessage || "No message"}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: 3,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            backgroundColor: "#fff",
          }}
        >
          {selectedConversation ? (
            selectedConversation.messages &&
            selectedConversation.messages.length > 0 ? (
              selectedConversation.messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    alignSelf:
                      message.senderId === currentUserId
                        ? "flex-end"
                        : "flex-start",
                    backgroundColor:
                      message.senderId === currentUserId
                        ? "#1976d2"
                        : "#e0e0e0",
                    color:
                      message.senderId === currentUserId ? "white" : "black",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    maxWidth: "60%",
                  }}
                >
                  {message.text}
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  gap: 1,
                }}
              >
                <Typography color="text.secondary" variant="body1">
                  No messages yet
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Start a conversation by typing a message below
                </Typography>
              </Box>
            )
          ) : (
            <Typography color="text.secondary">
              Select a conversation
            </Typography>
          )}
        </Box>

        {selectedConversation && (
          <Box
            sx={{
              p: 1.5,
              backgroundColor: "#d3d3d3",
              display: "flex",
              alignItems: "center",
              borderTop: "1px solid #ccc",
              borderRadius: "0 0 12px 0",
            }}
          >
            <InputBase
              fullWidth
              placeholder="Reply message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                backgroundColor: "#eaeaea",
                borderRadius: 2,
                px: 2,
                py: 1,
                mr: 1,
                flex: 1,
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <IconButton onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}

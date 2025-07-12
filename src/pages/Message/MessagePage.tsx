import { Image } from "@mui/icons-material";
import { Box, Typography, Avatar } from "@mui/material";
import { useState } from "react";

export function MessagePage() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Binh",
      lastMessage: "Hello",
      avatar: "",
    },
    {
      id: 2,
      name: "Long",
      lastMessage: "Hi",
      avatar: "",
    },
  ]);
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      {conversations.map((conversation) => (
        <Box
          key={conversation.id}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            p: 2,
            width: 200,
          }}
        >
          <Avatar
            src={conversation.avatar}
            alt={conversation.name}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle2" fontWeight={500}>
              {conversation.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {conversation.lastMessage}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

import { Image } from "@mui/icons-material";
import { Box, Typography, Avatar } from "@mui/material";
import { useState } from "react";

export function TaskPage() {
  
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography>Tasks</Typography>
    </Box>
  );
}

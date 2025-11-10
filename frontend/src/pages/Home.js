import React from "react";
import { Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to 3W Social
      </Typography>
      <Typography variant="body1">
        This is your home feed. Explore posts, connect, and share moments!
      </Typography>
    </Box>
  );
}

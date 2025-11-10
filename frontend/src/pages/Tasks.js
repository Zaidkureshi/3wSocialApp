import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

export default function Tasks() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Tasks
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Example Task</Typography>
          <Typography variant="body2" color="text.secondary">
            Complete your first post to earn rewards!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

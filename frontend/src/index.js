import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; // <-- you'll create this file next

// Render root
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* resets default browser styles for a clean base */}
        <App />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);

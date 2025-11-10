import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // switch to 'dark' for dark mode
    primary: {
      main: '#673ab7', // purple
    },
    secondary: {
      main: '#ff9800', // orange
    },
    background: {
      default: '#f8f9fc', // soft grey background
    },
  },
  typography: {
    fontFamily: 'Poppins, Roboto, sans-serif',
  },
});

export default theme;

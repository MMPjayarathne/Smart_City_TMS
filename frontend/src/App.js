import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#90caf9' : '#1976d2',
      },
      background: {
        default: isDarkMode ? '#121212' : '#fafafa',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });
  

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

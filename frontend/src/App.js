import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { IconButton } from '@mui/material';
import { Analytics, Brightness4, Brightness7 } from '@mui/icons-material';
import Sidebar from './components/Sidebar';
import Reports from './pages/Reports';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 


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
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  

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
        <Sidebar isOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
        <Routes>
          <Route path="/" element={ <Dashboard isSidebarOpen={isSidebarOpen} />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, useTheme, Box, IconButton, ListItemIcon } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Dashboard, Analytics, BarChart, ChevronLeft, ChevronRight } from '@mui/icons-material'; // Icons

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true); 

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { text: 'Dashboard', path: '/', icon: <Dashboard /> },
    { text: 'Analytics', path: '/analytics', icon: <Analytics /> },
    { text: 'Reports', path: '/reports', icon: <BarChart /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        open={isOpen}
        sx={{
          width: isOpen ? 240 : 60, 
          transition: 'width 0.3s ease-in-out',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isOpen ? 240 : 60,
            transition: 'width 0.3s ease-in-out',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            overflowX: 'hidden',
          },
        }}
      >
       
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
          {isOpen && (
            <img
              src="/logo.png"
              alt="Logo"
              style={{ width: '120px', height: 'auto', objectFit: 'contain', transition: 'opacity 0.3s' }}
            />
          )}
          <IconButton onClick={toggleDrawer} sx={{ color: theme.palette.text.primary }}>
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
        <Divider />

    
        <List>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItem
                button
                key={index}
                component={Link}
                to={item.path}
                sx={{
                  backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
                  borderRadius: '5px',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                  },
                  justifyContent: isOpen ? 'initial' : 'center',
                }}
              >
    
                <ListItemIcon
                  sx={{
                    color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
                    minWidth: isOpen ? '40px' : 'unset', // Adjust spacing when minimized
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>


                {isOpen && (
                  <ListItemText
                    primary={item.text}
                    sx={{
                      color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
                      fontWeight: isActive ? 'bold' : 'normal',
                    }}
                  />
                )}
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;

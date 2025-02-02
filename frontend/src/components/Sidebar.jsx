import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Box, IconButton, ListItemIcon } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Dashboard, Analytics, BarChart, ChevronLeft, ChevronRight } from '@mui/icons-material';
import logo from '../assets/logo.png'
const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

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
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            overflowX: 'hidden',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
          {isOpen && (
            <img
              src={logo}
              alt="Logo"
              style={{ width: '120px', height: 'auto', objectFit: 'contain', transition: 'opacity 0.3s' }}
            />
          )}
          <IconButton onClick={onToggle} sx={{ color: 'text.primary' }}>
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
                  backgroundColor: isActive ? 'primary.main' : 'transparent',
                  borderRadius: '5px',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                  justifyContent: isOpen ? 'initial' : 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? 'primary.contrastText' : 'text.primary',
                    minWidth: isOpen ? '40px' : 'unset',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {isOpen && (
                  <ListItemText
                    primary={item.text}
                    sx={{
                      color: isActive ? 'primary.contrastText' : 'text.primary',
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

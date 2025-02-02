import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary, 
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Dashboard" sx={{ color: theme.palette.text.primary }}  />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/">
          <ListItemText primary="Analytics"  sx={{ color: theme.palette.text.primary }} />
        </ListItem>
        <ListItem button component={Link} to="/reports">
          <ListItemText primary="Reports" sx={{ color: theme.palette.text.primary }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

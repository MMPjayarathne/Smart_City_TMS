import React from 'react';
import { Box, Grid, Card, CardContent, Typography, useTheme } from '@mui/material';
import { AccessibilityNew, TrendingUp, AttachMoney } from '@mui/icons-material'; // Example icons for the cards

const TotalCards = () => {
  const theme = useTheme();

  // Example data for the total numbers
  const data = [
    { label: 'Total Users', value: 1500, icon: <AccessibilityNew /> },
    { label: 'Total Sales', value: 1200, icon: <TrendingUp /> },
    { label: 'Total Revenue', value: '$15,000', icon: <AttachMoney /> },
    { label: 'Total Revenue', value: '$15,000', icon: <AttachMoney /> },
  ];

  return (
    <Grid container spacing={0}>
          <Grid item xs={12}>
            <Box sx={{ width: '100%', paddingTop: 2, paddingBottom:2 }}>
            <Grid container spacing={2} justifyContent="center">
                {data.map((item, index) => (
                <Grid item xs={12} sm={3} key={index}>
                    <Card sx={{ height: '100%', backgroundColor: theme.palette.background.paper, boxShadow: 3 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ marginRight: 2 }}>
                            {item.icon} {/* Displaying icon */}
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                            {item.label}
                            </Typography>
                            <Typography variant="h4" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                            {item.value}
                            </Typography>
                        </Box>
                        </Box>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Box> 
        </Grid>
          {/* Other content like charts can go here */}
    </Grid>

  );
};

export default TotalCards;

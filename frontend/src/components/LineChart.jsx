import React from 'react';
import { Box, Container, Grid, Paper, useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
    const theme = useTheme();
  
    // Example chart data
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Sales Data',
          data: [65, 59, 80, 81, 56, 55],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: theme.palette.text.primary, // Legend text color
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: theme.palette.text.primary, // X axis font color
          },
          grid: {
            color: theme.palette.divider, // Grid line color for X axis
          },
        },
        y: {
          ticks: {
            color: theme.palette.text.primary, // Y axis font color
          },
          grid: {
            color: theme.palette.divider, // Grid line color for X axis
          },
        },
      },
    };
  
    return (
        <Box sx={{ width: '100%', paddingTop: 5, paddingBottom:2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ padding: 2 }}>
                <h3>Sales Analytics</h3>
                <Line data={data} options={options} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: 2, height: '400px' }}>
                {/* You can add more charts here */}
                <h3>Additional Data</h3>
              </Paper>
            </Grid>
          </Grid>
        </Box>
    );
  };
  
  export default LineChart;
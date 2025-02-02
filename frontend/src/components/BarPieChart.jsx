import React from 'react';
import { Box, Grid, Paper, useTheme } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const BarPieChart = () => {
  const theme = useTheme();

  // Glass color effect for charts (semi-transparent colors)
  const glassColors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
  ];

  // Bar Chart Data
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales Performance',
        data: [120, 200, 150, 300, 250, 400],
        backgroundColor: glassColors,
        borderColor: glassColors.map(color => color.replace('0.5', '1')), // Make border fully opaque
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data
  const pieData = {
    labels: ['Electronics', 'Clothing', 'Home Appliances', 'Books', 'Other'],
    datasets: [
      {
        label: 'Sales Distribution',
        data: [35, 25, 20, 15, 5],
        backgroundColor: glassColors,
        borderColor: glassColors.map(color => color.replace('0.5', '1')),
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: theme.palette.text.primary, // Match text color with theme
        },
      },
      title: {
        display: true,
        font: { size: 16, weight: 'bold' },
        color: theme.palette.text.primary,
      },
    },
    scales: {
      x: {
        ticks: { color: theme.palette.text.primary },
        grid: { color: theme.palette.divider },
      },
      y: {
        ticks: { color: theme.palette.text.primary },
        grid: { color: theme.palette.divider },
      },
    },
  };

  return (
    <Box sx={{ width: '100%', paddingTop: 2 }}>
      <Grid container spacing={3}>
        {/* Bar Chart Card */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, backgroundColor: theme.palette.background.paper }}>
            <Bar data={barData} options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Monthly Sales' } } }} />
          </Paper>
        </Grid>

        {/* Pie Chart Card */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, backgroundColor: theme.palette.background.paper }}>
            <Pie data={pieData} options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Sales Distribution' } } }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BarPieChart;

import React from 'react';
import Sidebar from '../components/Sidebar';
import LineChart from '../components/LineChart';
import { useTheme } from '@emotion/react';
import { Box, Grid, Container } from '@mui/material';
import TotalCards from '../components/TotalCards';
import BarPieChart from '../components/BarPieChart';
import DataTable from '../components/DataTable';


const Reports = () => {
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex' }}>
      <Container sx={{ flexGrow: 1, paddingTop: '20px' }}>
        <Grid container spacing={3}>      
            <DataTable/>
        </Grid>

        <Grid container spacing={3}> 
        
        </Grid>
        <Grid container spacing={0}> 
         
        </Grid>
        
      </Container>
  </Box>
  );
};

export default Reports;

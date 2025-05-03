import React from 'react';
import { Grid, Box, Paper, Typography, Stack } from '@mui/material';
import PassportList from '../../components/PassportList/PassportList';
import PassportUpload from '../../components/PassportUpload/PassportUpload';
import PassportSearch from '../../components/PassportSearch/PassportSearch'; // Import PassportSearch

const MainPage: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      {/* Main Grid Container */}
      <Grid container spacing={3}>
        
        {/* Passport List Container */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Passport List
            </Typography>
            <PassportList />
          </Paper>
        </Grid>

        {/* Passport Upload & Search Container */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Stack spacing={3}>
              {/* Passport Upload */}
              <Box>
                <Typography variant="h5" gutterBottom>
                  Upload Passport
                </Typography>
                <PassportUpload />
              </Box>

              {/* Passport Search */}
              <Box>
                <Typography variant="h5" gutterBottom>
                  Search Passport
                </Typography>
                <PassportSearch />
              </Box>
            </Stack>
          </Paper>
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default MainPage;

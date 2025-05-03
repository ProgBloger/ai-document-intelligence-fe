import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Paper, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MainPage from './pages/MainPage/MainPage';
import PassportDetailsPage from './pages/PassportDetailsPage/PassportDetailsPage';
import { materialTheme } from './themes/materialTheme';

function App() {
  return (
    <ThemeProvider theme={materialTheme}>
      <CssBaseline /> {/* Ensures the dark theme is applied globally */}
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* App Header */}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                AI Document Intelligence App
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 3,
              backgroundColor: 'background.default',
            }}
          >
            <Container maxWidth="md">
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  backgroundColor: 'background.paper',
                  color: 'text.primary',
                }}
              >
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/passports/:id" element={<PassportDetailsPage />} />
                </Routes>
              </Paper>
            </Container>
          </Box>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              backgroundColor: 'primary.main',
              padding: 2,
              color: 'text.primary',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2">
              © {new Date().getFullYear()} AI Document Intelligence App. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

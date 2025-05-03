import React, { useEffect, useState } from 'react';
import { getPassports } from '../../api/apiService';
import { PassportListItem } from '../../models/PassportListItem';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Box, CircularProgress, Alert } from '@mui/material';

const PassportList: React.FC = () => {
  const [passports, setPassports] = useState<PassportListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPassports = async () => {
      try {
        const passportList = await getPassports();
        setPassports(passportList);
      } catch (err) {
        setError('Failed to fetch passports');
      } finally {
        setLoading(false);
      }
    };

    fetchPassports();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
        {passports.map((passport) => (
          <Card key={passport.id} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {passport.firstName} {passport.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Passport ID: {passport.id}
              </Typography>
            </CardContent>

            <Box sx={{ padding: 1, display: 'flex', justifyContent: 'center' }}>
              <Link to={`/passports/${passport.id}`} style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  View Details
                </Typography>
              </Link>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PassportList;

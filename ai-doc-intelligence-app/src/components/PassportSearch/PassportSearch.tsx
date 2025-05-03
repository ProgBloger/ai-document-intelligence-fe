import React, { useState } from 'react';
import { getPassportSearch } from '../../api/apiService';
import { Box, Button, TextField, Typography, Card, CardContent, Alert } from '@mui/material';

const PassportSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search query.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
        var response = await getPassportSearch(searchQuery);

        setSearchResult(response || 'No results found.');
    } catch (err) {
        setError('Error fetching search results.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 400, padding: 2 }}>
        <CardContent>
          {/* Search Input */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Enter search query"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>

          {/* Search Button */}
          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              fullWidth
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </Box>

          {/* Error Message */}
          {error && <Alert severity="error">{error}</Alert>}

          {/* Search Result Display */}
          {searchResult && (
            <Card sx={{ 
              backgroundColor: (theme) => theme.palette.background.paper, // Use theme background color
              padding: 2, 
              marginTop: 2 
            }}>
              <Typography variant="body1" sx={{ color: (theme) => theme.palette.text.primary }}>
                {searchResult}
              </Typography>
            </Card>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PassportSearch;

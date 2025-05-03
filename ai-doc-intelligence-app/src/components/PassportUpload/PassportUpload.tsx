import React, { useState } from 'react';
import { uploadPassport } from '../../api/apiService';
import { Box, Button, TextField, Typography, Alert, Card, CardContent } from '@mui/material';

const PassportUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await uploadPassport(formData);
      setMessage('File uploaded successfully!');
    } catch (error) {
      setMessage('Error uploading file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 400, padding: 2 }}>
        <CardContent>
          {/* File Upload Section */}
          <Box sx={{ marginBottom: 2 }}>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="upload-file-input"
            />
            <label htmlFor="upload-file-input">
              <Button variant="outlined" component="span" fullWidth>
                Select File
              </Button>
            </label>
          </Box>

          {/* Upload Button */}
          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              fullWidth
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </Button>
          </Box>

          {/* Message Section */}
          {message && (
            <Alert severity={message.includes('success') ? 'success' : 'error'}>{message}</Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PassportUpload;

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Card, CardContent, Button, Typography, Paper, Box } from '@mui/material';
import { PassportData } from '../../models/PassportData';
import { getPassportData as getRefinedPassportData, getPassportDataVerification, putPassportData } from '../../api/apiService';
import { toast, ToastContainer } from 'react-toastify';
import { customToastStyle } from '../../themes/toastStyles';
import { RefinedPassportDataItem } from '../../models/RefinedPassportDataItem';

interface PassportDetailsProps {
  passport: PassportData;
}

const PassportDetails: React.FC<PassportDetailsProps> = ({ passport }) => {
  const [data, setData] = useState<{ displayName: String; propertyName: string; ocrValue: string; value: string; isValid?: boolean | null }[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const refinedData = await getRefinedPassportData(passport.partitionKey, passport.rowKey);
  
        const rows = Object.keys(passport)
          .filter((key) => key !== 'rowKey' && key !== 'partitionKey')
          .map((key) => {
            const refinedProperty = refinedData.find(item => item.propertyName.toLowerCase() === key.toLowerCase())

            return {
              displayName: key,
              propertyName: key,
              ocrValue: passport[key as keyof PassportData],
              value: refinedProperty?.suggestedValue ?? passport[key as keyof PassportData],
            };
        });

        setData(rows);

      } catch (error) {
        console.error("Error fetching passport data:", error);
      }
  };

  initData();

  }, [passport]);

  const handleInputChange = (index: number, newValue: string) => {
    const updatedData = [...data];
    updatedData[index].value = newValue;
    setData(updatedData);
  };

  const handleVerify = async () => {
    try {
      // Construct the verificationData object
      const verificationData = data.reduce((acc, row) => {
        acc[row.propertyName as keyof PassportData] = row.value;
        return acc;
      }, {} as PassportData);

      // Send verification data to the backend
      const refinedData = await getPassportDataVerification(verificationData);
      
      updateRefinedData(refinedData);
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  const updateRefinedData = (refinedData: RefinedPassportDataItem[]) => {
      const updatedData = data.map((row) => {
        
        const refinedResult = refinedData.find(
          (item) => item.propertyName.toLowerCase() === row.propertyName.toLowerCase()
        );
        if (refinedResult) {
          
          return {
            ...row,
            value: refinedResult.suggestedValue,
            isValid: refinedResult.isValid,
          };
        }
        
        return row;
      });
  
      setData(updatedData);
    }

  const handleSave = async () => {
    try {
        const verificationData = data.reduce((acc, row) => {
            acc[row.propertyName as keyof PassportData] = row.value;
            return acc;
        }, {} as PassportData);

        verificationData.rowKey = passport.rowKey;
        verificationData.partitionKey = passport.partitionKey;

        // Send the data to the backend
        const response = await putPassportData(verificationData);
        
        toast.success('Passport data has been saved successfully!', { style:customToastStyle('success') });
    } catch (error) {
        console.error('Save failed:', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <ToastContainer/>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '25%' }}>
                <Typography variant="h6">Property Name</Typography>
              </TableCell>
              <TableCell sx={{ width: '35%', wordWrap: 'break-word', whiteSpace: 'normal' }}>
                <Typography variant="h6">OCR Value</Typography>
              </TableCell>
              <TableCell sx={{ width: '40%' }}>
                <Typography variant="h6">Value To Save</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {/* Label 1 Column */}
                <TableCell>{row.displayName}</TableCell>

                {/* Label 2 Column */}
                <TableCell sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                  {row.ocrValue}
                </TableCell>

                {/* Input Field Column */}
                <TableCell
                  sx={{
                    backgroundColor: row.isValid === false
                      ? 'error.light'
                      : row.isValid === null
                      ? 'warning.light'
                      : 'inherit',
                  }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={row.value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    error={row.isValid === false}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Row for Action Button */}
      <Box sx={{ marginTop: 2 }}>
        <Card variant="outlined">
          <CardContent>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleVerify}
              sx={{ width: '100%' }}
            >
              Verify Against Machine Readable Zone
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ width: '100%' }}
            >
              Save All Changes
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default PassportDetails;

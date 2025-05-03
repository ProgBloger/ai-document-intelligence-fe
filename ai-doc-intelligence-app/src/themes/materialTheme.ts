import { createTheme } from '@mui/material/styles';

export const materialTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#0D2538', // Dark blue for primary elements
        contrastText: '#FFFFFF', // Ensure white text on primary elements
      },
      secondary: {
        main: '#00B0FF', // Cyan for accents
        contrastText: '#000000', // Ensure black text on secondary elements (light cyan background)
      },
      error: {
        main: '#F44336', // Bright red for errors
        contrastText: '#FFFFFF', // White text for error elements
      },
      warning: {
        main: '#FF9800', // Amber for warnings
        contrastText: '#000000', // Black text for warning elements (light amber background)
      },
      info: {
        main: '#2196F3', // Light blue for informational elements
        contrastText: '#FFFFFF', // White text for info elements
      },
      background: {
        default: '#1F2A37', // Dark gray background
        paper: '#263238', // Slightly lighter gray for card-like elements
      },
      text: {
        primary: '#FFFFFF', // White text for primary content
        secondary: '#B0BEC5', // Light gray for secondary content
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none', // Disable uppercase for all buttons
          },
          outlined: {
            color: '#FFFFFF', // Ensure outlined button text is white
            borderColor: '#00B0FF', // Adjust border color to contrast with dark backgrounds
            '&:hover': {
              borderColor: '#00B0FF',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#263238', // Ensure paper background contrasts well with text
            color: '#FFFFFF', // White text on Paper components
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: '#FFFFFF', // Ensure all typography defaults to white
          },
        },
      },
    },
  });
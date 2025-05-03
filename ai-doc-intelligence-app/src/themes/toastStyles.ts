import { materialTheme } from "./materialTheme";

type ToastType = 'success' | 'error' | 'warning' | 'info';

export const customToastStyle = (type: ToastType) => {
    const { palette } = materialTheme;
  
    switch (type) {
      case 'error':
        return {
          backgroundColor: palette.error.main,
          color: palette.error.contrastText,
          borderRadius: '8px', // Optional: adding some styling such as rounded corners
        };
      case 'warning':
        return {
          backgroundColor: palette.warning.main,
          color: palette.warning.contrastText,
          borderRadius: '8px',
        };
      case 'info':
        return {
          backgroundColor: palette.info.main,
          color: palette.info.contrastText,
          borderRadius: '8px',
        };
      case 'success':
        return {
          backgroundColor: palette.primary.main,
          color: palette.primary.contrastText,
          borderRadius: '8px',
        };
      default:
        return {
          backgroundColor: palette.primary.main,
          color: palette.primary.contrastText,
          borderRadius: '8px',
        };
    }
  };
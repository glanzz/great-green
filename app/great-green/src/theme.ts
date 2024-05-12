import { createTheme } from '@mui/material/styles';
export default createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: "1px solid #487e4c" // Color is primary.light
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid #f1f1f1"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #f1f1f1"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8 // Everybutton should have this
        }
      }
    }
  },
  palette: {
    primary: {
      light: "#487e4c",
      dark: "#124116",
      main: "#1b5e20",
      contrastText: "#fffff"
    },
    secondary: {
      dark: "#567d2e",
      light: "#96c267",
      main: "#7cb342",
      contrastText: "#ffffff"
    },
    contrastThreshold: 3,
    tonalOffset: 0.2
  },
  typography: {
    fontFamily: [
      "Montserrat",
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','), // prefer montserrat
      allVariants: {
        color: "#1f1f1f" // Contrast color for the pallete
      },
  },
});

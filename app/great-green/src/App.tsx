import { ThemeProvider } from '@mui/material/styles';
import './App.css'
import { Outlet } from 'react-router-dom';
import theme from './theme';
import Authenticate from './components/Authenticate';
import { useTranslation } from 'react-i18next';
import { languageSelect } from './utils/helpers';
import NavBar from './components/Navbar';
import { useEffect } from 'react';
import { CssBaseline } from '@mui/material';

function App() {
  const { i18n } = useTranslation("common")

  useEffect(() => {
    languageSelect(i18n);
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Authenticate>
          <NavBar />
          <Outlet></Outlet>
      </Authenticate>
    </ThemeProvider>
  )
}

export default App

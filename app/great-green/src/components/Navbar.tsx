import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useTranslation} from '../../node_modules/react-i18next';

const NavBar = () => {
  //Internationalization
  const {t} = useTranslation('common');
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState<boolean>(false);
  const navigation = [
    {
      name: t('navbar.title1'),
      location: "/home"
    },
    {
      name: t('navbar.item.label1'),
      location: "/home/journeys"
    },
    {
      name: t('navbar.item.label2'),
      location: "/home/contributions"
    },
    {
      name: "Logout",
      location: "/"
    }
  ];


  return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{borderRadius: 0, border: 0}} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setShowNav(true)}
          >
            <MenuIcon sx={{color: "white"}} />
          </IconButton>
          <img src="/logowhite.png" style={{width: "90px"}} alt="Great Green" />
        </Toolbar>
      </AppBar>
      <Drawer color='primary' open={showNav} onClose={() => setShowNav(false)}>
        <Box sx={{ width: 300 }} role="presentation">
          <List sx={{marginTop: "14vh"}}>
            <ListItem>
              <img src="/logo.png" style={{width: "100px"}} alt="Great Green" />
            </ListItem>
            {navigation.map((navItem) => (
              <><ListItem key={navItem.name}>
                <ListItemButton onClick={() => navigate(navItem.location)}>
                  <ListItemText primary={navItem.name} />
                </ListItemButton>
              </ListItem>
              </>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  )
};

export default NavBar;

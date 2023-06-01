import AppBar from '@mui/material/AppBar';
import PetsIcon from '@mui/icons-material/Pets';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppToolbar = () => {
  return (
    <AppBar position='relative'>
      <Toolbar>
        <PetsIcon sx={{ mr: 2 }} />
        <Typography variant='h6' color='inherit' noWrap>
          Cat and dog classifier
        </Typography>
      </Toolbar>
   </AppBar>
  );
};

export default AppToolbar;

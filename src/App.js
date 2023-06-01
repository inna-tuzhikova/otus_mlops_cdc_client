import Content from './components/Content';
import Toolbar from './components/Toolbar';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from './assets/theme';

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Toolbar />
      <Content />
    </ThemeProvider>
  );
}

export default App;

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily:
      '"Roboto", "Noto Sans Bengali", "Helvetica", "Arial", sans-serif'
  },
  palette: {
    secondary: {
      main: '#9E5BBA',
      contrastText: '#fff'
    }
  },
  width: {
    drawer: 240
  },
  height: {
    banner: 64
  }
});

export default theme;

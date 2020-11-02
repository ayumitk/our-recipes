import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    fontSize: 14,
  },
  palette: {
    primary: {
      light: 'rgba(241,195,74,0.44)',
      main: '#f1c34a',
      dark: '#002884',
      contrastText: '#000',
    },
    secondary: {
      light: 'rgba(176,196,114,0.44)',
      main: '#f6f6f6',
      dark: '#3b6635',
      contrastText: '#000',
    },
    text: {
      primary: '#2d2d2d',
      secondary: '#666',
    },
  },
})

export default theme

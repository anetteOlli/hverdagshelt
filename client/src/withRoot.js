// @flow
import React from 'react';
import type { ComponentType } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import bluegrey from '@material-ui/core/colors/blueGrey';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[200],
      main: blue[500],
      dark: blue[700]
    },
    secondary: {
      light: bluegrey[300],
      main: bluegrey[500],
      dark: bluegrey[700]
    },
    error: {
      light: red[300],
      main: red[500],
      dark: red[700]
    }
  },
  typography: {
    useNextVariants: true
  }
});

function withRoot<T>(Component: ComponentType<T>) {
  function WithRoot(props: Object) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }
  return WithRoot;
}

export default withRoot;

// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import bluegrey from '@material-ui/core/colors/blueGrey';
import CssBaseline from '@material-ui/core/CssBaseline';

// A theme with custom primary and secondary color.
// It's optional.
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
    }
  },

  /*
  palette: {
    primary: {
      light: palette.primary[300],
      main: palette.primary[500],
      dark: palette.primary[700],
      contrastText: getContrastText(palette.primary[500]),
    },
    secondary: {
      light: palette.secondary.A200,
      main: palette.secondary.A400,
      dark: palette.secondary.A700,
      contrastText: getContrastText(palette.secondary.A400),
    },
    error: {
      light: palette.error[300],
      main: palette.error[500],
      dark: palette.error[700],
      contrastText: getContrastText(palette.error[500]),
    },
  },
  */
  typography: {
    useNextVariants: true
  }
});

function withRoot(Component: ComponentType<*>) {
  function WithRoot(props: Object) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;

import React, { Component } from 'react'
import { ThemeProvider, CssBaseline, withStyles } from '@material-ui/core'
import Header from './Header'
import Footer from './Footer'
import theme from '../styles/theme'

const styles = () => ({
  root: {
    color: theme.palette.text.primary,
    '& a': {
      // color: theme.palette.primary.main,
    },
  },
})

class Template extends Component {
  render() {
    const { location, children, classes } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = `${__PATH_PREFIX__}/`
    }

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <Header />
          {children}
          <Footer />
        </div>
      </ThemeProvider>
    )
  }
}

export default withStyles(styles)(Template)

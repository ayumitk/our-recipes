import React from 'react'
import { ThemeProvider, CssBaseline, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import theme from '../styles/theme'

const useStyles = makeStyles({
  root: {
    color: theme.palette.text.primary,
    '& a': {
      // color: theme.palette.primary.main,
    },
  },
})

const Layout = ({ children }) => {
  const classes = useStyles()

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

export default Layout

Layout.propTypes = {
  children: PropTypes.array.isRequired,
}

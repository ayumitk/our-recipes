import React from 'react'
import { ThemeProvider, CssBaseline, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import theme from '../styles/theme'
import useBuildTime from '../hooks/useBuildTime'
import SEO from './SEO'

const useStyles = makeStyles({
  root: {
    color: theme.palette.text.primary,
    '& a': {
      // color: theme.palette.primary.main,
    },
  },
})

const Layout = ({ children, customSEO }) => {
  const classes = useStyles()
  const buildTime = useBuildTime()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!customSEO && <SEO buildTime={buildTime} />}
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
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  customSEO: PropTypes.bool,
}

Layout.defaultProps = {
  customSEO: false,
}

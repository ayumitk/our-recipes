import React from 'react'
import { Link } from 'gatsby-plugin-intl'
import { makeStyles, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import theme from '../styles/theme'
import Language from './Language'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: `Lobster, cursive`,
  },
  titleLink: {
    color: theme.palette.text.primary,
    textDecoration: `none`,
  },
}))

const Header = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" align="center" className={classes.title}>
            <Link to="/" className={classes.titleLink}>
              Our Recipes
            </Link>
          </Typography>
          <Language />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header

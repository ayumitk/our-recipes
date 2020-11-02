import React, { useState } from 'react'
import { Link } from 'gatsby-plugin-intl'
import {
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Drawer,
} from '@material-ui/core'
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
  const [state, setState] = useState({
    isOpen: false,
  })

  const toggleDrawer = (isOpen) => () => {
    setState({ isOpen: !isOpen })
  }

  return (
    <div className={classes.root}>
      <AppBar position="relative" color="transparent" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer()}
          >
            <MenuIcon />
          </IconButton>

          <Drawer anchor="left" open={state.isOpen} onClose={toggleDrawer(state.isOpen)}>
            <List>
              <ListItem>
                <ListItemText>
                  <Link to="/category/north-american/">North American</Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link to="/category/mexican/">Mexican</Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link to="/category/dessert/">Dessert</Link>
                </ListItemText>
              </ListItem>
            </List>
          </Drawer>

          <Typography variant="h4" align="center" className={classes.title}>
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

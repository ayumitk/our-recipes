import React, { useState } from 'react'
import { Link, useIntl } from 'gatsby-plugin-intl'
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
  Divider,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useStaticQuery, graphql } from 'gatsby'
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
  drawer: {
    '& .MuiDrawer-paper': { backgroundColor: theme.palette.text.primary },
  },
  list: {
    width: 250,
    '& a': {
      color: `#fff`,
      textDecoration: `none`,
    },
    '& .MuiDivider-root': {
      backgroundColor: `rgba(255,255,255,0.2)`,
    },
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

  const intl = useIntl()

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          siteTitle
        }
      }
      allContentfulCategory {
        edges {
          node {
            slug
            title
            node_locale
          }
        }
      }
    }
  `)
  const { siteTitle } = data.site.siteMetadata
  let categories = data.allContentfulCategory.edges
  categories = categories.filter((lang) => lang.node.node_locale === intl.locale)

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

          <Drawer anchor="left" open={state.isOpen} onClose={toggleDrawer(state.isOpen)} className={classes.drawer}>
            <List className={classes.list}>
              {categories.map((category) => (
                <ListItem key={category.node.slug}>
                  <ListItemText>
                    <Link to={`/category/${category.node.slug}/`}>{category.node.title}</Link>
                  </ListItemText>
                </ListItem>
              ))}
              <Divider />
              <ListItem>
                <ListItemText>
                  <Link to="/about/">{intl.locale === 'en' ? 'About' : '私たちについて'}</Link>
                </ListItemText>
              </ListItem>
            </List>
          </Drawer>

          <Typography variant="h4" align="center" className={classes.title}>
            <Link to="/" className={classes.titleLink}>
              OurRecipes
            </Link>
          </Typography>
          <Language />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header

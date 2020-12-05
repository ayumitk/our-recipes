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
import { useStaticQuery, graphql } from 'gatsby'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import MailIcon from '@material-ui/icons/Mail'
import LockIcon from '@material-ui/icons/Lock'
import MenuBookIcon from '@material-ui/icons/MenuBook'
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
    paddingBottom: `5rem`,
    '& a': {
      color: `#fff`,
      textDecoration: `none`,
      display: `flex`,
      padding: `0.75rem 1rem`,
      fontSize: `1rem`,
      '& .MuiSvgIcon-root': {
        verticalAlign: `middle`,
        marginRight: `8px`,
      },
      '& span': {
        paddingTop: `3px`,
      },
    },
    '& .MuiDivider-root': {
      backgroundColor: `rgba(255,255,255,0.2)`,
      margin: `0.5rem 0`,
    },
    '& li p': {
      color: `#fff`,
      padding: `0.75rem 1rem`,
      fontSize: `1rem`,
      margin: 0,
    },
    '& li ul': {
      color: `#fff`,
      listStyle: `square`,
    },
    '& li ul li a': {
      padding: `0.5rem 0`,
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
              <li>
                <Link to="/">
                  <HomeIcon />
                  <span>{intl.locale === 'en' ? 'Home' : 'ホーム'}</span>
                </Link>
              </li>
              <Divider />
              <li>
                <p>カテゴリ：</p>
                <ul>
                  {categories.map((category) => (
                    <li key={category.node.slug}>
                      <Link to={`/category/${category.node.slug}/`}>{category.node.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <Divider />
              <li>
                <Link to="/blog/">
                  <MenuBookIcon />
                  <span>{intl.locale === 'en' ? 'Blog' : 'ブログ'}</span>
                </Link>
              </li>
              <li>
                <Link to="/about-us/">
                  <EmojiEmotionsIcon />
                  <span>{intl.locale === 'en' ? 'About' : '私たちについて'}</span>
                </Link>
              </li>
              <li>
                <Link to="/contact/">
                  <MailIcon />
                  <span>{intl.locale === 'en' ? 'Contact' : 'お問い合わせ'}</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy/">
                  <LockIcon />
                  <span>{intl.locale === 'en' ? 'Privacy Policy' : 'プライバシーポリシー'}</span>
                </Link>
              </li>
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

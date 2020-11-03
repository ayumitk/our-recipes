import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { useStaticQuery, graphql } from 'gatsby'
import theme from '../styles/theme'

const useStyles = makeStyles(() => ({
  root: {
    fontSize: `0.875rem`,
    borderTop: `solid 1px #c3c3c3`,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  heart: {
    height: `0.875rem`,
    width: `0.875rem`,
    verticalAlign: `middle`,
    fill: `#DA6B3A`,
  },
}))

const Footer = () => {
  const classes = useStyles()

  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          siteTitle
        }
      }
    }
  `)
  const { siteTitle } = data.site.siteMetadata

  return (
    <Typography align="center" className={classes.root}>
      &copy; {new Date().getFullYear()} {siteTitle}. Made with <FavoriteIcon className={classes.heart} /> in Canada.
    </Typography>
  )
}

export default Footer

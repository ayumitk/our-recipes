import React from 'react'
import { Link } from 'gatsby-plugin-intl'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

import { makeStyles, Card, CardActionArea, Typography, CardContent, CardMedia, CardActions } from '@material-ui/core'
import theme from '../styles/theme'

const useStyles = makeStyles({
  root: {
    '& a': {
      textDecoration: 'none',
    },
    '& .MuiCardContent-root': {
      [theme.breakpoints.down('xs')]: {
        padding: `10px`,
      },
    },
    '& .MuiCardActions-root': {
      paddingTop: 0,
    },
  },
  media: {
    height: `200px`,
    [theme.breakpoints.down('xs')]: {
      height: `130px`,
    },
  },
  cardLink: {
    color: theme.palette.text.primary,
  },
  title: {
    fontSize: `1.25rem`,
    lineHeight: `1.25`,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    fontWeight: `bold`,
    [theme.breakpoints.down('xs')]: {
      fontSize: `0.937rem`,
    },
  },
  category: {
    fontSize: `0.75rem`,
    backgroundColor: theme.palette.text.primary,
    color: `#fff`,
    display: `inline-block`,
    padding: `0.15rem 0.75rem`,
    [theme.breakpoints.down('xs')]: {
      fontSize: `0.687rem`,
      padding: `0.1rem 0.5rem`,
    },
  },
  date: {
    [theme.breakpoints.down('xs')]: {
      fontSize: `0.75rem`,
    },
  },
  tagList: {
    paddingBottom: theme.spacing(3),
    flexWrap: `wrap`,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: `5px`,
      paddingRight: `5px`,
    },
  },
  tag: {
    backgroundColor: `#f2ebd1`,
    color: theme.palette.text.primary,
    display: `inline-block`,
    padding: `0 0.75rem`,
    lineHeight: `26px`,
    borderRadius: `13px`,
    fontSize: `0.75rem`,
    margin: `0.1rem !important`,
    [theme.breakpoints.down('xs')]: {
      fontSize: `0.687rem`,
      lineHeight: `22px`,
      borderRadius: `11px`,
      padding: `0 0.5rem`,
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
})

const ArticlePreview = ({ article }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={`/recipe/${article.slug}/`} className={classes.cardLink}>
          <CardMedia>
            <Img alt={article.title} fluid={article.heroImage.fluid} className={classes.media} />
          </CardMedia>
        </Link>
        <CardContent>
          {article.categories.map((category) => (
            <Link to={`/category/${category.slug}/`} key={category.slug} className={classes.category}>
              {category.title}
            </Link>
          ))}
          <Link to={`/recipe/${article.slug}/`} className={classes.cardLink}>
            <Typography component="h2" className={classes.title}>
              {article.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" className={classes.date}>
              {article.publishDate}
            </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
      {article.tags && (
        <CardActions className={classes.tagList}>
          {article.tags.map((tag) => (
            <Link to={`/tag/${tag.slug}/`} key={tag.slug} className={classes.tag}>
              {tag.title}
            </Link>
          ))}
        </CardActions>
      )}
    </Card>
  )
}

export default ArticlePreview

ArticlePreview.propTypes = {
  article: PropTypes.object.isRequired,
}

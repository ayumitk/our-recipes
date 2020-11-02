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
  },
  media: {
    height: `200px`,
  },
  cardLink: {
    color: theme.palette.text.primary,
  },
  title: {
    lineHeight: `1.25`,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
  category: {
    fontSize: `0.75rem`,
    backgroundColor: theme.palette.text.primary,
    color: `#fff`,
    display: `inline-block`,
    padding: `0.15rem 0.75rem`,
  },
  tagList: {
    paddingBottom: `2rem`,
  },
  tag: {
    backgroundColor: `#f2ebd1`,
    color: theme.palette.text.primary,
    display: `inline-block`,
    padding: `0 0.75rem`,
    lineHeight: `26px`,
    borderRadius: `13px`,
    fontSize: `0.75rem`,
    marginLeft: `0.15rem !important`,
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
              {category.categoryName}
            </Link>
          ))}
          <Link to={`/recipe/${article.slug}/`} className={classes.cardLink}>
            <Typography variant="h6" component="h2" className={classes.title}>
              {article.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {article.publishDate}
            </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.tagList}>
        {article.tags.map((tag) => (
          <Link to={`/tag/${tag.slug}/`} key={tag.slug} className={classes.tag}>
            {tag.tagName}
          </Link>
        ))}
      </CardActions>
    </Card>
  )
}

export default ArticlePreview

ArticlePreview.propTypes = {
  article: PropTypes.object.isRequired,
}

import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import { MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { injectIntl, Link } from 'gatsby-plugin-intl'
import { Typography, withStyles, Container } from '@material-ui/core'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import theme from '../styles/theme'

const styles = () => ({
  root: {},
  container: {
    paddingBottom: theme.spacing(6),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  category: {
    fontSize: `0.937rem`,
    backgroundColor: theme.palette.text.primary,
    color: `#fff`,
    display: `inline-block`,
    padding: `0.15rem 0.75rem`,
    textDecoration: `none`,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  },
  tag: {
    backgroundColor: `#f2ebd1`,
    color: theme.palette.text.primary,
    display: `inline-block`,
    padding: `0 1rem`,
    lineHeight: `34px`,
    borderRadius: `17px`,
    fontSize: `0.937rem`,
    marginRight: `0.15rem`,
    textDecoration: `none`,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
})

const Bold = ({ children }) => <strong>{children}</strong>

Bold.propTypes = {
  children: PropTypes.string,
}

Bold.defaultProps = {
  children: '',
}

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
}

class RecipePostTemplate extends Component {
  render() {
    const post = get(this.props, 'data.contentfulRecipe')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    const { classes, location, pageContext } = this.props

    const { language } = pageContext.intl
    console.log(language)

    return (
      <Layout location={location}>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <Container
          maxWidth="md"
          className={classes.container}
          style={{ fontSize: `${language === 'en' ? '1.125rem' : `1rem`}` }}
        >
          <div>
            <Img alt={post.title} fluid={post.heroImage.fluid} />
          </div>
          {post.categories.map((category) => (
            <Link to={`/category/${category.slug}/`} key={category.slug} class={classes.category}>
              {category.categoryName}
            </Link>
          ))}
          <Typography component="h1" variant="h4" className={classes.title}>
            {post.title}
          </Typography>
          <Typography>{post.publishDate}</Typography>
          <div>
            {post.tags.map((tag) => (
              <a href={`/tag/${tag.slug}/`} key={tag.slug} className={classes.tag}>
                {tag.tagName}
              </a>
            ))}
          </div>
          <div>{documentToReactComponents(post.body.json, options)}</div>
        </Container>
      </Layout>
    )
  }
}

export default compose(injectIntl, withStyles(styles))(RecipePostTemplate)

RecipePostTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query RecipePostBySlug($slug: String, $locale: String) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulRecipe(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1200) {
          ...GatsbyContentfulFluid
        }
      }
      categories {
        categoryName
        slug
      }
      tags {
        tagName
        slug
      }
      body {
        json
      }
    }
  }
`

import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import { MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { injectIntl } from 'gatsby-plugin-intl'
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
          <Typography component="h1" variant="h4" className={classes.title}>
            {post.title}
          </Typography>
          <p>
            {post.categories.map((category) => (
              <a href={`/category/${category.slug}/`} key={category.slug}>
                {category.categoryName}
              </a>
            ))}
          </p>
          <p>
            {post.tags.map((tag) => (
              <a href={`/tag/${tag.slug}/`} key={tag.slug}>
                {tag.tagName}
              </a>
            ))}
          </p>
          <p>{post.publishDate}</p>
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

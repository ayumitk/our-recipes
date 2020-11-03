import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'gatsby-plugin-intl'
import compose from 'recompose/compose'
import { Typography, withStyles, Container } from '@material-ui/core'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import theme from '../styles/theme'
import SEO from '../components/SEO'

const styles = () => ({
  root: {},
  articleList: {
    display: `grid`,
    gridTemplateColumns: `repeat(4, 1fr)`,
    gridColumnGap: `20px`,
    gridRowGap: `20px`,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: `repeat(3, 1fr)`,
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: `repeat(1, 1fr)`,
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  },
  sectionHeadline: {
    marginBottom: theme.spacing(3),
  },
})

class CategoryIndex extends Component {
  render() {
    // const siteTitle = get(this, 'props.data.site.siteMetadata.siteTitle')
    const posts = get(this, 'props.data.allContentfulRecipe.edges')
    const categories = get(this, 'props.data.allContentfulCategory.edges')
    const category = categories[0].node

    const { classes, location } = this.props

    return (
      <Layout location={location} customSEO>
        {/* <Helmet title={siteTitle} /> */}
        <SEO archive={category} />
        <Container className={classes.container}>
          <Typography component="h1" variant="h5" align="center" className={classes.sectionHeadline}>
            {category.title}
          </Typography>
          <div className={classes.articleList}>
            {posts.map(({ node }) => (
              <ArticlePreview key={node.slug} article={node} />
            ))}
          </div>
        </Container>
      </Layout>
    )
  }
}

export default compose(injectIntl, withStyles(styles))(CategoryIndex)

CategoryIndex.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query CategoryIndexQuery($locale: String, $category: String) {
    site {
      siteMetadata {
        siteTitle
      }
    }
    allContentfulRecipe(
      sort: { fields: [publishDate], order: DESC }
      filter: { node_locale: { eq: $locale }, categories: { elemMatch: { slug: { eq: $category } } } }
    ) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          heroImage {
            fluid(maxWidth: 1200) {
              ...GatsbyContentfulFluid
            }
          }
          categories {
            title
            slug
          }
          tags {
            title
            slug
          }
        }
      }
    }
    allContentfulCategory(filter: { node_locale: { eq: $locale }, slug: { eq: $category } }) {
      edges {
        node {
          title
          slug
          description {
            description
          }
          image {
            fluid {
              src
            }
          }
        }
      }
    }
  }
`

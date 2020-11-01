import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'gatsby-plugin-intl'
import compose from 'recompose/compose'
import { Typography, withStyles, Container } from '@material-ui/core'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import theme from '../styles/theme'

const styles = () => ({
  root: {},
  articleList: {
    display: `grid`,
    gridTemplateColumns: `repeat(4, 1fr)`,
    gridColumnGap: `20px`,
    gridRowGap: `20px`,
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
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulRecipe.edges')
    const category = get(this, 'props.data.allContentfulCategory.edges')

    const { classes } = this.props

    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <Container className={classes.container}>
          <Typography component="h1" variant="h5" align="center" className={classes.sectionHeadline}>
            {category[0].node.categoryName}
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

export const pageQuery = graphql`
  query CategoryIndexQuery($locale: String, $category: String) {
    site {
      siteMetadata {
        title
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
            categoryName
            slug
          }
          tags {
            tagName
            slug
          }
        }
      }
    }
    allContentfulCategory(filter: { node_locale: { eq: $locale }, slug: { eq: $category } }) {
      edges {
        node {
          categoryName
          slug
        }
      }
    }
  }
`

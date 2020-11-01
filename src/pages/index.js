import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'gatsby-plugin-intl'
import { Typography, withStyles, Container } from '@material-ui/core'
import compose from 'recompose/compose'
import ArticlePreview from '../components/article-preview'
import Layout from '../components/layout'
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

class RootIndex extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulRecipe.edges')

    const { classes } = this.props

    const { intl } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <Container className={classes.container}>
          <Typography component="h1" variant="h5" align="center" className={classes.sectionHeadline}>
            {intl.messages.recentRecipes}
          </Typography>
          <div className={classes.articleList}>
            {posts.map(({ node }) => (
              <ArticlePreview article={node} key={node.slug} />
            ))}
          </div>
        </Container>
      </Layout>
    )
  }
}

export default compose(injectIntl, withStyles(styles))(RootIndex)

export const pageQuery = graphql`
  query HomeQuery($locale: String) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulRecipe(sort: { fields: [publishDate], order: DESC }, filter: { node_locale: { eq: $locale } }) {
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
  }
`

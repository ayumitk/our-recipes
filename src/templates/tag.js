import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'gatsby-plugin-intl'
import { Typography, withStyles, Container } from '@material-ui/core'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
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

class TagIndex extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulRecipe.edges')
    const tag = get(this, 'props.data.allContentfulTag.edges')

    const { classes, location } = this.props

    return (
      <Layout location={location}>
        <Helmet title={siteTitle} />
        <Container className={classes.container}>
          <Typography component="h1" variant="h5" align="center" className={classes.sectionHeadline}>
            {tag[0].node.title}
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

export default compose(injectIntl, withStyles(styles))(TagIndex)

TagIndex.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query TagIndexQuery($locale: String, $tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulRecipe(
      sort: { fields: [publishDate], order: DESC }
      filter: { node_locale: { eq: $locale }, tags: { elemMatch: { slug: { eq: $tag } } } }
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
    allContentfulTag(filter: { node_locale: { eq: $locale }, slug: { eq: $tag } }) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`

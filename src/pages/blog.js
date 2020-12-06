import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { injectIntl, Link } from 'gatsby-plugin-intl'
import { Typography, withStyles, Container } from '@material-ui/core'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import theme from '../styles/theme'
import SEO from '../components/SEO'

const styles = () => ({
  root: {},
  title: {
    marginBottom: theme.spacing(1),
    fontWeight: `bold`,
    fontSize: `2.5rem`,
    lineHeight: `1.25`,
    [theme.breakpoints.down('xs')]: {
      fontSize: `1.75rem`,
    },
  },
  articleItem: {
    display: `flex`,
  },
  articleImage: {
    width: `200px`,
    '& .gatsby-image-wrapper': {
      height: `150px`,
    },
  },
  articleText: {
    flex: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  },
})

class RootIndex extends Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlog.edges')
    const { classes, location, pageContext } = this.props
    const lang = pageContext.intl.language

    const page = {
      title: lang === 'en' ? 'Blog' : 'ブログ',
      description: lang === 'en' ? '' : '',
      image: '',
      slug: 'blog',
    }

    return (
      <Layout location={location} customSEO>
        <SEO page={page} />
        <Container maxWidth="md" className={classes.container}>
          <Typography component="h1" gutterBottom className={classes.title} align="center">
            {lang === 'en' ? 'Blog' : 'ブログ'}
          </Typography>
          <div>
            {posts.map(({ node }) => (
              <Link to={`/blog/${node.slug}/`} key={node.slug} className={classes.articleItem}>
                <div className={classes.articleImage}>
                  <Img alt={node.title} fluid={node.heroImage.fluid} />
                </div>
                <div className={classes.articleText}>
                  <h2>{node.title}</h2>
                  <Typography variant="body2" color="textSecondary">
                    {node.description && node.description.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {node.publishDate}
                  </Typography>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Layout>
    )
  }
}

export default compose(injectIntl, withStyles(styles))(RootIndex)

RootIndex.propTypes = {
  classes: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query BlogQuery($locale: String) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlog(sort: { fields: [publishDate], order: DESC }, filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "YYYY/MM/DD")
          heroImage {
            fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid
            }
          }
          description {
            description
          }
        }
      }
    }
  }
`

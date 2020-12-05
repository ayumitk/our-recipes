import React, { Component } from 'react'
import { graphql } from 'gatsby'
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
import SEO from '../components/SEO'

const styles = () => ({
  root: {},
  heroImage: {
    // maxWidth: `912px`,
    // margin: `auto`,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
    maxWidth: `728px`,
  },
  title: {
    marginBottom: theme.spacing(1),
    fontWeight: `bold`,
    fontSize: `2rem`,
    lineHeight: `1.25`,
    [theme.breakpoints.down('xs')]: {
      fontSize: `1.5rem`,
    },
  },
  body: {
    lineHeight: `1.9`,
    '& h2': {
      marginTop: theme.spacing(10),
    },
    '& p': {
      marginTop: theme.spacing(4),
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

class BlogPostTemplate extends Component {
  render() {
    const post = get(this.props, 'data.contentfulBlog')
    const { classes, location, pageContext } = this.props
    const { language } = pageContext.intl

    return (
      <Layout location={location} customSEO>
        <SEO post={post} article />
        <Container
          maxWidth="md"
          className={classes.container}
          style={{ fontSize: `${language === 'en' ? '1.125rem' : `1rem`}` }}
        >
          <Typography component="h1" className={classes.title}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {language === 'en' ? 'Last Update: ' : `最終更新日：`} {post.updatedAt}
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ lineHeight: `1.8` }}>
            {post.description && post.description.description}
          </Typography>
          <div className={classes.heroImage}>
            <Img alt={post.title} fluid={post.heroImage.fluid} />
          </div>
          <div className={classes.body}>{documentToReactComponents(post.body.json, options)}</div>
        </Container>
      </Layout>
    )
  }
}

export default compose(injectIntl, withStyles(styles))(BlogPostTemplate)

BlogPostTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String, $locale: String) {
    site {
      siteMetadata {
        siteTitle
      }
    }
    contentfulBlog(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      title
      slug
      description {
        description
      }
      publishDate(formatString: "YYYY/MM/DD")
      updatedAt(formatString: "YYYY/MM/DD")
      heroImage {
        fluid(maxWidth: 1360) {
          ...GatsbyContentfulFluid
        }
      }
      body {
        json
      }
    }
  }
`

import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
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
  container: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    maxWidth: `728px`,
  },
  title: {
    marginBottom: theme.spacing(1),
    fontWeight: `bold`,
    fontSize: `2.5rem`,
    lineHeight: `1.25`,
    [theme.breakpoints.down('xs')]: {
      fontSize: `1.75rem`,
    },
  },
  body: {
    lineHeight: `1.9`,
    '& h2': {
      marginTop: theme.spacing(10),
      lineHeight: `1.25`,
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

class PagePostTemplate extends Component {
  render() {
    const post = get(this.props, 'data.contentfulPage')
    const { classes, location, pageContext } = this.props
    const { language } = pageContext.intl

    const page = {
      title: post.title,
      description: '',
      image: '',
      slug: post.slug,
    }

    return (
      <Layout location={location} customSEO>
        <SEO page={page} />
        <Container
          maxWidth="md"
          className={classes.container}
          style={{ fontSize: `${language === 'en' ? '1.125rem' : `1rem`}` }}
        >
          <Typography component="h1" gutterBottom className={classes.title} align="center">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            {language === 'en' ? 'Last Update: ' : `最終更新日：`} {post.updatedAt}
          </Typography>
          <div className={classes.body}>{documentToReactComponents(post.body.json, options)}</div>
        </Container>
      </Layout>
    )
  }
}

export default compose(injectIntl, withStyles(styles))(PagePostTemplate)

PagePostTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query PagePostBySlug($slug: String, $locale: String) {
    site {
      siteMetadata {
        siteTitle
      }
    }
    contentfulPage(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      title
      slug
      description {
        description
      }
      publishDate(formatString: "YYYY/MM/DD")
      updatedAt(formatString: "YYYY/MM/DD")
      body {
        json
      }
    }
  }
`

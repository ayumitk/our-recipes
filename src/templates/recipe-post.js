import React, { Component } from 'react'
import { graphql } from 'gatsby'
// import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import { MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { injectIntl, Link } from 'gatsby-plugin-intl'
import { Typography, withStyles, Container, Divider } from '@material-ui/core'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import theme from '../styles/theme'
import SEO from '../components/SEO'

const styles = () => ({
  root: {},
  heroImage: {
    maxWidth: `912px`,
    margin: `auto`,
  },
  container: {
    paddingBottom: theme.spacing(6),
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
  category: {
    fontSize: `0.875rem`,
    backgroundColor: theme.palette.text.primary,
    color: `#fff`,
    display: `inline-block`,
    padding: `0.15rem 0.75rem`,
    textDecoration: `none`,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      fontSize: `0.75rem`,
    },
  },
  tag: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: `#f2ebd1`,
    color: theme.palette.text.primary,
    display: `inline-block`,
    padding: `0 1rem`,
    lineHeight: `34px`,
    borderRadius: `17px`,
    fontSize: `0.875rem`,
    marginRight: `0.15rem`,
    textDecoration: `none`,
    [theme.breakpoints.down('xs')]: {
      fontSize: `0.75rem`,
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  body: {
    lineHeight: `1.9`,
    '& h2': {
      marginTop: theme.spacing(6),
      lineHeight: `1.25`,
    },
    '& p': {
      marginBottom: theme.spacing(4),
    },
    '& ol': {
      paddingLeft: 0,
      marginBottom: theme.spacing(6),
      counterReset: `number`,
      listStyle: `none`,
      '& li': {
        display: `flex`,
        alignItems: `start`,
        '& p': {
          marginTop: 0,
          flex: 1,
        },
        '&::before': {
          counterIncrement: `number`,
          content: 'counter(number)',
          background: theme.palette.primary.main,
          display: `block`,
          width: `30px`,
          lineHeight: `30px`,
          textAlign: `center`,
          borderRadius: `15px`,
          marginRight: theme.spacing(1),
          fontWeight: `bold`,
        },
      },
    },
    '& ul': {
      paddingLeft: `1.25rem`,
      marginBottom: theme.spacing(6),
      // fontSize: `1.125rem`,
      '& p': {
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
        '& i': {
          display: `block`,
          color: theme.palette.text.secondary,
          fontStyle: `normal`,
          fontSize: `0.75rem`,
          lineHeight: `1.3`,
        },
      },
    },
  },
  divider: {
    marginTop: theme.spacing(3),
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

    const { classes, location, pageContext } = this.props
    const { language } = pageContext.intl

    return (
      <Layout location={location} customSEO>
        <SEO post={post} article />
        {/* <Helmet title={`${post.title} | ${siteTitle}`} /> */}
        <div className={classes.heroImage}>
          <Img alt={post.title} fluid={post.heroImage.fluid} />
        </div>
        <Container
          maxWidth="md"
          className={classes.container}
          style={{ fontSize: `${language === 'en' ? '1.125rem' : `1rem`}` }}
        >
          {post.categories.map((category) => (
            <Link to={`/category/${category.slug}/`} key={category.slug} className={classes.category}>
              {category.title}
            </Link>
          ))}
          <Typography component="h1" className={classes.title}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {language === 'en' ? 'Last Update: ' : `最終更新日：`} {post.updatedAt}
          </Typography>
          <div>
            {post.tags.map((tag) => (
              <a href={`/tag/${tag.slug}/`} key={tag.slug} className={classes.tag}>
                {tag.title}
              </a>
            ))}
          </div>
          <Typography variant="body2" color="textSecondary" style={{ lineHeight: `1.8` }}>
            {post.description && post.description.description}
          </Typography>
          <Divider className={classes.divider} />
          <div className={classes.body}>{documentToReactComponents(post.body.json, options)}</div>
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
        siteTitle
      }
    }
    contentfulRecipe(slug: { eq: $slug }, node_locale: { eq: $locale }) {
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
      categories {
        title
        slug
      }
      tags {
        title
        slug
      }
      body {
        json
      }
    }
  }
`

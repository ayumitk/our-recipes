import React from 'react'
// import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { injectIntl } from 'gatsby-plugin-intl'
// import get from 'lodash/get'
import PropTypes from 'prop-types'
import { Typography, Container, makeStyles } from '@material-ui/core'
import Layout from '../components/layout'
import SEO from '../components/SEO'

const useStyles = makeStyles({
  root: {},
  container: {
    // paddingTop: theme.spacing(4),
    // paddingBottom: theme.spacing(6),
    minHeight: `70vh`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  sectionHeadline: {},
})

const NotFound = ({ location }) => {
  // const siteTitle = get(this, 'props.data.site.siteMetadata.siteTitle')

  const classes = useStyles()

  const page = {
    title: '404 Not Found',
    description: '404 Not Found description',
    image: '',
    slug: '',
  }

  return (
    <Layout location={location} customSEO>
      {/* <Helmet title={siteTitle} /> */}
      <SEO page={page} />
      <Container className={classes.container}>
        <Typography component="h1" variant="h5" align="center" className={classes.sectionHeadline}>
          404 Not Found
        </Typography>
      </Container>
    </Layout>
  )
}

export default injectIntl(NotFound)

NotFound.propTypes = {
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query NorFoundQuery {
    site {
      siteMetadata {
        siteTitle
      }
    }
  }
`

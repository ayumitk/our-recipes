import React from 'react'
import { injectIntl } from 'gatsby-plugin-intl'
import PropTypes from 'prop-types'
import { Typography, Container, makeStyles } from '@material-ui/core'
import Layout from '../components/layout'
import SEO from '../components/SEO'
import theme from '../styles/theme'

const useStyles = makeStyles({
  root: {},
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  },
  sectionHeadline: {},
})

const About = ({ location, intl }) => {
  const classes = useStyles()

  const page = {
    title: intl.locale === 'en' ? 'About Us' : '私たちについて',
    description: intl.locale === 'en' ? 'About description' : '私たちについての説明',
    image: '',
    slug: 'about',
  }

  return (
    <Layout location={location} customSEO>
      <SEO page={page} />
      <Container className={classes.container}>
        <Typography component="h1" variant="h4" align="center" className={classes.sectionHeadline}>
          {page.title}
        </Typography>
        <Typography align="center">Under Construction</Typography>
      </Container>
    </Layout>
  )
}

export default injectIntl(About)

About.propTypes = {
  location: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
}

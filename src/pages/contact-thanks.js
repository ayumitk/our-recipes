import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'gatsby-plugin-intl'
import { Container, Typography } from '@material-ui/core'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/SEO'

const ContactThanksPage = ({ data, pageContext, location }) => {
  const lang = pageContext.intl.language

  const page = {
    title: lang === 'en' ? 'Thank you!' : 'お問い合わせありがとうございます',
    description:
      lang === 'en'
        ? "Thank you! I'll get back to you shortly. Have a great day!"
        : 'お問い合わせありがとうございます。なるべく早く返信しますね！',
    image: '',
    slug: 'contact-thanks',
  }

  return (
    <Layout location={location} customSEO>
      <SEO page={page} />
      <Container maxWidth="md" style={{ textAlign: 'center', padding: '5rem 0 2.5rem 0' }}>
        <Img fixed={data.file.childImageSharp.fixed} />
        <Typography variant="h3" component="h1" gutterBottom>
          Thank you!
        </Typography>
        <p>{lang === 'en' ? "I'll get back to you shortly. Have a great day!" : 'なるべく早く返信しますね！'}</p>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "thanks.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

ContactThanksPage.propTypes = {
  data: PropTypes.shape({
    file: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fixed: PropTypes.object,
      }),
    }),
  }).isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default injectIntl(ContactThanksPage)

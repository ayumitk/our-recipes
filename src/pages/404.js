import React, {Component} from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { injectIntl } from "gatsby-plugin-intl"
import get from 'lodash/get'

class NotFound extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <h1>404 Not Found</h1>
      </Layout>
    )
  }
}

export default injectIntl(NotFound)

export const pageQuery = graphql`
  query NorFoundQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

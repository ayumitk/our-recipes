import React, {Component} from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import { injectIntl } from "gatsby-plugin-intl"

class RecipeIndex extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulRecipe.edges')

    const intl = this.props.pageContext.intl

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
            <h2 className="section-headline">{intl.messages.recipePageTitle}</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default injectIntl(RecipeIndex)

export const pageQuery = graphql`
  query RecipeIndexQuery($locale: String) {
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
          categories{
            categoryName
            slug
          }
          tags{
            tagName
            slug
          }
        }
      }
    }
  }
`

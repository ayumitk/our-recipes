import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { injectIntl } from 'gatsby-plugin-intl'
import { withStyles, Container, TextField } from '@material-ui/core'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search'
import ArticlePreview from '../components/article-preview'
import Layout from '../components/layout'
import theme from '../styles/theme'
import SEO from '../components/SEO'

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
      gridTemplateColumns: `repeat(2, 1fr)`,
      gridColumnGap: `10px`,
      gridRowGap: `10px`,
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  },
  searchForm: {
    marginBottom: theme.spacing(4),
  },
})

class RootIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredPosts: [],
      query: '',
    }
  }

  render() {
    const allPosts = get(this, 'props.data.allContentfulRecipe.edges')
    const { classes, location, pageContext } = this.props
    const lang = pageContext.intl.language

    const handleInputChange = (event) => {
      const query = event.target.value
      const filteredPosts = allPosts.filter((post) => {
        const { description, title, tags, categories } = post.node

        const tagsArr = []
        if (tags) {
          tags.forEach((tag) => tagsArr.push(tag.title))
        }

        const categoriesArr = []
        if (categories) {
          categories.forEach((tag) => categoriesArr.push(tag.title))
        }

        return (
          (description && description.description.toLowerCase().includes(query.toLowerCase())) ||
          title.toLowerCase().includes(query.toLowerCase()) ||
          tagsArr.join('').toLowerCase().includes(query.toLowerCase()) ||
          categoriesArr.join('').toLowerCase().includes(query.toLowerCase())
        )
      })
      this.setState({
        query,
        filteredPosts,
      })
    }

    const posts = this.state.query ? this.state.filteredPosts : allPosts

    return (
      <Layout location={location} customSEO>
        <SEO />
        <Container className={classes.container}>
          <div style={{ position: 'relative' }}>
            <SearchIcon style={{ position: 'absolute', right: 15, top: 15, width: 30, height: 30 }} />
            <TextField
              fullWidth
              label={lang === 'en' ? 'Search recipes' : 'レシピを検索'}
              variant="outlined"
              value={this.state.query}
              onChange={handleInputChange}
              className={classes.searchForm}
            />
          </div>

          <div className={classes.articleList}>
            {posts.map(({ node }) => (
              <ArticlePreview article={node} key={node.slug} />
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
  query HomeQuery($locale: String) {
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
          publishDate(formatString: "YYYY/MM/DD")
          heroImage {
            fluid(maxWidth: 800) {
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
          description {
            description
          }
        }
      }
    }
  }
`

const Promise = require('bluebird')
const path = require('path')

// pages locale
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  // You can access the variable "locale" in your page queries now
  createPage({
    ...page,
    context: {
      ...page.context,
      locale: page.context.intl.language,
    },
  })
}

// Create recipe post page
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/recipe-post.js')
    const categoryTemplate = path.resolve('./src/templates/category.js')
    const tagTemplate = path.resolve('./src/templates/tag.js')
    resolve(
      graphql(
        `
          {
            allContentfulRecipe {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulCategory {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulTag {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create recipe post pages
        const posts = result.data.allContentfulRecipe.edges
        posts.forEach((post) => {
          createPage({
            path: `/recipe/${post.node.slug}/`,
            component: postTemplate,
            context: {
              slug: post.node.slug,
            },
          })
        })

        // Create category index pages
        const categories = result.data.allContentfulCategory.edges
        categories.forEach((category) => {
          createPage({
            path: `/category/${category.node.slug}`,
            component: categoryTemplate,
            context: {
              category: category.node.slug,
            },
          })
        })

        // Create tag index pages
        const tags = result.data.allContentfulTag.edges
        tags.forEach((tag) => {
          createPage({
            path: `/tag/${tag.node.slug}`,
            component: tagTemplate,
            context: {
              tag: tag.node.slug,
            },
          })
        })
      })
    )
  })
}

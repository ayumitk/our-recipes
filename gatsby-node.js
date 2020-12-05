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
    const recipeTemplate = path.resolve('./src/templates/recipe-post.js')
    const blogTemplate = path.resolve('./src/templates/blog-post.js')
    const pageTemplate = path.resolve('./src/templates/page-post.js')
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
            allContentfulBlog {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulPage {
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
        const recipes = result.data.allContentfulRecipe.edges
        recipes.forEach((recipe) => {
          createPage({
            path: `/recipe/${recipe.node.slug}/`,
            component: recipeTemplate,
            context: {
              slug: recipe.node.slug,
            },
          })
        })

        // Create blog post pages
        const blogs = result.data.allContentfulBlog.edges
        blogs.forEach((blog) => {
          createPage({
            path: `/blog/${blog.node.slug}/`,
            component: blogTemplate,
            context: {
              slug: blog.node.slug,
            },
          })
        })

        // Create blog post pages
        const pages = result.data.allContentfulPage.edges
        pages.forEach((page) => {
          createPage({
            path: `/${page.node.slug}/`,
            component: pageTemplate,
            context: {
              slug: page.node.slug,
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

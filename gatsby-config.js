require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}

// if you want to use the preview API please define
// CONTENTFUL_HOST in your environment config
// the `host` property should map to `preview.contentful.com`
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error('Contentful spaceId and the access token need to be provided.')
}

module.exports = {
  siteMetadata: {
    pathPrefix: '/',
    siteTitle: 'Our Recipes',
    siteTitleAlt: {
      en: "Our Recipes - Canadian and Japanese couple's recipe collection.",
      ja: 'Our Recipes - 食べ物の好みが違いすぎる国際カップルが、2人で作って美味しく食べれるレシピコレクション',
    },
    siteUrl: 'https://recipe.muchimemo.com',
    siteDescription: {
      en: 'english description',
      ja: '日本語の説明',
    },
    author: 'Gina',
    siteHeadline: {
      en: "Canadian and Japanese couple's recipe collection.",
      ja: '食べ物の好みが違いすぎる国際カップルが、2人で作って美味しく食べれるレシピコレクション',
    },
    siteBanner: '/banner.jpg',
    siteLogo: '/logo.png',
    userTwitter: '@OurRecipesCA',
  },
  pathPrefix: '/',
  plugins: [
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static`,
        name: 'images',
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: [`en`, `ja`],
        // language file path
        defaultLanguage: `en`,
        // option to redirect to `/en` when connecting `/`
        redirect: true,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Lobster`,
          },
        ],
      },
    },
    `gatsby-plugin-material-ui`,
  ],
}

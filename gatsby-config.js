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
      en: "Our Recipes - Colin & Ayumi's Recipe Collection",
      ja: 'Our Recipes - 食の好みが違いすぎる国際カップルのレシピ集',
    },
    siteUrl: 'https://ourrecipes.ca',
    siteDescription: {
      en: "Colin & Ayumi's recipe collection",
      ja:
        '食べ物の好みが違いすぎるカナダ人と日本人の国際カップルが、2人で作って美味しく食べれる料理のレシピを貯めていくためのブログです。',
    },
    author: 'Colin & Ayumi',
    siteHeadline: {
      en: "Our Recipes - Colin & Ayumi's Recipe Collection",
      ja: 'Our Recipes - 食の好みが違いすぎる国際カップルのレシピ集',
    },
    siteBanner: '/banner.jpg',
    siteLogo: '/logo.png',
    userTwitter: '@OurRecipesCA',
  },
  pathPrefix: '/',
  plugins: [
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: 'G-L7NH23MPHP',
    //     head: true,
    //     respectDNT: true,
    //     pageTransitionDelay: 250,
    //   },
    // },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static`,
        name: 'images',
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    `@wardpeet/gatsby-image-nextgen`,
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Our Recipes - Colin & Ayumi's Recipe Collection`,
        short_name: `Our Recipes`,
        description: `Colin & Ayumi's recipe collection`,
        lang: `en`,
        display: `standalone`,
        icon: `static/favicon.png`,
        start_url: `/`,
        background_color: `#f1c34a`,
        theme_color: `#f1c34a`,
        localize: [
          {
            start_url: `/ja/`,
            lang: `ja`,
            name: `Our Recipes - 食の好みが違いすぎる国際カップルのレシピ集`,
            short_name: `Our Recipes`,
            description: `食べ物の好みが違いすぎるカナダ人と日本人の国際カップルが、2人で作って美味しく食べれる料理のレシピを貯めていくためのブログです。`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Lobster`],
        display: 'swap',
      },
    },
    `gatsby-plugin-material-ui`,
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        devMode: true,
        disable: true,
      },
    },
    `gatsby-plugin-sitemap`,
  ],
}

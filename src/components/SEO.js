import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'

const SEO = (props) => {
  const intl = useIntl()
  const { local } = intl

  const data = useStaticQuery(graphql`
    query SEOQuery {
      site {
        siteMetadata {
          pathPrefix
          siteTitle
          siteTitleAlt {
            en
            ja
          }
          siteUrl
          siteDescription {
            en
            ja
          }
          author
          siteHeadline {
            en
            ja
          }
          siteBanner
          siteLogo
        }
      }
    }
  `)
  const { pathPrefix, siteTitle, siteUrl, author, siteBanner, siteLogo, userTwitter } = data.site.siteMetadata

  const siteDescription =
    local === 'en' ? data.site.siteMetadata.siteDescription.en : data.site.siteMetadata.siteDescription.ja

  const siteTitleAlt = local === 'en' ? data.site.siteMetadata.siteTitleAlt.en : data.site.siteMetadata.siteTitleAlt.ja

  const siteHeadline = local === 'en' ? data.site.siteMetadata.siteHeadline.en : data.site.siteMetadata.siteHeadline.ja

  const ogLanguage = local === 'en' ? 'en-CA' : 'ja_JP'

  const { post, article, buildTime, archive, page } = props

  let title
  let description
  let image
  let URL

  const realPrefix = pathPrefix === '/' ? '' : pathPrefix
  const homeURL = `${siteUrl}${realPrefix}`

  if (article) {
    title = `${post.title} - ${siteTitle}`
    description = post.description ? post.description : siteDescription
    image = `https:${post.heroImage.fluid.src}`
    URL = `${homeURL}/recipe/${post.slug}/`
  } else if (archive) {
    title = `${archive.title} - ${siteTitle}`
    description = archive.description ? archive.description : siteDescription
    image = `https:${archive.image.fluid.src}`
    URL = `${homeURL}/category/${archive.slug}/`
  } else if (page) {
    title = `${page.title} - ${siteTitle}`
    description = page.description ? page.description : siteDescription
    image = page.image ? `${homeURL}${page.image}` : `${homeURL}${siteBanner}`
    URL = page.slug ? `${homeURL}/${page.slug}/` : siteUrl
  } else {
    title = siteTitleAlt
    description = siteDescription
    image = `${homeURL}${siteBanner}`
    URL = siteUrl
  }

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: URL,
    headline: siteHeadline,
    inLanguage: local,
    mainEntityOfPage: URL,
    description: siteDescription,
    name: title,
    author: {
      '@type': 'Person',
      name: author,
    },
    copyrightHolder: {
      '@type': 'Person',
      name: author,
    },
    copyrightYear: '2020',
    creator: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Person',
      name: author,
    },
    datePublished: '2020-10-31T10:30:00+01:00',
    dateModified: buildTime,
    image: {
      '@type': 'ImageObject',
      url: image,
    },
  }

  // Initial breadcrumb list

  const itemListElement = [
    {
      '@type': 'ListItem',
      item: {
        '@id': homeURL,
        name: 'Homepage',
      },
      position: 1,
    },
    {
      '@type': 'ListItem',
      item: {
        '@id': `${homeURL}/contact`,
        name: 'Contact',
      },
      position: 2,
    },
  ]

  let schemaArticle = null

  if (article) {
    schemaArticle = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      author: {
        '@type': 'Person',
        name: author,
      },
      copyrightHolder: {
        '@type': 'Person',
        name: author,
      },
      // copyrightYear: postNode.parent.birthtime,
      creator: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: author,
        logo: {
          '@type': 'ImageObject',
          url: `${homeURL}${siteLogo}`,
        },
      },
      // datePublished: postNode.parent.birthtime,
      // dateModified: postNode.parent.mtime,
      description,
      headline: title,
      inLanguage: 'ja',
      url: URL,
      name: title,
      image: {
        '@type': 'ImageObject',
        url: image,
      },
      mainEntityOfPage: URL,
    }
    // Push current blogpost into breadcrumb list
    itemListElement.push({
      '@type': 'ListItem',
      item: {
        '@id': URL,
        name: title,
      },
      position: 3,
    })
  }

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    name: 'Breadcrumbs',
    itemListElement,
  }

  return (
    <Helmet>
      <html lang={local} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      {/* <meta name="gatsby-starter" content="Gatsby Starter Minimal Blog" /> */}
      <meta property="og:locale" content={ogLanguage} />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={description} />
      {/* {config.siteFBAppID && <meta property="fb:app_id" content={config.siteFBAppID} />} */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={userTwitter || ''} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={URL} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={description} />
      {/* Insert schema.org data conditionally (webpage/article) + everytime (breadcrumbs) */}
      {!article && <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>}
      {article && <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>}
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>

      {/* <meta name="google-site-verification" content="ugXDabOeIzHktqQo6ZhCRdh4EZWaMVO5-qhndwhLGDI" /> */}
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  post: PropTypes.object,
  archive: PropTypes.object,
  page: PropTypes.object,
  article: PropTypes.bool,
  buildTime: PropTypes.string,
}
SEO.defaultProps = {
  post: null,
  archive: null,
  page: null,
  article: false,
  buildTime: null,
}

// SEO.propTypes = {
//   postNode: PropTypes.object,
//   post.slug: PropTypes.string,
//   article: PropTypes.bool,
//   buildTime: PropTypes.string,
//   page: PropTypes.bool,
//   pageTitle: PropTypes.string,
//   pageDescription: PropTypes.string,
//   pageOgp: PropTypes.string,
// }

// SEO.defaultProps = {
//   postNode: null,
//   post.slug: null,
//   article: false,
//   buildTime: null,
//   page: false,
//   pageTitle: null,
//   pageDescription: null,
//   pageOgp: null,
// }

const _ = require('lodash')

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Labs",
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `https://dev-statyczny-blog-drupal.pantheonsite.io/`,
        skipFileDownloads: true,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/blog-posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/blog-posts/images`,
      },
    },
    
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 1024,
              ratio: 1.77, 
              height: 624, 
              related: false,
              noIframeBorder: true, 
              loadingStrategy: 'lazy',
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: videoId =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], 
              containerClass: "mx-auto m-4",
              iframeId: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `my-6`,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/",
      },
      __key: "pages",
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: [`title`, `author`],
        resolvers: {
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            author: node => node.frontmatter.author,
            slug: node => node.fields.slug,
          },
          "node__article": {
            title: node => node.title,
            author: node => node.author ? node.author : 'Administrator',
            slug: node => node.fields.slug,
          }
        },
      },
    },
  ],
};

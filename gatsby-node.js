const _ = require('lodash')
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const slugify = require('slugify')

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
          node,
          name: `slug`,
          value: slug,
        })      
    }
    else if(node.internal.type == "node__article"){
      const slug = slugify(node.title)
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
    }
}


exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                featuredImage {
                  childImageSharp {
                    gatsbyImageData(width: 1024, formats: WEBP, placeholder: BLURRED)
                  }
                }
              }
            }
          }
        },
        allNodeArticle {
          edges {
            node {
              id
              fields {
                slug
              }
              relationships {
                field_image {
                  uri {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `)
    const d = _.concat(
      result.data.allMarkdownRemark.edges.map(({ node }) => ({
        slug: node.fields.slug,
        id: node.id,
        img: node.frontmatter.featuredImage
      })),
      result.data.allNodeArticle.edges.map(({ node }) => ({
        slug: node.fields.slug,
        id: node.id,
        img: node.relationships.field_image ? "https://dev-statyczny-blog-drupal.pantheonsite.io/" + node.relationships.field_image.uri.url :  'https://www.doors.com.pl/images/joomlart/demo/default.jpg'
      }))
    )
    console.log("D: " + d)
    d.forEach(p => {
      createPage({
        path: p.slug,
        component: path.resolve(`./src/templates/post.js`),
        context: p
      })
    })
  }
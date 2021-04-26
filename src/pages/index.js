import * as React from "react"
import {concat} from "lodash"
import TemplateWrapper from "../layouts"
import PostList from "../components/PostList"
import { graphql, useStaticQuery } from "gatsby"
import truncate from 'truncate'
import slugify from 'slugify'

const defaultPost = {
  id: "",
  title: "",
  timeToRead: 0,
  author: "Administrator",
  date: "",
  slug: "/",
  excerpt: ""
}
const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query HomePageQuery{
      allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
        totalCount
          edges {
            node {
              id
              timeToRead
              frontmatter {
                author
                date
                title
              },                
              fields{
                slug
              }
              excerpt
            }
          }
        }
      siteSearchIndex {
        index
      }
      allNodeArticle(sort: {fields: created, order: DESC}) {
      edges {
        node {
          title
          id
          body {
            summary
          }
          created(formatString: "DD-MM-YYYY")
        }
      }
      totalCount
    }
    }
  `)
  const posts = concat(
    data.allMarkdownRemark.edges.map(e => ({
      id: e.node.id,
      title: e.node.frontmatter.title,
      timeToRead: e.node.timeToRead,
      author: e.node.frontmatter.author,
      date: e.node.frontmatter.date,
      slug: e.node.fields.slug,
      excerpt: e.node.excerpt
    })
    ), 
    data.allNodeArticle.edges.map(e => ({
      id: e.node.id,
      title: e.node.title,
      timeToRead: defaultPost.timeToRead,
      author: defaultPost.author,
      date: e.node.created,
      slug: slugify(e.node.title),
      excerpt: truncate(e.node.body.summary, 150)
    })
    ))

  return (
    <TemplateWrapper>
      <main className="w-full h-full flex flex-col">
        <PostList data={posts} index={data.siteSearchIndex.index}/>
      </main>
    </TemplateWrapper>
  )
}

export default IndexPage

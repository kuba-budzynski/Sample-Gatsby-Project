import * as React from "react"
import TemplateWrapper from "../layouts"
import PostList from "../components/PostList"
import { StaticQuery, graphql } from "gatsby"

const IndexPage = () => {
  return (
    <TemplateWrapper>
      <main className="w-full h-full flex flex-col">
        <StaticQuery
          query={graphql`
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
            }` }
            render={data => (
              <PostList data={data.allMarkdownRemark} index={data.siteSearchIndex.index}/>
            )}        
         />
      </main>
    </TemplateWrapper>
  )
}

export default IndexPage

// export const query = graphql`
// query HomePageQuery{
//   allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
//     totalCount
//     edges {
//       node {
//         id
//         timeToRead
//         frontmatter {
//           author
//           date
//           title
//         },
//         fields{
//           slug
//         }
//         excerpt
//       }
//     }
// }}` 
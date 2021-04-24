import React from 'react';
import { graphql } from 'gatsby'
import TemplateWrapper from '../layouts';
import Img from "gatsby-image"
import '../styles/markdown.css'

const Post = ({ data }) => {
    const post = data.markdownRemark
    return (
        <TemplateWrapper>
            <div className="w-screen max-w-full min-h-screen bg-warmGray-50 py-28">
                <div className="w-full max-w-5xl px-3 mx-auto">
                    <h1 className="text-center text-3xl md:text-4xl lg:text-6xl tracking-wider underline mb-4 text-gray-600 font-bold">{post.frontmatter.title}</h1>
                    <h2 className="text-base md:text-lg lg:text-xl italic text-emerald-500 text-center">{post.frontmatter.author}</h2>
                    <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} className="my-12 w-full xl:w-4/5 mx-auto"/>
                    <div className="w-full max-w-4xl mx-auto">
                        <div className=".markdown" dangerouslySetInnerHTML={{ __html: post.html }}/>
                    </div>
                </div>
            </div>
        </TemplateWrapper>
    );
}

export default Post;

export const query = graphql`
 query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
    frontmatter {
      title
      author
      date
      featuredImage {
        childImageSharp {
            fluid(maxWidth: 1024){
				...GatsbyImageSharpFluid_withWebp
            }
        }
    }
    }
    html
  }
 }
`;

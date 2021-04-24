import React from 'react';
import { graphql } from 'gatsby'
import TemplateWrapper from '../layouts';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import '../styles/markdown.css'

const Post = ({ data }) => {
    const post = data.markdownRemark
    const image = getImage(post.frontmatter.featuredImage)
    return (
        <TemplateWrapper>
            <div className="w-screen max-w-full min-h-screen bg-warmGray-50 py-28">
                <div className="w-full max-w-5xl px-3 mx-auto flex flex-col justify-center justify-items-center">
                    <h1 className="text-center text-3xl md:text-4xl lg:text-6xl tracking-wider underline mb-4 text-gray-600 font-bold">{post.frontmatter.title}</h1>
                    <h2 className="text-base md:text-lg lg:text-xl italic text-emerald-500 text-center">{post.frontmatter.author}</h2>
                    <GatsbyImage image={image}  alt={post.frontmatter.title} />
                    <div className="w-full max-w-5xl mx-auto">
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
          gatsbyImageData(width: 1024, placeholder: BLURRED, formats: WEBP)
        }
      }
    }
    html
  }
 }
`;
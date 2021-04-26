import React from 'react';
import { graphql } from "gatsby"
import TemplateWrapper from '../layouts';
import { GatsbyImage, getImage} from "gatsby-plugin-image"
import StaticImage from '../components/StaticImage'
import { DiscussionEmbed } from "disqus-react"
import '../styles/markdown.css'

const Post = ({ data, pageContext }) => {

    let post = {};
    let image = null;
    if(data.markdownRemark != null){
      post = {
        title: data.markdownRemark.frontmatter.title,
        author: data.markdownRemark.frontmatter.author,
        date: data.markdownRemark.frontmatter.date,
        html: data.markdownRemark.html
      }
      image = getImage(data.markdownRemark.frontmatter.featuredImage)
    }
    else if(data.nodeArticle != null){
      post = {
        title: data.nodeArticle.title,
        author: '',
        date: data.nodeArticle.created,
        html: data.nodeArticle.body.value
      }
      image = pageContext.img;
    }
    const disqusConfig = {
      shortname: "StatycznyBlog",
      config: { identifier: post.title, title: post.title },
    }
    return (
          <TemplateWrapper>
            <div className="w-screen max-w-full min-h-screen bg-warmGray-50 py-28">
                <div className="w-full max-w-5xl px-3 mx-auto flex flex-col justify-center justify-items-center">
                    <h1 className="text-center text-3xl md:text-4xl lg:text-6xl tracking-wider underline mb-4 text-gray-600 font-bold">{post.title}</h1>
                    <h2 className="text-base md:text-lg lg:text-xl italic text-emerald-500 text-center">{post.author}</h2>
                    {data.markdownRemark ? 
                      <GatsbyImage image={image} alt={post.title} /> : 
                      <StaticImage src={image} alt={post.title}/>
                    }
                    <div className="w-full max-w-5xl mx-auto">
                        <div className=".markdown" dangerouslySetInnerHTML={{ __html: post.html }}/>
                    </div>
                    <DiscussionEmbed {...disqusConfig} />
                </div>
            </div>
        </TemplateWrapper>
    );
}

export default Post;

export const query = graphql`
 query PostQuery($id: String!) {
    markdownRemark(id: {eq: $id}) {
      frontmatter {
        title
        author
        date
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 1024, formats: WEBP, placeholder: BLURRED)
          }
        }
      }
      html
    }
    nodeArticle(id: {eq: $id}) {
      title
      body {
        value
      }
      created
      relationships {
        field_image {
          uri {
            url
          }
        }
      }
    }
 }
`;
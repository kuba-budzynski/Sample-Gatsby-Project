import React, {useState, useEffect, useRef} from 'react';
import { Index } from "elasticlunr"
import { Link } from "gatsby"

const PostList = (props) => {

    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [index, setIndex] = useState(null)

    const ref = useRef(null)

    const getOrCreateIndex = () => {
        return index != null ? index : Index.load(props.index)
    }
    
    const searchVal = (evt) => {
        const query = evt.target.value
        const index = getOrCreateIndex()
        setIndex(index)
        setSearch(query)
        const res = index.search(query, {expand: true}).map(({ref}) => index.documentStore.getDoc(ref))
        setResults(res)
    }

    useEffect(() => {
        function handleClickOutside(event){
            if(ref.current && !ref.current.contains(event.target)){
                setSearch('')
                setResults([])
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref])

    return (
        <div className="w-full h-ful">

            {/* SEARCH */}
            <div className={results.length === 0 ? '': `w-full h-full bg-coolGray-300 absolute opacity-50 z-10`}></div>
            <div className={`w-full mx-auto space-y-1 relative z-30 max-w-2xl mb-5 mt-16`} ref={ref}>
                <input 
                    type="text" 
                    value={search} 
                    onChange={searchVal} 
                    placeholder="search..." 
                    className="w-full text-gray-500 px-4 py-1 border border-gray-400"
                />
                {results.length === 0 ? "" : 
                    <div className={`flex flex-col justify-center space-y-2 px-8 z-20 py-2 bg-white absolute w-full shadow-lg border border-gray-400 divide-y divide-gray-200 divide-dashed`} style={{minHeight: '5rem'}}>
                        {results.map(result => (
                            <Link to={result.slug} className="group" id={result.id}>
                                <p className="text-gray-500 py-1 group-hover:text-gray-800">{result.title} - <span className="text-emerald-500 group-hover:text-emerald-700">{result.author}</span></p>
                            </Link>
                        ))}
                    </div>
                }
            </div>

            {/* LIST OF POSTS */}
            <section className={`w-full max-w-2xl px-4 h-full mx-auto space-y-6 mb-16 ${results.length === 0 ? 'filter-none' : 'filter blur-sm'}`}>
                {props.data.edges.map(({node}) => (
                    <div key={node.id} className="w-full h-full bg-emerald-50 rounded-lg px-4 py-2 hover:bg-emerald-100 text-gray-400 border-2 border-emerald-100">
                        <Link to={node.fields.slug} className="w-full h-full">
                        <div className="flex space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 my-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-500 text-sm my-auto">{node.timeToRead} min</p>
                        </div>
                        <h2 className="text-4xl font-bold tracking-wider text-gray-500 text-center">{node.frontmatter.title}</h2>
                        <p className="py-4 text-justify w-4/5 mx-auto">{node.excerpt}</p>
                        <div className="flex w-full justify-between mt-5">
                            <p className="text-sm underline">Author: {node.frontmatter.author}</p>
                            <p className="text-sm italic">Data: {node.frontmatter.date}</p>
                        </div>
                        </Link>
                    </div> 
                ))}
            </section>

        </div>      
    );
}

export default PostList;

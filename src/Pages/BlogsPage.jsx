import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';


const BlogsPage = () => {

    const newBaseUrl = "https://codehelp-apis.vercel.app/api/get-blogs";
    const [blog, setBlog] = useState(null);
    const [relatedblogs, setRelatedblogs] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { setLoading, loading } = useContext(AppContext);

    const blogId = location.pathname.split("/").at(-1);

    async function fetchRelatedBlogs() {
        setLoading(true);
        let url = `${newBaseUrl}?blogId=${blogId}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setBlog(data.blog);
            setRelatedblogs(data.relatedblogs);
        }
        catch (error) {
            alert("Error in Blog Id")
            setBlog(null);
            setRelatedblogs([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (blogId) {
            fetchRelatedBlogs();
        }
    }, [location.pathname])

    return (
        <div>
            <Header></Header>
            <div>
                <button
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>
            {
                loading ?
                    (<div>
                        <p>Loading</p>
                    </div>) :
                    blog ?
                        (<div>
                            <BlogDetails post={blog} />
                            <h2>Related Blogs</h2>
                            {
                                relatedblogs.map((post) => (
                                    <div key={post.id}>
                                        <BlogDetails post={post} />
                                    </div>
                                ))
                            }
                        </div>) :
                        (<div>
                            <p>No Blog Found</p>
                        </div>)
            }
        </div>
    )
}

export default BlogsPage
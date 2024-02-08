import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Pagination from "./components/Pagination";
import { Route, Routes, useSearchParams } from "react-router-dom"
import BlogsPage from "./Pages/BlogsPage.jsx";
import {useLocation} from 'react-router-dom';
import Home from "./Pages/Home.jsx";
import TagPage from "./Pages/TagPage.jsx";
import CategoryPage from "./Pages/CategoryPage.jsx";






export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const page = searchParams.get("page") ?? 1;

    if(location.pathname.includes('tags')){
      //iska matlb tag walae page show krna h 
      const tag = location.pathname.split("/").at(-1).replace("-", " ");

      fetchBlogPosts(Number(page), tag);
    }
    else if(location.pathname.includes("categories")){
      const category = location.pathname.split("/").at(-1).replace("-", " ");
      fetchBlogPosts(Number(page), null, category);
    }
    else{
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/blog/:blogId" element={<BlogsPage/>}></Route>
      <Route path="/tags/:tag" element={<TagPage/>}></Route>
      <Route path="/category/:category" element={<CategoryPage/>}></Route>
    
    </Routes>
  );
}

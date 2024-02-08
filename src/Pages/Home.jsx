import React from 'react'
import Blogs from '../components/Blogs'
import Header from '../components/Header'
import Pagination from '../components/Pagination'


const Home = () => {
  return (
    <div>
        <Header></Header>
        <div>
            <Blogs></Blogs>
            <Pagination></Pagination>
        </div>
    </div>
  )
}

export default Home
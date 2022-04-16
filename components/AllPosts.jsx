import React from 'react'
import { Link } from 'react-router-dom'
import  ShowPosts  from './ShowPosts'
// import { client } from '../client'
import { urlFor } from '../client'

const AllPosts = ({posts}) => {
  return (
    <div className="bg-blue-200 min-h-screen p-12">
        <div className="container mx-auto">
        {/* <h2 className="text-5xl flex justify-center cursive">Blog Posts</h2> */}
            {/* <h3 className="text-lg text-gray-600 flex justify-center mb-12 mt-2">
                Welcome to Knowladge Hub!
            </h3> */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post) => (
            // <Link to={`/post-detail/${post._id}`} key={post._id}>
            //   <span
            //     className="block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-green-400"
            //     key={post._id}
            //   >
            //     <img
            //       className="w-full h-full rounded-r object-cover absolute"
            //       src={(urlFor(post.image).width(250).url())} alt="user-post" 
                 
            //     />
            //     <span className="block relative h-full flex justify-end items-end pr-4 pb-4">
            //       <h2 className="text-gray-800 text-lg font-bold px-3 py-4 bg-red-700 text-red-100 bg-opacity-75 rounded">
            //         {post.title}
            //       </h2>
            //     </span>
            //   </span>
            // </Link>
            <ShowPosts post = {post} key = {post._id} />
          ))}
      </div>
    </div>
  </div>
  )
}

export default AllPosts
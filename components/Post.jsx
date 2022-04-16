import React from 'react'
import { urlFor } from '../client'

const Post = ({post : {postedBy , image , _id}}) => {
  return (
    <>
    {image && (<img  className='rounded-lg w-full m-3 p-3' src={(urlFor(image).width(350).url())} alt="user-post" />)}
    </>
  )
}

export default Post
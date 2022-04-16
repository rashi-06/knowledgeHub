import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { urlFor } from '../client'
import { fetchUser } from '../utils/data'
import { client } from '../client'
import { v4 as uuidv4 } from 'uuid';


const ShowPosts = ({post}) => {

    const [savingPost, setSavingPost] = useState(false);

    const userInfo = fetchUser();
    let alreadySaved = post?.save?.filter((item) => item?.postedBy?._id === userInfo?.googleId);
    alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];    

    const savePost = (id) => {
        if (alreadySaved?.length === 0) {
        setSavingPost(true);

            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                _key: uuidv4(),
                userId: userInfo?.googleId,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userInfo?.googleId,
                },
                }])
                .commit()
                .then(() => {
                window.location.reload();
                setSavingPost(false);
            });
        }
    };


  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img src={(urlFor(post.image).width(350).url())} alt="" className="object-top absolute h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
      </div>

      <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
        <Link to={`/post-details/${post._id}`}>{post.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
          <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
              <Link to={`/user-profile/${post.postedBy?._id}`} className="flex gap-2 mt-2 items-center">
                  <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={post.postedBy?.image}
                      alt="user-profile"
                  />
                  <p className="font-semibold capitalize">{post.postedBy?.userName}</p>
              </Link>
              </div>
          
          <div className="font-medium text-gray-700">
          {alreadySaved?.length !== 0 ? (
                  <button type="button" className="bg-green-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                    {post?.save?.length}  Saved
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      savePost(post._id);
                    }}
                    type="button"
                    className="bg-green-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  >
                    {post?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                  </button>
                )}
          </div>
      </div>
      <p className="text-center text-lg text-gray-800 font-serif px-4 lg:px-20 mb-8">
        {post.description.slice(0,50)} ....
        {/* {post.description.length <50 ?({post.description}) : ({post.description.slice(0,50)})} */}
      </p>
      <div className="text-center">
        <Link to={`/post-detail/${post._id}`}>
          <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Continue Reading</span>
        </Link>
      </div>
  </div>
  )
}

export default ShowPosts
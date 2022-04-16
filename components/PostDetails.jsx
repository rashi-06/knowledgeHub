import React, {useState , useEffect} from 'react'
import { Link , useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import { client , urlFor } from '../client'
import {postDetailMorePostQuery , postDetailQuery} from '../utils/data'
import Spinner from './Spinner'


const PostDetails = ({user}) => {

  const {postId} = useParams();
  const [posts, setPosts] = useState();
  const [postDetail, setPostDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const fetchPostDetails = () => {
    const query = postDetailQuery(postId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPostDetail(data[0]);
        // console.log(data);
        if (data[0]) {
          const query1 = postDetailMorePostQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPosts(res);
          });
        }
      });
    }
  };

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(postId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchPostDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [postId]);


  if(!postDetail) {
    return (
      <Spinner message="Showing pin" />
    );
  }

  return (
    <div className='bg-blue-200 p-10'>
    {postDetail && (
      <div className="flex m-auto bg-white p-3" style={{ maxWidth: '900px', borderRadius: '32px' }}>
        <div className="flex flex-col justify-center items-center md:items-start flex-initial">
          <img
            className = "rounded-t-3xl rounded-b-lg object-top object-contain shadow-lg h-45 w-full"
            src={(postDetail?.image && urlFor(postDetail?.image).url())}
            alt="user-post"
          />
        
         
          <div className="flex  items-center justify-between">
            <div >
              <h1 className="text-4xl font-bold break-words mt-3 text-center p-4">
                {postDetail.title}
              </h1>
              <p className="mt-3 text-3xl font-serif" >{postDetail.description}</p>
            </div>
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          
            
          </div>
         
          <Link to={`/user-profile/${postDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
            Author : <img src={postDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
            <p className="font-bold">{postDetail?.postedBy.userName}</p>
          </Link>
         

          <h2 className="mt-5 text-2xl mt-2">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {postDetail?.comments?.map((item) => (
              <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                <img
                  src={item.postedBy?.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{item.postedBy?.userName}</p>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`/user-profile/${user?._id}`}>
              <img src={user?.image}  className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
            </Link>
            <input
              className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-green-500 sm:text-center text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
            >
              {addingComment ? 'Doing...' : 'Done'}
            </button>
          </div>
        </div>
      </div>
    )}
   
  </div>
  )
}

export default PostDetails
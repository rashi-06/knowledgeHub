import React, {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Spinner from './Spinner'

// import ShowPosts from './'
import {feedQuery , searchQuery} from '../utils/data'
import { client } from '../client';
import AllPosts from './AllPosts';

const Feed = () => {

  const [loading, setLoading] = useState(false);
  const [posts , setPosts] = useState(null);
  const {categoryId} = useParams();
  
    useEffect(() => {
      setLoading(true);
        
      if(categoryId){
          const query = searchQuery(categoryId);
          client.fetch(query)
          .then((data)=>{
            setPosts(data);
            setLoading(false);
          })

      }
      else{
            client.fetch(feedQuery)
            .then((data)=>{
                setPosts(data);
                setLoading(false);
            })
      }
      
    }, [categoryId]);
    
    const ideaName = categoryId || 'new';
    if (loading) {
      return (
        <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
      );
    }
    

  return (
    <div>
        {posts && <AllPosts posts = {posts}/>}
    </div>
  )
}

export default Feed
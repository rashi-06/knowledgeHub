export const categories = [
    {
      name: 'web development',
    },
    {
      name: 'fitness',
    },
    {
      name: 'environment',  
    },
    
    {
      name: 'food',
      
    },
    {
      name: 'nature',
      
    },
    {
      name: 'art',
      
    }, {
      name: 'travel',
    },
    {
      name: 'recipe',
    }, 
    {
      name: 'commerce',
    }, 
    {
      name: 'science',
    },
    {
      name: 'machinine learning',
    },
    {
      name: 'artificial intelligence',
    },
    {
      name: 'virtual reality',
    },
    {
      name: 'augmented reality',
    },
    {
      name: 'reactjs',
    },
    {
      name: 'angular',
    },
    {
      name: 'data structue',
    },
    {
      name: 'java',
    },
    {
      name: 'python',
    },{
      name: 'cpp',
    },
    
    {
      name: 'other',
    },
];  


export const userQuery = (userId)=>{    
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
}

export const fetchUser = ()=>{
    const userInfo = localStorage.getItem('user') !== 'undefined'? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    return userInfo;
}


export const searchQuery = (searchTerm) => {
  const query = `*[_type == "post" && title match '${searchTerm}*' || category match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            title,
            description,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};


export const feedQuery = `*[_type == "post"] | order(_createdAt desc) {
    title,
    image{
      asset->{
        url
      }
    },
    _id,
    description,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
        _key,
        postedBy->{
            _id,
            userName,
            image
        },
    },
} `;

export const postDetailQuery = (postId) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    description,
    category,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};


export const postDetailMorePostQuery = (post) => {
  const query = `*[_type == "post" && category == '${post.category}' && _id != '${post._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    description,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};



export const userCreatedPostsQuery = (userId) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    description,
    title,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};


export const userSavedPostsQuery = (userId) => {
  const query = `*[_type == 'post' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    description,
    title,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

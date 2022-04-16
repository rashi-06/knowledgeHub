import React from 'react'

const Spinner = ({message}) => {
    return (
        <div className="w-full m-3 flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-blue-600" role="status">
          </div>
          <div className='p-3'>{message}</div> 
        </div>
    )
}

export default Spinner

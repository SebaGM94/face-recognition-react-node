import React from 'react'

const FaceRecognition = ({ imgSrc }) => {
  return (
    <div className='center'>
      <div className='absolute mt2'>
        <img alt='' src={imgSrc} width='500px' height='auto' />
      </div>
    </div>
  )
}

export default FaceRecognition

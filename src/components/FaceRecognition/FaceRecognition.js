import React from 'react'
import './FaceRecognition.css'
const FaceRecognition = ({
  imgSrc,
  imgRef,
  box = { top: 0, bottom: 0, left: 0, right: 0 }
}) => {
  console.log('imgSrc', imgSrc)
  return (
    <div className='center'>
      <div className='absolute mt2'>
        <img
          ref={imgRef}
          id='inputimage'
          alt=''
          src={imgSrc}
          width='500px'
          height='auto'
        />
        <div
          className='box'
          style={{
            top: box.top,
            right: box.right,
            left: box.left,
            bottom: box.bottom
          }}
        ></div>
      </div>
    </div>
  )
}

export default FaceRecognition

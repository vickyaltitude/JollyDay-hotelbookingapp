import React from 'react'
import './Background.css'

const Background = ({children}) => {
  return (
   <div className='background-image pt-5'>
    <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          zIndex: -1,
        }}
      />
           {children}
   </div>
  )
}

export default Background
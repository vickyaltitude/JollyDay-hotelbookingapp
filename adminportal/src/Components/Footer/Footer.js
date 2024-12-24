import React from 'react'

const Footer = () => {

    const year = new Date();

  return (

    <footer className="bg-dark text-white text-center py-4">
        <p>&copy;{year.getFullYear()} Make-holyday admin. All rights reserved.</p>
    </footer>
  )
}

export default Footer
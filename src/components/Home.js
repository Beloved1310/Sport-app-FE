import React from 'react'


function Home() {
  return (
    <>
      <h1 className="text-center display-4">welcome {localStorage.getItem('name')}</h1>
    
    </>
  )
}

export default Home
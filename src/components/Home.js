import React from 'react'
import Sports from './Sports'


function Home() {
  return (
    <div className="center">
    <h1 className="text-center display-8 welcome-header">
      Welcome {localStorage.getItem('username')}
      <Sports/>
    </h1>
  </div>
  )
}

export default Home
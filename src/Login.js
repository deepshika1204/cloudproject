import React from 'react'
import './Login.css'
import { loginUrl } from './spotify'

function Login() {
  return (
    <div className='login'>
      
        <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png' alt='random'></img>
        <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  )
}

export default Login
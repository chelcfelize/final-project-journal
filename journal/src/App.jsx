import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function Intro(){
  return (
    <div className='intro'>
      <h1>proof: we were here.</h1>
    </div>
  )
}

function Home(){
 return(
   <nav className='homelinks'>
    <a href="/home">Home</a>
      <a href="/add">Add</a>
      <a href="/calendar">Calendar</a>
  </nav>
 )
}

function App() {
  return(
    <Home />
  )
}

export default App

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'

function Intro() {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('3 seconds passed!')
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="intro">
      <h1>proof: we were here.</h1>
    </div>
  )
}


function Home(){

    return(
      <h1>well hello hello WAW MALI MALI AH</h1>
    )
}

function App() {
  return(
    /*<BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>*/
    <Intro />
  )
}

export default App

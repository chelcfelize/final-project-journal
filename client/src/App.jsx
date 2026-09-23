import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router";
import './styles.css'

function Intro(){
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="intro">
      <h1>proof: we were here.</h1>
      <div className="loading-spinner"></div>
    </div>
  )
}
function Navbar(){
  const [showAddMenu, setShowAddMenu] = useState(false)
 return(
  <>
   <div className="navbar">
      <nav className="homelinks">

        <Link to="/home">Home</Link>

        <div className="add-menu">
          <button onClick={() => setShowAddMenu(!showAddMenu)}>
            Add
          </button>

          {showAddMenu && (
            <div className="popup-menu">
              <Link to="/addEntry">AddEntry</Link>
              <Link to="/addPhoto">AddPhoto</Link>
            </div>
          )}
        </div>

        <Link to="/calendar">Calendar</Link>

        <h2 className="to-the-right">
          proof: we were here.
        </h2>

      </nav>
    </div>
   </>
 )
}
function Home(){
 return (
   <>
   <Navbar />
   </>
 )
}

function AddEntry(){
  return (
   <>
   <Navbar />

   <div className="entry-form">
      <form>
        <label>
          <input type="text" name="entry-title" placeholder='add entry title'/>
        </label>

        <label>
          <textarea name="journal-content" placeholder='write about a moment...'></textarea>
        </label>

        <button type="submit">publish proof</button>
      </form>
    </div>
   </>
 )
}

function AddPhoto(){
  const [image, setImage] = useState(null)

  function handleImageChange(event) {
    const file = event.target.files[0]

    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }
  return (
   <>
   <Navbar />

   <div className="photo-form">
      <form>
        <label>
          <input type="text" name="photo-title" placeholder='add moment title'/>
        </label>

        <label>
          <input type="text" name="photo-caption" placeholder='add photo caption...'/>
        </label>

        <label className="select-image">
        Select Image
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>

      {image && (
        <img
          src={image}
          alt="Selected"
          className="image-preview"
        />
      )}

        <button type="submit">publish proof</button>
      </form>
    </div>
   </>
 )
}

function Calendar(){
 return(
  <>
    <Navbar />
   
   
  </>
 )
}


function App() {
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addEntry" element={<AddEntry />} />
        <Route path="/addPhoto" element={<AddPhoto />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App

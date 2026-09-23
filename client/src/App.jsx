import { useState } from 'react'
import './styles.css'



function Intro(){
  return (
    <div className='intro'>
      <h1>proof: we were here.</h1>
    </div>
  )
}
function Navbar(){
  const [showAddMenu, setShowAddMenu] = useState(false)
 return(
  <>
   <div className='navbar'>
    <nav className='homelinks'>
    <a href="/home">Home</a>

      <div className="add-menu">
        <button onClick={() => setShowAddMenu(!showAddMenu)}>
          Add
        </button>

        {showAddMenu && (
          <div className="popup-menu">
            <a href="/addEntry">AddEntry</a>
             <a href="/addPhoto">AddPhoto</a>
          </div>
        )}
      </div>

      <a href="/calendar">Calendar</a>
      <h2 className='to-the-right'>proof: we were here.</h2>
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
    <Calendar />
    
    </>
  )
}

export default App

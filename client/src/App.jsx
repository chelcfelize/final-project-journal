import { supabase } from './supabase'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router";
import './styles.css'
import addIcon from './components/add.svg'
import calendarIcon from './components/calendar.svg'
import homeIcon from './components/home.svg'

function Intro(){
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home')
    }, 3000)

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

        <Link to="/home" className='nav-icon'>
        <img src={homeIcon} alt="Home" />
        </Link>

        <div className="add-menu">
          <button onClick={() => setShowAddMenu(!showAddMenu)} className='nav-icon'>
           <img src={addIcon} alt="Add" />
          </button>

          {showAddMenu && (
            <div className="popup-menu">
              <Link to="/addEntry">Add an Entry</Link>
              <Link to="/addPhoto">Add a Moment</Link>
            </div>
          )}
        </div>

        <Link to="/calendar" className='nav-icon'>
        <img src={calendarIcon} alt="Calendar" />
        </Link>

        <h2 className="to-the-right">
          proof: we were here.
        </h2>

      </nav>
    </div>
   </>
 )
}
function Home(){
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  const entries = [
    {
      id: 1,
      title: "boom panes",
      content: "boom panesboom panesboom panesboom panes",
      date: "AAAAAAA"
    },
    {
      id: 2,
      title: "williw revillame",
      content: "syempre ikaw lawng",
      date: "AAAAAAA"
    }
  ]
 return (
   <>
   <Navbar />

   <main className="home">
    <p className="current-date">
          {currentDate}
        </p>
        <div className="entry-grid">
          {entries.map((entry) => (
            <article className="entry-card" key={entry.id}>
              <div className="entry-card-content">
                <p className="entry-date">{entry.date}</p>

                <h2>{entry.title}</h2>

                <p className="entry-content">
                  {entry.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>
   </>
 )
}

function AddEntry(){
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const { error } = await supabase
      .from('posts')
      .insert({
        type: 'entry',
        title: title,
        content: content,
        image_url: null,
        date: new Date().toISOString().split('T')[0]
      })

    if (error) {
      console.log('SUPABASE ERROR:', error)
      alert(error.message)
      return
    }

    alert('Entry published!')
    navigate('/home')
  }

  return(
    <>
      <Navbar />

      <div className="entry-form">
        <form onSubmit={handleSubmit}>

          <label>
            <input
              type="text"
              name="entry-title"
              placeholder="add entry title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <label>
            <textarea
              name="journal-content"
              placeholder="write about a moment..."
              value={content}
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
          </label>

          <button type="submit">
            publish proof
          </button>

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

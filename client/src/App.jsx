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
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
 useEffect(() => {
    async function getEntries() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false })

      if (error) {
        console.error('SUPABASE ERROR:', error)
        return
      }

      setEntries(data)
      setLoading(false)
    }

    getEntries()
  }, [])

  return (
    <>
      <Navbar />

      <main className="home">
        <p className="current-date">{currentDate}</p>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="entry-grid">
            {entries.map((entry) => (
              <article className="entry-card" key={entry.id}>

                <div className="entry-card-content">

                  <p className="entry-date">
                    {entry.date}
                  </p>

                  <h2>
                    {entry.title}
                  </h2>

                  <p className="entry-content">
                    {entry.content}
                  </p>

                </div>

                {entry.image_url && (
                  <img
                    src={entry.image_url}
                    alt={entry.title}
                    className="entry-image"
                  />
                )}

              </article>
                ))}
     
          </div>
        )}
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
  const [imageFile, setImageFile] = useState(null)
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')

  const navigate = useNavigate()

  function handleImageChange(event) {
    const file = event.target.files[0]

    if (file) {
      setImageFile(file)
      setImage(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!imageFile) {
      alert('Please select an image.')
      return
    }

    // Create a unique file name
    const fileName = `${Date.now()}-${imageFile.name}`

    // Upload image to Supabase Storage
    const { error: uploadError } = await supabase
      .storage
      .from('photos')
      .upload(fileName, imageFile)

    if (uploadError) {
      console.error('UPLOAD ERROR:', uploadError)
      alert(uploadError.message)
      return
    }

    // Get the public URL of the image
    const { data: imageData } = supabase
      .storage
      .from('photos')
      .getPublicUrl(fileName)

    const imageUrl = imageData.publicUrl

    // Save the post information to the database
    const { error: databaseError } = await supabase
      .from('posts')
      .insert({
        type: 'photo',
        title: title,
        content: caption,
        image_url: imageUrl,
        date: new Date().toISOString().split('T')[0]
      })

    if (databaseError) {
      console.error('DATABASE ERROR:', databaseError)
      alert(databaseError.message)
      return
    }

    alert('Photo published!')
    navigate('/home')
  }

  return(
    <>
      <Navbar />

      <div className="photo-form">
        <form onSubmit={handleSubmit}>

          <label>
            <input
              type="text"
              name="photo-title"
              placeholder="add moment title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <label>
            <input
              type="text"
              name="photo-caption"
              placeholder="add photo caption..."
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
            />
          </label>

          <label className="select-image">
            Select Image

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          {image && (
            <img
              src={image}
              alt="Selected"
              className="image-preview"
            />
          )}

          <button type="submit">
            publish proof
          </button>

        </form>
      </div>
    </>
  )
}

function Calendar(){
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [entries, setEntries] = useState([])

  
  useEffect(() => {
    async function getEntries() {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, date, type, image_url, content')

      if (error) {
        console.error('SUPABASE ERROR:', error)
        return
      }

      setEntries(data)
    }

    getEntries()
  }, [])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthName = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  // Number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Day of the week the month starts on
  // JavaScript: Sunday = 0, Monday = 1, etc.
  const firstDay = new Date(year, month, 1).getDay()

  // Change Sunday = 0 into Monday = 0
  const startingDay = firstDay === 0 ? 6 : firstDay - 1

  const days = []

  // Empty spaces before the first day
  for(let i = 0; i < startingDay; i++){
    days.push(null)
  }

  // Actual days
  for(let day = 1; day <= daysInMonth; day++){
    days.push(day)
  }

  function previousMonth(){
    setCurrentDate(new Date(year, month - 1, 1))
  }

  function nextMonth(){
    setCurrentDate(new Date(year, month + 1, 1))
  }

  return(
    <>
      <Navbar />

      <main className="calendar-page">

        <div className="calendar-header">

  <button onClick={previousMonth}>
    &lt;
  </button>

  <button
    className="month-year-button"
    onClick={() => setShowDatePicker(!showDatePicker)}
  >
    {monthName}
  </button>

  <button onClick={nextMonth}>
    &gt;
  </button>

</div>

{showDatePicker && (
  <div className="date-picker">

    <select
      value={month}
      onChange={(event) => {
        setCurrentDate(
          new Date(year, Number(event.target.value), 1)
        )
      }}
    >
      <option value="0">January</option>
      <option value="1">February</option>
      <option value="2">March</option>
      <option value="3">April</option>
      <option value="4">May</option>
      <option value="5">June</option>
      <option value="6">July</option>
      <option value="7">August</option>
      <option value="8">September</option>
      <option value="9">October</option>
      <option value="10">November</option>
      <option value="11">December</option>
    </select>

    <select
      value={year}
      onChange={(event) => {
        setCurrentDate(
          new Date(Number(event.target.value), month, 1)
        )
      }}
    >
      <option value="2024">2024</option>
      <option value="2025">2025</option>
      <option value="2026">2026</option>
      <option value="2027">2027</option>
      <option value="2028">2028</option>
      <option value="2029">2029</option>
      <option value="2030">2030</option>
    </select>

  </div>
)}

        <div className="calendar-grid">

          <div className="calendar-day-name">Mon</div>
          <div className="calendar-day-name">Tue</div>
          <div className="calendar-day-name">Wed</div>
          <div className="calendar-day-name">Thu</div>
          <div className="calendar-day-name">Fri</div>
          <div className="calendar-day-name">Sat</div>
          <div className="calendar-day-name">Sun</div>
         

          {days.map((day, index) => {

            const hasPost = day !== null && entries.some((entry) => {
              const entryDate = new Date(entry.date)

              return (
                entryDate.getFullYear() === year &&
                entryDate.getMonth() === month &&
                entryDate.getDate() === day
              )
            })

            return (
              <div
                className={`calendar-day 
                  ${day === null ? 'empty' : ''} 
                  ${hasPost ? 'has-post' : ''}`
                }
                key={index}
                onClick={() => {
                  if (day !== null) {
                    navigate('/home')
                  }
                }}
              >
                {day}

                {hasPost && (
                  <span className="post-marker"></span>
                )}
              </div>
            )
          })}
          </div>


      </main>
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

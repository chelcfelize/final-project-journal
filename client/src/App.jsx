import { supabase } from './supabase'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router";
import './styles.css'
import addIcon from './components/add.svg'
import calendarIcon from './components/calendar.svg'
import homeIcon from './components/home.svg'
import robotIcon from './components/robot.svg'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event) {
    event.preventDefault()

    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    navigate('/home')
  }

  return (
    <main className="login-page">

      <div className="login-card">

        <h1>proof: we were here.</h1>

        <p>log in to your diary</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'logging in...' : 'log in'}
          </button>

        </form>

      </div>

    </main>
  )
}

function Intro(){
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login')
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
function Home() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  // Edit state
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

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
        setLoading(false)
        return
      }

      setEntries(data)
      setLoading(false)
    }

    getEntries()
  }, [])

  // Start editing
  function startEditing(entry) {
    setEditingId(entry.id)
    setEditTitle(entry.title || '')
    setEditContent(entry.content || '')
  }

  // Cancel editing
  function cancelEditing() {
    setEditingId(null)
    setEditTitle('')
    setEditContent('')
  }

  // Save edited entry
  async function saveEdit(id) {
    const { data, error } = await supabase
      .from('posts')
      .update({
        title: editTitle,
        content: editContent
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('SUPABASE ERROR:', error)
      alert(error.message)
      return
    }

    setEntries(
      entries.map((entry) =>
        entry.id === id ? data : entry
      )
    )

    cancelEditing()
  }

  // Delete entry
  async function deleteEntry(id) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this entry?'
    )

    if (!confirmDelete) {
      return
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('SUPABASE ERROR:', error)
      alert(error.message)
      return
    }

    setEntries(
      entries.filter((entry) => entry.id !== id)
    )
  }

  return (
    <>
      <Navbar />

      <main className="home">

        <p className="current-date">
          {currentDate}
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="entry-grid">

            {entries.map((entry) => (
              <article
                className="entry-card"
                key={entry.id}
              >

                {editingId === entry.id ? (

                  /* EDIT MODE */
                  <div className="entry-card-content">

                    <input
                      type="text"
                      value={editTitle}
                      onChange={(event) =>
                        setEditTitle(event.target.value)
                      }
                      className="edit-title"
                    />

                    <textarea
                      value={editContent}
                      onChange={(event) =>
                        setEditContent(event.target.value)
                      }
                      className="edit-content"
                    />

                    <div className="entry-actions">

                      <button
                        type="button"
                        onClick={() => saveEdit(entry.id)}
                      >
                        save
                      </button>

                      <button
                        type="button"
                        onClick={cancelEditing}
                      >
                        cancel
                      </button>

                    </div>

                  </div>

                ) : (

                  /* NORMAL MODE */
                  <>
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

                      <div className="entry-actions">

                        <button
                          type="button"
                          onClick={() => startEditing(entry)}
                        >
                          edit
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteEntry(entry.id)}
                        >
                          delete
                        </button>

                      </div>

                    </div>

                    {entry.image_url && (
                      <img
                        src={entry.image_url}
                        alt={entry.title}
                        className="entry-image"
                      />
                    )}
                  </>
                )}

              </article>
            ))}

          </div>
        )}

      </main>
    </>
  )
}

function AddEntry() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // Gemini writing help
  const [showWritingHelp, setShowWritingHelp] = useState(false)
  const [suggestion, setSuggestion] = useState('')
  const [loadingHelp, setLoadingHelp] = useState(false)

  async function getWritingHelp(type) {
  console.log('BUTTON CLICKED:', type)

  setLoadingHelp(true)
  setSuggestion('')

  try {
    const response = await fetch(
      'http://localhost:3001/api/writing-help',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: type
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong.')
    }

    setSuggestion(data.suggestion)

  } catch (error) {
    console.error('Writing help error:', error)
    setSuggestion(`Error: ${error.message}`)

  } finally {
    setLoadingHelp(false)
  }
}

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

  return (
    <>
      <Navbar />

      <div className="entry-form">
        <form onSubmit={handleSubmit}>

          {/* Entry title */}
          <label>
            <input
              type="text"
              name="entry-title"
              placeholder="add entry title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          

          {/* Journal content */}
          <label>
            <textarea
              name="journal-content"
              placeholder="write about a moment..."
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </label>

          {/* Gemini writing help */}
          <div className="writing-help">

            <button
              type="button"
              className="robot-help"
              onClick={() => {
                setShowWritingHelp(!showWritingHelp)
                setSuggestion('')
              }}
            >
              <span className="robot-icon">
                <img src={robotIcon} alt="AI Help" />
              </span>

              <span className="help-bubble">
                need help with writing your entry?
              </span>
            </button>

            {/* Help options */}
            {showWritingHelp && (
              <div className="help-options">

                <p>what kind of help do you need?</p>

                <div className="help-buttons">

                  <button
                    type="button"
                    disabled={loadingHelp}
                    onClick={() => getWritingHelp('prompt')}
                  >
                    prompt
                  </button>

                  <button
                    type="button"
                    disabled={loadingHelp}
                    onClick={() => getWritingHelp('exercise')}
                  >
                    writing exercise
                  </button>

                  <button
                    type="button"
                    disabled={loadingHelp}
                    onClick={() => getWritingHelp('question')}
                  >
                    reflection question
                  </button>

                </div>

                {/* Loading message */}
                {loadingHelp && (
                  <p className="help-loading">
                    thinking of something to help...
                  </p>
                )}

                {/* Gemini suggestion */}
                {suggestion && !loadingHelp && (
                  <div className="writing-suggestion">
                    <p>{suggestion}</p>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Publish */}
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
        <Route path="/login" element={<Login />} />
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

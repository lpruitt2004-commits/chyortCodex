import { useState, useEffect } from 'react'
import './App.css'

// Exercise 1: Document Title Updater
function TitleUpdater() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p className="note">Check the browser tab title!</p>
    </div>
  )
}

// Exercise 2: Timer Component
function Timer() {
  const [seconds, setSeconds] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="timer">
      <h3>Timer: {seconds}s</h3>
    </div>
  )
}

// Exercise 3: Data Fetcher
function UserFetcher() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
        const data = await response.json()
        setUser(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUser()
  }, [])
  
  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>
  
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
    </div>
  )
}

// Exercise 4: Window Resize Listener
function WindowSize() {
  const [size, setSize] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  })
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <div className="window-size">
      <p>Width: {size.width}px</p>
      <p>Height: {size.height}px</p>
      <p className="note">Resize the window to see it update!</p>
    </div>
  )
}

// Exercise 5: Search with Effect
function SearchFilter() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  
  const items = [
    'apple', 'banana', 'cherry', 'date', 'elderberry', 
    'fig', 'grape', 'honeydew', 'kiwi', 'lemon'
  ]
  
  useEffect(() => {
    const filtered = items.filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filtered)
  }, [query])
  
  return (
    <div className="search-filter">
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search fruits..."
      />
      <ul className="results">
        {results.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p className="note">Found {results.length} results</p>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <h1>Day 3: useEffect & Side Effects - Solutions</h1>

      <section>
        <h2>Exercise 1: Document Title</h2>
        <TitleUpdater />
      </section>

      <section>
        <h2>Exercise 2: Timer</h2>
        <Timer />
      </section>

      <section>
        <h2>Exercise 3: Data Fetching</h2>
        <UserFetcher />
      </section>

      <section>
        <h2>Exercise 4: Window Resize</h2>
        <WindowSize />
      </section>

      <section>
        <h2>Exercise 5: Search Filter</h2>
        <SearchFilter />
      </section>
    </div>
  )
}

export default App

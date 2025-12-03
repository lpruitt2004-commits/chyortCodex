import { useState, useEffect } from 'react'
import './App.css'

// TODO: Exercise 1 - Document Title Updater
// function TitleUpdater() {
//   const [count, setCount] = useState(0)
//   
//   useEffect(() => {
//     // Update document title with count
//   }, [count])
//   
//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   )
// }

// TODO: Exercise 2 - Timer Component
// function Timer() {
//   const [seconds, setSeconds] = useState(0)
//   
//   useEffect(() => {
//     // Set up interval and cleanup
//   }, [])
//   
//   return <div>Seconds: {seconds}</div>
// }

// TODO: Exercise 3 - Data Fetcher
// function UserFetcher() {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   
//   useEffect(() => {
//     // Fetch from https://jsonplaceholder.typicode.com/users/1
//   }, [])
//   
//   if (loading) return <div>Loading...</div>
//   if (error) return <div>Error: {error}</div>
//   return <div>{/* Display user data */}</div>
// }

// TODO: Exercise 4 - Window Resize Listener
// function WindowSize() {
//   const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })
//   
//   useEffect(() => {
//     // Add resize listener and cleanup
//   }, [])
//   
//   return <div>Width: {size.width}px, Height: {size.height}px</div>
// }

// TODO: Exercise 5 - Search with Effect
// function SearchFilter() {
//   const [query, setQuery] = useState('')
//   const [results, setResults] = useState([])
//   
//   const items = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape']
//   
//   useEffect(() => {
//     // Filter items based on query
//   }, [query])
//   
//   return (
//     <div>
//       <input value={query} onChange={(e) => setQuery(e.target.value)} />
//       {/* Display filtered results */}
//     </div>
//   )
// }

function App() {
  return (
    <div className="app">
      <h1>Day 3: useEffect & Side Effects</h1>
      <p>Complete the exercises by uncommenting and implementing each component.</p>

      <section>
        <h2>Exercise 1: Document Title</h2>
        {/* <TitleUpdater /> */}
      </section>

      <section>
        <h2>Exercise 2: Timer</h2>
        {/* <Timer /> */}
      </section>

      <section>
        <h2>Exercise 3: Data Fetching</h2>
        {/* <UserFetcher /> */}
      </section>

      <section>
        <h2>Exercise 4: Window Resize</h2>
        {/* <WindowSize /> */}
      </section>

      <section>
        <h2>Exercise 5: Search Filter</h2>
        {/* <SearchFilter /> */}
      </section>
    </div>
  )
}

export default App

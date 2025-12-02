import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import './App.css'

// Exercise 1: Page components
function Home() {
  return (
    <div className="page">
      <h2>Home Page</h2>
      <p>Welcome to the React Router demo!</p>
      <p>Use the navigation above to explore different pages.</p>
    </div>
  )
}

function About() {
  return (
    <div className="page">
      <h2>About Page</h2>
      <p>This is a demonstration of React Router v6.</p>
      <p>It shows how to navigate between pages without reloading.</p>
    </div>
  )
}

function Contact() {
  return (
    <div className="page">
      <h2>Contact Page</h2>
      <p>Email us at: hello@example.com</p>
      <p>Phone: (555) 123-4567</p>
    </div>
  )
}

// Exercise 2: Navigation component
function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/users">Users</Link>
    </nav>
  )
}

// Exercise 3: Dynamic route with useParams
function UserProfile() {
  const { userId } = useParams()
  
  // Mock user data
  const users = {
    '1': { name: 'Alice Johnson', role: 'Developer' },
    '2': { name: 'Bob Smith', role: 'Designer' },
    '3': { name: 'Charlie Davis', role: 'Manager' },
  }
  
  const user = users[userId]
  
  return (
    <div className="page">
      <h2>User Profile</h2>
      {user ? (
        <div className="user-info">
          <p><strong>ID:</strong> {userId}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p>User not found.</p>
      )}
      <Link to="/users" className="back-link">← Back to Users</Link>
    </div>
  )
}

// Exercise 4: Users list with links
function UsersList() {
  const users = [
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Davis' },
  ]
  
  return (
    <div className="page">
      <h2>Users</h2>
      <div className="users-list">
        {users.map(user => (
          <Link 
            key={user.id} 
            to={`/users/${user.id}`}
            className="user-link"
          >
            {user.name} →
          </Link>
        ))}
      </div>
    </div>
  )
}

// Exercise 5: 404 Not Found page
function NotFound() {
  const navigate = useNavigate()
  
  return (
    <div className="page not-found">
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>Day 4: React Router - Solutions</h1>
        <Navbar />
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:userId" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App

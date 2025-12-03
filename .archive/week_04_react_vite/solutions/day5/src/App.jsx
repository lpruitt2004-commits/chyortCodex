import { createContext, useContext, useState } from 'react'
import './App.css'

// Exercise 1: Theme Context
const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Exercise 2: Use theme in components
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  
  return (
    <header className={theme}>
      <h2>Themed Header</h2>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  )
}

function Content() {
  const { theme } = useContext(ThemeContext)
  
  return (
    <div className={`content ${theme}`}>
      <p>Current theme: <strong>{theme}</strong></p>
      <p>This content adapts to the current theme!</p>
    </div>
  )
}

// Exercise 3: User Context
const UserContext = createContext()

function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  
  const login = (username) => {
    setUser({ username, loggedIn: true, timestamp: new Date().toLocaleTimeString() })
  }
  
  const logout = () => {
    setUser(null)
  }
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

// Exercise 4: Login form
function LoginForm() {
  const { login } = useContext(UserContext)
  const [username, setUsername] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim()) {
      login(username)
      setUsername('')
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <h3>Please Log In</h3>
      <input 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button type="submit">Login</button>
    </form>
  )
}

// Exercise 5: User display
function UserDisplay() {
  const { user, logout } = useContext(UserContext)
  
  if (!user) return <LoginForm />
  
  return (
    <div className="user-info">
      <h3>Welcome, {user.username}!</h3>
      <p>Logged in at: {user.timestamp}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="app">
          <h1>Day 5: Context API - Solutions</h1>
          
          <section>
            <h2>Theme Context</h2>
            <Header />
            <Content />
          </section>
          
          <section>
            <h2>User Context</h2>
            <UserDisplay />
          </section>
        </div>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App

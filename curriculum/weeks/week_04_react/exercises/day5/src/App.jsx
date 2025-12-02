import { createContext, useContext, useState } from 'react'
import './App.css'

// TODO: Exercise 1 - Theme Context
// const ThemeContext = createContext()

// function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState('light')
//   
//   const toggleTheme = () => {
//     setTheme(prev => prev === 'light' ? 'dark' : 'light')
//   }
//   
//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   )
// }

// TODO: Exercise 2 - Use theme in components
// function Header() {
//   const { theme, toggleTheme } = useContext(ThemeContext)
//   return (
//     <header className={theme}>
//       <h2>Header</h2>
//       <button onClick={toggleTheme}>Toggle Theme</button>
//     </header>
//   )
// }

// function Content() {
//   const { theme } = useContext(ThemeContext)
//   return (
//     <div className={`content ${theme}`}>
//       <p>Current theme: {theme}</p>
//     </div>
//   )
// }

// TODO: Exercise 3 - User Context
// const UserContext = createContext()

// function UserProvider({ children }) {
//   const [user, setUser] = useState(null)
//   
//   const login = (username) => {
//     setUser({ username, loggedIn: true })
//   }
//   
//   const logout = () => {
//     setUser(null)
//   }
//   
//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   )
// }

// TODO: Exercise 4 - Login form
// function LoginForm() {
//   const { login } = useContext(UserContext)
//   const [username, setUsername] = useState('')
//   
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     login(username)
//   }
//   
//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={username} onChange={(e) => setUsername(e.target.value)} />
//       <button type="submit">Login</button>
//     </form>
//   )
// }

// TODO: Exercise 5 - User display
// function UserDisplay() {
//   const { user, logout } = useContext(UserContext)
//   
//   if (!user) return <LoginForm />
//   
//   return (
//     <div>
//       <p>Welcome, {user.username}!</p>
//       <button onClick={logout}>Logout</button>
//     </div>
//   )
// }

function App() {
  return (
    <div className="app">
      <h1>Day 5: Context API</h1>
      <p>Complete the exercises by uncommenting and implementing Context providers.</p>
      
      {/* TODO: Wrap app with providers */}
      {/* <ThemeProvider> */}
      {/*   <UserProvider> */}
      {/*     <Header /> */}
      {/*     <Content /> */}
      {/*     <UserDisplay /> */}
      {/*   </UserProvider> */}
      {/* </ThemeProvider> */}
    </div>
  )
}

export default App

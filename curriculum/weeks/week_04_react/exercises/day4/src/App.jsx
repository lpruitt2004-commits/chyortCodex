import './App.css'

// TODO: Install React Router first
// npm install react-router-dom

// TODO: Import routing components
// import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'

// TODO: Exercise 1 - Create page components
// function Home() {
//   return <div><h2>Home Page</h2><p>Welcome to the app!</p></div>
// }

// function About() {
//   return <div><h2>About Page</h2><p>This is a React Router demo.</p></div>
// }

// function Contact() {
//   return <div><h2>Contact Page</h2><p>Email us at hello@example.com</p></div>
// }

// TODO: Exercise 2 - Navigation component
// function Navbar() {
//   return (
//     <nav>
//       <Link to="/">Home</Link>
//       <Link to="/about">About</Link>
//       <Link to="/contact">Contact</Link>
//       <Link to="/users">Users</Link>
//     </nav>
//   )
// }

// TODO: Exercise 3 - Dynamic route with useParams
// function UserProfile() {
//   const { userId } = useParams()
//   return <div><h2>User Profile</h2><p>User ID: {userId}</p></div>
// }

// TODO: Exercise 4 - Users list with links
// function UsersList() {
//   const users = [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}, {id: 3, name: 'Charlie'}]
//   return (
//     <div>
//       <h2>Users</h2>
//       {users.map(user => (
//         <div key={user.id}>
//           <Link to={`/users/${user.id}`}>{user.name}</Link>
//         </div>
//       ))}
//     </div>
//   )
// }

// TODO: Exercise 5 - 404 Not Found page
// function NotFound() {
//   const navigate = useNavigate()
//   return (
//     <div>
//       <h2>404 - Page Not Found</h2>
//       <button onClick={() => navigate('/')}>Go Home</button>
//     </div>
//   )
// }

function App() {
  return (
    <div className="app">
      <h1>Day 4: React Router</h1>
      <p>Install react-router-dom and implement the routing exercises.</p>
      <code>npm install react-router-dom</code>
      
      {/* TODO: Wrap app in BrowserRouter */}
      {/* <BrowserRouter> */}
      {/*   <Navbar /> */}
      {/*   <Routes> */}
      {/*     <Route path="/" element={<Home />} /> */}
      {/*     <Route path="/about" element={<About />} /> */}
      {/*     <Route path="/contact" element={<Contact />} /> */}
      {/*     <Route path="/users" element={<UsersList />} /> */}
      {/*     <Route path="/users/:userId" element={<UserProfile />} /> */}
      {/*     <Route path="*" element={<NotFound />} /> */}
      {/*   </Routes> */}
      {/* </BrowserRouter> */}
    </div>
  )
}

export default App

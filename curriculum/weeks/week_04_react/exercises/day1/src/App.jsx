import './App.css'

// TODO: Exercise 1 - Create Welcome component
// function Welcome({ name }) {
//   return <h1>Welcome, {name}!</h1>
// }

// TODO: Exercise 2 - Create UserCard component
// function UserCard({ name, age, email, avatar }) {
//   return (
//     <div className="user-card">
//       {/* Display user info here */}
//     </div>
//   )
// }

// TODO: Exercise 3 - Create ProductList component
// function ProductList({ products }) {
//   return (
//     <div className="product-list">
//       {/* Map over products here */}
//     </div>
//   )
// }

// TODO: Exercise 4 - Create Badge component
// function Badge({ status, text }) {
//   return (
//     <span className={`badge badge-${status}`}>
//       {text}
//     </span>
//   )
// }

// TODO: Exercise 5 - Create Navbar component
// function Navbar({ links, brandName }) {
//   return (
//     <nav>
//       {/* Build navbar here */}
//     </nav>
//   )
// }

function App() {
  // Sample data for testing
  const products = [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Mouse', price: 29.99 },
    { id: 3, name: 'Keyboard', price: 79.99 },
  ]

  const navLinks = [
    { id: 1, text: 'Home', url: '/' },
    { id: 2, text: 'About', url: '/about' },
    { id: 3, text: 'Contact', url: '/contact' },
  ]

  return (
    <div className="app">
      <h1>Day 1: React Basics & JSX</h1>
      <p>Complete the exercises below by uncommenting and implementing each component.</p>

      <section>
        <h2>Exercise 1: Welcome Component</h2>
        {/* <Welcome name="Student" /> */}
      </section>

      <section>
        <h2>Exercise 2: User Card</h2>
        {/* <UserCard name="John Doe" age={30} email="john@example.com" /> */}
      </section>

      <section>
        <h2>Exercise 3: Product List</h2>
        {/* <ProductList products={products} /> */}
      </section>

      <section>
        <h2>Exercise 4: Badge Component</h2>
        {/* <Badge status="success" text="Active" /> */}
        {/* <Badge status="warning" text="Pending" /> */}
        {/* <Badge status="error" text="Failed" /> */}
      </section>

      <section>
        <h2>Exercise 5: Navbar</h2>
        {/* <Navbar brandName="MyApp" links={navLinks} /> */}
      </section>
    </div>
  )
}

export default App

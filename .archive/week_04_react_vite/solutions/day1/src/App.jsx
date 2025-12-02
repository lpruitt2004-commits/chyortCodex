import './App.css'

// Exercise 1: Welcome component
function Welcome({ name }) {
  return <h1>Welcome, {name}!</h1>
}

// Exercise 2: User Card
function UserCard({ name, age, email, avatar }) {
  return (
    <div className="user-card">
      {avatar ? (
        <img src={avatar} alt={name} />
      ) : (
        <div className="avatar-placeholder">👤</div>
      )}
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  )
}

// Exercise 3: Product List
function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <span className="product-name">{product.name}</span>
          <span className="product-price">${product.price.toFixed(2)}</span>
        </div>
      ))}
    </div>
  )
}

// Exercise 4: Badge component
function Badge({ status, text }) {
  return (
    <span className={`badge badge-${status}`}>
      {text}
    </span>
  )
}

// Exercise 5: Navbar component
function Navbar({ links, brandName }) {
  return (
    <nav>
      <ul>
        <li className="brand">{brandName}</li>
        {links.map(link => (
          <li key={link.id}>
            <a href={link.url}>{link.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function App() {
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
      <h1>Day 1: React Basics & JSX - Solutions</h1>

      <section>
        <h2>Exercise 1: Welcome Component</h2>
        <Welcome name="Student" />
      </section>

      <section>
        <h2>Exercise 2: User Card</h2>
        <UserCard 
          name="John Doe" 
          age={30} 
          email="john@example.com" 
        />
        <UserCard 
          name="Jane Smith" 
          age={28} 
          email="jane@example.com"
          avatar="https://i.pravatar.cc/150?img=5"
        />
      </section>

      <section>
        <h2>Exercise 3: Product List</h2>
        <ProductList products={products} />
      </section>

      <section>
        <h2>Exercise 4: Badge Component</h2>
        <Badge status="success" text="Active" />
        <Badge status="warning" text="Pending" />
        <Badge status="error" text="Failed" />
      </section>

      <section>
        <h2>Exercise 5: Navbar</h2>
        <Navbar brandName="MyApp" links={navLinks} />
      </section>
    </div>
  )
}

export default App

import { useState } from 'react'
import './App.css'

// Exercise 1: Counter Component
function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="counter">
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

// Exercise 2: Toggle Switch
function Toggle() {
  const [isOn, setIsOn] = useState(false)
  
  return (
    <div className={`toggle ${isOn ? 'on' : 'off'}`}>
      <h3>{isOn ? 'ON' : 'OFF'}</h3>
      <button onClick={() => setIsOn(!isOn)}>Toggle</button>
    </div>
  )
}

// Exercise 3: Text Input Mirror
function TextMirror() {
  const [text, setText] = useState('')
  
  return (
    <div className="text-mirror">
      <input 
        type="text"
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <div className="mirror">{text}</div>
      <div className="char-count">Characters: {text.length}</div>
      <button onClick={() => setText('')}>Clear</button>
    </div>
  )
}

// Exercise 4: Login Form
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!email.includes('@')) {
      setError('Email must contain @')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    setError('')
    setSubmitted({ email, password })
    setEmail('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
      {submitted && (
        <div className="success">
          ✓ Logged in as: {submitted.email}
        </div>
      )}
    </div>
  )
}

// Exercise 5: Todo List
function TodoList() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }])
      setInput('')
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTodo()
  }

  return (
    <div className="todo-list">
      <div className="todo-input">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      {todos.length === 0 ? (
        <div className="empty-state">No todos yet. Add one above!</div>
      ) : (
        todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <span>{todo.text}</span>
            <button 
              className="danger"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <h1>Day 2: State & Event Handling - Solutions</h1>

      <section>
        <h2>Exercise 1: Counter</h2>
        <Counter />
      </section>

      <section>
        <h2>Exercise 2: Toggle Switch</h2>
        <Toggle />
      </section>

      <section>
        <h2>Exercise 3: Text Mirror</h2>
        <TextMirror />
      </section>

      <section>
        <h2>Exercise 4: Login Form</h2>
        <LoginForm />
      </section>

      <section>
        <h2>Exercise 5: Todo List</h2>
        <TodoList />
      </section>
    </div>
  )
}

export default App

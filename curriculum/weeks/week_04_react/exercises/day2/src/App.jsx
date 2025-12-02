import { useState } from 'react'
import './App.css'

// TODO: Exercise 1 - Counter Component
// function Counter() {
//   const [count, setCount] = useState(0)
//   return (
//     <div className="counter">
//       <h3>Count: {count}</h3>
//       {/* Add increment, decrement, reset buttons */}
//     </div>
//   )
// }

// TODO: Exercise 2 - Toggle Switch
// function Toggle() {
//   const [isOn, setIsOn] = useState(false)
//   return (
//     <div className={`toggle ${isOn ? 'on' : 'off'}`}>
//       {/* Add toggle button and display */}
//     </div>
//   )
// }

// TODO: Exercise 3 - Text Input Mirror
// function TextMirror() {
//   const [text, setText] = useState('')
//   return (
//     <div className="text-mirror">
//       {/* Add input, display, character count, clear button */}
//     </div>
//   )
// }

// TODO: Exercise 4 - Login Form
// function LoginForm() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Add validation and submit logic
//   }
//
//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Add email input, password input, submit button */}
//     </form>
//   )
// }

// TODO: Exercise 5 - Todo List
// function TodoList() {
//   const [todos, setTodos] = useState([])
//   const [input, setInput] = useState('')
//
//   const addTodo = () => {
//     // Add todo logic
//   }
//
//   const deleteTodo = (id) => {
//     // Delete todo logic
//   }
//
//   return (
//     <div className="todo-list">
//       {/* Add input, add button, todo list */}
//     </div>
//   )
// }

function App() {
  return (
    <div className="app">
      <h1>Day 2: State & Event Handling</h1>
      <p>Complete the exercises by uncommenting and implementing each component.</p>

      <section>
        <h2>Exercise 1: Counter</h2>
        {/* <Counter /> */}
      </section>

      <section>
        <h2>Exercise 2: Toggle Switch</h2>
        {/* <Toggle /> */}
      </section>

      <section>
        <h2>Exercise 3: Text Mirror</h2>
        {/* <TextMirror /> */}
      </section>

      <section>
        <h2>Exercise 4: Login Form</h2>
        {/* <LoginForm /> */}
      </section>

      <section>
        <h2>Exercise 5: Todo List</h2>
        {/* <TodoList /> */}
      </section>
    </div>
  )
}

export default App

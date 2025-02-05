import ToDoForm from "./components/ToDoForm"
import ToDoList from "./components/ToDoList"

function App() {


  return (
    <>
      <h1>To Do List</h1>
      <ToDoList />
      <h1>Add something to the ToDo-list!</h1>
      <ToDoForm />
    </>
  )
}

export default App

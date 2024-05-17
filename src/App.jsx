import { useState } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './App.css';

function App() {
  const [todolist, setTodolist] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ index: null, text: '' });

  const saveTodoList = (event) => {
    event.preventDefault();
    const toname = event.target.toname.value.trim();

    if (toname && !todolist.includes(toname)) {
      const finalTodoList = [...todolist, toname];
      setTodolist(finalTodoList);
      toast.success("Todo added successfully!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Slide,
        style: {
          top: '5px', backgroundColor: '#67851b', color: '#fff', fontWeight: 'bold',
          fontFamily: 'cursive'
        },
      });
    } else if (todolist.includes(toname)) {
      toast.error("Todo already exists!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Slide,
        style: {
          top: '5px', backgroundColor: '#531100', color: '#fff', fontWeight: 'bold',
          fontFamily: 'cursive'
        },
      });
    }

    event.target.toname.value = '';
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const updatedTodos = todolist.map((todo, index) =>
      index === currentTodo.index ? currentTodo.text : todo
    );
    setTodolist(updatedTodos);
    setIsEditing(false);
    setCurrentTodo({ index: null, text: '' });
    toast.success("Todo updated successfully!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      transition: Slide,
      style: {
        top: '5px', backgroundColor: '#16917f', color: '#fff', fontWeight: 'bold',
        fontFamily: 'cursive'
      }
    });
  };

  const handleEditClick = (index, value) => {
    setIsEditing(true);
    setCurrentTodo({ index, text: value });
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todolist.filter((_, i) => i !== index);
    setTodolist(updatedTodos);
    toast.success("Todo deleted successfully!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      transition: Slide,
      style: {
        top: '5px', backgroundColor: '#eac73a', color: '#000000', fontWeight: 'bold',
        fontFamily: 'cursive'
      }
    });
  };


  return (
    <div className="conatiner">
      <ToastContainer />
      <h1>To-Do List</h1>

      <form onSubmit={saveTodoList}>
        <input className='Addinput' type="text" name="toname" placeholder='Write your Todo' />
        <button className='addButton' type="submit">Save</button>
      </form>

      <div className="outerDiv">
        <ul>
          {todolist.map((value, index) => (
            <li
              key={index}>
              {isEditing && currentTodo.index === index ? (
                <form onSubmit={handleEditFormSubmit}>
                  <input
                    className='inputEDIT'
                    type="text"
                    value={currentTodo.text}
                    onChange={handleEditInputChange}
                    placeholder='Update your todo'
                  />
                  <button className='updateButton' type="submit">Update</button>
                </form>
              ) : (
                <>
                  {value}
                  <span className="editButton" onClick={() => handleEditClick(index, value)}>
                    <FaEdit />
                  </span>
                  <span className="deleteButton" onClick={() => handleDeleteTodo(index)}>
                    <FaTrashAlt />
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

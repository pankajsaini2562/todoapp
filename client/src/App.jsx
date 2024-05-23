import React, { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ id: null, text: "" });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        },
      ]);
    }
    setTodo("");
  };

  const handleOnDelete = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  };

  const handleOnEdit = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ id: todo.id, text: todo.text });
  };

  const handleFormEdit = (e) => {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  };
  const handleUpdateTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1
        className="text-center my-5 text-3xl 
      font-bold
      "
      >
        Todo app
      </h1>

      {isEditing ? (
        <form
          onSubmit={handleFormEdit}
          className="flex items-center gap-3 justify-center"
        >
          <input
            className="border
        border-gray-800
      rounded-md 
      focus:outline-none
      px-5 py-2
      "
            type="text"
            placeholder="enter the todo here"
            name="todo"
            value={currentTodo.text}
            onChange={(e) => {
              setCurrentTodo({
                ...currentTodo,
                text: e.target.value,
              });
            }}
          />
          <button className="border bg-slate-700 text-white rounded-md p-2">
            update Todo
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleFormSubmit}
          className="flex items-center gap-3 justify-center"
        >
          <input
            className="border
        border-gray-800
      rounded-md 
      focus:outline-none
      px-5 py-2
      "
            type="text"
            placeholder="enter the todo here"
            name="todo"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <button className="border bg-slate-700 text-white rounded-md p-2">
            ADD
          </button>
        </form>
      )}

      <ul
        className="flex 
        flex-col
        gap-5
        items-center
      justify-center
      
       my-7"
      >
        {todos.map((todo) => (
          <li
            className="gap-16 flex items-center 
          justify-between
          "
            key={todo.id}
          >
            {todo.text}
            <button
              className="border bg-slate-700 text-white rounded-md p-2"
              onClick={() => handleOnEdit(todo)}
            >
              Edit
            </button>
            <button
              className="border bg-slate-700 text-white rounded-md p-2"
              onClick={() => handleOnDelete(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

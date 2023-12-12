'use client';

import React, { useState, useEffect } from "react";
import TodoItem from "./components/todoItem";

// Type definition for a todo item
type Todo = string;

export default function Home() {
  // State to manage the list of todos
  const [items, setItems] = useState<Todo[]>([]);

  // Function to retrieve todos from local storage
  const getAllTodo = (): Todo[] => {
    // Get todos from local storage or return an empty array if it doesn't exist
    const tempItems: string | null = localStorage.getItem("todos");
    return tempItems ? JSON.parse(tempItems) : [];
  };

  // Function to fetch all todos and set them in state
  const getAll = () => {
    const tempItems = getAllTodo();
    setItems(tempItems);
  };

  // Function to add a new todo
  const addTodo = () => {
    const todoTitle = prompt("Todo Title: ");
    if (todoTitle) {
      const tempItems = getAllTodo();
      tempItems.push(todoTitle);
      localStorage.setItem("todos", JSON.stringify(tempItems));
      getAll();
    }
  };

  // Function to edit a todo
  const editTodo = (index: number) => {
    const tempItems = getAllTodo();
    const todoTitle = prompt("Todo Title: ", tempItems[index]);
    if (todoTitle) {
      tempItems[index] = todoTitle;
      localStorage.setItem("todos", JSON.stringify(tempItems));
      getAll();
    }
  };

  // Function to delete a todo
  const deleteTodo = (index: number) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      const tempItems = getAllTodo();
      tempItems.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(tempItems));
      getAll();
    }
  };

  // Load todos from local storage on initial render
  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="m-4">
      {/* Button to add a new todo */}
      <button className="w-fit p-2 px-4 mb-4 bg-gray-800 text-white rounded-lg m-1" onClick={() => addTodo()}>Add</button>
      {/* Button to edit todo */}
      <button className="w-fit p-2 px-4 mb-4 bg-gray-800 text-white rounded-lg m-1" onClick={() => getAll()}>Refresh</button>

      {/* Display the list of todos */}
      <ul>
        {items.length > 0 ? (
          // Map through todos and render TodoItem component for each
          items.map((todo: Todo, index: number) => (
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              onEdit={editTodo}
              onDelete={deleteTodo}
            />
          ))
        ) : (
          // Display message if no todos
          <h2>0 Todos</h2>
        )}
      </ul>
    </div>
  );
}

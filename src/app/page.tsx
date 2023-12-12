'use client';

import React from "react";
import TodoItem from "./components/todoItem";

export default function Home() {

  const [items, setItems] = React.useState([]);

  const getAllTodo = () => {
    // get todo object from local storage
    let tempItems: any = localStorage.getItem("todos");
    // convert string to array and if there is no todo in local storage then return []
    tempItems = tempItems ? JSON.parse(tempItems) : [];
    return tempItems
  }

  const getAll = () => {
    const tempItems = getAllTodo();

    setItems(tempItems);
  }

  const addTodo = () => {
    const todoTitle = prompt("Todo Title : ", "");
    if (todoTitle) {

      const tempItems = getAllTodo();
      // pushing new todo to the list
      tempItems.push(todoTitle);

      // converting data in string format to save it in local storage
      localStorage.setItem("todos", JSON.stringify(tempItems));

      getAll();
    }
  }

  const editTodo = (index: number) => {
    const tempItems = getAllTodo();

    const todoTitle = prompt("Todo Title : ", tempItems[index]);
    if (todoTitle) {

      // pushing new todo to the list
      tempItems[index] = todoTitle;

      // converting data in string format to save it in local storage
      localStorage.setItem("todos", JSON.stringify(tempItems));

      getAll();
    }
  }

  const deleteTodo = (index: number) => {
    if (confirm("Are you sure you want to delete this todo?")) {

      const tempItems = getAllTodo();
      // remove specific index from the list
      tempItems.splice(index, 1);

      // converting data in string format to save it in local storage
      localStorage.setItem("todos", JSON.stringify(tempItems));

      getAll();
    }
  }

  React.useEffect(() => {
    getAll();
  }, [])

  return (
    <div className="m-4">
      <button className="w-fit p-2 px-4 mb-4 bg-gray-800 text-white rounded-lg m-1" onClick={() => addTodo()}>Add</button>
      <button className="w-fit p-2 px-4 mb-4 bg-gray-800 text-white rounded-lg m-1" onClick={() => getAll()}>Refresh</button>

      <ul>
        {items.length > 0 ?
          items.map((todo: any, index: number) =>
            <TodoItem
              todo={todo}
              index={index}
              onEdit={editTodo}
              onDelete={deleteTodo}
            />
          )
          :
          <h2 className="text-center p-4 text-2xl">0 Todo's</h2>
        }
      </ul>
    </div>
  )
}

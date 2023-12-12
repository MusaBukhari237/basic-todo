
  

# Creating a Basic Todo App with Next.js, Tailwind CSS, TypeScript, and React

  

In this guide, we'll walk through the process of building a simple todo application using popular technologies: Next.js, Tailwind CSS, TypeScript, and React.

  

#### [View Live Demo](https://basic-todo-musabukhari.vercel.app/)

  

## Prerequisites

  

- Node.js installed on your machine

  

## Step 1: Setting Up the Project

  

- Create a new Next.js project:

  

``` npx create-next-app@latest```

- Setup your nextJs Project as shown below

![NextJS Project Creation Setups](https://lh3.googleusercontent.com/pw/ADCreHc996TJBy5KHVs5WCsfhfsU0IXvHRVdMHDkijPLOeXVGHDXXjeyzzIrrWrBN-C0yOi2pQ3Bv439nadPlws7jogMhmYsbwbfn-RTegQnU_H1kr4FCiec2cOp24DVFFHIujF8znW-OqLrX1E2iYJ4iTRlE83PtRnBW6olNlaJQm-4osm_78-4SyG2tgoYtM-ypyBr2Fa14u2lKECSvMreqC3m9U2ecfnejELzLxbL_5Tj_yHQumivfGhyEFWzvZwMJK_Iey5MB-j7zY53bVuDl8zR9pcEHVdOJAHjOq5bGMszwNlC7JwicuBBcPHiNekKcOYyQMNFeWaEuBn0NND1J6NcwwgPIBwb-s7pqrb65KDDCV_c3Ecv-8itsBzanU7wpfJqtHkxPyhpetBrY3OCW64AAmFxOyutxwNzmTlPq8SMFQteLHGyDZ_iv-WoA8eAdpxl8LZ6eR3e4HgftydCqj8BaVsdQKsmOQbTZPBovAbwJZfpPeLy1u69_R4eVs3T4YnuzRVgC3GlLaRaIx8NBX0INMreOUkWxJuhMf-Igfzp0LQuhEXDBlSG71LUjMgRcmerdcOqiFbxsbzFhSO5KqqgAzPkK6mr3TFL84hCDQapx7guHYZhTGxvfQYht5hPFGi8l6f6mrn_uveg_kvgGjPT9faf_bxe9b6MqkhggA3Ho0w9wp8dg4Z-J22oU_aIHJCII_p-nqxY6zaIwAzGWi4RJl0S8cX35EierjcGB--aCM8kRegBwmOcbsWKBLYn4diMtaQwGzqIMUOhrtBweiShGdj0wJxf8arVknFEGzeMt6vSfKaajjlSI9U7XcYn3tDlWic76a_7NdWOQmq-LbygEhRFJj5nqN3ZFFWcEEG6kqZera5gXwpitCtxXkrJcetVtednNOYEtpnOrZoYCRXHawuryEHVc91f9Yg2IUOiG4IhruybRUYUZHZdCl1RJz166tR63_8EzKiLhkwQRG380y1iAwo7oJ-2HqvdeywF=w905-h170-s-no-gm?authuser=0)

  

## Step 2: Implementing the Todo App

Create a components directory and a TodoItem.tsx file inside it. This file will handle individual todo items.

  

Implement the main logic in pages/index.tsx. Use React state to manage the todo list, and store todos in local storage.

  

### Convert NextJS page.tsx to a client component

Convert NextJS page.tsx to a client component by adding ```'use client';``` at the top of that file.

  

### Import all necessary libraries and component

Import all necessary libraries and component such as `React, todoItem.tsx`.

  

### CRUD Operations Logic - page.tsx

```

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

```

  

### User Interface (UI) - page.tsx

```

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

```

  

### TodoItem.tsx

```

import React from 'react'

  

  

export default function TodoItem({ onEdit, onDelete, todo, index, ...props }: { onEdit: (index: number) => void, onDelete: (index: number) => void, todo: string, index: number, props?: any }) {

  

return (

<li className="flex items-center bg-gray-200 mb-2 p-2 rounded-lg pl-4" {...props}>

  

<span className="w-full">{todo}</span>

  

<button className="w-fit p-2 px-4 bg-gray-800 text-white rounded-lg m-1" onClick={() => onEdit(index)}>Edit</button>

  

<button className="w-fit p-2 px-4 bg-gray-800 text-white rounded-lg m-1" onClick={() => onDelete(index)}>Delete</button>

  

</li>

)

  

}

```

  

## Step 3: Functionality Overview

-  **Add Todo:** Implement a function to add new todos to the list and update the local storage.

-  **Edit Todo:** Enable users to edit todo titles by clicking on them.

-  **Delete Todo:** Implement functionality to delete todos from the list.

  

## Step 4: Running the App

- Start the development server:

```npm run dev```

- Access the app in your browser at http://localhost:3000.

  

## Step 5: Enhancements and Contributions

Consider adding features like due dates, priority levels, or categories, or search and etc... to enhance the app.

  

Contributions are welcome! Fork the repository, make improvements, and create a pull request.

  

### Conclusion

  

Congratulations! You've created a basic todo application using Next.js, Tailwind CSS, TypeScript, and React. Feel free to further enhance it and explore more features.

  

### Sneak Peak of what you can make out of it

![Todo.AI](https://lh3.googleusercontent.com/pw/ADCreHfJgQd6aeR59tUN4eWY4lS12CbbZ6_eIEPW56VrnQvUGn73RfMh4hOKk46cR3Q7qr25R97ZWxAv4M7T-1D9DQ6VWN5LWZsgT026Yp5FBdg1npB7QExaIaUvT77EZAGNQYidXIQOHaosqj-sXAq78t3L=w1900-h878-s-no-gm?authuser=0)

  

### Happy coding!

  

> Credits: TuyyabBukhari, MusaBukari, ToobaBukhari, TatheerBukhari
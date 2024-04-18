import "./App.css";
import Navbar from "./components/Navbar";
import { Todos } from "./components/Todos";
import { Footer } from "./components/Footer";
import { AddTodo } from "./components/AddTodo";
import { About } from "./components/About";
import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  let initTodo = [];
  if (localStorage.getItem("todos") !== null) {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    console.log("I am ondelete of todo", todo);
    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    console.log("deleted", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    console.log("I am Adding this todo", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  };

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Router>
        <Navbar title="My Todos List" searchBar={false} />
        <Routes>
          <Route exact path="/" element={
            <>
              <AddTodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} />
            </>
          } />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

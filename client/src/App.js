import React, { useEffect } from "react";
import ToDoItem from "./components/ToDoitem";
import { useState } from "react";
import axios from "axios";

function App() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    let data = axios.get("http://localhost:8080/");
    data.then((res) => setTodo(res.data));
  }, [todo]);

  let input = React.createRef();

  const postData = () => {
    let post = axios
      .post("http://localhost:8080/add", {
        id: null,
        challenge: input.current.value,
        isDone: 0,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8080/challenge/${id}`)
      .then((res) => {
        setTodo(todo.filter((item) => item._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const updateTask = (id) => {
    const text = prompt("Enter new task description");
    axios
      .put(`http://localhost:8080/update/${id}`, {
        challenge: text,
      })
      .then(() => {
        setTodo(
          todo.map((item) => {
            if (item._id === id) {
              item.challenge = text;
            }
            return item;
          })
        );
      });
  };

  return (
    <div className="site__wrapper">
      <h1>TO DO LIST </h1>
      <div className="addTask_wrapper">
        <input ref={input} name="todo" type="text" />
        <button onClick={postData}>Add Task</button>
      </div>
      {todo.map((item) => {
        return (
          <ToDoItem
            task={item}
            key={item.id}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        );
      })}
    </div>
  );
}

export default App;

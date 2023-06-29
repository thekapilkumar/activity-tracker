import React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";

export default function TodoForm({setPieData}) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const getTodo = async () => {
    try {
      const response = await fetch("http://localhost:3003/api/todo/getTodo");
      const result = await response.json();
      if (result.status) {
        setTodos(result.data);
        setPieData(convertData(result.data))
      } else {
        console.error("Fetch todos error:", result.message);
      }
    } catch (err) {
      console.error("Fetch todos error:", err);
    }
  };

 const convertData=(data)=> {
    const result = [];
    const counts = {};
  
    // Count the occurrences of each task
    for (let i = 0; i < data.length; i++) {
      const task = data[i].task;
      counts[task] = counts[task] ? counts[task] + 1 : 1;
    }
  
    for (const task in counts) {
      result.push([task, counts[task]]);
    }
  
    return result;
  }
    
  const addTodo = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/api/todo/addTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, description }),
      });
      if (!response.ok) {
        throw new Error("Error adding todo");
      }

      const result = await response.json();
      if (result.status) {
        await getTodo();
        setTask("");
        setDescription("");
      } else {
        console.error("Add todo error:", result.message);
      }
    } catch (err) {
      console.error("Add todo error:", err);
    }
  };

  const deletedTodo = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete this item?");
    if (confirmDelete) {
      try {
        const result = await fetch(
          `http://localhost:3003/api/todo/deleteTodo/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await result.json();
        if (response.status) {
          await getTodo();
        } else {
          console.error(response.message);
        }
      } catch (err) {
        console.log("Error deleting todo...", err);
      }
    }
  };

  const updateTodo = () => {};

  useEffect(() => {
    getTodo();
  }, []);

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="task-label">Todo</InputLabel>
          <Select
            labelId="task-label"
            id="task-select"
            value={task}
            label="Todo"
            onChange={handleTaskChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Action Items">Action Items</MenuItem>
            <MenuItem value="Project Scope">Project Scope</MenuItem>
            <MenuItem value="Value Adds">Value Adds</MenuItem>
          </Select>
          <TextField
            id="description-field"
            value={description}
            label="Description"
            variant="outlined"
            sx={{ my: 2 }}
            onChange={handleDescriptionChange}
          />
          <Button variant="contained" type="submit" style={{ margin: "10px" }}>
            Add
          </Button>
        </FormControl>
      </form>

      <div>
        <h2>Todo List</h2>
        {todos.map((todo, index) => (
          <div key={index}>
            <p>
              <strong>Task:</strong>{" "}
              <span style={{ margin: "10px" }}> {todo.task} </span>
              <strong>Description:</strong>{" "}
              <span style={{ margin: "10px" }}>{todo.description}</span>
              <strong>Actions:</strong>{" "}
              <span style={{ margin: "10px" }}>
                <DeleteSharpIcon onClick={() => deletedTodo(todo._id)} />
                <EditSharpIcon onClick={updateTodo} />
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useEffect } from "react";

import ActionItems from "./ActionItems";
import ValueAdds from "./ValueAdds";
import ProjectScopes from "./ProjectScopes";

export default function TodoForm({setPieData}) {

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [isValueAdd, setIsValueAdd] = useState(false);
  const [isActionItem, setIsActionItem] = useState(false);
  const initialActionItemStatus = "Not Started"
  const [actionItemStatus, setActionItemStatus] = useState(initialActionItemStatus);
  const initialValueAddChecks = {
    check1: false,
    check2: false,
    check3: false,
    check4: false
  }
  const [valueAddChecks, setValueAddChecks] = useState(initialValueAddChecks)

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
        body: isValueAdd? 
            JSON.stringify({ task, description, valueAddChecks }):
          isActionItem? 
            JSON.stringify({ task, description, actionItemStatus }):
          JSON.stringify({ task, description })
      });
      if (!response.ok) {
        throw new Error("Error adding todo");
      }

      const result = await response.json();
      if (result.status) {
        await getTodo();
        setTask("");
        setDescription("");
        setValueAddChecks(initialValueAddChecks);
        setIsValueAdd(false);
        setIsActionItem(false);
        setActionItemStatus(initialActionItemStatus)
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
    if(event.target.value === "Value Adds")
    {
      setIsValueAdd(true);
      setIsActionItem(false);
    }
    else if ( event.target.value === "Action Items")
    {
      setIsValueAdd(false);
      setIsActionItem(true);
    }
    else {
      setIsValueAdd(false);
      setIsActionItem(false);
    }
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
          { 
            isValueAdd?
            <div>
              <FormControlLabel control={
                <Checkbox 
                  checked={valueAddChecks.check1}
                  onChange={() => setValueAddChecks(preState =>{ 
                    return {
                      ...preState,
                      check1: !preState.check1, 
                    }
                    })} 
                />
              } 
              label="Test1" />
              <FormControlLabel 
                control={
                  <Checkbox  
                    checked={valueAddChecks.check2}
                    onChange={() => setValueAddChecks(preState =>{ 
                        return {
                          ...preState,
                          check2: !preState.check2, 
                        }
                      })} 
                  />} 
                label="Test2" />
              <FormControlLabel 
                control={
                  <Checkbox  
                    checked={valueAddChecks.check3}
                    onChange={() => setValueAddChecks(preState =>{ 
                        return {
                          ...preState,
                          check3: !preState.check3, 
                        }
                      })} 
                  />} 
                label="Test3" />
              <FormControlLabel 
                control={
                  <Checkbox  
                    checked={valueAddChecks.check4}
                    onChange={() => setValueAddChecks(preState =>{ 
                        return {
                          ...preState,
                          check4: !preState.check4, 
                        }
                      })} 
                  />} 
                label="Test4" />
            </div>
            :
            isActionItem?
            <div>
              <FormControlLabel control={
                <Checkbox 
                  value={"not started"}
                  checked={actionItemStatus === "Not Started"}
                  onChange={ e => setActionItemStatus("Not Started")} 
                />
              } 
              label="Not Started" />
              <FormControlLabel 
                control={
                  <Checkbox  
                    checked={actionItemStatus === "In Progress"}
                    onChange={ e => setActionItemStatus("In Progress" )}
                  />} 
                label="In Progress" />
              <FormControlLabel 
                control={
                  <Checkbox  
                    checked={actionItemStatus === "Completed"}
                    onChange={ e => setActionItemStatus("Completed")}
                  />} 
                label="Completed" />
            </div>
            :""
          }
          <Button variant="contained" type="submit" style={{ margin: "10px" }}>
            Add
          </Button>

        </FormControl>
      </form>

      <div>
        <h2>Todo List</h2>
        <div>
          <div style={{ flex: 1, margin: "10px" }}>
            <ActionItems actionItems={todos.filter((item) => item.task === "Action Items")} 
              deletedTodo = {deletedTodo} updateTodo = {updateTodo} />
          </div>
          
          <div>
            <ProjectScopes ValueAdds projectScopes={todos.filter((item) => item.task === "Project Scope")} 
              deletedTodo = {deletedTodo} updateTodo = {updateTodo}/>
          </div>

          <div>
            <ValueAdds valueAdds={todos.filter((item) => item.task === "Value Adds")} 
              deletedTodo = {deletedTodo} updateTodo = {updateTodo}/>
          </div>
        </div> 

      </div>
    </div>
  );
}

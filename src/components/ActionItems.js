import React from 'react'
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import BarChart from './BarChart';

const ActionItems = ({actionItems, deletedTodo, updateTodo}) => {
  console.log(actionItems)
  const counts = {
    notStarted: 0,
    inProgress: 0,
    completed: 0,
  }
  actionItems.forEach(item => {
    if(item.actionItemStatus === "Not Started")
      counts.notStarted += 1
    else if(item.actionItemStatus === "In Progress")
      counts.inProgress += 1
    else if(item.actionItemStatus === "Completed")
      counts.completed += 1
  });
  const data = [
    ["Status", "Not Started", "In Progress", "Completed"],
    ["tasks status", counts.notStarted, counts.inProgress, counts.completed]
  ]
  const options = {
    chart: {
      title: "Action Items"
    }
  }
  return (
    actionItems.length === 0 ? "":
    <div>
      <h3>Action Items</h3>
      <div style={{width:'50%'}}>
        <BarChart data={data} options={options}/>
      </div>
      {
        actionItems.map((todo, index) => (
          <div key={index}>
            <p>
              <strong>Task:</strong>{" "}
              <span style={{ margin: "10px" }}> {todo.task} </span>
              <strong>Description:</strong>{" "}
              <span style={{ margin: "10px" }}>{todo.description}</span>
              <strong>Status:</strong>{" "}
              <span style={{ margin: "10px" }}>{todo.actionItemStatus}</span>
              <strong>Actions:</strong>{" "}
              <span style={{ margin: "10px" }}>
                <DeleteSharpIcon onClick={() => deletedTodo(todo._id)} />
                <EditSharpIcon onClick={updateTodo} />
              </span>
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default ActionItems
import React from 'react'
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";

const ActionItems = ({actionItems, deletedTodo, updateTodo}) => {

  return (
    <div>
      <h3>Action Items</h3>
      {
        actionItems.map((todo, index) => (
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
        ))
      }
    </div>
  )
}

export default ActionItems
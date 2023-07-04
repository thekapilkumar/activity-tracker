import React from 'react'
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";

const ValueAdds = ({valueAdds, deletedTodo, updateTodo}) => {

  return (
    <div>
      <h3>Value Adds</h3>
      {
        valueAdds.map((todo, index) => {
          const checks = []
          if(todo.valueAddChecks.check1)
            checks.push("check1")
          if(todo.valueAddChecks.check2)
            checks.push("check2") 
          if(todo.valueAddChecks.check3)
            checks.push("check3")
          if(todo.valueAddChecks.check4)
            checks.push("check4")
          return(
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
              <br/>
              <strong>Checks:</strong>{" "}
              {checks.map((check, index)=> <span key={index}>{check}</span>)}
            </p>
          </div>
        )})

      }
    </div>
  )
}

export default ValueAdds
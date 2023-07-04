import React from 'react'
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { PieChart } from './PieChart';

const ValueAdds = ({valueAdds, deletedTodo, updateTodo}) => {
  const convertData=(data)=> {
    const result = [];
    const counts = {
      check1: 0,
      check2: 0,
      check3: 0,
      check4: 0
    };
    // Count the occurrences of each task
    data.forEach( item => {
      if(item.valueAddChecks.check1)
        counts["check1"] += 1
      if(item.valueAddChecks.check2)
        counts["check2"] += 1
      if(item.valueAddChecks.check3)
        counts["check3"] += 1
      if(item.valueAddChecks.check4)
        counts["check4"] += 1
    })
    for (const check in counts) {
      result.push([check, counts[check]]);
    }
  
    return result;
  }

  return (
    <div>
      <h3>Value Adds</h3>
      <div style={{width:'50%'}}>
        <PieChart pieData={convertData(valueAdds)}/>
      </div>
      <div style={{width:'50%'}}>

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
    </div>
  )
}

export default ValueAdds
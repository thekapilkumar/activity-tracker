import React, { useState } from 'react'
import TodoForm from '../components/TodoForm'
import { PieChart } from '../components/PieChart'

export default function Home() {
  const [pieData,setPieData]=useState([])
  return (
    <div className='home'>
      <div style={{width:'50%'}}>
        <h1>Todo</h1>
      <TodoForm setPieData={setPieData}/>
      </div>
      <div style={{width:'50%'}}>
      <PieChart pieData={pieData}/>
      </div>
    </div>
  )
}

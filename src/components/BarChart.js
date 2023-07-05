import React from 'react'
import Chart from 'react-google-charts'

const BarChart = ({data, options}) => {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  )
}

export default BarChart
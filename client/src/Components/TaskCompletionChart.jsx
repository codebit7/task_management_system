import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import "../newapp.css";

const TaskCompletionChart = ({totalTasks, pendingTasks, completedTasks}) => {
    const [animatedData, setAnimatedData] = useState([]);

  
  const COLORS = ["#4CAF50", "#E53935"];

  useEffect(() => {
    
    setTimeout(() => {
      setAnimatedData([
        { name: "Completed", value: completedTasks },
        { name: "Pending", value: pendingTasks },
        
      ]);
    }, 200); 
  }, [completedTasks, pendingTasks]);

  return (
    <div className="task-chart-container">
      <h3>Completed vs Pending Tasks</h3>
      <p>Task completion status.</p>
      
      <PieChart className="pie-chart" width={200} height={120}>
      <Legend verticalAlign="top" align="left" 
      height={50}
      wrapperStyle={{ fontSize: "12px",  marginTop:"5px"}}
       />

      
        <Pie
          data={animatedData}
          cx="50%"
          cy="100%" 
          startAngle={180} 
          endAngle={0} 
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
          isAnimationActive={true}  
          animationDuration={400}
        >
          {animatedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
       
      </PieChart>
         <div className="taskcount">
          <h2>{totalTasks}</h2>
           <p>Total Tasks</p>
         </div>
        
    </div>
  );
};

export default TaskCompletionChart;

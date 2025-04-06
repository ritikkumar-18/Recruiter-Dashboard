import React from 'react'
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const RecruitData=[
    {name:"Frontend",value:5000},
    {name:"Backend",value:5000},
    {name:"API Handlers",value:5000},
];
const Colors=["#ffc658", "#ff8042", "#0088FE", "#00C49F"];

const RecruitSales = () => {
  return (
    <motion.div className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
    initial={{ opacity: 0, y: 20 }}
	animate={{ opacity: 1, y: 0 }}
	transition={{ delay: 0.3 }}>
     <h2 className='text-xl font-semibold text-gray-100 mb-4'>Job Seekers in several field</h2>
     <div style={{width:"100%", height:300}}>
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    data={RecruitData}
                    cx='50%'
                    cy='50%'
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {RecruitData.map((entry,index)=>(
                                <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
                                ))}
                    </Pie>
                    <Tooltip
                    contentStyle={{
                        backgroundColor:"rgba(31, 41, 55, 0.8)",
                        borderColor: "#4B5563",
                    }}
                    itemStyle={{ color: "#E5E7EB" }}/>
                    <Legend/>
            </PieChart>
        </ResponsiveContainer>
     </div>
    </motion.div>
  )
}

export default RecruitSales
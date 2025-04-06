import React, { useState } from 'react';

import { FiUsers, FiSettings, FiDollarSign, FiBarChart2, FiCalendar, FiCheckCircle, FiMail, FiFileText } from 'react-icons/fi';
import Header from '../components/Common/Header';

const HRM = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Name Same", completed: false },
    { id: 2, text: "Update Your Subscription for using HRM Tools", completed: false },
    { id: 3, text: "Review Team Feedback", completed: false },
    { id: 4, text: "Schedule Performance Reviews", completed: false }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [progress, setProgress] = useState(65);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    // Update progress based on completed tasks
    const completedCount = tasks.filter(t => t.completed).length;
    setProgress(Math.round((completedCount / tasks.length) * 100));
  };

  const hrmFeatures = [
    { title: "Recruitment", icon: <FiUsers size={24} />, desc: "Streamline hiring process" },
    { title: "Onboarding", icon: <FiSettings size={24} />, desc: "New hire integration" },
    { title: "Payroll", icon: <FiDollarSign size={24} />, desc: "Automated compensation" },
    { title: "Analytics", icon: <FiBarChart2 size={24} />, desc: "Workforce insights" },
    { title: "Scheduling", icon: <FiCalendar size={24} />, desc: "Manage employee shifts" },
    { title: "Compliance", icon: <FiCheckCircle size={24} />, desc: "Legal requirements" }
  ];

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 min-h-screen text-white">
      <Header title="HRM Dashboard" />
      
      <div className="container mx-auto px-4 py-8 mt-48">
        {/* Main Header */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Unblock your workflows, ship things faster
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-300">
            See how it's done on April 2
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-lg transition duration-200">
            Save your spot
          </button>
        </div>

        </div>
    </div>
  );
};

export default HRM;
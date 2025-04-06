// import React from 'react'
// import Header from '../components/Common/Header'
// import { motion } from 'framer-motion'
// import StatCards from '../components/Common/StatCards'
// import { Briefcase, BriefcaseIcon, Calendar, User2Icon } from 'lucide-react'



// const Overviewrecruit = () => {
//   return (
//     <div className='flex-1 overflow-auto z-10 relative'>
//         <Header title="Overview"/>
//         <main className='w-full py-6 px-4 mx-auto lg:px-8'>
//             <motion.div className="w-full grid grid-cols-1 gap-5 sm-grid-cols-2 lg:grid-cols-3 mb-8"
//             initial={{opacity:0,y:20}}
//             animate={{opacity:1,y:0}}
//             transition={{duration:0.5}}>
//                 <StatCards
//                 name="Active Jobs" icon={BriefcaseIcon} value="12,354" color="#6366F1"/>
//                 <StatCards
//                 name="Inactive jobs" icon={Briefcase} value="34,567" color="#10B981"/>
//                 <StatCards
//                 name="Closed Jobs"  value="23,123" icon={Briefcase} color="#EC4899"/>
                


//             </motion.div>
//             <div className='grid grid-cols-1  gap-8 lg:grid-cols-2'>
                
//             </div>
//         </main>
//     </div>
//   )
// }

// export default Overviewrecruit
// import React, { useState } from 'react';
// import Header from '../components/Common/Header';
// import { motion, AnimatePresence } from 'framer-motion';
// import StatCards from '../components/Common/StatCards';
// import { 
//   BriefcaseIcon, Calendar, User2Icon, Bell, Sliders, ChevronRight, 
//   CheckCircle, XCircle, Clock, CreditCard, Search, Filter, 
//   ArrowUpRight, ArrowDownRight, Settings, PieChart, BarChart, Activity,
//   BriefcaseMedicalIcon,
//   BriefcaseBusinessIcon,
//   BriefcaseConveyorBelt
// } from 'lucide-react';
// import { BiBriefcaseAlt } from 'react-icons/bi';

// // Enhanced mock data
// const applications = [
//   { id: 1, name: "John Doe", position: "Frontend Developer", status: "pending", date: "2024-03-15", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face", details: "John has 5 years of experience in frontend development and specializes in React and TypeScript." },
//   { id: 2, name: "Jane Smith", position: "UX Designer", status: "shortlisted", date: "2024-03-14", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face", details: "Jane is a creative UX designer with a strong portfolio in user-centered design." },
//   { id: 3, name: "Mike Wilson", position: "Backend Developer", status: "rejected", date: "2024-03-13", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face", details: "Mike has expertise in Node.js and MongoDB, with a focus on scalable backend systems." },
// ];

// const interviews = [
//   { 
//     id: 1, 
//     name: "Alice Johnson", 
//     position: "React Developer", 
//     time: "10:00 AM", 
//     status: "upcoming",
//     avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
//     duration: "45 min",
//     details: "Alice has a strong background in React and Redux, with experience in building large-scale applications."
//   },
//   { 
//     id: 2, 
//     name: "Bob Wilson", 
//     position: "UI Designer", 
//     time: "2:30 PM", 
//     status: "completed",
//     avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
//     duration: "60 min",
//     details: "Bob specializes in creating intuitive and visually appealing user interfaces."
//   },
// ];

// const messages = [
//   { 
//     id: 1, 
//     title: "System Update", 
//     content: "New features available in the recruitment dashboard", 
//     priority: "high",
//     timestamp: "2 hours ago",
//     unread: true,
//     details: "The new features include advanced analytics, candidate tracking, and improved reporting."
//   },
//   { 
//     id: 2, 
//     title: "Maintenance Notice", 
//     content: "Scheduled maintenance on March 20th, 2024", 
//     priority: "normal",
//     timestamp: "5 hours ago",
//     unread: false,
//     details: "The maintenance window is from 12:00 AM to 4:00 AM. During this time, the system will be unavailable."
//   },
// ];

// const subscriptionData = {
//   plan: "Premium",
//   status: "active",
//   expiryDate: "March 25, 2024",
//   jobsPosted: 15,
//   totalJobs: 20,
//   features: ["Unlimited applications", "Advanced analytics", "Priority support"],
//   usage: {
//     interviews: { used: 25, total: 50 },
//     storage: { used: 75, total: 100 }
//   }
// };

// const Overviewrecruit = () => {
//   const [showAllMessages, setShowAllMessages] = useState(false);
//   const [expandedApplicationId, setExpandedApplicationId] = useState(null);
//   const [expandedInterviewId, setExpandedInterviewId] = useState(null);
//   const [expandedMessageId, setExpandedMessageId] = useState(null);

//   const toggleApplicationDetails = (id) => {
//     setExpandedApplicationId(expandedApplicationId === id ? null : id);
//   };

//   const toggleInterviewDetails = (id) => {
//     setExpandedInterviewId(expandedInterviewId === id ? null : id);
//   };

//   const toggleMessageDetails = (id) => {
//     setExpandedMessageId(expandedMessageId === id ? null : id);
//   };

//   return (
//     <div className='flex-1 overflow-auto z-10 relative bg-gray-900 text-gray-100'>
//       <Header title="Overview" />
//       <main className='w-full py-6 px-4 mx-auto lg:px-8 max-w-7xl'>
//         {/* Stats Cards */}
//         <motion.div 
//           className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
//           initial={{opacity:0, y:20}}
//           animate={{opacity:1, y:0}}
//           transition={{duration:0.5}}
//         >
//           <StatCards
//             name="Active Jobs" 
//             icon={BriefcaseIcon} 
//             value="42,354"
//             color="#6366F1"
//           />
//           <StatCards
//             name="In Active Jobs" 
//             icon={BriefcaseBusinessIcon} 
//             value="14,567"
//             color="#10B981"
//           />
//           <StatCards
//             name="Closed Jobs"  
//             value="2300"
//             icon={BriefcaseConveyorBelt}
//             color="#EC4899"
//           />
//           <StatCards
//             name="Total Jobs"  
//             value="50,876"
//             icon={BiBriefcaseAlt}
//             color="#F59E0B"
//           />
//         </motion.div>

//         <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
//           {/* Applications Section */}
//           <motion.div 
//             className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"
//             initial={{opacity:0, y:20}}
//             animate={{opacity:1, y:0}}
//             transition={{duration:0.5, delay:0.2}}
//           >
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-lg font-semibold">Recent Applications</h2>
//                 <p className="text-sm text-gray-400 mt-1">Last 7 days activity</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button 
//                   className="p-2 hover:bg-gray-700 rounded-lg"
//                   onClick={() => setFilter("all")}
//                 >
//                   <Sliders className="w-5 h-5 text-gray-400" />
//                 </button>
//                 <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1">
//                   View all <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//             <div className="space-y-4">
//               {applications.map(app => (
//                 <div key={app.id}>
//                   <div 
//                     className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
//                     onClick={() => toggleApplicationDetails(app.id)}
//                   >
//                     <div className="flex items-center gap-3">
//                       <img src={app.avatar} alt={app.name} className="w-8 h-8 rounded-full" />
//                       <div>
//                         <h3 className="font-medium">{app.name}</h3>
//                         <p className="text-sm text-gray-400">{app.position}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <span className={`px-3 py-1 rounded-full text-sm ${
//                         app.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
//                         app.status === 'shortlisted' ? 'bg-green-500/10 text-green-500' :
//                         'bg-red-500/10 text-red-500'
//                       }`}>
//                         {app.status}
//                       </span>
//                       <motion.button 
//                         className="text-gray-400 hover:text-gray-200"
//                         animate={{ rotate: expandedApplicationId === app.id ? 90 : 0 }}
//                       >
//                         <ChevronRight className="w-5 h-5" />
//                       </motion.button>
//                     </div>
//                   </div>
//                   <AnimatePresence>
//                     {expandedApplicationId === app.id && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="overflow-hidden"
//                       >
//                         <div className="p-4 pl-12 bg-gray-700/50 rounded-b-lg">
//                           <p className="text-sm text-gray-300">{app.details}</p>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Interviews Section */}
//           <motion.div 
//             className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"
//             initial={{opacity:0, y:20}}
//             animate={{opacity:1, y:0}}
//             transition={{duration:0.5, delay:0.4}}
//           >
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-lg font-semibold">Upcoming Interviews</h2>
//                 <p className="text-sm text-gray-400 mt-1">Today's schedule</p>
//               </div>
//               <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1">
//                 View all <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//             <div className="space-y-4">
//               {interviews.map(interview => (
//                 <div key={interview.id}>
//                   <div 
//                     className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
//                     onClick={() => toggleInterviewDetails(interview.id)}
//                   >
//                     <div className="flex items-center gap-3">
//                       <img src={interview.avatar} alt={interview.name} className="w-8 h-8 rounded-full" />
//                       <div>
//                         <h3 className="font-medium">{interview.name}</h3>
//                         <p className="text-sm text-gray-400">{interview.position}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <span className={`px-3 py-1 rounded-full text-sm ${
//                         interview.status === 'upcoming' ? 'bg-blue-500/10 text-blue-500' :
//                         'bg-green-500/10 text-green-500'
//                       }`}>
//                         {interview.status}
//                       </span>
//                       <motion.button 
//                         className="text-gray-400 hover:text-gray-200"
//                         animate={{ rotate: expandedInterviewId === interview.id ? 90 : 0 }}
//                       >
//                         <ChevronRight className="w-5 h-5" />
//                       </motion.button>
//                     </div>
//                   </div>
//                   <AnimatePresence>
//                     {expandedInterviewId === interview.id && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="overflow-hidden"
//                       >
//                         <div className="p-4 pl-12 bg-gray-700/50 rounded-b-lg">
//                           <p className="text-sm text-gray-300">{interview.details}</p>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Messages Section */}
//           <motion.div 
//             className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"
//             initial={{opacity:0, y:20}}
//             animate={{opacity:1, y:0}}
//             transition={{duration:0.5, delay:0.6}}
//           >
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-lg font-semibold">Messages</h2>
//                 <p className="text-sm text-gray-400 mt-1">Unread messages</p>
//               </div>
//               <button 
//                 className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
//                 onClick={() => setShowAllMessages(!showAllMessages)}
//               >
//                 {showAllMessages ? "Show less" : "View all"} <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//             <div className="space-y-4">
//               {(showAllMessages ? messages : messages.slice(0, 2)).map(message => (
//                 <div key={message.id}>
//                   <div 
//                     className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
//                     onClick={() => toggleMessageDetails(message.id)}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className={`w-2 h-2 rounded-full ${
//                         message.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'
//                       }`} />
//                       <div>
//                         <h3 className="font-medium">{message.title}</h3>
//                         <p className="text-sm text-gray-400">{message.content}</p>
//                       </div>
//                     </div>
//                     <motion.button 
//                       className="text-gray-400 hover:text-gray-200"
//                       animate={{ rotate: expandedMessageId === message.id ? 90 : 0 }}
//                     >
//                       <ChevronRight className="w-5 h-5" />
//                     </motion.button>
//                   </div>
//                   <AnimatePresence>
//                     {expandedMessageId === message.id && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="overflow-hidden"
//                       >
//                         <div className="p-4 pl-12 bg-gray-700/50 rounded-b-lg">
//                           <p className="text-sm text-gray-300">{message.details}</p>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Overviewrecruit;


import { useState } from "react"
import { motion } from "framer-motion"
import {
  Briefcase,
  Clock,
  BarChartIcon,
  Users,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Calendar,
  MessageSquare,
  User2,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import Header from "../components/Common/Header"

const OverviewRecruit = () => {
  const [expandedCard, setExpandedCard] = useState(null)

  const toggleCardExpand = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  // Job statistics data
  const jobStats = {
    totalJobs: 30,
    activeJobs: 16,
    closedJobs: 5,
    inactiveJobs: 5,
  }

  // Application statistics data
  const applicationStats = {
    total: 100,
    seen: 60,
    unseen: 10,
    rejected: 10,
    shortlisted: 20,
  }

  // Subscription details
  const subscriptionDetails = {
    expiredDate: "31/05/2023",
    jobPostsLeft: 100,
    resumeViews: 50,
  }

  // Job type data for the bar chart
  const jobTypeData = [
    {
      name: "Frontend",
      applications: 21,
      pending: 10,
      shortlisted: 8,
      rejected: 3,
    },
    {
      name: "Backend",
      applications: 50,
      pending: 25,
      shortlisted: 15,
      rejected: 10,
    },
    {
      name: "UI/UX",
      applications: 10,
      pending: 5,
      shortlisted: 3,
      rejected: 2,
    },
  ]

  // Interview data
  const interviewData = {
    previous: "Done (On time)",
    next: "10:00 AM Today",
  }

  // Status data
  const statusData = {
    pending: 43,
    total: 23,
  }

  // Messages data
  const messagesData = [
    {
      id: 1,
      sender: "Admin",
      content: "New job applications require review",
      time: "2 hours ago",
    },
    {
      id: 2,
      sender: "System",
      content: "Subscription will expire in 7 days",
      time: "1 day ago",
    },
  ]

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 min-h-screen text-white scroll-hidden">
      <Header title="Overview" />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Jobs Card */}
          <motion.div
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Total Jobs</p>
                <h3 className="text-2xl font-bold mt-1">{jobStats.totalJobs}</h3>
                <div className="flex mt-2 space-x-2 text-xs">
                  <span className="text-green-400">Active: {jobStats.activeJobs}</span>
                  <span className="text-red-400">Closed: {jobStats.closedJobs}</span>
                  <span className="text-yellow-400">Inactive: {jobStats.inactiveJobs}</span>
                </div>
              </div>
              <div className="p-3 bg-indigo-900/30 rounded-lg">
                <Briefcase className="h-6 w-6 text-indigo-400" />
              </div>
            </div>
          </motion.div>

          {/* Applications Card */}
          <motion.div
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Total Applications</p>
                <h3 className="text-2xl font-bold mt-1">{applicationStats.total}</h3>
                <div className="flex flex-wrap mt-2 gap-2 text-xs">
                  <span className="text-blue-400">Seen: {applicationStats.seen}</span>
                  <span className="text-gray-400">Unseen: {applicationStats.unseen}</span>
                </div>
              </div>
              <div className="p-3 bg-purple-900/30 rounded-lg">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </motion.div>

          {/* Application Status Card */}
          <motion.div
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Application Status</p>
                <div className="flex flex-wrap mt-2 gap-2 text-xs">
                  <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Shortlisted: {applicationStats.shortlisted}
                  </span>
                  <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded-full flex items-center gap-1">
                    <XCircle className="h-3 w-3" /> Rejected: {applicationStats.rejected}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-900/30 rounded-lg">
                <BarChartIcon className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </motion.div>

          {/* Subscription Card */}
          <motion.div
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Subscription Details</p>
                <div className="mt-2 space-y-1 text-xs">
                  <p className="text-yellow-400">Expires: {subscriptionDetails.expiredDate}</p>
                  <p className="text-green-400">Job Posts Left: {subscriptionDetails.jobPostsLeft}</p>
                  <p className="text-blue-400">Resume Views: {subscriptionDetails.resumeViews}</p>
                </div>
              </div>
              <div className="p-3 bg-amber-900/30 rounded-lg">
                <Calendar className="h-6 w-6 text-amber-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Applications Chart Card */}
            <motion.div
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Job Applications Graph</h3>
                <div className="p-2 bg-gray-700 rounded-lg">
                  <BarChartIcon className="h-5 w-5 text-blue-400" />
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={jobTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        borderColor: "#374151",
                        color: "#F9FAFB",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="applications" name="Total Applications" fill="#6366F1" />
                    <Bar dataKey="pending" name="Pending" fill="#FBBF24" />
                    <Bar dataKey="shortlisted" name="Shortlisted" fill="#10B981" />
                    <Bar dataKey="rejected" name="Rejected" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Messages Card */}
            <motion.div
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Messages</h3>
                <div className="p-2 bg-gray-700 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-400">
                  Any user or admin or staff member who sent the message that will appear here
                </p>

                {messagesData.map((message) => (
                  <div key={message.id} className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{message.sender}</span>
                      <span className="text-xs text-gray-400">{message.time}</span>
                    </div>
                    <p className="text-sm mt-1">{message.content}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Status Card */}
            <motion.div
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Pending Status</h3>
                <div className="p-2 bg-gray-700 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-400" />
                </div>
              </div>

              <div className="flex items-center justify-center p-6">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-2xl font-bold">{statusData.pending}</span>
                      <span className="text-sm text-gray-400">of {statusData.total}</span>
                    </div>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#374151" strokeWidth="2"></circle>
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#FBBF24"
                      strokeWidth="2"
                      strokeDasharray={`${(statusData.pending / statusData.total) * 100} 100`}
                      strokeLinecap="round"
                      transform="rotate(-90 18 18)"
                    ></circle>
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Interview Card */}
            <motion.div
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Interviews</h3>
                <div className="p-2 bg-gray-700 rounded-lg">
                  <User2 className="h-5 w-5 text-green-400" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <div>
                      <p className="text-sm font-medium">Previous Interview</p>
                      <p className="text-xs text-gray-400">{interviewData.previous}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-400" />
                    <div>
                      <p className="text-sm font-medium">Next Interview</p>
                      <p className="text-xs text-gray-400">{interviewData.next}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Application Breakdown Card */}
            <motion.div
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Application Breakdown</h3>
                <div className="p-2 bg-gray-700 rounded-lg">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">Seen Applications</span>
                  </div>
                  <span className="font-medium">{applicationStats.seen}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <EyeOff className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Unseen Applications</span>
                  </div>
                  <span className="font-medium">{applicationStats.unseen}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Shortlisted</span>
                  </div>
                  <span className="font-medium">{applicationStats.shortlisted}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-400" />
                    <span className="text-sm">Rejected</span>
                  </div>
                  <span className="font-medium">{applicationStats.rejected}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewRecruit



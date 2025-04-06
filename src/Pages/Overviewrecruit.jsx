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



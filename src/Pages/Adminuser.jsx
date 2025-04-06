import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  X,
  Filter,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Briefcase,
  MapPin,
  Clock4,
  Download,
  Upload,
  Users,
  UserCheck,
  UserX,
  GraduationCap,
  Award,
  BarChart2,
  FileUp,
  UserPlus,
  Settings,
  Layers,
} from "lucide-react"
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai"
import { toast, Toaster } from "react-hot-toast"
import Header from "../components/Common/Header"

// Mock job seeker data
const userData = [
  {
    id: 1,
    name: "Will Smith",
    email: "will@example.com",
    status: "Active",
    joined: "2022-01-15",
    contact: "123-456-7890",
    location: "New York, USA",
    lastLogin: "2023-05-10T08:30:00",
    todayLogin: true,
    profileCompletion: 85,
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    experience: [
      { company: "Tech Solutions", position: "Senior Developer", duration: "2018-2022" },
      { company: "Digital Innovators", position: "Web Developer", duration: "2015-2018" },
    ],
    education: [{ institution: "MIT", degree: "Computer Science", year: "2015" }],
    jobsApplied: 24,
    jobsBookmarked: 12,
    profileViews: 45,
    accountType: "Premium",
    accountValidUntil: "2023-12-15",
    resumeUrl: "https://example.com/resumes/will-smith.pdf",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    additionalDetails: {
      lastActivity: "Applied to Senior Developer position",
      preferredJobTypes: ["Full-time", "Remote"],
      preferredLocations: ["New York", "Boston", "Remote"],
      salary: "$120,000 - $150,000",
    },
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    status: "Active",
    joined: "2021-11-30",
    contact: "444-567-8901",
    location: "San Francisco, USA",
    lastLogin: "2023-05-11T09:15:00",
    todayLogin: true,
    profileCompletion: 100,
    skills: ["UI/UX Design", "Figma", "Adobe XD", "HTML/CSS", "JavaScript"],
    experience: [
      { company: "Design Masters", position: "Senior UI Designer", duration: "2019-Present" },
      { company: "Creative Solutions", position: "UI/UX Designer", duration: "2016-2019" },
    ],
    education: [{ institution: "Rhode Island School of Design", degree: "Graphic Design", year: "2016" }],
    jobsApplied: 18,
    jobsBookmarked: 24,
    profileViews: 78,
    accountType: "Premium",
    accountValidUntil: "2023-10-30",
    resumeUrl: "https://example.com/resumes/jane-doe.pdf",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    additionalDetails: {
      lastActivity: "Updated portfolio",
      preferredJobTypes: ["Full-time", "Contract"],
      preferredLocations: ["San Francisco", "Los Angeles", "Remote"],
      salary: "$110,000 - $140,000",
    },
  },
  {
    id: 3,
    name: "John Smith",
    email: "john@example.com",
    status: "Inactive",
    joined: "2022-02-20",
    contact: "555-123-4567",
    location: "Chicago, USA",
    lastLogin: "2023-04-25T11:20:00",
    todayLogin: false,
    profileCompletion: 60,
    skills: ["Java", "Spring", "SQL", "AWS"],
    experience: [{ company: "Enterprise Solutions", position: "Java Developer", duration: "2017-2022" }],
    education: [{ institution: "University of Illinois", degree: "Computer Engineering", year: "2017" }],
    jobsApplied: 8,
    jobsBookmarked: 5,
    profileViews: 12,
    accountType: "Basic",
    accountValidUntil: "N/A",
    resumeUrl: "https://example.com/resumes/john-smith.pdf",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
    additionalDetails: {
      lastActivity: "Viewed Software Engineer job",
      preferredJobTypes: ["Full-time"],
      preferredLocations: ["Chicago", "Remote"],
      salary: "$90,000 - $120,000",
    },
  },
  {
    id: 4,
    name: "Emily Johnson",
    email: "emily@example.com",
    status: "Active",
    joined: "2022-03-15",
    contact: "777-888-9999",
    location: "Seattle, USA",
    lastLogin: "2023-05-11T10:45:00",
    todayLogin: true,
    profileCompletion: 95,
    skills: ["Python", "Django", "Flask", "Machine Learning", "Data Analysis"],
    experience: [
      { company: "Data Insights", position: "Data Scientist", duration: "2020-Present" },
      { company: "Tech Innovations", position: "Python Developer", duration: "2018-2020" },
    ],
    education: [{ institution: "University of Washington", degree: "Data Science", year: "2018" }],
    jobsApplied: 15,
    jobsBookmarked: 20,
    profileViews: 65,
    accountType: "Premium",
    accountValidUntil: "2023-11-15",
    resumeUrl: "https://example.com/resumes/emily-johnson.pdf",
    profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
    additionalDetails: {
      lastActivity: "Applied to Data Scientist position",
      preferredJobTypes: ["Full-time", "Remote"],
      preferredLocations: ["Seattle", "Portland", "Remote"],
      salary: "$130,000 - $160,000",
    },
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael@example.com",
    status: "Active",
    joined: "2022-01-10",
    contact: "222-333-4444",
    location: "Austin, USA",
    lastLogin: "2023-05-10T16:30:00",
    todayLogin: true,
    profileCompletion: 90,
    skills: ["C#", ".NET", "Azure", "SQL Server"],
    experience: [
      { company: "Microsoft", position: ".NET Developer", duration: "2019-Present" },
      { company: "Software Solutions", position: "Junior Developer", duration: "2017-2019" },
    ],
    education: [{ institution: "University of Texas", degree: "Software Engineering", year: "2017" }],
    jobsApplied: 10,
    jobsBookmarked: 15,
    profileViews: 40,
    accountType: "Premium",
    accountValidUntil: "2023-09-10",
    resumeUrl: "https://example.com/resumes/michael-brown.pdf",
    profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
    additionalDetails: {
      lastActivity: "Updated resume",
      preferredJobTypes: ["Full-time"],
      preferredLocations: ["Austin", "Dallas"],
      salary: "$100,000 - $130,000",
    },
  },
  {
    id: 6,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    status: "Inactive",
    joined: "2021-10-05",
    contact: "111-222-3333",
    location: "Denver, USA",
    lastLogin: "2023-04-20T09:15:00",
    todayLogin: false,
    profileCompletion: 50,
    skills: ["Marketing", "Social Media", "Content Creation", "SEO"],
    experience: [{ company: "Marketing Pros", position: "Marketing Specialist", duration: "2018-2021" }],
    education: [{ institution: "Colorado State University", degree: "Marketing", year: "2018" }],
    jobsApplied: 5,
    jobsBookmarked: 8,
    profileViews: 15,
    accountType: "Basic",
    accountValidUntil: "N/A",
    resumeUrl: "https://example.com/resumes/sarah-wilson.pdf",
    profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
    additionalDetails: {
      lastActivity: "Viewed Marketing Manager job",
      preferredJobTypes: ["Full-time", "Part-time"],
      preferredLocations: ["Denver", "Boulder", "Remote"],
      salary: "$70,000 - $90,000",
    },
  },
  {
    id: 7,
    name: "David Lee",
    email: "david@example.com",
    status: "Active",
    joined: "2022-04-20",
    contact: "888-777-6666",
    location: "Boston, USA",
    lastLogin: "2023-05-11T08:45:00",
    todayLogin: true,
    profileCompletion: 75,
    skills: ["Product Management", "Agile", "Scrum", "User Research"],
    experience: [
      { company: "Tech Products", position: "Product Manager", duration: "2020-Present" },
      { company: "Startup Inc", position: "Associate PM", duration: "2018-2020" },
    ],
    education: [{ institution: "Harvard University", degree: "Business Administration", year: "2018" }],
    jobsApplied: 12,
    jobsBookmarked: 18,
    profileViews: 55,
    accountType: "Premium",
    accountValidUntil: "2023-10-20",
    resumeUrl: "https://example.com/resumes/david-lee.pdf",
    profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
    additionalDetails: {
      lastActivity: "Applied to Senior PM position",
      preferredJobTypes: ["Full-time"],
      preferredLocations: ["Boston", "New York", "Remote"],
      salary: "$140,000 - $170,000",
    },
  },
  {
    id: 8,
    name: "Lisa Chen",
    email: "lisa@example.com",
    status: "Pending",
    joined: "2023-01-15",
    contact: "555-666-7777",
    location: "San Diego, USA",
    lastLogin: "2023-05-09T14:30:00",
    todayLogin: false,
    profileCompletion: 30,
    skills: ["Graphic Design", "Adobe Creative Suite", "Illustration"],
    experience: [{ company: "Creative Agency", position: "Graphic Designer", duration: "2019-2022" }],
    education: [{ institution: "San Diego State University", degree: "Graphic Arts", year: "2019" }],
    jobsApplied: 3,
    jobsBookmarked: 10,
    profileViews: 8,
    accountType: "Basic",
    accountValidUntil: "N/A",
    resumeUrl: "https://example.com/resumes/lisa-chen.pdf",
    profilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
    additionalDetails: {
      lastActivity: "Created account",
      preferredJobTypes: ["Full-time", "Freelance"],
      preferredLocations: ["San Diego", "Los Angeles", "Remote"],
      salary: "$60,000 - $80,000",
    },
  },
  {
    id: 9,
    name: "Robert Taylor",
    email: "robert@example.com",
    status: "Active",
    joined: "2022-02-10",
    contact: "444-555-6666",
    location: "Miami, USA",
    lastLogin: "2023-05-11T11:15:00",
    todayLogin: true,
    profileCompletion: 85,
    skills: ["Sales", "CRM", "Negotiation", "Client Management"],
    experience: [
      { company: "Global Sales Inc", position: "Sales Manager", duration: "2018-Present" },
      { company: "Sales Solutions", position: "Sales Representative", duration: "2015-2018" },
    ],
    education: [{ institution: "University of Miami", degree: "Business", year: "2015" }],
    jobsApplied: 8,
    jobsBookmarked: 12,
    profileViews: 35,
    accountType: "Premium",
    accountValidUntil: "2023-08-10",
    resumeUrl: "https://example.com/resumes/robert-taylor.pdf",
    profilePicture: "https://randomuser.me/api/portraits/men/9.jpg",
    additionalDetails: {
      lastActivity: "Applied to Sales Director position",
      preferredJobTypes: ["Full-time"],
      preferredLocations: ["Miami", "Tampa", "Orlando"],
      salary: "$90,000 - $120,000",
    },
  },
  {
    id: 10,
    name: "Amanda Martinez",
    email: "amanda@example.com",
    status: "Active",
    joined: "2022-03-05",
    contact: "777-888-9999",
    location: "Portland, USA",
    lastLogin: "2023-05-10T15:45:00",
    todayLogin: true,
    profileCompletion: 95,
    skills: ["Human Resources", "Recruiting", "Employee Relations", "HRIS"],
    experience: [
      { company: "HR Solutions", position: "HR Manager", duration: "2019-Present" },
      { company: "Corporate Inc", position: "HR Specialist", duration: "2016-2019" },
    ],
    education: [{ institution: "Portland State University", degree: "Human Resources Management", year: "2016" }],
    jobsApplied: 15,
    jobsBookmarked: 20,
    profileViews: 60,
    accountType: "Premium",
    accountValidUntil: "2023-09-05",
    resumeUrl: "https://example.com/resumes/amanda-martinez.pdf",
    profilePicture: "https://randomuser.me/api/portraits/women/10.jpg",
    additionalDetails: {
      lastActivity: "Updated job preferences",
      preferredJobTypes: ["Full-time", "Remote"],
      preferredLocations: ["Portland", "Seattle", "Remote"],
      salary: "$85,000 - $110,000",
    },
  },
  {
    id: 11,
    name: "Thomas Johnson",
    email: "thomas@example.com",
    status: "Inactive",
    joined: "2021-09-15",
    contact: "222-333-4444",
    location: "Phoenix, USA",
    lastLogin: "2023-04-15T10:30:00",
    todayLogin: false,
    profileCompletion: 40,
    skills: ["Customer Service", "Communication", "Problem Solving"],
    experience: [{ company: "Customer First", position: "Customer Service Rep", duration: "2018-2021" }],
    education: [{ institution: "Arizona State University", degree: "Communications", year: "2018" }],
    jobsApplied: 4,
    jobsBookmarked: 6,
    profileViews: 10,
    accountType: "Basic",
    accountValidUntil: "N/A",
    resumeUrl: "https://example.com/resumes/thomas-johnson.pdf",
    profilePicture: "https://randomuser.me/api/portraits/men/11.jpg",
    additionalDetails: {
      lastActivity: "Viewed Customer Service Manager job",
      preferredJobTypes: ["Full-time", "Part-time"],
      preferredLocations: ["Phoenix", "Tucson", "Remote"],
      salary: "$45,000 - $60,000",
    },
  },
  {
    id: 12,
    name: "Jennifer Williams",
    email: "jennifer@example.com",
    status: "Active",
    joined: "2022-05-01",
    contact: "333-444-5555",
    location: "Atlanta, USA",
    lastLogin: "2023-05-11T09:30:00",
    todayLogin: true,
    profileCompletion: 90,
    skills: ["Project Management", "PMP", "Agile", "Scrum", "Budgeting"],
    experience: [
      { company: "Project Solutions", position: "Senior Project Manager", duration: "2019-Present" },
      { company: "Tech Projects", position: "Project Manager", duration: "2016-2019" },
    ],
    education: [{ institution: "Georgia Tech", degree: "Business Management", year: "2016" }],
    jobsApplied: 20,
    jobsBookmarked: 25,
    profileViews: 70,
    accountType: "Premium",
    accountValidUntil: "2023-11-01",
    resumeUrl: "https://example.com/resumes/jennifer-williams.pdf",
    profilePicture: "https://randomuser.me/api/portraits/women/12.jpg",
    additionalDetails: {
      lastActivity: "Applied to Program Manager position",
      preferredJobTypes: ["Full-time", "Contract"],
      preferredLocations: ["Atlanta", "Remote"],
      salary: "$120,000 - $150,000",
    },
  },
]

const Adminuser = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  const [filteredUsers, setFilteredUsers] = useState(userData)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isSliderOpen, setIsSliderOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterSidebar, setFilterSidebar] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [filters, setFilters] = useState({
    accountType: "",
    profileCompletion: "",
    location: "",
    skills: "",
  })
  const [activeTab, setActiveTab] = useState("All")
  const [uploadModal, setUploadModal] = useState(false)
  const fileInputRef = useRef(null)

  // Get today's date at midnight for comparison
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Calculate stats
  const totalUsers = userData.length
  const totalActiveUsers = userData.filter((user) => user.status === "Active").length
  const totalInactiveUsers = userData.filter((user) => user.status === "Inactive").length
  const totalTodayLoginUsers = userData.filter((user) => user.todayLogin).length
  const totalPremiumUsers = userData.filter((user) => user.accountType === "Premium").length
  const totalJobsApplied = userData.reduce((sum, user) => sum + user.jobsApplied, 0)

  const openEditModal = (user) => {
    setEditUser({ ...user })
    setIsEditOpen(true)
  }

  const handleToggleStatus = () => {
    const nextStatus =
      filterStatus === "All"
        ? "Active"
        : filterStatus === "Active"
          ? "Inactive"
          : filterStatus === "Inactive"
            ? "Pending"
            : "All"

    setFilterStatus(nextStatus)
    setActiveTab(nextStatus)

    const updatedUsers = nextStatus === "All" ? userData : userData.filter((user) => user.status === nextStatus)

    setFilteredUsers(updatedUsers)
    setCurrentPage(1)
  }

  const closeEditModal = () => {
    if (editUser) {
      setFilteredUsers((prevUsers) => prevUsers.map((user) => (user.id === editUser.id ? editUser : user)))
      toast.success("User updated successfully!")
    }
    setIsEditOpen(false)
    setTimeout(() => setEditUser(null), 500)
  }

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    applyFilters(term, filters)
  }

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value }
    setFilters(newFilters)
    applyFilters(searchTerm, newFilters)
  }

  const handleTabChange = (status) => {
    setActiveTab(status)
    setFilterStatus(status)

    const updatedUsers = status === "All" ? userData : userData.filter((user) => user.status === status)
    setFilteredUsers(updatedUsers)
    setCurrentPage(1)
  }

  const applyFilters = (query, currentFilters) => {
    const filtered = userData.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.contact.toLowerCase().includes(query) ||
        user.location.toLowerCase().includes(query) ||
        user.skills.some((skill) => skill.toLowerCase().includes(query))

      const matchesAccountType =
        !currentFilters.accountType || user.accountType.toLowerCase().includes(currentFilters.accountType.toLowerCase())

      const matchesLocation =
        !currentFilters.location || user.location.toLowerCase().includes(currentFilters.location.toLowerCase())

      const matchesSkills =
        !currentFilters.skills ||
        user.skills.some((skill) => skill.toLowerCase().includes(currentFilters.skills.toLowerCase()))

      let matchesProfileCompletion = true
      if (currentFilters.profileCompletion) {
        if (currentFilters.profileCompletion === "high") {
          matchesProfileCompletion = user.profileCompletion >= 80
        } else if (currentFilters.profileCompletion === "medium") {
          matchesProfileCompletion = user.profileCompletion >= 50 && user.profileCompletion < 80
        } else if (currentFilters.profileCompletion === "low") {
          matchesProfileCompletion = user.profileCompletion < 50
        }
      }

      const matchesStatus = filterStatus === "All" || user.status === filterStatus

      return (
        matchesSearch &&
        matchesAccountType &&
        matchesLocation &&
        matchesSkills &&
        matchesProfileCompletion &&
        matchesStatus
      )
    })

    setFilteredUsers(filtered)
    setCurrentPage(1)
  }

  const deleteUser = (userId) => {
    setUserToDelete(userData.find((user) => user.id === userId))
    setDeleteModal(true)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id))
      toast.success(`${userToDelete.name} has been removed successfully!`)
      setDeleteModal(false)
      setUserToDelete(null)
    }
  }

  const openSlider = (user) => {
    setSelectedUser(user)
    setIsSliderOpen(true)
  }

  const closeSlider = () => {
    setIsSliderOpen(false)
    setTimeout(() => setSelectedUser(null), 500)
  }

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const displayedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleAction = (action, user) => {
    switch (action) {
      case "view":
        openSlider(user)
        break
      case "edit":
        openEditModal(user)
        break
      case "delete":
        deleteUser(user.id)
        break
    }
  }

  const exportToCSV = () => {
    try {
      // Prepare data for export
      const exportData = filteredUsers.map((user) => ({
        ID: user.id,
        Name: user.name,
        Email: user.email,
        Status: user.status,
        "Joined Date": user.joined,
        Contact: user.contact,
        Location: user.location,
        "Last Login": new Date(user.lastLogin).toLocaleString(),
        "Profile Completion": `${user.profileCompletion}%`,
        Skills: user.skills.join(", "),
        "Jobs Applied": user.jobsApplied,
        "Jobs Bookmarked": user.jobsBookmarked,
        "Profile Views": user.profileViews,
        "Account Type": user.accountType,
        "Account Valid Until": user.accountValidUntil,
      }))

      // Convert to CSV
      const headers = Object.keys(exportData[0]).join(",")
      const rows = exportData.map((obj) =>
        Object.values(obj)
          .map((value) => (typeof value === "string" && value.includes(",") ? `"${value}"` : value))
          .join(","),
      )
      const csvContent = [headers, ...rows].join("\n")

      // Create and download the file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `JobSeekers_${new Date().toISOString().split("T")[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success("User data exported successfully!")
    } catch (error) {
      console.error("Export error:", error)
      toast.error("Failed to export data. Please try again.")
    }
  }

  const handleUploadClick = () => {
    setUploadModal(true)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      
      toast.success(`File "${file.name}" uploaded successfully!`)
      setUploadModal(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="flex-1 bg-gray-900 relative overflow-auto scroll-hidden ">
      <Header title={"Total User"} />
      <Toaster/>
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="p-4 md:p-6 ">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4 mb-6  ">
          <motion.div
            className="relative overflow-hidden  bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl shadow-lg border border-blue-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}>
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-blue-500 opacity-20"></div>
            <div className="absolute -right-2 -bottom-8 w-28 h-28 rounded-full bg-blue-500 opacity-10"></div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-200 text-sm font-medium mb-1">Total Users</p>
                <h3 className="text-3xl font-bold text-white mb-1">{totalUsers}</h3>
                <p className="text-blue-200 text-sm">{totalActiveUsers} active users</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg shadow-lg">
                <Users size={28} className="text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl shadow-lg border border-green-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-green-500 opacity-20"></div>
            <div className="absolute -right-2 -bottom-8 w-28 h-28 rounded-full bg-green-500 opacity-10"></div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-200 text-sm font-medium mb-1">Today's Logins</p>
                <h3 className="text-3xl font-bold text-white mb-1">{totalTodayLoginUsers}</h3>
                <p className="text-green-200 text-sm">
                  {Math.round((totalTodayLoginUsers / totalUsers) * 100)}% of users
                </p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg shadow-lg">
                <UserCheck size={28} className="text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-xl shadow-lg border border-purple-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-purple-500 opacity-20"></div>
            <div className="absolute -right-2 -bottom-8 w-28 h-28 rounded-full bg-purple-500 opacity-10"></div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-purple-200 text-sm font-medium mb-1">Premium Users</p>
                <h3 className="text-3xl font-bold text-white mb-1">{totalPremiumUsers}</h3>
                <p className="text-purple-200 text-sm">
                  {Math.round((totalPremiumUsers / totalUsers) * 100)}% of total users
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg shadow-lg">
                <Award size={28} className="text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-xl shadow-lg border border-red-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-red-500 opacity-20"></div>
            <div className="absolute -right-2 -bottom-8 w-28 h-28 rounded-full bg-red-500 opacity-10"></div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-red-200 text-sm font-medium mb-1">Inactive Users</p>
                <h3 className="text-3xl font-bold text-white mb-1">{totalInactiveUsers}</h3>
                <p className="text-red-200 text-sm">Need attention</p>
              </div>
              <div className="bg-red-500 p-3 rounded-lg shadow-lg">
                <UserX size={28} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>
       

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name, email, skills or location..."
              className="w-full py-3 pl-12 pr-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterSidebar(true)}
              className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-2.5 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Download size={18} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleUploadClick}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Upload size={18} />
              <span>Upload Users</span>
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex justify-center mb-6 overflow-x-auto ">
          <div className="bg-gray-800 rounded-lg p-1 flex flex-nowrap">
            <button
              onClick={() => handleTabChange("All")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "All"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => handleTabChange("Active")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "Active"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Active Users
            </button>
            <button
              onClick={() => handleTabChange("Inactive")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "Inactive"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Inactive Users
            </button>
            <button
              onClick={() => handleTabChange("Pending")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "Pending"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Pending Users
            </button>
          </div>
        </div>

        {/* Filter Sidebar */}
        <AnimatePresence>
          {filterSidebar && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setFilterSidebar(false)}
                className="fixed inset-0 bg-black z-40"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween" }}
                className="fixed right-0 top-0 h-full w-full md:w-96 bg-gray-800 p-6 shadow-xl z-50 overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Filters</h2>
                  <button
                    onClick={() => setFilterSidebar(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white mb-2">Account Type</label>
                    <select
                      value={filters.accountType}
                      onChange={(e) => handleFilterChange("accountType", e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">All Account Types</option>
                      <option value="Premium">Premium</option>
                      <option value="Basic">Basic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Profile Completion</label>
                    <select
                      value={filters.profileCompletion}
                      onChange={(e) => handleFilterChange("profileCompletion", e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">All Completion Levels</option>
                      <option value="high">High (80-100%)</option>
                      <option value="medium">Medium (50-79%)</option>
                      <option value="low">Low (0-49%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Location</label>
                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                      placeholder="Filter by location..."
                      className="w-full bg-gray-700 text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Skills</label>
                    <input
                      type="text"
                      value={filters.skills}
                      onChange={(e) => handleFilterChange("skills", e.target.value)}
                      placeholder="Filter by skills..."
                      className="w-full bg-gray-700 text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setFilters({
                          accountType: "",
                          profileCompletion: "",
                          location: "",
                          skills: "",
                        })
                        applyFilters(searchTerm, {
                          accountType: "",
                          profileCompletion: "",
                          location: "",
                          skills: "",
                        })
                      }}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 mr-2"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setFilterSidebar(false)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* User Cards */}
        {displayedUsers.length === 0 ? (
          <div className="bg-gray-800 p-8 text-center rounded-lg">
            <p className="text-gray-400">No users found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedUsers.map((user) => (
              <motion.div
                key={user.id}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg cursor-pointer hover:shadow-xl hover:border-gray-600 transition-all duration-300"
                
                
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                      <p className="text-purple-400 text-sm">{user.location}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-lg font-bold overflow-hidden">
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture || "/placeholder.svg"}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.name.charAt(0)
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300 truncate">{user.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">{user.contact}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">Applied: {user.jobsApplied} jobs</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">Account: {user.accountType}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">Joined: {user.joined}</p>
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Profile Completion</span>
                      <span className="text-xs text-gray-400">{user.profileCompletion}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          user.profileCompletion >= 80
                            ? "bg-green-500"
                            : user.profileCompletion >= 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${user.profileCompletion}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {user.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {user.skills.length > 3 && (
                      <span className="text-xs bg-gray-700 text-purple-400 px-2 py-1 rounded-full">
                        +{user.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "Inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.status === "Active" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : user.status === "Inactive" ? (
                        <XCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <Clock className="w-3 h-3 mr-1" />
                      )}
                      {user.status}
                    </span>
                    {user.todayLogin && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Today
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-700 p-3 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAction("view", user)
                      }}
                      className="p-1.5 bg-gray-700 rounded-full text-blue-400 hover:text-blue-300 transition-colors"
                      title="View Details"
                    >
                      <AiOutlineEye size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAction("edit", user)
                      }}
                      className="p-1.5 bg-gray-700 rounded-full text-purple-400 hover:text-purple-300 transition-colors"
                      title="Edit User"
                    >
                      <AiOutlineEdit size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAction("delete", user)
                      }}
                      className="p-1.5 bg-gray-700 rounded-full text-red-400 hover:text-red-300 transition-colors"
                      title="Delete User"
                    >
                      <AiOutlineDelete size={16} />
                    </button>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 flex items-center">
                      <Clock4 size={14} className="mr-1" />{" "}
                      {user.additionalDetails.lastActivity.length > 20
                        ? user.additionalDetails.lastActivity.substring(0, 20) + "..."
                        : user.additionalDetails.lastActivity}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredUsers.length > itemsPerPage && (
          <div className="flex justify-center mt-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Calculate page numbers to show (centered around current page)
                let startPage = Math.max(1, currentPage - 2)
                const endPage = Math.min(startPage + 4, totalPages)

                if (endPage - startPage < 4) {
                  startPage = Math.max(1, endPage - 4)
                }

                const pageNum = startPage + i
                if (pageNum > totalPages) return null

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`
                      px-4 py-2 rounded-lg transition-colors
                      ${
                        currentPage === pageNum
                          ? "bg-purple-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                )
              })}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* User Detail Slider */}
        <AnimatePresence>
          {isSliderOpen && selectedUser && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex z-50"
              onClick={closeSlider}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-gray-900 shadow-xl z-50 overflow-y-auto scroll-hidden"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 z-10">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">User Profile</h2>
                    <button
                      onClick={closeSlider}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Profile Header */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-6 border border-gray-700">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                        {selectedUser.profilePicture ? (
                          <img
                            src={selectedUser.profilePicture || "/placeholder.svg"}
                            alt={selectedUser.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          selectedUser.name.charAt(0)
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white">{selectedUser.name}</h3>
                        <p className="text-purple-400">{selectedUser.location}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-3 py-1 rounded-full text-sm bg-purple-900/40 text-purple-400 border border-purple-800/50">
                            {selectedUser.accountType}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              selectedUser.status === "Active"
                                ? "bg-green-900/40 text-green-400 border border-green-800/50"
                                : selectedUser.status === "Inactive"
                                  ? "bg-red-900/40 text-red-400 border border-red-800/50"
                                  : "bg-yellow-900/40 text-yellow-400 border border-yellow-800/50"
                            }`}
                          >
                            {selectedUser.status}
                          </span>
                          {selectedUser.todayLogin && (
                            <span className="px-3 py-1 rounded-full text-sm bg-blue-900/40 text-blue-400 border border-blue-800/50">
                              Logged in today
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information Card */}
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <User size={20} className="text-purple-400" /> Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-purple-900/20">
                          <Mail size={18} className="text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <a
                            href={`mailto:${selectedUser.email}`}
                            className="text-white hover:text-purple-400 transition-colors"
                          >
                            {selectedUser.email}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-purple-900/20">
                          <Phone size={18} className="text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Phone</p>
                          <a
                            href={`tel:${selectedUser.contact}`}
                            className="text-white hover:text-purple-400 transition-colors"
                          >
                            {selectedUser.contact}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-purple-900/20">
                          <MapPin size={18} className="text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="text-white">{selectedUser.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-purple-900/20">
                          <Calendar size={18} className="text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Joined Date</p>
                          <p className="text-white">{selectedUser.joined}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Layers size={20} className="text-purple-400" /> Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.skills.map((skill, index) => (
                        <span key={index} className="text-sm bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Briefcase size={20} className="text-purple-400" /> Experience
                    </h3>
                    <div className="space-y-4">
                      {selectedUser.experience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-gray-700 pl-4">
                          <p className="font-medium text-white">{exp.position}</p>
                          <p className="text-purple-400">{exp.company}</p>
                          <p className="text-sm text-gray-400">{exp.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <GraduationCap size={20} className="text-purple-400" /> Education
                    </h3>
                    <div className="space-y-4">
                      {selectedUser.education.map((edu, index) => (
                        <div key={index} className="border-l-2 border-gray-700 pl-4">
                          <p className="font-medium text-white">{edu.degree}</p>
                          <p className="text-purple-400">{edu.institution}</p>
                          <p className="text-sm text-gray-400">Graduated: {edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Job Preferences */}
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Settings size={20} className="text-purple-400" /> Job Preferences
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Preferred Job Types</p>
                        <p className="text-white">{selectedUser.additionalDetails.preferredJobTypes.join(", ")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Preferred Locations</p>
                        <p className="text-white">{selectedUser.additionalDetails.preferredLocations.join(", ")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Expected Salary</p>
                        <p className="text-white">{selectedUser.additionalDetails.salary}</p>
                      </div>
                    </div>
                  </div>

                  {/* Activity Information */}
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Clock4 size={20} className="text-purple-400" /> Activity Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Jobs Applied</p>
                        <p className="text-white">{selectedUser.jobsApplied}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Jobs Bookmarked</p>
                        <p className="text-white">{selectedUser.jobsBookmarked}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Profile Views</p>
                        <p className="text-white">{selectedUser.profileViews}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Last Login</p>
                        <p className="text-white">{new Date(selectedUser.lastLogin).toLocaleString()}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-400">Last Activity</p>
                        <p className="text-white">{selectedUser.additionalDetails.lastActivity}</p>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <User size={20} className="text-purple-400" /> Account Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Account Type</p>
                        <p className="text-white">{selectedUser.accountType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Valid Until</p>
                        <p className="text-white">{selectedUser.accountValidUntil}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Profile Completion</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-grow h-2 bg-gray-700 rounded-full">
                            <div
                              className={`h-2 rounded-full ${
                                selectedUser.profileCompletion >= 80
                                  ? "bg-green-500"
                                  : selectedUser.profileCompletion >= 50
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${selectedUser.profileCompletion}%` }}
                            ></div>
                          </div>
                          <span className="text-white">{selectedUser.profileCompletion}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={() => {
                        closeSlider()
                        openEditModal(selectedUser)
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                      <AiOutlineEdit size={18} />
                      Edit User
                    </button>
                    <button
                      onClick={closeSlider}
                      className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Modal */}
        <AnimatePresence>
          {isEditOpen && editUser && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex z-50"
              onClick={closeEditModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-gray-900 shadow-xl z-50 overflow-y-auto scroll-hidden"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 z-10">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">Edit User Profile</h2>
                    <button
                      onClick={closeEditModal}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      closeEditModal()
                    }}
                    className="space-y-6"
                  >
                    {/* Basic Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-200 mb-3">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                          <input
                            type="text"
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            value={editUser.name}
                            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                          <input
                            type="email"
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            value={editUser.email}
                            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Contact</label>
                          <input
                            type="text"
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            value={editUser.contact}
                            onChange={(e) => setEditUser({ ...editUser, contact: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                          <input
                            type="text"
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            value={editUser.location}
                            onChange={(e) => setEditUser({ ...editUser, location: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Status and Account */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-200 mb-3">Status & Account</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                          <select
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            value={editUser.status}
                            onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Account Type</label>
                          <select
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            value={editUser.accountType}
                            onChange={(e) => setEditUser({ ...editUser, accountType: e.target.value })}
                          >
                            <option value="Basic">Basic</option>
                            <option value="Premium">Premium</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Join Date</label>
                          <input
                            type="date"
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            value={editUser.joined}
                            onChange={(e) => setEditUser({ ...editUser, joined: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-200 mb-3">Skills</h3>
                      <div className="space-y-2">
                        {editUser.skills.map((skill, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                              value={skill}
                              onChange={(e) => {
                                const updatedSkills = [...editUser.skills]
                                updatedSkills[index] = e.target.value
                                setEditUser({ ...editUser, skills: updatedSkills })
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updatedSkills = editUser.skills.filter((_, i) => i !== index)
                                setEditUser({ ...editUser, skills: updatedSkills })
                              }}
                              className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setEditUser({ ...editUser, skills: [...editUser.skills, ""] })
                          }}
                          className="w-full p-2 bg-gray-700 text-gray-300 rounded border border-gray-600 hover:bg-gray-600"
                        >
                          + Add Skill
                        </button>
                      </div>
                    </div>

                    {/* Job Preferences */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-200 mb-3">Job Preferences</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Expected Salary</label>
                          <input
                            type="text"
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            value={editUser.additionalDetails?.salary || ""}
                            onChange={(e) =>
                              setEditUser({
                                ...editUser,
                                additionalDetails: {
                                  ...editUser.additionalDetails,
                                  salary: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Preferred Job Types (comma separated)
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            value={editUser.additionalDetails?.preferredJobTypes?.join(", ") || ""}
                            onChange={(e) =>
                              setEditUser({
                                ...editUser,
                                additionalDetails: {
                                  ...editUser.additionalDetails,
                                  preferredJobTypes: e.target.value.split(",").map((item) => item.trim()),
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Preferred Locations (comma separated)
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            value={editUser.additionalDetails?.preferredLocations?.join(", ") || ""}
                            onChange={(e) =>
                              setEditUser({
                                ...editUser,
                                additionalDetails: {
                                  ...editUser.additionalDetails,
                                  preferredLocations: e.target.value.split(",").map((item) => item.trim()),
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 border-t border-gray-700 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditOpen(false)}
                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteModal && userToDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
              >
                <div className="flex items-center gap-3 text-red-400 mb-4">
                  <AlertTriangle size={24} />
                  <h3 className="text-xl font-semibold">Confirm Deletion</h3>
                </div>

                <p className="text-gray-300 mb-6">
                  Are you sure you want to remove <span className="font-semibold">{userToDelete.name}</span> from the
                  users list? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setDeleteModal(false)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Modal */}
        <AnimatePresence>
          {uploadModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setUploadModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-lg p-6 w-full max-w-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 text-blue-400 mb-4">
                  <UserPlus size={24} />
                  <h3 className="text-xl font-semibold">Upload Job Seekers</h3>
                </div>

                <p className="text-gray-300 mb-6">
                  Upload a CSV file containing job seeker profiles. The file should include columns for name, email,
                  contact, location, skills, experience, education, and other required information.
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Required Columns:</h4>
                  <ul className="text-sm text-gray-300 space-y-1 ml-4 list-disc">
                    <li>name - Full name of the job seeker</li>
                    <li>email - Email address</li>
                    <li>contact - Phone number</li>
                    <li>location - City, State or Country</li>
                    <li>skills - Comma-separated list of skills</li>
                    <li>status - Active, Inactive, or Pending</li>
                  </ul>
                </div>

                <div
                  className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-6 hover:border-purple-500 transition-colors cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <FileUp size={36} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-300">Click to select a file or drag and drop</p>
                  <p className="text-gray-500 text-sm mt-1">Supports CSV, XLS, XLSX</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".csv,.xls,.xlsx"
                    onChange={handleFileUpload}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                    onClick={(e) => {
                      e.preventDefault()
                      // Here you would typically provide a template download
                      toast.success("Template downloaded successfully!")
                    }}
                  >
                    <Download size={14} />
                    Download Template
                  </a>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setUploadModal(false)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={triggerFileInput}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Upload size={16} />
                      Select File
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </motion.div>
    </div>
  )
}

export default Adminuser


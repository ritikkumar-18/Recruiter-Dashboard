import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-hot-toast"
import {
  X,
  ToggleLeft,
  ToggleRight,
  Eye,
  Trash,
  Search,
  Filter,
  Edit,
  ChevronLeft,
  ChevronRight,
  Mail,
  Calendar,
  User,
  Shield,
  Settings,
  FileText,
  Users,
  CreditCard,
  Building,
  Clock,
  AlertCircle,
  UserPlus,
} from "lucide-react"
import Header from "../components/Common/Header"

const SubAdmin = () => {
  const [subAdmins, setSubAdmins] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Admin ${i + 1}`,
      email: `admin${i + 1}@example.com`,
      password: "********",
      joinedDate: "2024-01-10",
      lastActive: "2025-02-10",
      status: i % 2 === 0 ? "Active" : "Inactive",
      role: i % 3 === 0 ? "Super Admin" : i % 3 === 1 ? "Manager" : "Editor",
      department: i % 4 === 0 ? "HR" : i % 4 === 1 ? "Finance" : i % 4 === 2 ? "Marketing" : "Operations",
      permissions: {
        recruiter: { view: true, edit: i % 2 === 0, list: true, delete: i % 3 === 0 },
        subscription: { view: true, edit: i % 3 === 0, list: i % 2 === 0, delete: i % 4 === 0 },
        payment: { view: i % 2 === 0, edit: i % 4 === 0, list: true, delete: i % 3 === 0 },
        users: { view: true, edit: i % 3 === 0, list: true, delete: i % 2 === 0 },
        settings: { view: i % 2 === 0, edit: i % 3 === 0, list: i % 4 === 0, delete: i % 2 === 0 },
      },
    })),
  )

  const [showForm, setShowForm] = useState(false)
  const [showPermissions, setShowPermissions] = useState(false)
  const [viewAdmin, setViewAdmin] = useState(null)
  const [editAdmin, setEditAdmin] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterRole, setFilterRole] = useState("All")
  const [filterDepartment, setFilterDepartment] = useState("All")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [adminToDelete, setAdminToDelete] = useState(null)
  const [detailsSidebar, setDetailsSidebar] = useState(false)
  const [filterSidebar, setFilterSidebar] = useState(false)
  const adminsPerPage = 10

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Editor",
    department: "HR",
    joinedDate: new Date().toISOString().split("T")[0],
    lastActive: "N/A",
    status: "Active",
    permissions: {
      recruiter: { view: false, edit: false, list: false, delete: false },
      subscription: { view: false, edit: false, list: false, delete: false },
      payment: { view: false, edit: false, list: false, delete: false },
      users: { view: false, edit: false, list: false, delete: false },
      settings: { view: false, edit: false, list: false, delete: false },
    },
  })

  const roleOptions = ["Super Admin", "Manager", "Editor", "Viewer"]
  const departmentOptions = ["HR", "Finance", "Marketing", "Operations", "IT", "Sales"]
  const permissionModules = [
    { key: "recruiter", name: "Recruiter Management", icon: Users },
    { key: "subscription", name: "Subscription Management", icon: FileText },
    { key: "payment", name: "Payment Management", icon: CreditCard },
    { key: "users", name: "User Management", icon: User },
    { key: "settings", name: "Settings", icon: Settings },
  ]
  const permissionTypes = [
    { key: "view", name: "View" },
    { key: "edit", name: "Edit" },
    { key: "list", name: "List" },
    { key: "delete", name: "Delete" },
  ]

  useEffect(() => {
    if (showForm || showPermissions || viewAdmin || deleteModalOpen || detailsSidebar || filterSidebar) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showForm, showPermissions, viewAdmin, deleteModalOpen, detailsSidebar, filterSidebar])

  const togglePermission = (category, type) => {
    if (editAdmin) {
      setEditAdmin((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [category]: {
            ...prev.permissions[category],
            [type]: !prev.permissions[category][type],
          },
        },
      }))
    } else {
      setNewAdmin((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [category]: {
            ...prev.permissions[category],
            [type]: !prev.permissions[category][type],
          },
        },
      }))
    }
  }

  const handleCreateSubAdmin = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      toast.error("All fields are required!")
      return
    }

    if (newAdmin.password !== newAdmin.confirmPassword) {
      toast.error("Passwords do not match!")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newAdmin.email)) {
      toast.error("Please enter a valid email address!")
      return
    }

    const newAdminWithId = {
      ...newAdmin,
      id: subAdmins.length + 1,
      password: "********", // For security, don't store actual password in state
    }

    setSubAdmins([newAdminWithId, ...subAdmins])
    setShowForm(false)
    setShowPermissions(false)
    toast.success("Sub-Admin Created Successfully!")
    resetNewAdmin()
  }

  const handleUpdateSubAdmin = () => {
    if (!editAdmin.name || !editAdmin.email) {
      toast.error("Name and email are required!")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(editAdmin.email)) {
      toast.error("Please enter a valid email address!")
      return
    }

    const updatedAdmins = subAdmins.map((admin) => (admin.id === editAdmin.id ? { ...editAdmin } : admin))

    setSubAdmins(updatedAdmins)
    setEditAdmin(null)
    setShowForm(false) 
    setShowPermissions(false)
    toast.success("Sub-Admin Updated Successfully!")
  }

  const resetNewAdmin = () => {
    setNewAdmin({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Editor",
      department: "HR",
      joinedDate: new Date().toISOString().split("T")[0],
      lastActive: "N/A",
      status: "Active",
      permissions: {
        recruiter: { view: false, edit: false, list: false, delete: false },
        subscription: { view: false, edit: false, list: false, delete: false },
        payment: { view: false, edit: false, list: false, delete: false },
        users: { view: false, edit: false, list: false, delete: false },
        settings: { view: false, edit: false, list: false, delete: false },
      },
    })
  }

  const handleDeleteAdmin = () => {
    if (adminToDelete) {
      setSubAdmins(subAdmins.filter((admin) => admin.id !== adminToDelete.id))
      setDeleteModalOpen(false)
      setAdminToDelete(null)
      toast.success("Sub-Admin Deleted Successfully!")
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleViewAdmin = (admin) => {
    setViewAdmin(admin)
    setDetailsSidebar(true)
  }

  const handleEditAdmin = (admin) => {
    setEditAdmin({ ...admin })
    setShowForm(true)
  }

  const handleOpenDeleteModal = (admin) => {
    setAdminToDelete(admin)
    setDeleteModalOpen(true)
  }

  const handleToggleStatus = (adminId) => {
    const updatedAdmins = subAdmins.map((admin) => {
      if (admin.id === adminId) {
        const newStatus = admin.status === "Active" ? "Inactive" : "Active"
        toast.success(`Admin status changed to ${newStatus}`)
        return { ...admin, status: newStatus }
      }
      return admin
    })
    setSubAdmins(updatedAdmins)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (editAdmin) {
      setEditAdmin((prev) => ({ ...prev, [name]: value }))
    } else {
      setNewAdmin((prev) => ({ ...prev, [name]: value }))
    }
  }

  const applyFilters = () => {
    let filtered = [...subAdmins]

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (admin) =>
          admin.name.toLowerCase().includes(query) ||
          admin.email.toLowerCase().includes(query) ||
          admin.role.toLowerCase().includes(query) ||
          admin.department.toLowerCase().includes(query),
      )
    }

    // Apply status filter
    if (filterStatus !== "All") {
      filtered = filtered.filter((admin) => admin.status === filterStatus)
    }

    // Apply role filter
    if (filterRole !== "All") {
      filtered = filtered.filter((admin) => admin.role === filterRole)
    }

    // Apply department filter
    if (filterDepartment !== "All") {
      filtered = filtered.filter((admin) => admin.department === filterDepartment)
    }

    return filtered
  }

  const filteredAdmins = applyFilters()
  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage)
  const currentAdmins = filteredAdmins.slice((currentPage - 1) * adminsPerPage, currentPage * adminsPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="flex-1 overflow-auto relative bg-gray-900 text-white min-h-screen scroll-hidden">
      <Header title="Sub Admins" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 md:p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search sub-admins..."
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <button
            onClick={() => setFilterSidebar(true)}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
          <motion.button
            onClick={() => {
              resetNewAdmin()
              setShowForm(true)
            }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus size={18} />
            <span>Add Admin</span>
          </motion.button>
        </div>

        {/* Status Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-800 rounded-lg p-1 flex flex-wrap">
            <button
              onClick={() => {
                setFilterStatus("All")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterStatus === "All"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              All Admins
            </button>
            <button
              onClick={() => {
                setFilterStatus("Active")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterStatus === "Active"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => {
                setFilterStatus("Inactive")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterStatus === "Inactive"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* Admin Cards */}
        {currentAdmins.length === 0 ? (
          <div className="bg-gray-800 p-8 text-center rounded-lg">
            <p className="text-gray-400">No sub-admins found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentAdmins.map((admin) => (
              <motion.div
                key={admin.id}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg hover:cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{admin.name}</h3>
                      <p className="text-purple-400 text-sm">{admin.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                      {admin.name.charAt(0)}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">{admin.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">{admin.department}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">Joined: {admin.joinedDate}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">Last Active: {admin.lastActive}</p>
                  </div>

                  <div className="mt-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        admin.status === "Active"
                          ? "bg-green-900/60 text-green-300 border border-green-500"
                          : "bg-red-900/60 text-red-300 border border-red-500"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-700 p-3 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewAdmin(admin)
                      }}
                      className="p-1.5 bg-gray-700 rounded-full text-blue-400 hover:text-blue-300 transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditAdmin(admin)
                      }}
                      className="p-1.5 bg-gray-700 rounded-full text-yellow-400 hover:text-yellow-300 transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenDeleteModal(admin)
                      }}
                      className="p-1.5 bg-gray-700 rounded-full text-red-400 hover:text-red-300 transition-colors"
                      title="Remove"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggleStatus(admin.id)
                    }}
                    className={`px-3 py-1 rounded-md text-xs flex items-center gap-1 ${
                      admin.status === "Active"
                        ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                        : "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                    }`}
                  >
                    {admin.status === "Active" ? (
                      <>
                        <ToggleRight size={14} />
                        <span>Deactivate</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={14} />
                        <span>Activate</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredAdmins.length > adminsPerPage && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                let pageNumber
                if (totalPages <= 5) {
                  pageNumber = index + 1
                } else if (currentPage <= 3) {
                  pageNumber = index + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + index
                } else {
                  pageNumber = currentPage - 2 + index
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`
                      px-4 py-2 rounded-lg transition-colors
                      ${
                        currentPage === pageNumber
                          ? "bg-purple-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }
                    `}
                  >
                    {pageNumber}
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
                    <label className="block text-white mb-2">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Role</label>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="All">All Roles</option>
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Department</label>
                    <select
                      value={filterDepartment}
                      onChange={(e) => setFilterDepartment(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="All">All Departments</option>
                      {departmentOptions.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setFilterStatus("All")
                        setFilterRole("All")
                        setFilterDepartment("All")
                        setCurrentPage(1)
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

        {/* Admin Details Sidebar */}
        <AnimatePresence>
          {detailsSidebar && viewAdmin && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setDetailsSidebar(false)}
                className="fixed inset-0 bg-black z-40"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween" }}
                className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-gray-900 shadow-xl z-50 overflow-y-auto scroll-hidden"
              >
                <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 z-10">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">Admin Details</h2>
                    <button
                      onClick={() => setDetailsSidebar(false)}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                      {viewAdmin.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{viewAdmin.name}</h3>
                      <p className="text-gray-300">
                        {viewAdmin.role} - {viewAdmin.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        viewAdmin.status === "Active"
                          ? "bg-gradient-to-r from-green-900/60 to-green-700/60 text-green-300 border border-green-500"
                          : "bg-gradient-to-r from-red-900/60 to-red-700/60 text-red-300 border border-red-500"
                      }`}
                    >
                      {viewAdmin.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-gray-300">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="flex items-center">
                        <Mail size={16} className="mr-2 text-purple-400" />
                        {viewAdmin.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="flex items-center">
                        <Building size={16} className="mr-2 text-purple-400" />
                        {viewAdmin.department}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Joined Date</p>
                      <p className="flex items-center">
                        <Calendar size={16} className="mr-2 text-purple-400" />
                        {viewAdmin.joinedDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Active</p>
                      <p className="flex items-center">
                        <Clock size={16} className="mr-2 text-purple-400" />
                        {viewAdmin.lastActive}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Shield size={18} className="mr-2 text-purple-400" /> Permissions
                    </h4>

                    <div className="space-y-4">
                      {permissionModules.map((module) => (
                        <div key={module.key} className="bg-gray-800 p-3 rounded-lg">
                          <h5 className="text-white font-medium flex items-center mb-2">
                            <module.icon size={16} className="mr-2 text-purple-400" />
                            {module.name}
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {permissionTypes.map((type) => (
                              <span
                                key={type.key}
                                className={`px-2 py-1 text-xs rounded-full ${
                                  viewAdmin.permissions[module.key][type.key]
                                    ? "bg-green-900/30 text-green-400 border border-green-500/50"
                                    : "bg-gray-700 text-gray-400"
                                }`}
                              >
                                {type.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => {
                        setDetailsSidebar(false)
                        handleEditAdmin(viewAdmin)
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-md hover:from-yellow-600 hover:to-amber-600 font-medium flex items-center"
                    >
                      <Edit size={18} className="mr-2" />
                      Edit Admin
                    </button>
                    <button
                      onClick={() => {
                        handleToggleStatus(viewAdmin.id)
                        setDetailsSidebar(false)
                      }}
                      className={`px-6 py-3 rounded-md font-medium flex items-center ${
                        viewAdmin.status === "Active"
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                          : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                      }`}
                    >
                      {viewAdmin.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Create/Edit Sub-Admin Modal */}
        <AnimatePresence>
          {showForm && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setShowForm(false)
                  setEditAdmin(null)
                }}
                className="fixed inset-0 bg-black z-40"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween" }}
                className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-gray-900 shadow-xl z-50 overflow-y-auto scroll-hidden"
              >
                <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 z-10">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">
                      {editAdmin ? "Edit Sub-Admin" : "Create Sub-Admin"}
                    </h2>
                    <button
                      onClick={() => {
                        setShowForm(false)
                        setEditAdmin(null)
                      }}
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
                      editAdmin ? handleUpdateSubAdmin() : handleCreateSubAdmin()
                    }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">Name*</label>
                        <input
                          type="text"
                          name="name"
                          value={editAdmin ? editAdmin.name : newAdmin.name}
                          onChange={handleChange}
                          placeholder="Enter admin name"
                          className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">Email*</label>
                        <input
                          type="email"
                          name="email"
                          value={editAdmin ? editAdmin.email : newAdmin.email}
                          onChange={handleChange}
                          placeholder="Enter email address"
                          className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        />
                      </div>

                      {!editAdmin && (
                        <>
                          <div>
                            <label className="block text-gray-300 mb-2 font-medium">Password*</label>
                            <input
                              type="password"
                              name="password"
                              value={newAdmin.password}
                              onChange={handleChange}
                              placeholder="Enter password"
                              className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-gray-300 mb-2 font-medium">Confirm Password*</label>
                            <input
                              type="password"
                              name="confirmPassword"
                              value={newAdmin.confirmPassword}
                              onChange={handleChange}
                              placeholder="Confirm password"
                              className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              required
                            />
                          </div>
                        </>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">Role</label>
                          <select
                            name="role"
                            value={editAdmin ? editAdmin.role : newAdmin.role}
                            onChange={handleChange}
                            className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            {roleOptions.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </div>

                        
                      </div>

                      
                    </div>

                    <div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false)
                          setEditAdmin(null)
                        }}
                        className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`px-6 py-3 text-white rounded-md font-medium ${
                          editAdmin
                            ? "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
                            : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        }`}
                      >
                        {editAdmin ? "Update Admin" : "Create Admin"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        
        

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteModalOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setDeleteModalOpen(false)}
                className="fixed inset-0 bg-black z-40"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
              >
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-900/30 to-red-700/30 text-red-400 mb-4">
                      <AlertCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Confirm Deletion</h3>
                    <p className="text-gray-300">
                      Are you sure you want to delete the sub-admin account for{" "}
                      <span className="font-semibold">{adminToDelete?.name}</span>? This action cannot be undone.
                    </p>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setDeleteModalOpen(false)}
                      className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAdmin}
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default SubAdmin


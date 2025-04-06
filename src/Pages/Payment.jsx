import { useState } from "react"
import Header from "../components/Common/Header"
import { motion, AnimatePresence } from "framer-motion"
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlinePlus } from "react-icons/ai"
import { toast } from "react-hot-toast"
import {
  CheckCircle,
  XCircle,
  Calendar,
  CreditCard,
  Users,
  DollarSign,
  Tag,
  Award,
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Briefcase,
  User,
  FileText,
  Info,
} from "lucide-react"

const Payment = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    {
      id: 1,
      name: "Basic Monthly",
      price: 50,
      subscriptionType: "Recruiter",
      planType: "Monthly",
      status: "Active",
      description: "Perfect for small businesses looking to hire occasionally",
      features: [
        { name: "Job Postings", value: "5" },
        { name: "Candidate Database Access", value: "Basic" },
        { name: "Email Support", value: "Yes" },
        { name: "Analytics", value: "Basic" },
      ],
      duration: 30,
      popularPlan: false,
      discount: 0,
      totalUsers: 120,
      createdAt: "2023-01-15",
    },
    {
      id: 2,
      name: "Pay Per Post",
      price: 20,
      subscriptionType: "Candidate",
      planType: "Pay-per-post",
      status: "Inactive",
      description: "Ideal for one-time job postings with no commitment",
      features: [
        { name: "Single job posting", value: "" },
        { name: "30-day visibility", value: "" },
        { name: "Limited candidate interactions", value: "" },
        { name: "Basic job analytics", value: "" },
      ],
      duration: 30,
      popularPlan: false,
      discount: 0,
      totalUsers: 85,
      createdAt: "2023-02-20",
    },
    {
      id: 3,
      name: "Premium Listing",
      price: 99,
      subscriptionType: "Recruiter",
      planType: "Monthly",
      status: "Active",
      description: "Our most popular plan for growing businesses",
      features: [
        { name: "Unlimited job postings", value: "" },
        { name: "Featured listings", value: "" },
        { name: "Full candidate database access", value: "" },
        { name: "Priority support", value: "" },
        { name: "Advanced analytics and reporting", value: "" },
      ],
      duration: 30,
      popularPlan: true,
      discount: 10,
      totalUsers: 250,
      createdAt: "2023-03-05",
    },
    {
      id: 4,
      name: "Enterprise Annual",
      price: 899,
      subscriptionType: "Recruiter",
      planType: "Annual",
      status: "Active",
      description: "Complete solution for large enterprises with dedicated support",
      features: [
        { name: "Unlimited everything", value: "" },
        { name: "Dedicated account manager", value: "" },
        { name: "Custom branding", value: "" },
        { name: "API access", value: "" },
        { name: "Advanced integrations", value: "" },
        { name: "Team collaboration tools", value: "" },
      ],
      duration: 365,
      popularPlan: false,
      discount: 15,
      totalUsers: 75,
      createdAt: "2023-04-10",
    },
    {
      id: 5,
      name: "Candidate Pro",
      price: 29,
      subscriptionType: "Candidate",
      planType: "Monthly",
      status: "Active",
      description: "Stand out from other candidates with premium features",
      features: [
        { name: "Featured profile", value: "" },
        { name: "Early job notifications", value: "" },
        { name: "Direct messaging with recruiters", value: "" },
        { name: "Resume review", value: "" },
        { name: "Career coaching session", value: "" },
      ],
      duration: 30,
      popularPlan: true,
      discount: 0,
      totalUsers: 320,
      createdAt: "2023-05-15",
    },
  ])

  const [viewingPlan, setViewingPlan] = useState(null)
  const [editingPlan, setEditingPlan] = useState(null)
  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    subscriptionType: "Recruiter",
    planType: "Monthly",
    status: "Active",
    description: "",
    features: [{ name: "Job Postings", value: "5" }],
    duration: 30,
    popularPlan: false,
    discount: 0,
  })
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [plansPerPage] = useState(6)
  const [deleteModal, setDeleteModal] = useState(false)
  const [planToDelete, setPlanToDelete] = useState(null)
  const [filterSidebar, setFilterSidebar] = useState(false)
  const [filters, setFilters] = useState({
    subscriptionType: "",
    planType: "",
    priceRange: { min: "", max: "" },
  })

  // Filter plans based on search term and active tab
  const filteredPlans = subscriptionPlans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.subscriptionType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && plan.status === "Active") ||
      (activeTab === "inactive" && plan.status === "Inactive")

    const matchesSubscriptionType = !filters.subscriptionType || plan.subscriptionType === filters.subscriptionType

    const matchesPlanType = !filters.planType || plan.planType === filters.planType

    const matchesPriceRange =
      (!filters.priceRange.min || plan.price >= Number(filters.priceRange.min)) &&
      (!filters.priceRange.max || plan.price <= Number(filters.priceRange.max))

    return matchesSearch && matchesTab && matchesSubscriptionType && matchesPlanType && matchesPriceRange
  })

  // Pagination
  const indexOfLastPlan = currentPage * plansPerPage
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage
  const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan)
  const totalPages = Math.ceil(filteredPlans.length / plansPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleNewPlanChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...newPlan.features]
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value }
    setNewPlan({
      ...newPlan,
      features: updatedFeatures,
    })
  }

  const handleAddFeature = () => {
    setNewPlan({
      ...newPlan,
      features: [...newPlan.features, { name: "", value: "" }],
    })
  }

  const handleRemoveFeature = (index) => {
    const updatedFeatures = newPlan.features.filter((_, i) => i !== index)
    setNewPlan({
      ...newPlan,
      features: updatedFeatures,
    })
  }

  const handleEditFeatureChange = (index, field, value) => {
    const updatedFeatures = [...editingPlan.features]
    if (typeof updatedFeatures[index] === "string") {
      // Convert old string format to new object format
      updatedFeatures[index] = { name: updatedFeatures[index], value: "" }
    }
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value }
    setEditingPlan({
      ...editingPlan,
      features: updatedFeatures,
    })
  }

  const handleEditAddFeature = () => {
    const features = editingPlan.features || []
    setEditingPlan({
      ...editingPlan,
      features: [...features, { name: "", value: "" }],
    })
  }

  const handleEditRemoveFeature = (index) => {
    const updatedFeatures = editingPlan.features.filter((_, i) => i !== index)
    setEditingPlan({
      ...editingPlan,
      features: updatedFeatures,
    })
  }

  const addNewPlan = () => {
    if (newPlan.name && newPlan.price) {
      const currentDate = new Date().toISOString().split("T")[0]

      setSubscriptionPlans((prevPlans) => [
        ...prevPlans,
        {
          ...newPlan,
          id: prevPlans.length + 1,
          totalUsers: 0,
          createdAt: currentDate,
        },
      ])

      toast.success(`New plan "${newPlan.name}" created successfully.`)

      setNewPlan({
        name: "",
        price: "",
        subscriptionType: "Recruiter",
        planType: "Monthly",
        status: "Active",
        description: "",
        features: [{ name: "Job Postings", value: "5" }],
        duration: 30,
        popularPlan: false,
        discount: 0,
      })
      setShowForm(false)
    } else {
      toast.error("Please fill in all required fields for the new plan.")
    }
  }

  const toggleStatus = (id) => {
    setSubscriptionPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === id ? { ...plan, status: plan.status === "Active" ? "Inactive" : "Active" } : plan,
      ),
    )

    const planName = subscriptionPlans.find((plan) => plan.id === id)?.name
    const newStatus = subscriptionPlans.find((plan) => plan.id === id)?.status === "Active" ? "Inactive" : "Active"
    toast.success(`Plan "${planName}" is now ${newStatus}`)
  }

  const handleViewClick = (plan) => {
    setViewingPlan(plan)
  }

  const closeDetailView = () => {
    setViewingPlan(null)
  }

  const handleEditClick = (plan) => {
    setEditingPlan({
      ...plan,
      features: plan.features || [],
    })
  }

  const handleEditPlanChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditingPlan((prevPlan) => ({
      ...prevPlan,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const saveEditedPlan = () => {
    if (editingPlan.name && editingPlan.price) {
      setSubscriptionPlans((prevPlans) =>
        prevPlans.map((plan) => (plan.id === editingPlan.id ? { ...editingPlan } : plan)),
      )
      setEditingPlan(null)
      toast.success(`Plan "${editingPlan.name}" updated successfully.`)
    } else {
      toast.error("Please fill in all required fields.")
    }
  }

  const handleDeleteClick = (plan) => {
    setPlanToDelete(plan)
    setDeleteModal(true)
  }

  const confirmDelete = () => {
    if (planToDelete) {
      setSubscriptionPlans(subscriptionPlans.filter((plan) => plan.id !== planToDelete.id))
      toast.success(`Plan "${planToDelete.name}" deleted successfully!`)
      setDeleteModal(false)
      setPlanToDelete(null)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleFilterChange = (type, value) => {
    if (type === "priceMin" || type === "priceMax") {
      setFilters({
        ...filters,
        priceRange: {
          ...filters.priceRange,
          [type === "priceMin" ? "min" : "max"]: value,
        },
      })
    } else {
      setFilters({
        ...filters,
        [type]: value,
      })
    }
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setFilters({
      subscriptionType: "",
      planType: "",
      priceRange: { min: "", max: "" },
    })
    setSearchTerm("")
    setCurrentPage(1)
  }

  const calculateEffectivePrice = (plan) => {
    if (!plan.discount || plan.discount === 0) return plan.price
    return plan.price * (1 - plan.discount / 100)
  }

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 min-h-screen scroll-hidden">
      <Header title={"Subscription Plans"} />

      <motion.div
        className="p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search plans..."
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterSidebar(true)}
              className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
            <motion.button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AiOutlinePlus size={18} />
              <span>Add Plan</span>
            </motion.button>
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
                    <label className="block text-white mb-2">Subscription Type</label>
                    <select
                      value={filters.subscriptionType}
                      onChange={(e) => handleFilterChange("subscriptionType", e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">All Types</option>
                      <option value="Recruiter">Recruiter</option>
                      <option value="Candidate">Candidate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Plan Type</label>
                    <select
                      value={filters.planType}
                      onChange={(e) => handleFilterChange("planType", e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">All Plan Types</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Annual">Annual</option>
                      <option value="Pay-per-post">Pay-per-post</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Price Range</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange.min}
                        onChange={(e) => handleFilterChange("priceMin", e.target.value)}
                        className="w-1/2 bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <span className="text-gray-400">to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange.max}
                        onChange={(e) => handleFilterChange("priceMax", e.target.value)}
                        className="w-1/2 bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={resetFilters}
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

        {/* Status Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-800 rounded-lg p-1 flex flex-wrap">
            <button
              onClick={() => {
                setActiveTab("all")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              All Plans
            </button>
            <button
              onClick={() => {
                setActiveTab("active")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "active"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Active Plans
            </button>
            <button
              onClick={() => {
                setActiveTab("inactive")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "inactive"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Inactive Plans
            </button>
          </div>
        </div>

        {/* Subscription Plan Cards */}
        {currentPlans.length === 0 ? (
          <div className="bg-gray-800 p-8 text-center rounded-lg">
            <p className="text-gray-400">No subscription plans found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPlans.map((plan) => (
              <motion.div
                key={plan.id}
                className={`bg-gray-800 rounded-lg overflow-hidden border ${
                  plan.popularPlan ? "border-yellow-500 shadow-lg shadow-yellow-500/10" : "border-gray-700"
                } cursor-pointer hover:shadow-lg transition-all duration-300`}
                
              >
                {plan.popularPlan && (
                  <div className="bg-yellow-500 text-gray-900 text-xs font-bold py-1 px-2 text-center">
                    MOST POPULAR
                  </div>
                )}

                <div
                  className={`bg-gradient-to-r ${
                    plan.subscriptionType === "Recruiter"
                      ? "from-purple-900 to-indigo-900"
                      : "from-blue-900 to-cyan-900"
                  } p-4`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                      <p className="text-gray-300 text-sm">{plan.subscriptionType} Plan</p>
                    </div>
                    <div className="flex flex-col items-end">
                      {plan.discount > 0 && <span className="text-xs line-through text-gray-400">${plan.price}</span>}
                      <span className="text-xl font-bold text-white">
                        ${calculateEffectivePrice(plan)}
                        <span className="text-sm font-normal text-gray-300">
                          /
                          {plan.planType.toLowerCase() === "annual"
                            ? "year"
                            : plan.planType.toLowerCase() === "monthly"
                              ? "mo"
                              : "post"}
                        </span>
                      </span>
                      {plan.discount > 0 && (
                        <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full mt-1">
                          {plan.discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-sm text-gray-300">{plan.description}</p>

                  <div className="space-y-2 mt-3">
                    <p className="text-xs text-gray-400 uppercase font-semibold">Features</p>
                    <ul className="space-y-1">
                      {(plan.features || []).slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            {typeof feature === "string"
                              ? feature
                              : `${feature.name}${feature.value ? `: ${feature.value}` : ""}`}
                          </span>
                        </li>
                      ))}
                      {(plan.features || []).length > 3 && (
                        <li className="text-sm text-purple-400">+{plan.features.length - 3} more features</li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        plan.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {plan.status === "Active" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {plan.status}
                    </span>

                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Users className="w-3 h-3 mr-1" />
                      {plan.totalUsers} users
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-700 p-3 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewClick(plan)
                      }}
                      className="p-1.5 bg-gray-700 rounded-full text-blue-400 hover:text-blue-300 transition-colors"
                      title="View Details"
                    >
                      <AiOutlineEye size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditClick(plan)
                      }}
                      className="p-1.5 bg-gray-700 rounded-full text-purple-400 hover:text-purple-300 transition-colors"
                      title="Edit Plan"
                    >
                      <AiOutlineEdit size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteClick(plan)
                      }}
                      className="p-1.5 bg-gray-700 rounded-full text-red-400 hover:text-red-300 transition-colors"
                      title="Delete Plan"
                    >
                      <AiOutlineDelete size={16} />
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleStatus(plan.id)
                    }}
                    className={`px-3 py-1 rounded-md text-xs font-medium ${
                      plan.status === "Active"
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    } transition-colors`}
                  >
                    {plan.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredPlans.length > plansPerPage && (
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

              {Array.from({ length: Math.ceil(filteredPlans.length / plansPerPage) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`
                    px-4 py-2 rounded-lg transition-colors
                    ${
                      currentPage === index + 1
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }
                  `}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(Math.min(Math.ceil(filteredPlans.length / plansPerPage), currentPage + 1))}
                disabled={currentPage === Math.ceil(filteredPlans.length / plansPerPage)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === Math.ceil(filteredPlans.length / plansPerPage)
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Add Plan Modal */}
        <AnimatePresence>
          {showForm && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowForm(false)}
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
                    <h2 className="text-xl font-semibold text-white">Create New Subscription Plan</h2>
                    <button
                      onClick={() => setShowForm(false)}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <form className="space-y-6">
                    {/* Basic Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-200 mb-3">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Plan Name*</label>
                          <input
                            type="text"
                            name="name"
                            value={newPlan.name}
                            onChange={handleNewPlanChange}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Price*</label>
                          <input
                            type="number"
                            name="price"
                            value={newPlan.price}
                            onChange={handleNewPlanChange}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Subscription For</label>
                          <select
                            name="subscriptionType"
                            value={newPlan.subscriptionType}
                            onChange={handleNewPlanChange}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                          >
                            <option value="Recruiter">Recruiter</option>
                            <option value="Candidate">Candidate</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Plan Type</label>
                          <select
                            name="planType"
                            value={newPlan.planType}
                            onChange={handleNewPlanChange}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                          >
                            <option value="Monthly">Monthly</option>
                            <option value="Annual">Annual</option>
                            <option value="Pay-per-post">Pay-per-post</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Plan Details */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-200 mb-3">Plan Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                          <textarea
                            name="description"
                            value={newPlan.description}
                            onChange={handleNewPlanChange}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none min-h-[80px]"
                            placeholder="Describe what this plan offers..."
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Duration (days)</label>
                            <input
                              type="number"
                              name="duration"
                              value={newPlan.duration}
                              onChange={handleNewPlanChange}
                              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Discount (%)</label>
                            <input
                              type="number"
                              name="discount"
                              value={newPlan.discount}
                              onChange={handleNewPlanChange}
                              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                              min="0"
                              max="100"
                            />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="popularPlan"
                            name="popularPlan"
                            checked={newPlan.popularPlan}
                            onChange={handleNewPlanChange}
                            className="h-4 w-4 rounded border-gray-600 text-purple-500 focus:ring-purple-500"
                          />
                          <label htmlFor="popularPlan" className="ml-2 block text-sm text-gray-400">
                            Mark as popular plan (will be highlighted)
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium text-gray-200">Features</h3>
                        <button
                          type="button"
                          onClick={handleAddFeature}
                          className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                        >
                          <AiOutlinePlus size={16} className="mr-1" /> Add Feature
                        </button>
                      </div>
                      <div className="space-y-2">
                        {newPlan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={feature.name}
                              onChange={(e) => handleFeatureChange(index, "name", e.target.value)}
                              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                              placeholder="Feature name"
                            />
                            <input
                              type="text"
                              value={feature.value}
                              onChange={(e) => handleFeatureChange(index, "value", e.target.value)}
                              className="w-1/3 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                              placeholder="Value"
                            />
                            {newPlan.features.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveFeature(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X size={20} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 border-t border-gray-700 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={addNewPlan}
                        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-colors"
                      >
                        Create Plan
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* View Plan Detail Modal */}
        <AnimatePresence>
          {viewingPlan && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={closeDetailView}
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
                    <h2 className="text-xl font-semibold text-white">Plan Details</h2>
                    <button
                      onClick={closeDetailView}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Plan Header */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-6 border border-gray-700">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                        {viewingPlan.subscriptionType === "Recruiter" ? <Briefcase size={32} /> : <User size={32} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-white">{viewingPlan.name}</h3>
                          {viewingPlan.popularPlan && (
                            <span className="bg-yellow-500 text-xs text-gray-900 font-bold px-2 py-0.5 rounded">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <p className="text-purple-400">{viewingPlan.subscriptionType} Plan</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-3 py-1 rounded-full text-sm bg-purple-900/40 text-purple-400 border border-purple-800/50">
                            {viewingPlan.planType}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              viewingPlan.status === "Active"
                                ? "bg-green-900/40 text-green-400 border border-green-800/50"
                                : "bg-red-900/40 text-red-400 border border-red-800/50"
                            }`}
                          >
                            {viewingPlan.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Information */}
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <DollarSign size={20} className="text-purple-400" /> Pricing Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-purple-900/20">
                          <CreditCard size={18} className="text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Base Price</p>
                          <p className="text-white text-xl font-semibold">${viewingPlan.price}</p>
                        </div>
                      </div>
                      {viewingPlan.discount > 0 && (
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-green-900/20">
                            <Tag size={18} className="text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Discount</p>
                            <p className="text-green-400 text-xl font-semibold">{viewingPlan.discount}% OFF</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-purple-900/20">
                          <Calendar size={18} className="text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Duration</p>
                          <p className="text-white">
                            {viewingPlan.duration} days
                            {viewingPlan.planType === "Monthly" && " (Monthly)"}
                            {viewingPlan.planType === "Annual" && " (Annual)"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-900/20">
                          <Users size={18} className="text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Total Users</p>
                          <p className="text-white">{viewingPlan.totalUsers} users</p>
                        </div>
                      </div>
                    </div>
                    {viewingPlan.discount > 0 && (
                      <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Effective Price:</span>
                          <span className="text-xl font-bold text-white">
                            ${calculateEffectivePrice(viewingPlan)}
                            <span className="text-sm font-normal text-gray-300">
                              /
                              {viewingPlan.planType.toLowerCase() === "annual"
                                ? "year"
                                : viewingPlan.planType.toLowerCase() === "monthly"
                                  ? "mo"
                                  : "post"}
                            </span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Plan Description */}
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <FileText size={20} className="text-purple-400" /> Plan Description
                    </h3>
                    <p className="text-gray-300">{viewingPlan.description || "No description available."}</p>
                  </div>

                  {/* Features */}
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Award size={20} className="text-purple-400" /> Features
                    </h3>
                    <ul className="space-y-2">
                      {(viewingPlan.features || []).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">
                            {typeof feature === "string"
                              ? feature
                              : `${feature.name}${feature.value ? `: ${feature.value}` : ""}`}
                          </span>
                        </li>
                      ))}
                      {(!viewingPlan.features || viewingPlan.features.length === 0) && (
                        <li className="text-gray-400">No features specified.</li>
                      )}
                    </ul>
                  </div>

                  {/* Additional Information */}
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Info size={20} className="text-purple-400" /> Additional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Created On</p>
                        <p className="text-white">{viewingPlan.createdAt || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Plan ID</p>
                        <p className="text-white">#{viewingPlan.id}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={() => {
                        closeDetailView()
                        handleEditClick(viewingPlan)
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                      <AiOutlineEdit size={18} />
                      Edit Plan
                    </button>
                    <button
                      onClick={() => toggleStatus(viewingPlan.id)}
                      className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg ${
                        viewingPlan.status === "Active"
                          ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                          : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      }`}
                    >
                      {viewingPlan.status === "Active" ? (
                        <>
                          <XCircle size={18} />
                          Deactivate Plan
                        </>
                      ) : (
                        <>
                          <CheckCircle size={18} />
                          Activate Plan
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Edit Plan Modal */}
        <AnimatePresence>
          {editingPlan && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setEditingPlan(null)}
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
                    <h2 className="text-xl font-semibold text-white">Edit Subscription Plan</h2>
                    <button
                      onClick={() => setEditingPlan(null)}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <form className="space-y-6">
                    {/* Basic Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-200 mb-3">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Plan Name*</label>
                          <input
                            type="text"
                            name="name"
                            value={editingPlan.name}
                            onChange={handleEditPlanChange}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Price*</label>
                          <input
                            type="number"
                            name="price"
                            value={editingPlan.price}
                            onChange={handleEditPlanChange}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Subscription For</label>
                          <select
                            name="subscriptionType"
                            value={editingPlan.subscriptionType}
                            onChange={handleEditPlanChange}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                          >
                            <option value="Recruiter">Recruiter</option>
                            <option value="Candidate">Candidate</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Plan Type</label>
                          <select
                            name="planType"
                            value={editingPlan.planType}
                            onChange={handleEditPlanChange}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                          >
                            <option value="Monthly">Monthly</option>
                            <option value="Annual">Annual</option>
                            <option value="Pay-per-post">Pay-per-post</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Plan Details */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-200 mb-3">Plan Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                          <textarea
                            name="description"
                            value={editingPlan.description || ""}
                            onChange={handleEditPlanChange}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none min-h-[80px]"
                            placeholder="Describe what this plan offers..."
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Duration (days)</label>
                            <input
                              type="number"
                              name="duration"
                              value={editingPlan.duration || 30}
                              onChange={handleEditPlanChange}
                              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Discount (%)</label>
                            <input
                              type="number"
                              name="discount"
                              value={editingPlan.discount || 0}
                              onChange={handleEditPlanChange}
                              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                              min="0"
                              max="100"
                            />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="editPopularPlan"
                            name="popularPlan"
                            checked={editingPlan.popularPlan || false}
                            onChange={handleEditPlanChange}
                            className="h-4 w-4 rounded border-gray-600 text-purple-500 focus:ring-purple-500"
                          />
                          <label htmlFor="editPopularPlan" className="ml-2 block text-sm text-gray-400">
                            Mark as popular plan (will be highlighted)
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium text-gray-200">Features</h3>
                        <button
                          type="button"
                          onClick={handleEditAddFeature}
                          className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                        >
                          <AiOutlinePlus size={16} className="mr-1" /> Add Feature
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(editingPlan.features || []).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {typeof feature === "string" ? (
                              <>
                                <input
                                  type="text"
                                  value={feature}
                                  onChange={(e) => handleEditFeatureChange(index, "name", e.target.value)}
                                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                                  placeholder="Feature name"
                                />
                                <input
                                  type="text"
                                  value=""
                                  onChange={(e) => handleEditFeatureChange(index, "value", e.target.value)}
                                  className="w-1/3 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                                  placeholder="Value"
                                />
                              </>
                            ) : (
                              <>
                                <input
                                  type="text"
                                  value={feature.name || ""}
                                  onChange={(e) => handleEditFeatureChange(index, "name", e.target.value)}
                                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                                  placeholder="Feature name"
                                />
                                <input
                                  type="text"
                                  value={feature.value || ""}
                                  onChange={(e) => handleEditFeatureChange(index, "value", e.target.value)}
                                  className="w-1/3 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                                  placeholder="Value"
                                />
                              </>
                            )}
                            {(editingPlan.features || []).length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleEditRemoveFeature(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X size={20} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-200 mb-3">Status</h3>
                      <div className="flex items-center space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="Active"
                            checked={editingPlan.status === "Active"}
                            onChange={handleEditPlanChange}
                            className="h-4 w-4 border-gray-600 text-purple-500 focus:ring-purple-500"
                          />
                          <span className="ml-2 text-gray-300">Active</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="Inactive"
                            checked={editingPlan.status === "Inactive"}
                            onChange={handleEditPlanChange}
                            className="h-4 w-4 border-gray-600 text-purple-500 focus:ring-purple-500"
                          />
                          <span className="ml-2 text-gray-300">Inactive</span>
                        </label>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 border-t border-gray-700 pt-4">
                      <button
                        type="button"
                        onClick={() => setEditingPlan(null)}
                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={saveEditedPlan}
                        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-colors"
                      >
                        Save Changes
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
          {deleteModal && planToDelete && (
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
                  Are you sure you want to delete the <span className="font-semibold">{planToDelete.name}</span> plan?
                  This action cannot be undone.
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
      </motion.div>
    </div>
  )
}

export default Payment


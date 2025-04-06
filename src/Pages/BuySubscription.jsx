import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "../components/Common/Header"
import {
  CheckCircle,
  Filter,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Award,
  CreditCard,
  Calendar,
  Users,
  Info,
  ShoppingCart,
  Star,
  Clock,
  Briefcase,
  FileText,
  MessageSquare,
  Zap,
  Crown,
  Shield,
  Sparkles,
  Download,
  Percent,
  Mail,
  Phone,
  Eye,
  Bookmark,
} from "lucide-react"

const BuySubscription = () => {
  // Subscription plans data - tailored for recruiters on a job portal
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    {
      id: 1,
      name: "Basic Recruiter",
      price: 49.99,
      subscriptionType: "Basic",
      planType: "Monthly",
      description: "Perfect for individual recruiters and small businesses",
      features: [
        { name: "Post up to 5 jobs", value: "" },
        { name: "Access to candidate database", value: "Limited" },
        { name: "Resume search", value: "Basic" },
        { name: "Email support", value: "" },
      ],
      duration: 30,
      popularPlan: false,
      discount: 0,
      totalUsers: 1250,
      color: "blue",
      jobPostings: 5,
      candidateViews: 50,
      featuredJobs: 0,
      resumeDownloads: 20,
    },
    {
      id: 2,
      name: "Professional Recruiter",
      price: 99.99,
      subscriptionType: "Medium",
      planType: "Monthly",
      description: "Ideal for growing recruitment teams and agencies",
      features: [
        { name: "Post up to 15 jobs", value: "" },
        { name: "Access to candidate database", value: "Full" },
        { name: "Resume search", value: "Advanced" },
        { name: "Featured job listings", value: "3" },
        { name: "Candidate messaging", value: "Unlimited" },
        { name: "Priority email & chat support", value: "" },
      ],
      duration: 30,
      popularPlan: true,
      discount: 10,
      totalUsers: 850,
      color: "purple",
      jobPostings: 15,
      candidateViews: 200,
      featuredJobs: 3,
      resumeDownloads: 100,
    },
    {
      id: 3,
      name: "Enterprise Recruiter",
      price: 199.99,
      subscriptionType: "Premium",
      planType: "Monthly",
      description: "Complete solution for large recruitment teams and agencies",
      features: [
        { name: "Post unlimited jobs", value: "" },
        { name: "Access to candidate database", value: "Premium" },
        { name: "Resume search", value: "Advanced with AI matching" },
        { name: "Featured job listings", value: "10" },
        { name: "Candidate messaging", value: "Unlimited" },
        { name: "Dedicated account manager", value: "" },
        { name: "API access", value: "" },
        { name: "Custom branding", value: "" },
        { name: "24/7 priority support", value: "" },
      ],
      duration: 30,
      popularPlan: false,
      discount: 0,
      totalUsers: 420,
      color: "pink",
      jobPostings: "Unlimited",
      candidateViews: "Unlimited",
      featuredJobs: 10,
      resumeDownloads: "Unlimited",
    },
    {
      id: 4,
      name: "Basic Annual",
      price: 499.99,
      subscriptionType: "Basic",
      planType: "Annual",
      description: "Save with our annual basic recruiter plan",
      features: [
        { name: "Post up to 5 jobs per month", value: "" },
        { name: "Access to candidate database", value: "Limited" },
        { name: "Resume search", value: "Basic" },
        { name: "Email support", value: "" },
        { name: "2 months free", value: "" },
      ],
      duration: 365,
      popularPlan: false,
      discount: 15,
      totalUsers: 780,
      color: "blue",
      jobPostings: 60, // 5 per month for 12 months
      candidateViews: 600,
      featuredJobs: 0,
      resumeDownloads: 240,
    },
    {
      id: 5,
      name: "Professional Annual",
      price: 999.99,
      subscriptionType: "Medium",
      planType: "Annual",
      description: "Our most popular annual plan for recruitment professionals",
      features: [
        { name: "Post up to 15 jobs per month", value: "" },
        { name: "Access to candidate database", value: "Full" },
        { name: "Resume search", value: "Advanced" },
        { name: "Featured job listings", value: "3 per month" },
        { name: "Candidate messaging", value: "Unlimited" },
        { name: "Priority email & chat support", value: "" },
        { name: "2 months free", value: "" },
      ],
      duration: 365,
      popularPlan: true,
      discount: 20,
      totalUsers: 620,
      color: "purple",
      jobPostings: 180, // 15 per month for 12 months
      candidateViews: 2400,
      featuredJobs: 36, // 3 per month for 12 months
      resumeDownloads: 1200,
    },
    {
      id: 6,
      name: "Enterprise Annual",
      price: 1999.99,
      subscriptionType: "Premium",
      planType: "Annual",
      description: "Maximum value for enterprise recruitment teams",
      features: [
        { name: "Post unlimited jobs", value: "" },
        { name: "Access to candidate database", value: "Premium" },
        { name: "Resume search", value: "Advanced with AI matching" },
        { name: "Featured job listings", value: "10 per month" },
        { name: "Candidate messaging", value: "Unlimited" },
        { name: "Dedicated account manager", value: "" },
        { name: "API access", value: "" },
        { name: "Custom branding", value: "" },
        { name: "24/7 priority support", value: "" },
        { name: "2 months free", value: "" },
      ],
      duration: 365,
      popularPlan: false,
      discount: 25,
      totalUsers: 310,
      color: "pink",
      jobPostings: "Unlimited",
      candidateViews: "Unlimited",
      featuredJobs: 120, // 10 per month for 12 months
      resumeDownloads: "Unlimited",
    },
    {
      id: 7,
      name: "Basic Quarterly",
      price: 139.99,
      subscriptionType: "Basic",
      planType: "Quarterly",
      description: "Flexible quarterly commitment for basic recruitment needs",
      features: [
        { name: "Post up to 5 jobs per month", value: "" },
        { name: "Access to candidate database", value: "Limited" },
        { name: "Resume search", value: "Basic" },
        { name: "Email support", value: "" },
        { name: "Quarterly billing", value: "" },
      ],
      duration: 90,
      popularPlan: false,
      discount: 5,
      totalUsers: 430,
      color: "blue",
      jobPostings: 15, // 5 per month for 3 months
      candidateViews: 150,
      featuredJobs: 0,
      resumeDownloads: 60,
    },
    {
      id: 8,
      name: "Professional Quarterly",
      price: 279.99,
      subscriptionType: "Medium",
      planType: "Quarterly",
      description: "Quarterly plan with enhanced recruitment features",
      features: [
        { name: "Post up to 15 jobs per month", value: "" },
        { name: "Access to candidate database", value: "Full" },
        { name: "Resume search", value: "Advanced" },
        { name: "Featured job listings", value: "3 per month" },
        { name: "Candidate messaging", value: "Unlimited" },
        { name: "Priority email & chat support", value: "" },
        { name: "Quarterly billing", value: "" },
      ],
      duration: 90,
      popularPlan: false,
      discount: 8,
      totalUsers: 320,
      color: "purple",
      jobPostings: 45, 
      candidateViews: 600,
      featuredJobs: 9, 
      resumeDownloads: 300,
    },
    {
      id: 9,
      name: "Enterprise Quarterly",
      price: 549.99,
      subscriptionType: "Premium",
      planType: "Quarterly",
      description: "Premium recruitment features with quarterly flexibility",
      features: [
        { name: "Post unlimited jobs", value: "" },
        { name: "Access to candidate database", value: "Premium" },
        { name: "Resume search", value: "Advanced with AI matching" },
        { name: "Featured job listings", value: "10 per month" },
        { name: "Candidate messaging", value: "Unlimited" },
        { name: "Dedicated account manager", value: "" },
        { name: "API access", value: "" },
        { name: "Custom branding", value: "" },
        { name: "24/7 priority support", value: "" },
        { name: "Quarterly billing", value: "" },
      ],
      duration: 90,
      popularPlan: false,
      discount: 10,
      totalUsers: 180,
      color: "pink",
      jobPostings: "Unlimited",
      candidateViews: "Unlimited",
      featuredJobs: 30, // 10 per month for 3 months
      resumeDownloads: "Unlimited",
    },
    {
      id: 10,
      name: "Startup Recruiter",
      price: 29.99,
      subscriptionType: "Basic",
      planType: "Monthly",
      description: "Special plan for startups and new businesses",
      features: [
        { name: "Post up to 3 jobs", value: "" },
        { name: "Access to candidate database", value: "Limited" },
        { name: "Resume search", value: "Basic" },
        { name: "Email support", value: "" },
        { name: "Startup verification required", value: "" },
      ],
      duration: 30,
      popularPlan: false,
      discount: 0,
      totalUsers: 2100,
      color: "blue",
      jobPostings: 3,
      candidateViews: 30,
      featuredJobs: 0,
      resumeDownloads: 10,
    },
    {
      id: 11,
      name: "Team Recruiter",
      price: 149.99,
      subscriptionType: "Medium",
      planType: "Monthly",
      description: "Share with up to 5 team members",
      features: [
        { name: "Post up to 25 jobs", value: "" },
        { name: "Access to candidate database", value: "Full" },
        { name: "Resume search", value: "Advanced" },
        { name: "Featured job listings", value: "5" },
        { name: "Candidate messaging", value: "Unlimited" },
        { name: "Team account management", value: "" },
        { name: "Up to 5 users", value: "" },
        { name: "Priority support", value: "" },
      ],
      duration: 30,
      popularPlan: false,
      discount: 0,
      totalUsers: 750,
      color: "purple",
      jobPostings: 25,
      candidateViews: 500,
      featuredJobs: 5,
      resumeDownloads: 250,
    },
    {
      id: 12,
      name: "Corporate Recruiter",
      price: 299.99,
      subscriptionType: "Premium",
      planType: "Monthly",
      description: "Enterprise-grade solution for corporate recruitment teams",
      features: [
        { name: "Post unlimited jobs", value: "" },
        { name: "Access to candidate database", value: "Premium" },
        { name: "Resume search", value: "Advanced with AI matching" },
        { name: "Featured job listings", value: "15" },
        { name: "Candidate messaging", value: "Unlimited" },
        { name: "Dedicated account manager", value: "" },
        { name: "API access", value: "" },
        { name: "Custom branding", value: "" },
        { name: "24/7 priority support", value: "" },
        { name: "Team collaboration tools", value: "" },
        { name: "Recruitment analytics", value: "Advanced" },
        { name: "ATS integration", value: "" },
      ],
      duration: 30,
      popularPlan: true,
      discount: 0,
      totalUsers: 520,
      color: "pink",
      jobPostings: "Unlimited",
      candidateViews: "Unlimited",
      featuredJobs: 15,
      resumeDownloads: "Unlimited",
    },
    {
      id: 13,
      name: "Basic Lifetime",
      price: 1499.99,
      subscriptionType: "Basic",
      planType: "Lifetime",
      description: "One-time payment for lifetime basic recruiter access",
      features: [
        { name: "Post up to 5 jobs per month", value: "" },
        { name: "Access to candidate database", value: "Limited" },
        { name: "Resume search", value: "Basic" },
        { name: "Email support", value: "" },
        { name: "Free updates for life", value: "" },
      ],
      duration: 0,
      popularPlan: false,
      discount: 0,
      totalUsers: 150,
      color: "blue",
      jobPostings: 5,
      candidateViews: 50,
      featuredJobs: 0,
      resumeDownloads: 20,
    },
    {
      id: 14,
      name: "Professional Lifetime",
      price: 2999.99,
      subscriptionType: "Medium",
      planType: "Lifetime",
      description: "One-time payment for lifetime professional recruiter access",
      features: [
        { name: "Post up to 15 jobs per month", value: "" },
        { name: "Access to candidate database", value: "Full" },
        { name: "Resume search", value: "Advanced" },
        { name: "Featured job listings", value: "3 per month" },
        { name: "Candidate messaging", value: "Unlimited" },
        { name: "Priority email & chat support", value: "" },
        { name: "Free updates for life", value: "" },
      ],
      duration: 0,
      popularPlan: false,
      discount: 0,
      totalUsers: 90,
      color: "purple",
      jobPostings: 15,
      candidateViews: 200,
      featuredJobs: 3,
      resumeDownloads: 100,
    },
    {
      id: 15,
      name: "Enterprise Lifetime",
      price: 4999.99,
      subscriptionType: "Premium",
      planType: "Lifetime",
      description: "Ultimate lifetime access to premium recruitment features",
      features: [
        { name: "Post unlimited jobs", value: "" },
        { name: "Access to candidate database", value: "Premium" },
        { name: "Resume search", value: "Advanced with AI matching" },
        { name: "Featured job listings", value: "10 per month" },
        { name: "Candidate messaging", value: "Unlimited" },
        { name: "Dedicated account manager", value: "" },
        { name: "API access", value: "" },
        { name: "Custom branding", value: "" },
        { name: "24/7 priority support", value: "" },
        { name: "Free updates for life", value: "" },
      ],
      duration: 0,
      popularPlan: true,
      discount: 10,
      totalUsers: 45,
      color: "pink",
      jobPostings: "Unlimited",
      candidateViews: "Unlimited",
      featuredJobs: 10,
      resumeDownloads: "Unlimited",
    },
  ])

  // State for selected plan and checkout
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [checkoutModal, setCheckoutModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSidebar, setFilterSidebar] = useState(false)
  const [filters, setFilters] = useState({
    subscriptionType: "",
    planType: "",
    priceRange: { min: "", max: "" },
  })

  // State for active tab filter
  const [activeTab, setActiveTab] = useState("all")

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [plansPerPage] = useState(10)

  // State for plan details modal
  const [viewingPlan, setViewingPlan] = useState(null)

  // State for comparison
  const [comparePlans, setComparePlans] = useState([])
  const [showComparison, setShowComparison] = useState(false)

  // Filter plans based on search term, active tab and filters
  const filteredPlans = subscriptionPlans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.subscriptionType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab = activeTab === "all" || activeTab === plan.subscriptionType.toLowerCase()

    const matchesSubscriptionType = !filters.subscriptionType || plan.subscriptionType === filters.subscriptionType

    const matchesPlanType = !filters.planType || plan.planType === filters.planType

    const matchesPriceRange =
      (!filters.priceRange.min || plan.price >= Number(filters.priceRange.min)) &&
      (!filters.priceRange.max || plan.price <= Number(filters.priceRange.max))

    return matchesSearch && matchesTab && matchesSubscriptionType && matchesPlanType && matchesPriceRange
  })

  // Pagination logic
  const indexOfLastPlan = currentPage * plansPerPage
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage
  const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan)
  const totalPages = Math.ceil(filteredPlans.length / plansPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  // Handle filter changes
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

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      subscriptionType: "",
      planType: "",
      priceRange: { min: "", max: "" },
    })
    setSearchTerm("")
    setCurrentPage(1)
  }

  // Calculate effective price after discount
  const calculateEffectivePrice = (plan) => {
    if (!plan.discount || plan.discount === 0) return plan.price
    return (plan.price * (1 - plan.discount / 100)).toFixed(2)
  }

  // Handle plan selection
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
    setCheckoutModal(true)
    setCouponApplied(false)
    setCouponCode("")
    setCouponDiscount(0)
  }

  // Handle plan details view
  const handleViewDetails = (plan) => {
    setViewingPlan(plan)
  }

  // Close plan details modal
  const closeDetailView = () => {
    setViewingPlan(null)
  }

  // Handle coupon code application
  const applyCoupon = () => {
    // Simple coupon logic - in a real app this would validate against a database
    if (couponCode.toLowerCase() === "recruit10") {
      setCouponApplied(true)
      setCouponDiscount(10)
    } else if (couponCode.toLowerCase() === "recruit20") {
      setCouponApplied(true)
      setCouponDiscount(20)
    } else {
      setCouponApplied(false)
      setCouponDiscount(0)
      alert("Invalid coupon code")
    }
  }

  // Calculate final price after all discounts
  const calculateFinalPrice = (plan) => {
    let price = plan.price

    // Apply plan discount
    if (plan.discount && plan.discount > 0) {
      price = price * (1 - plan.discount / 100)
    }

    // Apply coupon discount if applicable
    if (couponApplied && couponDiscount > 0) {
      price = price * (1 - couponDiscount / 100)
    }

    return price.toFixed(2)
  }

  // Toggle plan for comparison
  const togglePlanComparison = (plan) => {
    if (comparePlans.some((p) => p.id === plan.id)) {
      setComparePlans(comparePlans.filter((p) => p.id !== plan.id))
    } else {
      if (comparePlans.length < 3) {
        setComparePlans([...comparePlans, plan])
      } else {
        alert("You can compare up to 3 plans at a time")
      }
    }
  }

  // Render star rating based on plan type
  const renderStarRating = (planType) => {
    let rating = 3
    if (planType === "Medium") rating = 4
    if (planType === "Premium") rating = 5

    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"} />
        ))}
      </div>
    )
  }

  // Get icon based on plan type
  const getPlanIcon = (planType) => {
    switch (planType) {
      case "Basic":
        return <Shield className="h-6 w-6 text-blue-400" />
      case "Medium":
        return <Zap className="h-6 w-6 text-purple-400" />
      case "Premium":
        return <Crown className="h-6 w-6 text-pink-400" />
      default:
        return <Award className="h-6 w-6 text-yellow-400" />
    }
  }

  // Get gradient based on plan type
  const getPlanGradient = (planType, color) => {
    switch (color) {
      case "blue":
        return "from-blue-800 to-cyan-700"
      case "purple":
        return "from-violet-800 to-purple-700"
      case "pink":
        return "from-fuchsia-800 to-pink-700"
      default:
        return "from-gray-900 to-gray-800"
    }
  }

  // Get background color based on plan type
  const getPlanBackground = (planType) => {
    switch (planType) {
      case "Basic":
        return "bg-gradient-to-br from-blue-900/40 to-cyan-900/40"
      case "Medium":
        return "bg-gradient-to-br from-violet-900/40 to-purple-900/40"
      case "Premium":
        return "bg-gradient-to-br from-fuchsia-900/40 to-pink-900/40"
      default:
        return "bg-gray-800"
    }
  }

  
  useEffect(() => {
    return () => {
      setComparePlans([])
      setShowComparison(false)
    }
  }, [])

  return (
    <div className="flex-1 overflow-auto relative bg-gray-900 min-h-screen text-gray-100 scroll-hidden">
      <Header title="Recruiter Subscription Plans" />

      <motion.div
        className="p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
       
        {/* Search and Filter Bar */}
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
          <button
            onClick={() => setFilterSidebar(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-colors"
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-6 overflow-x-auto pb-2">
          <div className="bg-gray-800 rounded-lg p-1 flex">
            <button
              onClick={() => {
                setActiveTab("all")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              All Plans
            </button>
            <button
              onClick={() => {
                setActiveTab("basic")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "basic"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Basic
            </button>
            <button
              onClick={() => {
                setActiveTab("medium")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "medium"
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Professional
            </button>
            <button
              onClick={() => {
                setActiveTab("premium")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "premium"
                  ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Enterprise
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
                    <label className="block text-white mb-2">Plan Level</label>
                    <select
                      value={filters.subscriptionType}
                      onChange={(e) => handleFilterChange("subscriptionType", e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">All Levels</option>
                      <option value="Basic">Basic</option>
                      <option value="Medium">Professional</option>
                      <option value="Premium">Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Billing Cycle</label>
                    <select
                      value={filters.planType}
                      onChange={(e) => handleFilterChange("planType", e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">All Cycles</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Annual">Annual</option>
                      <option value="Lifetime">Lifetime</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Job Posting Needs</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-purple-500 focus:ring-purple-500 mr-2" />
                        <span className="text-gray-300">Up to 5 jobs</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-purple-500 focus:ring-purple-500 mr-2" />
                        <span className="text-gray-300">Up to 15 jobs</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-purple-500 focus:ring-purple-500 mr-2" />
                        <span className="text-gray-300">Unlimited jobs</span>
                      </label>
                    </div>
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
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Subscription Plan Cards */}
        {currentPlans.length === 0 ? (
          <div className="bg-gray-800 p-8 text-center rounded-lg">
            <p className="text-gray-400">No subscription plans found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`${getPlanBackground(plan.subscriptionType)} rounded-lg overflow-hidden border ${
                  plan.popularPlan ? "border-purple-500 shadow-lg shadow-purple-500/10" : "border-gray-700"
                } hover:shadow-lg transition-all duration-300 relative`}
                
              >
               

                {plan.popularPlan && (
                  <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-xs font-bold py-1 px-2 text-center">
                    MOST POPULAR
                  </div>
                )}

                <div className={`bg-gradient-to-r ${getPlanGradient(plan.subscriptionType, plan.color)} p-4`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        {getPlanIcon(plan.subscriptionType)}
                        <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                      </div>
                      <div className="mt-1">{renderStarRating(plan.subscriptionType)}</div>
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
                              : plan.planType.toLowerCase() === "quarterly"
                                ? "quarter"
                                : "lifetime"}
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
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Key Benefits</p>
                      <span className="text-xs text-gray-400">
                        {typeof plan.jobPostings === "string" ? plan.jobPostings : `${plan.jobPostings}`} job posts
                      </span>
                    </div>
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

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Users className="w-3 h-3 mr-1" />
                      {plan.totalUsers}+ recruiters
                    </span>

                    {plan.featuredJobs > 0 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <Bookmark className="w-3 h-3 mr-1" />
                        {plan.featuredJobs} featured
                      </span>
                    )}

                    {plan.planType === "Lifetime" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Lifetime
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-700 p-3 flex justify-between items-center">
                  <button
                    onClick={() => handleViewDetails(plan)}
                    className={`text-sm font-medium transition-colors ${
                      plan.subscriptionType === "Basic"
                        ? "text-blue-400 hover:text-blue-300"
                        : plan.subscriptionType === "Medium"
                          ? "text-purple-400 hover:text-purple-300"
                          : "text-pink-400 hover:text-pink-300"
                    }`}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2 shadow-md ${
                      plan.subscriptionType === "Basic"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                        : plan.subscriptionType === "Medium"
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                          : "bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700"
                    }`}
                  >
                    <ShoppingCart size={16} />
                    Subscribe
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

              {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                
                let pageNum =
                  currentPage <= 3
                    ? index + 1
                    : currentPage >= totalPages - 2
                      ? totalPages - 4 + index
                      : currentPage - 2 + index

                
                if (pageNum <= 0) pageNum = 1
                if (pageNum > totalPages) return null

                return (
                  <button
                    key={index}
                    onClick={() => paginate(pageNum)}
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
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
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

        {/* Plan Details Modal */}
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
                className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-gray-800 shadow-xl z-50 overflow-y-auto scroll-hidden"
              >
                <div className="sticky top-0 bg-gray-700 border-b border-gray-600 p-6 z-10">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">Plan Details</h2>
                    <button
                      onClick={closeDetailView}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Plan Header */}
                  <div
                    className={`bg-gradient-to-r ${getPlanGradient(viewingPlan.subscriptionType, viewingPlan.color)} rounded-xl p-6 border border-gray-600`}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-white text-2xl font-bold">
                        {getPlanIcon(viewingPlan.subscriptionType)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-white">{viewingPlan.name}</h3>
                          {viewingPlan.popularPlan && (
                            <span className="bg-purple-500 text-xs text-white font-bold px-2 py-0.5 rounded">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300">{viewingPlan.subscriptionType} Recruiter Plan</p>
                        <div className="mt-2">{renderStarRating(viewingPlan.subscriptionType)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Job Posting Information */}
                  <div className="bg-gray-700 rounded-xl p-5 border border-gray-600 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Briefcase size={20} className="text-blue-400" /> Job Posting Allowance
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-900/20">
                          <FileText size={18} className="text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Job Postings</p>
                          <p className="text-white text-xl font-semibold">
                            {typeof viewingPlan.jobPostings === "string"
                              ? viewingPlan.jobPostings
                              : `${viewingPlan.jobPostings}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-purple-900/20">
                          <Bookmark size={18} className="text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Featured Jobs</p>
                          <p className="text-white text-xl font-semibold">{viewingPlan.featuredJobs}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-pink-900/20">
                          <Eye size={18} className="text-pink-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Candidate Views</p>
                          <p className="text-white text-xl font-semibold">
                            {typeof viewingPlan.candidateViews === "string"
                              ? viewingPlan.candidateViews
                              : `${viewingPlan.candidateViews}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-green-900/20">
                          <Download size={18} className="text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Resume Downloads</p>
                          <p className="text-white text-xl font-semibold">
                            {typeof viewingPlan.resumeDownloads === "string"
                              ? viewingPlan.resumeDownloads
                              : `${viewingPlan.resumeDownloads}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Information */}
                  <div className="bg-gray-700 rounded-xl p-5 border border-gray-600 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <CreditCard size={20} className="text-purple-400" /> Pricing Information
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
                            <Percent size={18} className="text-green-400" />
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
                          <p className="text-sm text-gray-400">Billing Cycle</p>
                          <p className="text-white">
                            {viewingPlan.planType}
                            {viewingPlan.planType === "Annual" && " (Save more)"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-900/20">
                          <Users size={18} className="text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Community</p>
                          <p className="text-white">{viewingPlan.totalUsers}+ active recruiters</p>
                        </div>
                      </div>
                    </div>
                    {viewingPlan.discount > 0 && (
                      <div className="mt-4 p-3 bg-gray-600 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">You Pay:</span>
                          <span className="text-xl font-bold text-white">
                            ${calculateEffectivePrice(viewingPlan)}
                            <span className="text-sm font-normal text-gray-300">
                              /
                              {viewingPlan.planType.toLowerCase() === "annual"
                                ? "year"
                                : viewingPlan.planType.toLowerCase() === "monthly"
                                  ? "mo"
                                  : viewingPlan.planType.toLowerCase() === "quarterly"
                                    ? "quarter"
                                    : "lifetime"}
                            </span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Plan Description */}
                  <div className="bg-gray-700 rounded-xl p-5 border border-gray-600 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Info size={20} className="text-purple-400" /> Plan Description
                    </h3>
                    <p className="text-gray-300">{viewingPlan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="bg-gray-700 rounded-xl p-5 border border-gray-600 shadow-lg">
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

                  {/* Support Information */}
                  <div className="bg-gray-700 rounded-xl p-5 border border-gray-600 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <MessageSquare size={20} className="text-purple-400" /> Support
                    </h3>
                    <div className="space-y-3">
                      {viewingPlan.subscriptionType === "Basic" && (
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-white font-medium">Email Support</p>
                            <p className="text-gray-400 text-sm">Response within 24 hours</p>
                          </div>
                        </div>
                      )}

                      {viewingPlan.subscriptionType === "Medium" && (
                        <>
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-white font-medium">Priority Email Support</p>
                              <p className="text-gray-400 text-sm">Response within 12 hours</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <MessageSquare className="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-white font-medium">Live Chat Support</p>
                              <p className="text-gray-400 text-sm">Available during business hours</p>
                            </div>
                          </div>
                        </>
                      )}

                      {viewingPlan.subscriptionType === "Premium" && (
                        <>
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 text-pink-400 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-white font-medium">Priority Email Support</p>
                              <p className="text-gray-400 text-sm">Response within 4 hours</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <MessageSquare className="h-5 w-5 text-pink-400 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-white font-medium">24/7 Live Chat Support</p>
                              <p className="text-gray-400 text-sm">Available anytime</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Phone className="h-5 w-5 text-pink-400 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-white font-medium">Phone Support</p>
                              <p className="text-gray-400 text-sm">Direct line to your account manager</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={closeDetailView}
                      className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 px-4 rounded-lg transition-colors"
                    >
                      Back to Plans
                    </button>
                    <button
                      onClick={() => {
                        closeDetailView()
                        handleSelectPlan(viewingPlan)
                      }}
                      className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg ${
                        viewingPlan.subscriptionType === "Basic"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                          : viewingPlan.subscriptionType === "Medium"
                            ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                            : "bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700"
                      }`}
                    >
                      <ShoppingCart size={18} />
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Checkout Modal */}
        <AnimatePresence>
          {checkoutModal && selectedPlan && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setCheckoutModal(false)}
                className="fixed inset-0 bg-black z-40"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center p-4 z-50"
              >
                <div className="bg-gray-800 rounded-lg w-full max-w-md border border-gray-700 flex flex-col max-h-[90vh]">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-700">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-white">Complete Your Purchase</h3>
                      <button
                        onClick={() => setCheckoutModal(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="overflow-y-auto p-6 flex-1 scroll-hidden">
                    <div className={`mb-6 p-4 rounded-lg ${getPlanBackground(selectedPlan.subscriptionType)}`}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Plan:</span>
                        <span className="font-medium text-white">{selectedPlan.name}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Billing:</span>
                        <span className="font-medium text-white">{selectedPlan.planType}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Job Postings:</span>
                        <span className="font-medium text-white">
                          {typeof selectedPlan.jobPostings === "string"
                            ? selectedPlan.jobPostings
                            : `${selectedPlan.jobPostings}`}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Price:</span>
                        <span className="font-medium text-white">${selectedPlan.price}</span>
                      </div>
                      {selectedPlan.discount > 0 && (
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">Plan Discount:</span>
                          <span className="font-medium text-green-400">
                            -${((selectedPlan.price * selectedPlan.discount) / 100).toFixed(2)}
                          </span>
                        </div>
                      )}

                      {/* Coupon code section */}
                      <div className="mt-3 mb-3 pt-3 border-t border-gray-600">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 p-2 rounded bg-gray-600 text-white border border-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                          />
                          <button
                            onClick={applyCoupon}
                            className={`px-3 py-1 text-white rounded hover:opacity-90 ${
                              selectedPlan.subscriptionType === "Basic"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : selectedPlan.subscriptionType === "Medium"
                                  ? "bg-purple-600 hover:bg-purple-700"
                                  : "bg-pink-600 hover:bg-pink-700"
                            }`}
                          >
                            Apply
                          </button>
                        </div>
                        {couponApplied && (
                          <div className="flex justify-between mt-2 text-green-400 text-sm">
                            <span>Coupon discount:</span>
                            <span>-${((calculateEffectivePrice(selectedPlan) * couponDiscount) / 100).toFixed(2)}</span>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-gray-600 my-2 pt-2 flex justify-between">
                        <span className="text-gray-300">Total:</span>
                        <span className="font-bold text-white">${calculateFinalPrice(selectedPlan)}</span>
                      </div>
                    </div>

                    {/* Payment method selection */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setPaymentMethod("credit-card")}
                          className={`p-2 rounded border ${
                            paymentMethod === "credit-card"
                              ? `border-${selectedPlan.subscriptionType === "Basic" ? "blue" : selectedPlan.subscriptionType === "Medium" ? "purple" : "pink"}-500 bg-${selectedPlan.subscriptionType === "Basic" ? "blue" : selectedPlan.subscriptionType === "Medium" ? "purple" : "pink"}-900/20`
                              : "border-gray-600 bg-gray-700"
                          } flex flex-col items-center justify-center`}
                        >
                          <CreditCard className="h-6 w-6 mb-1 text-gray-300" />
                          <span className="text-xs text-gray-300">Credit Card</span>
                        </button>
                        <button
                          onClick={() => setPaymentMethod("paypal")}
                          className={`p-2 rounded border ${
                            paymentMethod === "paypal"
                              ? `border-${selectedPlan.subscriptionType === "Basic" ? "blue" : selectedPlan.subscriptionType === "Medium" ? "purple" : "pink"}-500 bg-${selectedPlan.subscriptionType === "Basic" ? "blue" : selectedPlan.subscriptionType === "Medium" ? "purple" : "pink"}-900/20`
                              : "border-gray-600 bg-gray-700"
                          } flex flex-col items-center justify-center`}
                        >
                          <Download className="h-6 w-6 mb-1 text-gray-300" />
                          <span className="text-xs text-gray-300">PayPal</span>
                        </button>
                        <button
                          onClick={() => setPaymentMethod("crypto")}
                          className={`p-2 rounded border ${
                            paymentMethod === "crypto"
                              ? `border-${selectedPlan.subscriptionType === "Basic" ? "blue" : selectedPlan.subscriptionType === "Medium" ? "purple" : "pink"}-500 bg-${selectedPlan.subscriptionType === "Basic" ? "blue" : selectedPlan.subscriptionType === "Medium" ? "purple" : "pink"}-900/20`
                              : "border-gray-600 bg-gray-700"
                          } flex flex-col items-center justify-center`}
                        >
                          <Sparkles className="h-6 w-6 mb-1 text-gray-300" />
                          <span className="text-xs text-gray-300">Crypto</span>
                        </button>
                      </div>
                    </div>

                    {/* Credit card form */}
                    {paymentMethod === "credit-card" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">CVC</label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Name on Card</label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* PayPal form */}
                    {paymentMethod === "paypal" && (
                      <div className="bg-gray-700 p-4 rounded-lg text-center">
                        <p className="text-gray-300 mb-2">You'll be redirected to PayPal to complete your purchase.</p>
                        <Download className="h-10 w-10 mx-auto text-blue-400 mb-2" />
                      </div>
                    )}

                    {/* Crypto form */}
                    {paymentMethod === "crypto" && (
                      <div className="bg-gray-700 p-4 rounded-lg text-center">
                        <p className="text-gray-300 mb-2">Pay with Bitcoin, Ethereum, or other cryptocurrencies.</p>
                        <Sparkles className="h-10 w-10 mx-auto text-yellow-400 mb-2" />
                      </div>
                    )}
                  </div>

                  {/* Footer with fixed position */}
                  <div className="p-6 border-t border-gray-700">
                    <div className="flex flex-col gap-3">
                      <button
                        className={`w-full py-3 text-white rounded-lg transition-colors shadow-lg ${
                          selectedPlan.subscriptionType === "Basic"
                            ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                            : selectedPlan.subscriptionType === "Medium"
                              ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                              : "bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700"
                        }`}
                      >
                        Complete Purchase
                      </button>
                      <p className="text-xs text-gray-400 text-center">
                        By completing this purchase, you agree to our{" "}
                        <a href="#" className="text-purple-400 hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-purple-400 hover:underline">
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Plan Comparison Modal */}
        <AnimatePresence>
          {showComparison && comparePlans.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowComparison(false)}
                className="fixed inset-0 bg-black z-40"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "tween" }}
                className="fixed bottom-0 left-0 right-0 max-h-[90vh] bg-gray-800 shadow-xl z-50 overflow-y-auto rounded-t-xl"
              >
                <div className="sticky top-0 bg-gray-700 border-b border-gray-600 p-6 z-10">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">Plan Comparison</h2>
                    <button
                      onClick={() => setShowComparison(false)}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="p-3 text-gray-400">Feature</th>
                          {comparePlans.map((plan) => (
                            <th key={plan.id} className="p-3 text-white">
                              <div className="flex flex-col">
                                <span className="font-bold">{plan.name}</span>
                                <span className="text-sm text-gray-400">${calculateEffectivePrice(plan)}</span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-700">
                          <td className="p-3 text-gray-400">Plan Type</td>
                          {comparePlans.map((plan) => (
                            <td key={plan.id} className="p-3 text-white">
                              {plan.subscriptionType}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-3 text-gray-400">Billing Cycle</td>
                          {comparePlans.map((plan) => (
                            <td key={plan.id} className="p-3 text-white">
                              {plan.planType}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-3 text-gray-400">Job Postings</td>
                          {comparePlans.map((plan) => (
                            <td key={plan.id} className="p-3 text-white">
                              {typeof plan.jobPostings === "string" ? plan.jobPostings : `${plan.jobPostings}`}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-3 text-gray-400">Featured Jobs</td>
                          {comparePlans.map((plan) => (
                            <td key={plan.id} className="p-3 text-white">
                              {plan.featuredJobs}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-3 text-gray-400">Resume Downloads</td>
                          {comparePlans.map((plan) => (
                            <td key={plan.id} className="p-3 text-white">
                              {typeof plan.resumeDownloads === "string"
                                ? plan.resumeDownloads
                                : `${plan.resumeDownloads}`}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-3 text-gray-400">Features</td>
                          {comparePlans.map((plan) => (
                            <td key={plan.id} className="p-3 text-white">
                              <ul className="list-disc list-inside text-sm">
                                {plan.features.map((feature, idx) => (
                                  <li key={idx} className="mb-1">
                                    {typeof feature === "string" ? feature : feature.name}
                                  </li>
                                ))}
                              </ul>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-3"></td>
                          {comparePlans.map((plan) => (
                            <td key={plan.id} className="p-3">
                              <button
                                onClick={() => {
                                  setShowComparison(false)
                                  handleSelectPlan(plan)
                                }}
                                className={`px-4 py-2 text-white rounded-lg text-sm transition-colors shadow-md ${
                                  plan.subscriptionType === "Basic"
                                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                                    : plan.subscriptionType === "Medium"
                                      ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                                      : "bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700"
                                }`}
                              >
                                Subscribe
                              </button>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
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

export default BuySubscription


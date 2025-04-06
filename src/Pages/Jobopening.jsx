import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-hot-toast"
import {
  Search,
  X,
  Trash2,
  Calendar,
  DollarSign,
  Users,
  Share2,
  Eye,
  FileText,
  Upload,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Plus,
  Mail,
  Briefcase,
  MapPin,
  Phone,
  Star,
  Clock,
  Edit,
  User,
  GraduationCap,
  Award,
  Download,
  MessageSquare,
  Paperclip,
  Link2,
  Linkedin,
  Filter,
  Building,
  FileSignature,
  AlertTriangle,
  Info,
} from "lucide-react"
import Header from "../components/Common/Header"

const Jobopening = () => {
  const initialJobs = [
    {
      id: 1,
      title: "Software Engineer",
      department: "Engineering",
      location: "New York",
      status: "active",
      salary: "120,000 - 150,000",
      jobType: "Full-time",
      postedDate: "2023-05-15",
      deadline: "2023-06-15",
      applications: 12,
      description: "We are looking for a skilled software engineer to join our team.",
      requirements: "React, Node.js, TypeScript",
      responsibilities: "Develop and maintain web applications",
      role: "Mid-level",
      validations: [
        { type: "experience", value: 5, errorMessage: "5 year must for apply this job" },
        { type: "education", value: "Bachelor's", errorMessage: "Bachelor's degree required" },
      ],
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco",
      status: "inactive",
      salary: "130,000 - 160,000",
      jobType: "Full-time",
      postedDate: "2023-04-10",
      deadline: "2023-05-10",
      applications: 8,
      description: "We need a product manager to lead our product development efforts.",
      requirements: "Product management, Agile, JIRA",
      responsibilities: "Define product roadmap and features",
      role: "Senior",
      validations: [
        { type: "experience", value: 3, errorMessage: "3 years of product management experience required" },
      ],
    },
    {
      id: 3,
      title: "Data Scientist",
      department: "Engineering",
      location: "Remote",
      status: "active",
      salary: "110,000 - 140,000",
      jobType: "Contract",
      postedDate: "2023-03-20",
      deadline: "2023-04-20",
      applications: 15,
      description: "Join our data science team to build predictive models.",
      requirements: "Python, SQL, Machine Learning",
      responsibilities: "Analyze data and build predictive models",
      role: "Senior",
      validations: [
        { type: "experience", value: 4, errorMessage: "4 years of data science experience required" },
        { type: "skills", value: "Python", errorMessage: "Python skills required" },
      ],
    },
    {
      id: 4,
      title: "UX Designer",
      department: "Design",
      location: "Chicago",
      status: "closed",
      salary: "90,000 - 120,000",
      jobType: "Full-time",
      postedDate: "2023-02-15",
      deadline: "2023-03-15",
      applications: 20,
      description: "Create user-centered designs for our products.",
      requirements: "Figma, Adobe XD, User Research",
      responsibilities: "Design user interfaces and conduct usability testing",
      role: "Mid-level",
      validations: [{ type: "experience", value: 2, errorMessage: "2 years of UX design experience required" }],
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Seattle",
      status: "active",
      salary: "125,000 - 155,000",
      jobType: "Full-time",
      postedDate: "2023-05-01",
      deadline: "2023-06-01",
      applications: 5,
      description: "Manage our cloud infrastructure and CI/CD pipelines.",
      requirements: "AWS, Docker, Kubernetes, CI/CD",
      responsibilities: "Automate deployment processes and maintain infrastructure",
      role: "Senior",
      validations: [
        { type: "experience", value: 5, errorMessage: "5 years of DevOps experience required" },
        { type: "certification", value: "AWS", errorMessage: "AWS certification required" },
      ],
    },
    {
      id: 6,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Boston",
      status: "inactive",
      salary: "80,000 - 100,000",
      jobType: "Full-time",
      postedDate: "2023-04-05",
      deadline: "2023-05-05",
      applications: 18,
      description: "Drive marketing campaigns for our products.",
      requirements: "Digital Marketing, SEO, Content Creation",
      responsibilities: "Create and execute marketing strategies",
      role: "Junior",
      validations: [{ type: "experience", value: 1, errorMessage: "1 year of marketing experience required" }],
    },
    {
      id: 7,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Austin",
      status: "active",
      salary: "100,000 - 130,000",
      jobType: "Full-time",
      postedDate: "2023-05-10",
      deadline: "2023-06-10",
      applications: 10,
      description: "Build responsive and interactive user interfaces.",
      requirements: "React, JavaScript, CSS, HTML",
      responsibilities: "Implement UI designs and ensure cross-browser compatibility",
      role: "Mid-level",
      validations: [
        { type: "experience", value: 3, errorMessage: "3 years of frontend development experience required" },
        { type: "skills", value: "React", errorMessage: "React experience required" },
      ],
    },
    {
      id: 8,
      title: "Sales Representative",
      department: "Sales",
      location: "Denver",
      status: "closed",
      salary: "70,000 - 90,000 + Commission",
      jobType: "Full-time",
      postedDate: "2023-03-01",
      deadline: "2023-04-01",
      applications: 25,
      description: "Sell our products to potential clients.",
      requirements: "Sales Experience, Communication Skills",
      responsibilities: "Generate leads and close deals",
      role: "Entry-level",
      validations: [{ type: "experience", value: 1, errorMessage: "1 year of sales experience required" }],
    },
    {
      id: 9,
      title: "Backend Developer",
      department: "Engineering",
      location: "Remote",
      status: "active",
      salary: "115,000 - 145,000",
      jobType: "Full-time",
      postedDate: "2023-05-05",
      deadline: "2023-06-05",
      applications: 7,
      description: "Develop and maintain server-side applications.",
      requirements: "Node.js, Python, SQL, NoSQL",
      responsibilities: "Design and implement APIs and database schemas",
      role: "Senior",
      validations: [
        { type: "experience", value: 5, errorMessage: "5 years of backend development experience required" },
        { type: "skills", value: "Node.js", errorMessage: "Node.js experience required" },
      ],
    },
    {
      id: 10,
      title: "HR Coordinator",
      department: "HR",
      location: "Miami",
      status: "active",
      salary: "65,000 - 85,000",
      jobType: "Full-time",
      postedDate: "2023-04-20",
      deadline: "2023-05-20",
      applications: 15,
      description: "Support HR operations and employee onboarding.",
      requirements: "HR Experience, Communication Skills",
      responsibilities: "Coordinate hiring processes and employee relations",
      role: "Junior",
      validations: [{ type: "experience", value: 1, errorMessage: "1 year of HR experience required" }],
    },
  ]

  // Mock applications data with expanded details
  const mockApplications = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      experience: "5 years",
      appliedDate: "2023-05-20",
      status: "New",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      currentRole: "Senior Frontend Developer",
      currentCompany: "Tech Solutions Inc.",
      education: {
        degree: "BS Computer Science",
        university: "Stanford University",
        year: "2018",
      },
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      Topskills: ["React", "TypeScript", "Node.js", "AWS"],
      portfolio: "https://johndoe.dev",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      coverLetter: "I am excited to apply for the Software Engineer position at your company...",
      resumeUrl: "https://example.com/resume/johndoe.pdf",
      location: "New York, NY",
      salary: "$120,000",
      availability: "2 weeks notice",
      references: [
        {
          name: "Jane Smith",
          position: "Engineering Manager",
          company: "Previous Tech Co",
          contact: "jane@example.com",
        },
      ],
      interviewNotes: "Strong technical skills, good cultural fit. Recommend moving forward.",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
      experience: "3 years",
      appliedDate: "2023-05-19",
      status: "Shortlisted",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      currentRole: "UX Designer",
      currentCompany: "Creative Design Studio",
      education: {
        degree: "MFA Design",
        university: "Rhode Island School of Design",
        year: "2020",
      },
      skills: ["UI/UX", "Figma", "Adobe XD", "Sketch", "User Research"],
      Topskills: ["UI/UX", "Figma", "Adobe XD", "Sketch"],
      portfolio: "https://janesmith.design",
      github: "https://github.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      coverLetter: "With my background in user experience design, I believe I would be a great fit...",
      resumeUrl: "https://example.com/resume/janesmith.pdf",
      location: "Boston, MA",
      salary: "$95,000",
      availability: "Immediate",
      references: [
        {
          name: "Robert Johnson",
          position: "Creative Director",
          company: "Design Agency",
          contact: "robert@example.com",
        },
      ],
      interviewNotes: "Excellent portfolio, strong communication skills.",
      rating: 5,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 (555) 456-7890",
      experience: "7 years",
      appliedDate: "2023-05-18",
      status: "Rejected",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      currentRole: "Data Engineer",
      currentCompany: "Data Insights Corp",
      education: {
        degree: "MS Data Science",
        university: "MIT",
        year: "2016",
      },
      skills: ["Python", "SQL", "Hadoop", "Spark", "Machine Learning"],
      Topskills: ["Python", "SQL", "Hadoop", "Machine Learning"],
      portfolio: "https://mikejohnson.tech",
      github: "https://github.com/mikejohnson",
      linkedin: "https://linkedin.com/in/mikejohnson",
      coverLetter: "I am writing to express my interest in the Data Scientist position...",
      resumeUrl: "https://example.com/resume/mikejohnson.pdf",
      location: "Chicago, IL",
      salary: "$135,000",
      availability: "30 days notice",
      references: [
        {
          name: "Sarah Williams",
          position: "Head of Data",
          company: "Previous Analytics",
          contact: "sarah@example.com",
        },
      ],
      interviewNotes: "Strong technical background but not aligned with current team needs.",
      rating: 3.5,
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "+1 (555) 234-5678",
      experience: "4 years",
      appliedDate: "2023-05-17",
      status: "New",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      currentRole: "Product Manager",
      currentCompany: "Product Innovations",
      education: {
        degree: "MBA",
        university: "Harvard Business School",
        year: "2019",
      },
      skills: ["Product Strategy", "Agile", "User Research", "Market Analysis", "Roadmapping"],
      Topskills: ["Product Strategy", "Agile", "User Research", "Market Analysis"],
      portfolio: "https://sarahwilliams.co",
      github: "https://github.com/sarahwilliams",
      linkedin: "https://linkedin.com/in/sarahwilliams",
      coverLetter: "I am excited about the opportunity to join your team as a Product Manager...",
      resumeUrl: "https://example.com/resume/sarahwilliams.pdf",
      location: "San Francisco, CA",
      salary: "$125,000",
      availability: "3 weeks notice",
      references: [
        { name: "David Chen", position: "VP of Product", company: "Tech Innovations", contact: "david@example.com" },
      ],
      interviewNotes: "Great product sense and leadership potential.",
      rating: 4,
    },
    {
      id: 5,
      name: "Alex Chen",
      email: "alex@example.com",
      phone: "+1 (555) 876-5432",
      experience: "6 years",
      appliedDate: "2023-05-16",
      status: "New",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      currentRole: "DevOps Engineer",
      currentCompany: "Cloud Systems Inc",
      education: {
        degree: "BS Computer Engineering",
        university: "University of California, Berkeley",
        year: "2017",
      },
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
      Topskills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      portfolio: "https://alexchen.dev",
      github: "https://github.com/alexchen",
      linkedin: "https://linkedin.com/in/alexchen",
      coverLetter: "I am writing to apply for the DevOps Engineer position at your company...",
      resumeUrl: "https://example.com/resume/alexchen.pdf",
      location: "Seattle, WA",
      salary: "$130,000",
      availability: "4 weeks notice",
      references: [{ name: "Lisa Park", position: "CTO", company: "Previous Cloud Co", contact: "lisa@example.com" }],
      interviewNotes: "Strong infrastructure automation skills, good team player.",
      rating: 4.5,
    },
    {
      id: 6,
      name: "Emily Brown",
      email: "emily@example.com",
      phone: "+1 (555) 345-6789",
      experience: "2 years",
      appliedDate: "2023-05-15",
      status: "Shortlisted",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      currentRole: "Frontend Developer",
      currentCompany: "Web Solutions",
      education: {
        degree: "BS Information Technology",
        university: "Georgia Tech",
        year: "2021",
      },
      skills: ["JavaScript", "React", "CSS", "HTML", "Responsive Design"],
      Topskills: ["JavaScript", "React", "CSS", "HTML"],
      portfolio: "https://emilybrown.me",
      github: "https://github.com/emilybrown",
      linkedin: "https://linkedin.com/in/emilybrown",
      coverLetter: "I am excited to apply for the Frontend Developer position at your company...",
      resumeUrl: "https://example.com/resume/emilybrown.pdf",
      location: "Atlanta, GA",
      salary: "$85,000",
      availability: "2 weeks notice",
      references: [
        {
          name: "Michael Wilson",
          position: "Lead Developer",
          company: "Web Solutions",
          contact: "michael@example.com",
        },
      ],
      interviewNotes: "Promising junior developer with good potential.",
      rating: 4,
    },
  ]

  // Role suggestions for autocomplete - updated to match department structure
  const roleLevels = [
    "Entry-level",
    "Junior",
    "Mid-level",
    "Senior",
    "Lead",
    "Manager",
    "Director",
    "VP",
    "C-level",
    "Intern",
    "Associate",
    "Principal",
    "Architect",
    "Consultant",
    "Specialist",
    "Analyst",
  ]

  const [jobs, setJobs] = useState(initialJobs)
  const [searchQuery, setSearchQuery] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [jobToDelete, setJobToDelete] = useState(null)
  const [jobToEdit, setJobToEdit] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [jobsPerPage] = useState(10) // Changed to 10 cards per page
  const [viewJobModal, setViewJobModal] = useState(false)
  const [currentJob, setCurrentJob] = useState(null)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [jobToShare, setJobToShare] = useState(null)
  const [applicationsModalOpen, setApplicationsModalOpen] = useState(false)
  const [selectedJobApplications, setSelectedJobApplications] = useState(null)
  const [viewApplicantDetail, setViewApplicantDetail] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [applicantCurrentPage, setApplicantCurrentPage] = useState(1)
  const [applicantsPerPage] = useState(10)
  const [applicantSearchTerm, setApplicantSearchTerm] = useState("")
  const [applicantFilterStatus, setApplicantFilterStatus] = useState("all")
  const [scheduleInterviewModal, setScheduleInterviewModal] = useState(false)
  const [interviewData, setInterviewData] = useState({
    date: "",
    time: "",
    type: "video",
    notes: "",
  })
  const [ratingModalOpen, setRatingModalOpen] = useState(false)
  const [filterSidebar, setFilterSidebar] = useState(false)
  const [filters, setFilters] = useState({
    department: "",
    location: "",
    jobType: "",
    role: "",
  })
  const [detailsSidebar, setDetailsSidebar] = useState(false)

  useEffect(() => {
    if (
      modalOpen ||
      editModalOpen ||
      deleteModalOpen ||
      viewJobModal ||
      shareModalOpen ||
      applicationsModalOpen ||
      viewApplicantDetail ||
      scheduleInterviewModal ||
      ratingModalOpen
    ) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [
    modalOpen,
    editModalOpen,
    deleteModalOpen,
    viewJobModal,
    shareModalOpen,
    applicationsModalOpen,
    viewApplicantDetail,
    scheduleInterviewModal,
    ratingModalOpen,
  ])

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    salary: "",
    jobType: "Full-time",
    description: "",
    requirements: "",
    responsibilities: "",
    screeningQuestions: [""],
    attachments: [],
    role: "",
    validations: [],
  })

  const departmentOptions = [
    "Engineering",
    "Product",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Operations",
    "Customer Support",
    "Design",
    "Legal",
  ]

  // Updated job type options - removed Temporary and Part-time
  const jobTypeOptions = ["Full-time", "Contract", "Internship", "Remote"]

  // Validation types
  const validationTypes = [
    { value: "experience", label: "Experience (years)" },
    { value: "education", label: "Education" },
    { value: "skills", label: "Skills" },
    { value: "certification", label: "Certification" },
    { value: "location", label: "Location" },
  ]

  const openModal = () => {
    setFormData({
      title: "",
      department: "",
      location: "",
      salary: "",
      jobType: "Full-time",
      description: "",
      requirements: "",
      responsibilities: "",
      screeningQuestions: [""],
      attachments: [],
      role: "",
      validations: [{ type: "experience", value: "", errorMessage: "" }],
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const openEditModal = (job) => {
    setJobToEdit(job)
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      salary: job.salary,
      jobType: job.jobType,
      description: job.description,
      requirements: job.requirements,
      responsibilities: job.responsibilities,
      screeningQuestions: job.screeningQuestions || [""],
      attachments: job.attachments || [],
      role: job.role || "",
      validations: job.validations || [{ type: "experience", value: "", errorMessage: "" }],
    })
    setEditModalOpen(true)
  }

  const closeEditModal = () => {
    setEditModalOpen(false)
    setJobToEdit(null)
  }

  const openDeleteModal = (job) => {
    setJobToDelete(job)
    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setJobToDelete(null)
  }

  const openShareModal = (job) => {
    setJobToShare(job)
    setShareModalOpen(true)
  }

  const closeShareModal = () => {
    setShareModalOpen(false)
    setJobToShare(null)
  }

  const openViewJobModal = (job) => {
    setCurrentJob(job)
    setDetailsSidebar(true)
  }

  const closeViewJobModal = () => {
    setDetailsSidebar(false)
    setCurrentJob(null)
  }

  const openApplicationsModal = (job) => {
    // Close any open notification dropdowns
    const notificationDropdowns = document.querySelectorAll('[data-dropdown="notification"]')
    notificationDropdowns.forEach((dropdown) => {
      if (dropdown.classList.contains("open")) {
        dropdown.classList.remove("open")
      }
    })

    setSelectedJobApplications(job)
    setApplicationsModalOpen(true)
    setApplicantCurrentPage(1)
    setApplicantSearchTerm("")
    setApplicantFilterStatus("all")
  }

  const closeApplicationsModal = () => {
    setApplicationsModalOpen(false)
    setSelectedJobApplications(null)
  }

  const handleViewApplicantDetail = (applicant) => {
    setSelectedApplicant(applicant)
    setViewApplicantDetail(true)
  }

  const closeApplicantDetail = () => {
    setViewApplicantDetail(false)
    setSelectedApplicant(null)
  }

  const openScheduleInterviewModal = (applicant) => {
    setSelectedApplicant(applicant)
    setInterviewData({
      date: "",
      time: "",
      type: "video",
      notes: "",
    })
    setScheduleInterviewModal(true)
  }

  const closeScheduleInterviewModal = () => {
    setScheduleInterviewModal(false)
  }

  const handleScheduleInterview = (e) => {
    e.preventDefault()
    if (!interviewData.date || !interviewData.time) {
      toast.error("Please select a date and time for the interview")
      return
    }

    toast.success(
      `Interview scheduled with ${selectedApplicant.name} on ${interviewData.date} at ${interviewData.time}`,
    )
    closeScheduleInterviewModal()
  }

  const openRatingModal = (applicant) => {
    setSelectedApplicant(applicant)
    setRatingModalOpen(true)
  }

  const closeRatingModal = () => {
    setRatingModalOpen(false)
  }

  const handleRateApplicant = (rating) => {
    toast.success(`${selectedApplicant.name} rated ${rating} stars`)
    closeRatingModal()
  }

  const handleShortlistApplicant = (applicant) => {
    const newStatus = applicant.status === "Shortlisted" ? "New" : "Shortlisted"
    toast.success(`${applicant.name} ${newStatus === "Shortlisted" ? "added to" : "removed from"} shortlist`)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    applyFilters(query, filters)
  }

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value }
    setFilters(newFilters)
    applyFilters(searchQuery, newFilters)
  }

  const applyFilters = (query, currentFilters) => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        (job.requirements && job.requirements.toLowerCase().includes(query)) ||
        (job.role && job.role.toLowerCase().includes(query))

      const matchesDepartment =
        !currentFilters.department || job.department.toLowerCase().includes(currentFilters.department.toLowerCase())

      const matchesLocation =
        !currentFilters.location || job.location.toLowerCase().includes(currentFilters.location.toLowerCase())

      const matchesJobType =
        !currentFilters.jobType || job.jobType.toLowerCase().includes(currentFilters.jobType.toLowerCase())

      const matchesRole =
        !currentFilters.role || (job.role && job.role.toLowerCase().includes(currentFilters.role.toLowerCase()))

      return matchesSearch && matchesDepartment && matchesLocation && matchesJobType && matchesRole
    })

    // Update filtered jobs
    setFilteredJobs(filtered)
    setCurrentPage(1)
  }

  const handleApplicantSearchChange = (e) => {
    setApplicantSearchTerm(e.target.value.toLowerCase())
    setApplicantCurrentPage(1)
  }

  const handleApplicantFilterChange = (status) => {
    setApplicantFilterStatus(status)
    setApplicantCurrentPage(1)
  }

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      screeningQuestions: [...formData.screeningQuestions, ""],
    })
  }

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...formData.screeningQuestions]
    updatedQuestions[index] = value
    setFormData({
      ...formData,
      screeningQuestions: updatedQuestions,
    })
  }

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = formData.screeningQuestions.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      screeningQuestions: updatedQuestions,
    })
  }

  // Validation handlers
  const handleAddValidation = () => {
    setFormData({
      ...formData,
      validations: [...formData.validations, { type: "experience", value: "", errorMessage: "" }],
    })
  }

  const handleValidationChange = (index, field, value) => {
    const updatedValidations = [...formData.validations]
    updatedValidations[index] = { ...updatedValidations[index], [field]: value }
    setFormData({
      ...formData,
      validations: updatedValidations,
    })
  }

  const handleRemoveValidation = (index) => {
    const updatedValidations = formData.validations.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      validations: updatedValidations,
    })
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...files.map((file) => file.name)],
    })
  }

  const handleRemoveAttachment = (index) => {
    const updatedAttachments = formData.attachments.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      attachments: updatedAttachments,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.department || !formData.location) {
      toast.error("Please fill in all required fields!")
      return
    }

    // Validate validations
    const invalidValidations = formData.validations.filter((v) => !v.type || !v.value || !v.errorMessage)
    if (invalidValidations.length > 0) {
      toast.error("Please complete all validation fields or remove them")
      return
    }

    const postedDate = new Date().toISOString().split("T")[0]
    const deadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

    const newJob = {
      ...formData,
      id: Date.now(),
      status: "active",
      postedDate,
      deadline,
      applications: 0,
    }

    setJobs([...jobs, newJob])
    toast.success("Job added successfully!")
    closeModal()
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.department || !formData.location) {
      toast.error("Please fill in all required fields!")
      return
    }

    // Validate validations
    const invalidValidations = formData.validations.filter((v) => !v.type || !v.value || !v.errorMessage)
    if (invalidValidations.length > 0) {
      toast.error("Please complete all validation fields or remove them")
      return
    }

    const updatedJobs = jobs.map((job) => {
      if (job.id === jobToEdit.id) {
        return {
          ...job,
          ...formData,
        }
      }
      return job
    })

    setJobs(updatedJobs)
    toast.success("Job updated successfully!")
    closeEditModal()
  }

  const handleDelete = () => {
    if (jobToDelete) {
      setJobs(jobs.filter((job) => job.id !== jobToDelete.id))
      toast.success("Job deleted successfully!")
      closeDeleteModal()
    }
  }

  const toggleJobStatus = (jobId) => {
    setJobs(
      jobs.map((job) => {
        if (job.id === jobId) {
          // Cycle through active -> inactive -> closed -> active
          let newStatus
          if (job.status === "active") {
            newStatus = "inactive"
          } else if (job.status === "inactive") {
            newStatus = "closed"
          } else {
            newStatus = "active"
          }

          toast.success(`Job marked as ${newStatus}`)
          return { ...job, status: newStatus }
        }
        return job
      }),
    )
  }

  const handleShareJob = (e) => {
    e.preventDefault()
    // In a real app, this would send the job to the specified email
    toast.success("Job shared successfully!")
    closeShareModal()
  }

  const handleInterviewDataChange = (e) => {
    const { name, value } = e.target
    setInterviewData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Filter jobs based on search term and active tab
  const [filteredJobs, setFilteredJobs] = useState(jobs)

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch = Object.values(job).some(
        (value) => value && value.toString().toLowerCase().includes(searchQuery),
      )

      if (activeTab === "all") {
        return matchesSearch
      } else {
        return matchesSearch && job.status === activeTab
      }
    })
    setFilteredJobs(filtered)
  }, [jobs, searchQuery, activeTab])

  // Filter applicants based on search term and status filter
  const filteredApplicants = mockApplications.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(applicantSearchTerm) ||
      applicant.email.toLowerCase().includes(applicantSearchTerm) ||
      applicant.currentRole.toLowerCase().includes(applicantSearchTerm) ||
      applicant.skills.some((skill) => skill.toLowerCase().includes(applicantSearchTerm))

    if (applicantFilterStatus === "all") {
      return matchesSearch
    } else {
      return matchesSearch && applicant.status.toLowerCase() === applicantFilterStatus.toLowerCase()
    }
  })

  // Pagination for jobs
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

  // Pagination for applicants
  const indexOfLastApplicant = applicantCurrentPage * applicantsPerPage
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage
  const currentApplicants = filteredApplicants.slice(indexOfFirstApplicant, indexOfLastApplicant)
  const totalApplicantPages = Math.ceil(filteredApplicants.length / applicantsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const paginateApplicants = (pageNumber) => setApplicantCurrentPage(pageNumber)

  // Function to render star rating
  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star size={16} className="text-yellow-400" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={16} className="text-gray-400" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 min-h-screen scroll-hidden">
      <Header title={"Job Openings"} />

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
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search jobs..."
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            onClick={openModal}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={18} />
            <span>Add Job</span>
          </motion.button>
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
                    <label className="block text-white mb-2">Department</label>
                    <input
                      type="text"
                      value={filters.department}
                      onChange={(e) => handleFilterChange("department", e.target.value)}
                      placeholder="Filter by department..."
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Location</label>
                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                      placeholder="Filter by location..."
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Job Type</label>
                    <input
                      type="text"
                      value={filters.jobType}
                      onChange={(e) => handleFilterChange("jobType", e.target.value)}
                      placeholder="Filter by job type..."
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Role Level</label>
                    <input
                      type="text"
                      value={filters.role}
                      onChange={(e) => handleFilterChange("role", e.target.value)}
                      placeholder="Filter by role level..."
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setFilters({
                          department: "",
                          location: "",
                          jobType: "",
                          role: "",
                        })
                        applyFilters(searchQuery, {
                          department: "",
                          location: "",
                          jobType: "",
                          role: "",
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
              All Jobs
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
              Active Jobs
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
              Inactive Jobs
            </button>
            <button
              onClick={() => {
                setActiveTab("closed")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "closed"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Closed Jobs
            </button>
          </div>
        </div>

        {/* Job Cards */}
        {currentJobs.length === 0 ? (
          <div className="bg-gray-800 p-8 text-center rounded-lg">
            <p className="text-gray-400">No jobs found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <motion.div
                key={job.id}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg hover:cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                      <p className="text-purple-400 text-sm">{job.department}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                      {job.title.charAt(0)}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">{job.location}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">{job.salary}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <FileSignature className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">Job Type: {job.jobType}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">Role: {job.role || "Not specified"}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">Posted: {job.postedDate}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">Applications: {job.applications}</p>
                  </div>

                  {job.validations && job.validations.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-yellow-400" />
                      <p className="text-sm text-yellow-300">
                        {job.validations.length} validation{job.validations.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  )}

                  <div className="mt-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        job.status === "active"
                          ? "bg-green-900/60 text-green-300 border border-green-500"
                          : job.status === "inactive"
                            ? "bg-red-900/60 text-red-300 border border-red-500"
                            : "bg-gray-900/60 text-gray-300 border border-gray-500"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-700 p-3 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openViewJobModal(job)
                      }}
                      className="p-1.5 bg-gray-700 rounded-full text-blue-400 hover:text-blue-300 transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openEditModal(job)
                      }}
                      className="p-1.5 bg-gray-700 rounded-full text-yellow-400 hover:text-yellow-300 transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openDeleteModal(job)
                      }}
                      className="p-1.5 bg-gray-700 rounded-full text-red-400 hover:text-red-300 transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      openApplicationsModal(job)
                    }}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md flex items-center gap-1 transition-colors"
                  >
                    <Users size={14} />
                    View Applications
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredJobs.length > jobsPerPage && (
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

              {Array.from({ length: Math.ceil(filteredJobs.length / jobsPerPage) }, (_, index) => (
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
                onClick={() => paginate(Math.min(Math.ceil(filteredJobs.length / jobsPerPage), currentPage + 1))}
                disabled={currentPage === Math.ceil(filteredJobs.length / jobsPerPage)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === Math.ceil(filteredJobs.length / jobsPerPage)
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Add Job Modal - Right to Left Slider */}
        <AnimatePresence>
          {modalOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalOpen(false)}
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
                    <h2 className="text-xl font-semibold text-white">Add New Job Opening</h2>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">Job Title*</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="e.g. Senior React Developer"
                          className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">Department*</label>
                          <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          >
                            <option value="">Select Department</option>
                            {departmentOptions.map((dept) => (
                              <option key={dept} value={dept}>
                                {dept}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">Location*</label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. New York or Remote"
                            className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">Salary Range</label>
                          <input
                            type="text"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="e.g. $80,000 - $100,000"
                            className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">Job Type</label>
                          <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            {jobTypeOptions.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">Role Level</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select Role Level</option>
                          {roleLevels.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">Description</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Provide a detailed description of the job"
                          className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px] resize-y"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">Requirements</label>
                        <textarea
                          name="requirements"
                          value={formData.requirements}
                          onChange={handleChange}
                          placeholder="List the key requirements for this position"
                          className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px] resize-y"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">Responsibilities</label>
                        <textarea
                          name="responsibilities"
                          value={formData.responsibilities}
                          onChange={handleChange}
                          placeholder="Describe the main responsibilities for this role"
                          className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px] resize-y"
                        />
                      </div>

                      {/* Validations Section */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-gray-300 font-medium">Validations</label>
                          <button
                            type="button"
                            onClick={handleAddValidation}
                            className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                          >
                            <Plus size={16} className="mr-1" /> Add Validation
                          </button>
                        </div>

                        {formData.validations.map((validation, index) => (
                          <div key={index} className="bg-gray-750 p-4 rounded-lg mb-3">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="text-white text-sm font-medium">Validation #{index + 1}</h4>
                              {formData.validations.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveValidation(index)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <X size={18} />
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                              <div>
                                <label className="block text-gray-300 mb-1 text-sm">Type</label>
                                <select
                                  value={validation.type}
                                  onChange={(e) => handleValidationChange(index, "type", e.target.value)}
                                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                  {validationTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                      {type.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-gray-300 mb-1 text-sm">Value</label>
                                <input
                                  type={validation.type === "experience" ? "number" : "text"}
                                  value={validation.value}
                                  onChange={(e) => handleValidationChange(index, "value", e.target.value)}
                                  placeholder={validation.type === "experience" ? "e.g. 5" : "Required value"}
                                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-gray-300 mb-1 text-sm">Error Message</label>
                              <input
                                type="text"
                                value={validation.errorMessage}
                                onChange={(e) => handleValidationChange(index, "errorMessage", e.target.value)}
                                placeholder="e.g. 5 years of experience required"
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-gray-300 font-medium">Screening Questions</label>
                          <button
                            type="button"
                            onClick={handleAddQuestion}
                            className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                          >
                            <Plus size={16} className="mr-1" /> Add Question
                          </button>
                        </div>
                        {formData.screeningQuestions.map((question, index) => (
                          <div key={index} className="flex items-center gap-2 mb-2">
                            <input
                              type="text"
                              value={question}
                              onChange={(e) => handleQuestionChange(index, e.target.value)}
                              placeholder="Enter a screening question"
                              className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            {formData.screeningQuestions.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveQuestion(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X size={20} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">Attachments</label>
                        <div className="mb-2">
                          <label className="flex items-center justify-center w-full px-4 py-3 border border-gray-700 border-dashed rounded-md bg-gray-800 text-gray-300 cursor-pointer hover:bg-gray-750">
                            <Upload className="mr-2" size={18} />
                            <span>Upload Files</span>
                            <input type="file" multiple onChange={handleFileChange} className="hidden" />
                          </label>
                        </div>
                        {formData.attachments.length > 0 && (
                          <div className="space-y-2 mt-2">
                            {formData.attachments.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-750 p-2 rounded-md">
                                <div className="flex items-center">
                                  <FileText size={16} className="mr-2 text-purple-400" />
                                  <span className="text-sm text-gray-300">{file}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveAttachment(index)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 font-medium"
                      >
                        Add Job
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Edit Job Modal */}
        <AnimatePresence>
          {editModalOpen && jobToEdit && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setEditModalOpen(false)}
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
                    <h2 className="text-xl font-semibold text-white">Edit Job Opening</h2>
                    <button
                      onClick={() => setEditModalOpen(false)}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <form onSubmit={handleEditSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">Job Title*</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="e.g. Senior React Developer"
                          className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">Department*</label>
                          <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          >
                            <option value="">Select Department</option>
                            {departmentOptions.map((dept) => (
                              <option key={dept} value={dept}>
                                {dept}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">Location*</label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. New York or Remote"
                            className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">Salary Range</label>
                          <input
                            type="text"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="e.g. $80,000 - $100,000"
                            className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">Job Type</label>
                          <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            {jobTypeOptions.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">Role Level</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select Role Level</option>
                          {roleLevels.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">Description</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Provide a detailed description of the job"
                          className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px] resize-y"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">Requirements</label>
                        <textarea
                          name="requirements"
                          value={formData.requirements}
                          onChange={handleChange}
                          placeholder="List the key requirements for this position"
                          className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px] resize-y"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">Responsibilities</label>
                        <textarea
                          name="responsibilities"
                          value={formData.responsibilities}
                          onChange={handleChange}
                          placeholder="Describe the main responsibilities for this role"
                          className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px] resize-y"
                        />
                      </div>

                      {/* Validations Section */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-gray-300 font-medium">Validations</label>
                          <button
                            type="button"
                            onClick={handleAddValidation}
                            className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                          >
                            <Plus size={16} className="mr-1" /> Add Validation
                          </button>
                        </div>

                        {formData.validations.map((validation, index) => (
                          <div key={index} className="bg-gray-750 p-4 rounded-lg mb-3">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="text-white text-sm font-medium">Validation #{index + 1}</h4>
                              {formData.validations.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveValidation(index)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <X size={18} />
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                              <div>
                                <label className="block text-gray-300 mb-1 text-sm">Type</label>
                                <select
                                  value={validation.type}
                                  onChange={(e) => handleValidationChange(index, "type", e.target.value)}
                                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                  {validationTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                      {type.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-gray-300 mb-1 text-sm">Value</label>
                                <input
                                  type={validation.type === "experience" ? "number" : "text"}
                                  value={validation.value}
                                  onChange={(e) => handleValidationChange(index, "value", e.target.value)}
                                  placeholder={validation.type === "experience" ? "e.g. 5" : "Required value"}
                                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-gray-300 mb-1 text-sm">Error Message</label>
                              <input
                                type="text"
                                value={validation.errorMessage}
                                onChange={(e) => handleValidationChange(index, "errorMessage", e.target.value)}
                                placeholder="e.g. 5 years of experience required"
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={closeEditModal}
                        className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-md hover:from-yellow-600 hover:to-amber-600 font-medium"
                      >
                        Update Job
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Job Details Sidebar */}
        <AnimatePresence>
          {detailsSidebar && currentJob && (
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
                    <h2 className="text-xl font-semibold text-white">Job Details</h2>
                    <button
                      onClick={() => setDetailsSidebar(false)}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-white">{currentJob.title}</h3>
                      <button
                        onClick={() => openShareModal(currentJob)}
                        className="text-blue-400 hover:text-blue-500 p-1 rounded-full hover:bg-blue-500/10"
                        title="Share Job"
                      >
                        <Share2 size={20} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          currentJob.status === "active"
                            ? "bg-gradient-to-r from-green-900/60 to-green-700/60 text-green-300 border border-green-500"
                            : currentJob.status === "inactive"
                              ? "bg-gradient-to-r from-red-900/60 to-red-700/60 text-red-300 border border-red-500"
                              : "bg-gradient-to-r from-gray-900/60 to-gray-700/60 text-gray-300 border border-gray-500"
                        }`}
                      >
                        {currentJob.status}
                      </span>
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-900/60 to-blue-700/60 text-blue-300 border border-blue-500">
                        {currentJob.jobType}
                      </span>
                      {currentJob.role && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-900/60 to-purple-700/60 text-purple-300 border border-purple-500">
                          {currentJob.role}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-gray-300">
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="flex items-center">
                        <Briefcase size={16} className="mr-2 text-purple-400" />
                        {currentJob.department}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="flex items-center">
                        <MapPin size={16} className="mr-2 text-purple-400" />
                        {currentJob.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Posted Date</p>
                      <p className="flex items-center">
                        <Calendar size={16} className="mr-2 text-purple-400" />
                        {currentJob.postedDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="flex items-center">
                        <Clock size={16} className="mr-2 text-purple-400" />
                        {currentJob.deadline}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="flex items-center">
                        <DollarSign size={16} className="mr-2 text-purple-400" />
                        {currentJob.salary || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Applications</p>
                      <p className="flex items-center">
                        <Users size={16} className="mr-2 text-purple-400" />
                        {currentJob.applications}
                      </p>
                    </div>
                  </div>

                  {currentJob.description && (
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
                      <p className="text-gray-300">{currentJob.description}</p>
                    </div>
                  )}

                  {currentJob.requirements && (
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-white mb-2">Requirements</h4>
                      <p className="text-gray-300">{currentJob.requirements}</p>
                    </div>
                  )}

                  {currentJob.responsibilities && (
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-white mb-2">Responsibilities</h4>
                      <p className="text-gray-300">{currentJob.responsibilities}</p>
                    </div>
                  )}

                  {/* Validations Section */}
                  {currentJob.validations && currentJob.validations.length > 0 && (
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <AlertTriangle size={18} className="mr-2 text-yellow-400" />
                        Application Validations
                      </h4>
                      <div className="space-y-3">
                        {currentJob.validations.map((validation, index) => (
                          <div key={index} className="bg-gray-750 p-3 rounded-lg border border-gray-700">
                            <div className="flex items-start gap-2">
                              <div className="p-1 bg-yellow-900/30 rounded-full">
                                <AlertTriangle size={14} className="text-yellow-400" />
                              </div>
                              <div>
                                <p className="text-white text-sm font-medium">
                                  {validation.type.charAt(0).toUpperCase() + validation.type.slice(1)}:
                                  <span className="ml-1 text-yellow-300">{validation.value}</span>
                                </p>
                                <p className="text-gray-400 text-sm">{validation.errorMessage}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => {
                        closeViewJobModal()
                        openApplicationsModal(currentJob)
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 font-medium flex items-center"
                    >
                      <Users size={18} className="mr-2" />
                      View Applications
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleJobStatus(currentJob.id)}
                        className={`px-6 py-3 rounded-md font-medium flex items-center ${
                          currentJob.status === "active"
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                            : currentJob.status === "inactive"
                              ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700"
                              : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                        }`}
                      >
                        {currentJob.status === "active"
                          ? "Mark Inactive"
                          : currentJob.status === "inactive"
                            ? "Mark Closed"
                            : "Mark Active"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Share Job Modal */}
        <AnimatePresence>
          {shareModalOpen && jobToShare && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setShareModalOpen(false)}
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
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-900/30 to-blue-700/30 text-blue-400 mb-4">
                      <Share2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Share Job Opening</h3>
                    <p className="text-gray-300">
                      Share the job opening for <span className="font-semibold">{jobToShare.title}</span> with others.
                    </p>
                  </div>

                  <form onSubmit={handleShareJob} className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">Email Address</label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">Message (Optional)</label>
                      <textarea
                        placeholder="Add a personal message"
                        className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px] resize-y"
                      />
                    </div>

                    <div className="pt-2">
                      <label className="block text-gray-300 mb-2 font-medium">Share via</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
                        >
                          <Mail size={16} /> Email
                        </button>
                        <button
                          type="button"
                          className="flex-1 flex items-center justify-center gap-2 bg-[#0077B5] hover:bg-[#0066a1] text-white py-2 px-4 rounded-md"
                        >
                          <Linkedin size={16} /> LinkedIn
                        </button>
                        <button
                          type="button"
                          className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
                        >
                          <Link2 size={16} /> Copy Link
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={closeShareModal}
                        className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 font-medium"
                      >
                        Share
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Applications Modal */}
        {applicationsModalOpen && selectedJobApplications && (
          <div
            className="fixed z-50 overflow-y-auto bg-gray-900 top-[70px] left-0 md:left-[260px] right-0 bottom-0 scroll-hidden"
            style={{
              opacity: 1,
              transition: "opacity 0.3s ease",
            }}
          >
            <div className="container mx-auto px-4 py-6 h-full">
              <div className="flex justify-between items-center mb-6">
               
                <div className="flex items-center gap-4">
                  
                  <select
                    value={applicantFilterStatus}
                    onChange={(e) => handleApplicantFilterChange(e.target.value)}
                    className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={closeApplicationsModal}
                    className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {currentApplicants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentApplicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 shadow-lg"
                    >
                      <div className="p-4 flex items-center gap-4">
                        <img
                          src={applicant.avatar || "/placeholder.svg?height=80&width=80"}
                          alt={applicant.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-white truncate">{applicant.name}</h3>
                          <p className="text-purple-400 text-sm truncate">{applicant.currentRole}</p>
                          <p className="text-gray-400 text-sm truncate">{applicant.currentCompany}</p>
                        </div>
                        <div>
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              applicant.status === "Shortlisted"
                                ? "bg-green-900/60 text-green-300 border border-green-500"
                                : applicant.status === "Rejected"
                                  ? "bg-red-900/60 text-red-300 border border-red-500"
                                  : "bg-blue-900/60 text-blue-300 border border-blue-500"
                            }`}
                          >
                            {applicant.status}
                          </span>
                        </div>
                      </div>

                      <div className="px-4 pb-3 space-y-2">
                        <div className="flex items-center text-sm text-gray-300">
                          <Briefcase size={14} className="mr-2 text-purple-400 flex-shrink-0" />
                          <span className="truncate">Experience: {applicant.experience}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <MapPin size={14} className="mr-2 text-purple-400 flex-shrink-0" />
                          <span className="truncate">{applicant.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <Calendar size={14} className="mr-2 text-purple-400 flex-shrink-0" />
                          <span>Applied: {applicant.appliedDate}</span>
                        </div>
                      </div>

                      <div className="px-4 pb-3">
                        <p className="text-xs text-gray-400 mb-1">Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {applicant.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="px-2 py-0.5 bg-gray-700 text-xs rounded-full text-gray-300">
                              {skill}
                            </span>
                          ))}
                          {applicant.skills.length > 3 && (
                            <span className="px-2 py-0.5 bg-gray-700 text-xs rounded-full text-gray-300">
                              +{applicant.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleViewApplicantDetail(applicant)}
                          className="flex items-center justify-center py-2 px-4 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 rounded-lg transition-colors"
                        >
                          <Eye size={16} className="mr-2" /> View Details
                        </button>
                        <button
                          onClick={() => handleShortlistApplicant(applicant)}
                          className={`flex items-center justify-center py-2 px-4 rounded-lg transition-colors ${
                            applicant.status === "Shortlisted"
                              ? "bg-gray-600/20 text-gray-400 hover:bg-gray-600/30"
                              : "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                          }`}
                        >
                          {applicant.status === "Shortlisted" ? (
                            <>
                              <CheckCircle size={16} className="mr-2" /> Shortlisted
                            </>
                          ) : (
                            <>
                              <Plus size={16} className="mr-2" /> Shortlist
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-800 rounded-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 text-gray-400 mb-4">
                    <Users size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No applications found</h3>
                  <p className="text-gray-400">No applications match your current filters.</p>
                </div>
              )}

              {/* Pagination for Applicants */}
              {filteredApplicants.length > applicantsPerPage && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => paginateApplicants(Math.max(1, applicantCurrentPage - 1))}
                      disabled={applicantCurrentPage === 1}
                      className={`p-2 rounded-md ${
                        applicantCurrentPage === 1 ? "text-gray-500 cursor-not-allowed" : "text-white hover:bg-gray-700"
                      }`}
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {Array.from({ length: totalApplicantPages }, (_, i) => i + 1).map((number) => (
                      <button
                        key={number}
                        onClick={() => paginateApplicants(number)}
                        className={`px-3 py-1 rounded-md ${
                          applicantCurrentPage === number
                            ? "bg-purple-600 text-white"
                            : "text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {number}
                      </button>
                    ))}

                    <button
                      onClick={() => paginateApplicants(Math.min(totalApplicantPages, applicantCurrentPage + 1))}
                      disabled={applicantCurrentPage === totalApplicantPages}
                      className={`p-2 rounded-md ${
                        applicantCurrentPage === totalApplicantPages
                          ? "text-gray-500 cursor-not-allowed"
                          : "text-white hover:bg-gray-700"
                      }`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        )}

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
                      <Trash2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Confirm Deletion</h3>
                    <p className="text-gray-300">
                      Are you sure you want to delete the job opening for{" "}
                      <span className="font-semibold">{jobToDelete?.title}</span>? This action cannot be undone.
                    </p>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={closeDeleteModal}
                      className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
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

        {/* Applicant Detail Slider */}  
      <AnimatePresence>
      {viewApplicantDetail && selectedApplicant && (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={() => setViewApplicantDetail(false)}
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
            <h2 className="text-xl font-semibold text-white">Applicant Details</h2>
            <button
              onClick={closeApplicantDetail}
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
              <img
                src={selectedApplicant.avatar || "/placeholder.svg?height=80&width=80"}
                alt={selectedApplicant.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white">{selectedApplicant.name}</h3>
                <p className="text-purple-400">
                  {selectedApplicant.currentRole} at {selectedApplicant.currentCompany}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    selectedApplicant.status === "Shortlisted"
                      ? "bg-green-900/40 text-green-400 border border-green-800/50"
                      : selectedApplicant.status === "Rejected"
                        ? "bg-red-900/40 text-red-400 border border-red-800/50"
                        : "bg-blue-900/40 text-blue-400 border border-blue-800/50"
                  }`}>
                    {selectedApplicant.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Resume Download */}
          <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-5 border border-gray-700 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-3 mb-3 md:mb-0">
                <div className="p-3 rounded-lg bg-purple-900/40">
                  <FileText size={24} className="text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Applicant Resume</h4>
                  <p className="text-sm text-gray-400">Download full resume</p>
                </div>
              </div>
              <button
                onClick={() => window.open(selectedApplicant.resumeUrl, "_blank")}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Download size={16} />
                Download Resume
              </button>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <User size={20} className="text-purple-400" /> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-900/20">
                  <Mail size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a
                    href={`mailto:${selectedApplicant.email}`}
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    {selectedApplicant.email}
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
                    href={`tel:${selectedApplicant.phone}`}
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    {selectedApplicant.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-900/20">
                  <MapPin size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white">{selectedApplicant.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-900/20">
                  <Calendar size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Availability</p>
                  <p className="text-white">{selectedApplicant.availability}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <Briefcase size={20} className="text-purple-400" /> Professional Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Current Role</p>
                  <p className="text-white">{selectedApplicant.currentRole}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Company</p>
                  <p className="text-white">{selectedApplicant.currentCompany}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Experience</p>
                  <p className="text-white">{selectedApplicant.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Expected Salary</p>
                  <p className="text-white">{selectedApplicant.salary}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Card */}
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <Award size={20} className="text-purple-400" /> Skills & Expertise</h3>
              <div className="mb-4">
                      <h4 className="text-white text-sm font-medium mb-2">Top Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplicant.Topskills.slice(0, 4).map((Topskill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm bg-purple-900/40 text-purple-400 border border-purple-800/50"
                          >
                            {Topskill}
                          </span>
                        ))}
                      </div>
                    </div>
            <div className="flex flex-wrap gap-2">
              {selectedApplicant.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 rounded-full text-sm bg-gray-700 text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education Card */}
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <GraduationCap size={20} className="text-purple-400" /> Education
            </h3>
            <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">{selectedApplicant.education.degree}</h4>
                  <p className="text-gray-400">{selectedApplicant.education.university}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="px-3 py-1 rounded-full text-xs bg-purple-900/40 text-purple-400">
                    {selectedApplicant.education.year}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Letter Card */}
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <MessageSquare size={20} className="text-purple-400" /> Cover Letter
            </h3>
            <div className="p-4 bg-gray-700/30 rounded-lg">
              <p className="text-gray-300 text-sm italic">{selectedApplicant.coverLetter}</p>
            </div>
          </div>

          {/* References Card */}
          {selectedApplicant.references && selectedApplicant.references.length > 0 && (
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                <Users size={20} className="text-purple-400" /> References
              </h3>
              <div className="space-y-3">
                {selectedApplicant.references.map((reference, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-gray-700">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{reference.name}</h4>
                        <p className="text-gray-400">
                          {reference.position} at {reference.company}
                        </p>
                      </div>
                      <a
                        href={`mailto:${reference.contact}`}
                        className="mt-2 md:mt-0 px-3 py-1 rounded-full text-xs bg-purple-900/40 text-purple-400 hover:bg-purple-800/40 transition-colors"
                      >
                        Contact
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interview Notes Card */}
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <FileText size={20} className="text-purple-400" /> Interview Notes
            </h3>
            <div className="p-4 bg-gray-700/30 rounded-lg">
              <p className="text-gray-300 text-sm">
                {selectedApplicant.interviewNotes || "No interview notes yet."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => openScheduleInterviewModal(selectedApplicant)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <Calendar size={18} />
              Schedule Interview
            </button>
            <button
              onClick={() => handleShortlistApplicant(selectedApplicant)}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg ${
                selectedApplicant.status === "Shortlisted"
                  ? "bg-gray-600 hover:bg-gray-700 text-white"
                  : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              }`}
            >
              {selectedApplicant.status === "Shortlisted" ? (
                <>
                  <X size={18} />
                  Remove from Shortlist
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Add to Shortlist
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

        {/* Schedule Interview Modal */}
        <AnimatePresence>
          {scheduleInterviewModal && selectedApplicant && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setScheduleInterviewModal(false)}
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
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-900/30 to-purple-700/30 text-purple-400 mb-4">
                      <Calendar size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Schedule Interview</h3>
                    <p className="text-gray-300">Schedule an interview with {selectedApplicant.name}</p>
                  </div>

                  <form onSubmit={handleScheduleInterview} className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">Interview Date</label>
                      <input
                        type="date"
                        name="date"
                        value={interviewData.date}
                        onChange={handleInterviewDataChange}
                        className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">Interview Time</label>
                      <input
                        type="time"
                        name="time"
                        value={interviewData.time}
                        onChange={handleInterviewDataChange}
                        className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">Interview Type</label>
                      <select
                        name="type"
                        value={interviewData.type}
                        onChange={handleInterviewDataChange}
                        className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="video">Video Call</option>
                        <option value="phone">Phone Call</option>
                        <option value="in-person">In-Person</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">Notes</label>
                      <textarea
                        name="notes"
                        value={interviewData.notes}
                        onChange={handleInterviewDataChange}
                        placeholder="Add any notes or instructions for the interview"
                        className="px-4 py-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px] resize-y"
                      />
                    </div>

                    <div className="flex justify-center space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={closeScheduleInterviewModal}
                        className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-md hover:from-purple-600 hover:to-purple-700 font-medium"
                      >
                        Schedule
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Rate Applicant Modal */}
        <AnimatePresence>
          {ratingModalOpen && selectedApplicant && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setRatingModalOpen(false)}
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
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-900/30 to-yellow-700/30 text-yellow-400 mb-4">
                      <Star size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Rate Applicant</h3>
                    <p className="text-gray-300">
                      Rate {selectedApplicant.name} based on their qualifications and fit for the role
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button key={rating} onClick={() => handleRateApplicant(rating)} className="p-2">
                            <Star
                              size={32}
                              className={`${rating <= selectedApplicant.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-300">Current rating: {selectedApplicant.rating.toFixed(1)}</p>
                    </div>

                    <div className="flex justify-center pt-4">
                      <button
                        onClick={closeRatingModal}
                        className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 font-medium"
                      >
                        Close
                      </button>
                    </div>
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

export default Jobopening


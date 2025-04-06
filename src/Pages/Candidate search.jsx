import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  X,
  Trash2,
  Eye,
  Filter,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  Briefcase,
  MapPin,
  Award,
  CheckCircle,
  User,
  Folder,
  Info,
  Users,
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  AlertTriangle,
  Clock,
  FileSignature,
  Building,
} from "lucide-react"
import Header from "../components/Common/Header"
import { Toaster, toast } from "react-hot-toast"

function Candidate() {
  const [candidates, setCandidates] = useState([])
  const [filteredCandidates, setFilteredCandidates] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSidebar, setFilterSidebar] = useState(false)
  const [detailsSidebar, setDetailsSidebar] = useState(false)
  const [recruitModal, setRecruitModal] = useState(false)
  const [interviewModal, setInterviewModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [candidateToDelete, setCandidateToDelete] = useState(null)
  const [filters, setFilters] = useState({
    skills: "",
    location: "",
    department: "",
    jobType: "",
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [jobOpenings, setJobOpenings] = useState([])
  const [selectedJob, setSelectedJob] = useState("")
  const [recruitmentRemark, setRecruitmentRemark] = useState("")
  const [interviewDate, setInterviewDate] = useState("")
  const [interviewTime, setInterviewTime] = useState("")
  const [interviewType, setInterviewType] = useState("video")
  const [interviewNotes, setInterviewNotes] = useState("")
  const itemsPerPage = 10 // Changed to 10 cards per page as requested

  useEffect(() => {
    // Mock candidate data
    const mockCandidates = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@gmail.com",
        phone: "+1 (908) 098-9890",
        location: "New York, USA",
        skills: ["React", "Node.js", "TypeScript", "AWS"],
        Topskills: ["React", "Node.js", "TypeScript"],
        experience: "5 years",
        department: "Engineering",
        profession: "Software Developer",
        education: {
          degree: "MS Computer Science",
          university: "Stanford University",
          year: "2019",
        },
        jobType: "Remote",
        lastPosition: "Senior Developer",
        company: "Tech Corp",
        joinDate: "2024-01-15",
        salary: "$120,000",
        projects: ["E-commerce Platform", "CRM System", "Mobile App"],
        certifications: ["AWS Solutions Architect", "React Native Specialist"],
        languages: ["English", "Spanish"],
        availability: "2 weeks",
        notice: "30 days",
        references: [
          {
            name: "Sarah Johnson",
            position: "Tech Lead",
            company: "Previous Corp",
            contact: "sarah@email.com",
          },
        ],
        appliedDate: "2023-10-15",
        appliedFor: "Senior Frontend Developer",
        currentCompany:'Techizons PVT LTD.',
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@gmail.com",
        phone: "+1 (415) 555-0123",
        location: "San Francisco, USA",
        skills: ["UI/UX", "Figma", "Adobe XD", "HTML/CSS"],
        Topskills: ["UI/UX", "Figma", "HTML/CSS"],
        experience: "4 years",
        department: "Design",
        profession: "UI/UX Designer",
        education: {
          degree: "BFA Design",
          university: "Rhode Island School of Design",
          year: "2020",
        },
        jobType: "Remote",
        lastPosition: "Senior UI Designer",
        company: "Design Studio",
        joinDate: "2024-02-01",
        salary: "$95,000",
        projects: ["Brand Redesign", "Mobile App UI", "Web Platform"],
        certifications: ["Google UX Design", "Figma Advanced"],
        languages: ["English", "French"],
        availability: "Immediate",
        notice: "2 weeks",
        references: [
          {
            name: "Mike Wilson",
            position: "Design Director",
            company: "Creative Co",
            contact: "mike@email.com",
          },
        ],
        appliedDate: "2023-11-05",
        appliedFor: "Senior UX Designer",
        currentCompany:'Techizons PVT LTD.',
      },
      {
        id: 3,
        name: "Michael Johnson",
        email: "michael@example.com",
        phone: "+1 (555) 123-4567",
        location: "Chicago, USA",
        skills: ["Python", "Data Analysis", "Machine Learning", "SQL"],
        Topskills: ["Python", "Machine Learning", "SQL"],
        experience: "6 years",
        department: "Data Science",
        profession: "Data Scientist",
        education: {
          degree: "PhD Statistics",
          university: "University of Chicago",
          year: "2018",
        },
        jobType: "Remote",
        lastPosition: "Lead Data Scientist",
        company: "Data Insights Inc",
        joinDate: "2023-11-15",
        salary: "$135,000",
        projects: ["Predictive Analytics Tool", "Customer Segmentation", "Recommendation Engine"],
        certifications: ["TensorFlow Developer", "AWS Machine Learning"],
        languages: ["English", "German"],
        availability: "1 month",
        notice: "45 days",
        references: [
          {
            name: "Emily Chen",
            position: "VP of Analytics",
            company: "Previous Data Co",
            contact: "emily@email.com",
          },
        ],
        appliedDate: "2023-09-22",
        appliedFor: "Senior Data Scientist",
        currentCompany:'Techizons PVT LTD.',
      },
      {
        id: 4,
        name: "Sarah Williams",
        email: "sarah@example.com",
        phone: "+1 (555) 987-6543",
        location: "Austin, USA",
        skills: ["Project Management", "Agile", "Scrum", "JIRA"],
        Topskills: ["Project Management", "Agile", "Scrum"],
        experience: "8 years",
        department: "Product",
        profession: "Product Manager",
        education: {
          degree: "MBA",
          university: "University of Texas",
          year: "2016",
        },
        jobType: "Remote",
        lastPosition: "Senior Product Manager",
        company: "Tech Solutions",
        joinDate: "2023-09-01",
        salary: "$125,000",
        projects: ["SaaS Platform Launch", "Mobile App Redesign", "Enterprise Solution"],
        certifications: ["Certified Scrum Master", "Product Management Professional"],
        languages: ["English"],
        availability: "2 months",
        notice: "60 days",
        references: [
          {
            name: "David Brown",
            position: "Director of Product",
            company: "Previous Tech",
            contact: "david@email.com",
          },
        ],
        appliedDate: "2023-08-15",
        appliedFor: "Product Manager",
        currentCompany:'Techizons PVT LTD.',
      },
      {
        id: 5,
        name: "Robert Chen",
        email: "robert@example.com",
        phone: "+1 (555) 234-5678",
        location: "Seattle, USA",
        skills: ["DevOps", "AWS", "Docker", "Kubernetes", "CI/CD"],
        Topskills: ["DevOps", "AWS", "Docker",  "CI/CD"],
        experience: "7 years",
        department: "Engineering",
        profession: "DevOps Engineer",
        education: {
          degree: "BS Computer Science",
          university: "University of Washington",
          year: "2017",
        },
        jobType: "Remote",
        lastPosition: "DevOps Lead",
        company: "Cloud Systems",
        joinDate: "2023-10-15",
        salary: "$130,000",
        projects: ["Infrastructure Automation", "Cloud Migration", "Monitoring System"],
        certifications: ["AWS Solutions Architect", "Kubernetes Administrator"],
        languages: ["English", "Mandarin"],
        availability: "3 weeks",
        notice: "30 days",
        references: [
          {
            name: "Lisa Park",
            position: "CTO",
            company: "Previous Cloud Co",
            contact: "lisa@email.com",
          },
        ],
        appliedDate: "2023-10-01",
        appliedFor: "DevOps Engineer",
        currentCompany:'Techizons PVT LTD.',
      },
      {
        id: 6,
        name: "Emily Davis",
        email: "emily@example.com",
        phone: "+1 (555) 876-5432",
        location: "Boston, USA",
        skills: ["JavaScript", "React", "Vue.js", "Node.js"],
        Topskills: ["JavaScript", "React", "Vue.js", "Node.js"],
        experience: "4 years",
        department: "Engineering",
        profession: "Frontend Developer",
        education: {
          degree: "BS Computer Science",
          university: "MIT",
          year: "2019",
        },
        jobType: "Remote",
        lastPosition: "Frontend Developer",
        company: "Tech Innovations",
        joinDate: "2023-11-01",
        salary: "$110,000",
        projects: ["E-commerce Platform", "Dashboard UI", "Mobile App"],
        certifications: ["React Certification", "JavaScript Expert"],
        languages: ["English", "French"],
        availability: "2 weeks",
        notice: "30 days",
        currentCompany:'Techizons PVT LTD.',
        references: [
          {
            name: "James Wilson",
            position: "CTO",
            company: "Tech Innovations",
            contact: "james@email.com",
          },
        ],
        appliedDate: "2023-10-10",
        appliedFor: "Frontend Developer",
      },
      {
        id: 7,
        name: "David Kim",
        email: "david@example.com",
        phone: "+1 (555) 345-6789",
        location: "Los Angeles, USA",
        skills: ["Java", "Spring Boot", "Microservices", "AWS"],
        Topskills: ["Java", "Spring Boot", "Microservices"],
        experience: "6 years",
        department: "Engineering",
        profession: "Backend Developer",
        education: {
          degree: "MS Computer Engineering",
          university: "UCLA",
          year: "2018",
        },
        jobType: "Remote",
        lastPosition: "Senior Backend Developer",
        company: "Enterprise Solutions",
        joinDate: "2023-09-15",
        currentCompany:'Techizons PVT LTD.',
        salary: "$125,000",
        projects: ["Payment Gateway", "API Platform", "Authentication System"],
        certifications: ["AWS Certified Developer", "Java Specialist"],
        languages: ["English", "Korean"],
        availability: "1 month",
        notice: "45 days",
        references: [
          {
            name: "Jennifer Lee",
            position: "Engineering Manager",
            company: "Enterprise Solutions",
            contact: "jennifer@email.com",
          },
        ],
        appliedDate: "2023-08-20",
        appliedFor: "Backend Developer",
      },
      {
        id: 8,
        name: "Sophia Martinez",
        email: "sophia@example.com",
        phone: "+1 (555) 456-7890",
        location: "Miami, USA",
        skills: ["Content Strategy", "SEO", "Social Media", "Analytics"],
        Topskills: ["Content Strategy", "SEO", "Social Media", "Analytics"],
        experience: "5 years",
        department: "Marketing",
        profession: "Content Strategist",
        education: {
          degree: "BA Communications",
          university: "University of Miami",
          year: "2018",
        },
        jobType: "Remote",
        lastPosition: "Content Manager",
        company: "Digital Marketing Agency",
        joinDate: "2023-10-01",
        salary: "$90,000",
        projects: ["Brand Content Strategy", "SEO Optimization", "Content Calendar"],
        certifications: ["Google Analytics", "Content Marketing"],
        languages: ["English", "Spanish"],
        availability: "Immediate",
        notice: "2 weeks",
        currentCompany:'Techizons PVT LTD.',
        references: [
          {
            name: "Carlos Rodriguez",
            position: "Marketing Director",
            company: "Digital Marketing Agency",
            contact: "carlos@email.com",
          },
        ],
        appliedDate: "2023-09-15",
        appliedFor: "Content Strategist",
      },
      {
        id: 9,
        name: "William Taylor",
        email: "william@example.com",
        phone: "+1 (555) 567-8901",
        location: "Denver, USA",
        skills: ["C++", "Embedded Systems", "IoT", "Firmware"],
        Topskills: ["C++", "Embedded Systems", "Firmware"],
        experience: "9 years",
        department: "Engineering",
        profession: "Embedded Systems Engineer",
        education: {
          degree: "MS Electrical Engineering",
          university: "Colorado State University",
          year: "2015",
        },
        jobType: "On-site",
        lastPosition: "Senior Embedded Engineer",
        company: "IoT Solutions",
        currentCompany:'Techizons PVT LTD.',
        joinDate: "2023-08-15",
        salary: "$140,000",
        projects: ["Smart Home System", "Industrial IoT Platform", "Sensor Network"],
        certifications: ["Embedded Systems Professional", "IoT Specialist"],
        languages: ["English"],
        availability: "2 months",
        notice: "60 days",
        references: [
          {
            name: "Rebecca Johnson",
            position: "Hardware Director",
            company: "IoT Solutions",
            contact: "rebecca@email.com",
          },
        ],
        appliedDate: "2023-07-10",
        appliedFor: "Embedded Systems Engineer",
      },
      {
        id: 10,
        name: "Olivia Brown",
        email: "olivia@example.com",
        phone: "+1 (555) 678-9012",
        location: "Portland, USA",
        skills: ["UX Research", "User Testing", "Wireframing", "Prototyping"],
        Topskills: ["UX Research", "Wireframing", "Prototyping"],
        experience: "4 years",
        department: "Design",
        profession: "UX Researcher",
        education: {
          degree: "MS Human-Computer Interaction",
          university: "University of Washington",
          year: "2019",
        },
        jobType: "Hybrid",
        lastPosition: "UX Researcher",
        company: "User First Design",
        joinDate: "2023-09-01",
        salary: "$95,000",
        projects: ["E-commerce User Research", "Mobile App Testing", "Accessibility Study"],
        certifications: ["UX Research Certification", "Accessibility Specialist"],
        languages: ["English"],
        availability: "3 weeks",
        notice: "30 days",
        references: [
          {
            name: "Michael Green",
            position: "Design Director",
            company: "User First Design",
            contact: "michael@email.com",
          },
        ],
        appliedDate: "2023-08-05",
        appliedFor: "UX Researcher",
      },
      {
        id: 11,
        name: "James Wilson",
        email: "james@example.com",
        phone: "+1 (555) 789-0123",
        location: "Atlanta, USA",
        skills: ["Sales Strategy", "CRM", "Negotiation", "Client Relations"],
        Topskills: ["Sales Strategy", "CRM", "Negotiation"],
        experience: "7 years",
        department: "Sales",
        profession: "Sales Manager",
        education: {
          degree: "MBA",
          university: "Emory University",
          year: "2016",
        },
        jobType: "Remote",
        lastPosition: "Senior Sales Representative",
        company: "Global Solutions",
        joinDate: "2023-07-15",
        salary: "$120,000",
        projects: ["Enterprise Sales Program", "CRM Implementation", "Sales Team Training"],
        certifications: ["Sales Leadership", "Salesforce Administrator"],
        languages: ["English"],
        availability: "1 month",
        notice: "45 days",
        references: [
          {
            name: "Patricia Moore",
            position: "VP of Sales",
            company: "Global Solutions",
            contact: "patricia@email.com",
          },
        ],
        appliedDate: "2023-06-20",
        appliedFor: "Sales Manager",
      },
      {
        id: 12,
        name: "Emma Johnson",
        email: "emma@example.com",
        phone: "+1 (555) 890-1234",
        location: "Chicago, USA",
        skills: ["Financial Analysis", "Budgeting", "Forecasting", "Excel"],
        Topskills: ["Financial Analysis", "Forecasting", "Excel"],
        experience: "5 years",
        department: "Finance",
        profession: "Financial Analyst",
        education: {
          degree: "BS Finance",
          university: "University of Chicago",
          year: "2018",
        },
        jobType: "Hybrid",
        lastPosition: "Financial Analyst",
        company: "Investment Firm",
        joinDate: "2023-08-01",
        salary: "$105,000",
        projects: ["Budget Planning", "Financial Reporting", "Investment Analysis"],
        certifications: ["CFA Level 2", "Financial Modeling"],
        languages: ["English", "French"],
        availability: "2 weeks",
        notice: "30 days",
        references: [
          {
            name: "Robert Thompson",
            position: "Finance Director",
            company: "Investment Firm",
            contact: "robert@email.com",
          },
        ],
        appliedDate: "2023-07-15",
        appliedFor: "Financial Analyst",
      },
    ]

    // Mock job openings
    const mockJobs = [
      { id: 1, title: "Senior Frontend Developer", department: "Engineering" },
      { id: 2, title: "UX Designer", department: "Design" },
      { id: 3, title: "Data Scientist", department: "Data Science" },
      { id: 4, title: "Product Manager", department: "Product" },
      { id: 5, title: "DevOps Engineer", department: "Engineering" },
      { id: 6, title: "Content Strategist", department: "Marketing" },
      { id: 7, title: "Sales Manager", department: "Sales" },
      { id: 8, title: "Financial Analyst", department: "Finance" },
    ]

    setCandidates(mockCandidates)
    setFilteredCandidates(mockCandidates)
    setJobOpenings(mockJobs)
  }, [])

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
    const filtered = candidates.filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        candidate.phone.toLowerCase().includes(query) ||
        candidate.department.toLowerCase().includes(query) ||
        candidate.profession.toLowerCase().includes(query) ||
        candidate.skills.some((skill) => skill.toLowerCase().includes(query))

      const matchesSkills =
        !currentFilters.skills ||
        candidate.skills.some((skill) => skill.toLowerCase().includes(currentFilters.skills.toLowerCase()))

      const matchesLocation =
        !currentFilters.location || candidate.location.toLowerCase().includes(currentFilters.location.toLowerCase())

      const matchesDepartment =
        !currentFilters.department ||
        candidate.department.toLowerCase().includes(currentFilters.department.toLowerCase())

      const matchesJobType =
        !currentFilters.jobType || candidate.jobType.toLowerCase().includes(currentFilters.jobType.toLowerCase())

      return matchesSearch && matchesSkills && matchesLocation && matchesDepartment && matchesJobType
    })

    setFilteredCandidates(filtered)
    setCurrentPage(1)
  }

  const handleAction = (action, candidate) => {
    setSelectedCandidate(candidate)

    switch (action) {
      case "view":
        setDetailsSidebar(true)
        break

      case "delete":
        setCandidateToDelete(candidate)
        setDeleteModal(true)
        break

      case "interview":
        setInterviewModal(true)
        break
    }
  }

  const confirmDelete = () => {
    if (candidateToDelete) {
      const updatedCandidates = candidates.filter((c) => c.id !== candidateToDelete.id)
      setCandidates(updatedCandidates)
      setFilteredCandidates(updatedCandidates)
      toast.success(`${candidateToDelete.name} has been removed from candidates`)
      setDeleteModal(false)
      setCandidateToDelete(null)
    }
  }

  const handleRecruitCandidate = () => {
    setRecruitModal(true)
  }

  const handleScheduleInterview = () => {
    setInterviewModal(true)
  }

  const submitRecruitment = () => {
    // In a real app, this would send data to the backend
    toast.success(
      `Candidate ${selectedCandidate.name} has been moved to recruitment for the position: ${
        jobOpenings.find((job) => job.id === Number.parseInt(selectedJob))?.title
      }`,
    )
    setRecruitModal(false)
    setRecruitmentRemark("")
    setSelectedJob("")
  }

  const submitInterview = () => {
    // In a real app, this would send data to the backend and update the calendar
    toast.success(`Interview scheduled with ${selectedCandidate.name} on ${interviewDate} at ${interviewTime}`)
    setInterviewModal(false)
    setInterviewDate("")
    setInterviewTime("")
    setInterviewType("video")
    setInterviewNotes("")
  }

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const paginatedCandidates = filteredCandidates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 min-h-screen scroll-hidden">
      <Header title="Selected Users" />
      

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
              placeholder="Search candidates..."
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
                    <label className="block text-white mb-2">Skills</label>
                    <input
                      type="text"
                      value={filters.skills}
                      onChange={(e) => handleFilterChange("skills", e.target.value)}
                      placeholder="Search skills..."
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

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
                    <label className="block text-white mb-2">Location</label>
                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                      placeholder="Filter by location..."
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setFilters({
                          skills: "",
                          location: "",
                          department: "",
                          jobType: "",
                        })
                        applyFilters(searchQuery, {
                          skills: "",
                          location: "",
                          department: "",
                          jobType: "",
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

        {/* Candidate Cards */}
        {paginatedCandidates.length === 0 ? (
          <div className="bg-gray-800 p-8 text-center rounded-lg">
            <p className="text-gray-400">No candidates found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {paginatedCandidates.map((candidate) => (
              <motion.div
                key={candidate.id}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg hover:cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{candidate.name}</h3>
                      <p className="text-purple-400 text-sm">{candidate.profession}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                      {candidate.name.charAt(0)}
                    </div>
                  </div>
                  
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300 truncate">{candidate.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">{candidate.phone}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">Experience: {candidate.experience}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">Department: {candidate.department}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileSignature className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">Job Type: {candidate.jobType}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">Applied: {candidate.appliedDate}</p>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs text-gray-400 mb-1">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300">
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300">
                          +{candidate.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 p-3 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction("view", candidate)}
                      className="p-1.5 bg-gray-700 rounded-full text-blue-400 hover:text-blue-300 transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleAction("delete", candidate)}
                      className="p-1.5 bg-gray-700 rounded-full text-red-400 hover:text-red-300 transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => handleAction("interview", candidate)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md flex items-center gap-1 transition-colors"
                  >
                    <Calendar size={14} />
                    Interview Schedule
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredCandidates.length > itemsPerPage && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <button
                onClick={() => handlePagination(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: Math.ceil(filteredCandidates.length / itemsPerPage) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePagination(index + 1)}
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
                onClick={() =>
                  handlePagination(Math.min(Math.ceil(filteredCandidates.length / itemsPerPage), currentPage + 1))
                }
                disabled={currentPage === Math.ceil(filteredCandidates.length / itemsPerPage)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === Math.ceil(filteredCandidates.length / itemsPerPage)
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteModal && candidateToDelete && (
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
                  Are you sure you want to remove <span className="font-semibold">{candidateToDelete.name}</span> from
                  the candidates list? This action cannot be undone.
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

        {/* Candidate Details Sidebar */}
        <AnimatePresence>
          {detailsSidebar && selectedCandidate && (
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
                    <h2 className="text-xl font-semibold text-white">Candidate Profile</h2>
                    <button
                      onClick={() => setDetailsSidebar(false)}
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
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                        {selectedCandidate.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white">{selectedCandidate.name}</h3>
                        <p className="text-purple-400">{selectedCandidate.profession}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-3 py-1 rounded-full text-sm bg-purple-900/40 text-purple-400 border border-purple-800/50">
                            {selectedCandidate.company}
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm bg-indigo-900/40 text-indigo-400 border border-indigo-800/50">
                            {selectedCandidate.jobType}
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
                          <h4 className="font-medium text-white">Candidate Resume</h4>
                          <p className="text-sm text-gray-400">Download full resume</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toast.success(`Downloading ${selectedCandidate.name}'s resume`)}
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
                            href={`mailto:${selectedCandidate.email}`}
                            className="text-white hover:text-purple-400 transition-colors"
                          >
                            {selectedCandidate.email}
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
                            href={`tel:${selectedCandidate.phone}`}
                            className="text-white hover:text-purple-400 transition-colors"
                          >
                            {selectedCandidate.phone}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-purple-900/20">
                          <MapPin size={18} className="text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="text-white">{selectedCandidate.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-purple-900/20">
                          <Calendar size={18} className="text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Availability</p>
                          <p className="text-white">{selectedCandidate.availability}</p>
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
                          <p className="text-sm text-gray-400">Industry</p>
                          <p className="text-white">{selectedCandidate.currentCompany}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Current Role</p>
                          <p className="text-white">{selectedCandidate.lastPosition}</p>
                        </div>
                        
                      </div>
                    </div>
                  </div>

                  {/* Professional Experience Card */}
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Briefcase size={20} className="text-purple-400" /> Professional Experience
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <h4 className="font-medium text-white">{selectedCandidate.lastPosition}</h4>
                          <p className="text-gray-400">{selectedCandidate.company}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <span className="text-sm text-purple-400">{selectedCandidate.experience}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Department</p>
                          <p className="text-white">{selectedCandidate.department}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Salary</p>
                          <p className="text-white">{selectedCandidate.salary}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Notice Period</p>
                          <p className="text-white">{selectedCandidate.notice}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Join Date</p>
                          <p className="text-white">{selectedCandidate.joinDate}</p>
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
                        {selectedCandidate.Topskills.slice(0, 4).map((Topskill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm bg-purple-900/40 text-purple-400 border border-purple-800/50"
                          >
                            {Topskill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-medium mb-2">All Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 rounded-full text-sm bg-gray-700 text-white">
                            {skill}
                          </span>
                        ))}
                      </div>
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
                          <h4 className="font-medium text-white">{selectedCandidate.education.degree}</h4>
                          <p className="text-gray-400">{selectedCandidate.education.university}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <span className="px-3 py-1 rounded-full text-xs bg-purple-900/40 text-purple-400">
                            {selectedCandidate.education.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Projects Card */}
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Folder size={20} className="text-purple-400" /> Projects
                    </h3>
                    <div className="space-y-2">
                      {selectedCandidate.projects.map((project, index) => (
                        <div key={index} className="p-3 bg-gray-700/30 rounded-lg">
                          <p className="text-white">{project}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Info size={20} className="text-purple-400" /> Additional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Languages</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedCandidate.languages.map((language, index) => (
                            <span key={index} className="px-2 py-1 rounded-md text-xs bg-gray-700 text-white">
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Certifications</p>
                        <div className="space-y-1 mt-1">
                          {selectedCandidate.certifications.map((cert, index) => (
                            <p key={index} className="text-white text-sm">
                              • {cert}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* References Card
                  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Users size={20} className="text-purple-400" /> References
                    </h3>
                    {selectedCandidate.references.map((reference, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-gray-700"
                      >
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
                  </div> */}

                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={handleRecruitCandidate}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                      <CheckCircle size={18} />
                      Move to Recruitment
                    </button>
                    <button
                      onClick={handleScheduleInterview}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                      <Calendar size={18} />
                      Schedule Interview
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Recruit Modal */}
        <AnimatePresence>
          {recruitModal && selectedCandidate && (
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
                <h3 className="text-xl font-semibold text-white mb-4">Move to Recruitment</h3>
                <p className="text-gray-300 mb-4">
                  Move <span className="font-semibold">{selectedCandidate.name}</span> to the recruitment process for a
                  specific job opening.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">Select Job Opening</label>
                    <select
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select a job opening</option>
                      {jobOpenings.map((job) => (
                        <option key={job.id} value={job.id}>
                          {job.title} - {job.department}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Recruitment Remarks</label>
                    <textarea
                      value={recruitmentRemark}
                      onChange={(e) => setRecruitmentRemark(e.target.value)}
                      placeholder="Add any notes about this recruitment..."
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setRecruitModal(false)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitRecruitment}
                    disabled={!selectedJob}
                    className={`px-4 py-2 rounded-lg ${
                      !selectedJob
                        ? "bg-green-700/50 text-green-300/50 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interview Modal */}
        <AnimatePresence>
          {interviewModal && selectedCandidate && (
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
                <h3 className="text-xl font-semibold text-white mb-4">Schedule Interview</h3>
                <p className="text-gray-300 mb-4">
                  Schedule an interview with <span className="font-semibold">{selectedCandidate.name}</span>.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">Interview Date</label>
                    <input
                      type="date"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Interview Time</label>
                    <input
                      type="time"
                      value={interviewTime}
                      onChange={(e) => setInterviewTime(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Interview Type</label>
                    <select
                      value={interviewType}
                      onChange={(e) => setInterviewType(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="video">Video Call</option>
                      <option value="phone">Phone Call</option>
                      <option value="in-person">In-Person</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Notes</label>
                    <textarea
                      value={interviewNotes}
                      onChange={(e) => setInterviewNotes(e.target.value)}
                      placeholder="Add any notes about this interview..."
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setInterviewModal(false)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitInterview}
                    disabled={!interviewDate || !interviewTime}
                    className={`px-4 py-2 rounded-lg ${
                      !interviewDate || !interviewTime
                        ? "bg-blue-700/50 text-blue-300/50 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Schedule
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

export default Candidate



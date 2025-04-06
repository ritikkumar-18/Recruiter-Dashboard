
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquare,
  X,
  Send,
  FileText,
  Phone,
  Mail,
  User,
  Briefcase,
  Calendar,
  Edit,
  Smile,
  Paperclip,
  Image,
  Download,
  Copy,
  ChevronLeft,
  ChevronRight,
  Eye,
  Bookmark,
  Award,
  Search,
  Filter,
} from "lucide-react"
import { toast, Toaster } from "react-hot-toast"
import Header from "../components/Common/Header"

const Recruit = () => {
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: "John Smith",
      position: "Software Engineer",
      status: "Interview Scheduled",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      experience: "5 years",
      education: "MS Computer Science",
      skills: ["React", "Node.js", "TypeScript"],
      appliedDate: "2023-10-15",
      jobTitle: "Senior Frontend Developer",
      resumeUrl: "/resumes/john-smith-resume.pdf",
    },
    {
      id: 2,
      name: "Jane Doe",
      position: "Product Manager",
      status: "Applied",
      email: "jane.doe@example.com",
      phone: "+1 (555) 987-6543",
      experience: "7 years",
      education: "MBA",
      skills: ["Product Strategy", "User Research", "Agile"],
      appliedDate: "2023-10-18",
      jobTitle: "Product Manager - Enterprise",
      resumeUrl: "/resumes/jane-doe-resume.pdf",
    },
    {
      id: 3,
      name: "Alex Johnson",
      position: "Data Scientist",
      status: "Hired",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 456-7890",
      experience: "4 years",
      education: "PhD Statistics",
      skills: ["Python", "Machine Learning", "SQL"],
      appliedDate: "2023-09-30",
      jobTitle: "Senior Data Scientist",
      resumeUrl: "/resumes/alex-johnson-resume.pdf",
    },
    {
      id: 4,
      name: "Johnson",
      position: "Data Handler",
      status: "Applied",
      email: "johnson.@example.com",
      phone: "+1 (555) 456-7890",
      experience: "3 years",
      education: "PhD Statistics",
      skills: ["Python", "Backend", "Machine Learning", "SQL"],
      appliedDate: "2023-09-30",
      jobTitle: "Data Engineer",
      resumeUrl: "/resumes/johnson-resume.pdf",
    },
  ])

  const [showOfferLetter, setShowOfferLetter] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [applicantsPerPage] = useState(10)
  const [showSlider, setShowSlider] = useState(false)
  const [shortlistedRecruiters, setShortlistedRecruiters] = useState([])
  const [activeFilter, setActiveFilter] = useState("All")
  

  const [offerLetterTemplate, setOfferLetterTemplate] = useState({
    salary: "120,000",
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    responseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    benefits: "health insurance, dental coverage, 401(k) matching, and 20 days of paid time off per year",
    additionalTerms:
      "This offer is contingent upon successful completion of a background check and reference verification.",
  })

  // Ref for chat scroll
  const chatMessagesRef = useRef(null)

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }, [chatMessages])

  const updateStatus = (id, newStatus) => {
    setApplicants(
      applicants.map((applicant) => (applicant.id === id ? { ...applicant, status: newStatus } : applicant)),
    )
    toast.success(`Status updated to ${newStatus}`, {})
  }

  // Function to open offer letter template
  const openOfferLetter = (applicant) => {
    setSelectedApplicant(applicant)
    setShowOfferLetter(true)
    setEditMode(false)
  }

  // Function to open chat window
  const openChat = (applicant) => {
    setSelectedApplicant(applicant)
    setShowChat(true)
    setChatMessages([
      {
        sender: "system",
        text: `Chat started with ${applicant.name}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
  }

  // Function to download resume
  const downloadResume = (applicant) => {
    // In a real app, this would trigger a download of the actual file
    toast.success(`Downloading ${applicant.name}'s resume...`, {
      icon: "📄",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    })

    // Simulate download - in a real app, you would use the actual URL
    setTimeout(() => {
      const link = document.createElement("a")
      link.href = applicant.resumeUrl
      link.download = `${applicant.name.replace(" ", "-").toLowerCase()}-resume.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 1000)
  }

  const sendMessage = () => {
    if (newMessage.trim() === "") return

    const newChatMessage = {
      sender: "you",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    }

    setChatMessages([...chatMessages, newChatMessage])
    setNewMessage("")
    setShowEmojiPicker(false)
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setChatMessages((prev) => prev.map((msg, idx) => (idx === prev.length - 1 ? { ...msg, status: "read" } : msg)))

      const reply = {
        sender: selectedApplicant.name,
        text: `Thanks for your message. I'm available for any questions about my application for the ${selectedApplicant.position} position.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "read",
      }

      setChatMessages((prev) => [...prev, reply])
    }, 2000)
  }

  
  const handleAttachment = () => {
    toast.success("File attachment feature initiated", {
      icon: "📎",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    })

    setTimeout(() => {
      const fileMessage = {
        sender: "you",
        text: "Resume_Updated.pdf",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isFile: true,
        fileType: "pdf",
        status: "sent",
      }

      setChatMessages([...chatMessages, fileMessage])
    }, 1000)
  }

  const addEmoji = (emoji) => {
    setNewMessage((prev) => prev + emoji)
  }

  const saveOfferLetter = () => {
    setEditMode(false)
    toast.success("Offer letter template saved!", {})
  }

  const sendOfferLetter = () => {
    toast.success(`Offer letter sent to ${selectedApplicant.name}!`, {
      
    })

    setApplicants(
      applicants.map((applicant) =>
        applicant.id === selectedApplicant.id ? { ...applicant, status: "Offer Sent" } : applicant,
      ),
    )

    setShowOfferLetter(false)
  }

  
  const copyOfferLetter = () => {
    const offerText = `
      Dear ${selectedApplicant.name},
      
      We are pleased to offer you the position of ${selectedApplicant.position} at our company.
      
      This position offers an annual salary of $${offerLetterTemplate.salary}, with benefits including ${offerLetterTemplate.benefits}.
      
      Your anticipated start date will be ${offerLetterTemplate.startDate}.
      
      ${offerLetterTemplate.additionalTerms}
      
      Please review and respond by ${offerLetterTemplate.responseDate}.
    `

    navigator.clipboard.writeText(offerText)

    toast.success("Offer letter copied to clipboard!", {
      icon: "📋",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    })
  }

  const handleShortlist = (id) => {
    if (shortlistedRecruiters.includes(id)) {
      setShortlistedRecruiters(shortlistedRecruiters.filter((recruiterId) => recruiterId !== id))
      toast.success("Removed from shortlist")
    } else {
      setShortlistedRecruiters([...shortlistedRecruiters, id])
      toast.success("Added to shortlist")
    }
  }

  
  const filteredByStatus =
    activeFilter === "All" ? applicants : applicants.filter((applicant) => applicant.status === activeFilter)

  
  const indexOfLastApplicant = currentPage * applicantsPerPage
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage
  const currentApplicants = filteredByStatus.slice(indexOfFirstApplicant, indexOfLastApplicant)
  const totalPages = Math.ceil(filteredByStatus.length / applicantsPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  
  const emojis = ["😊", "👍", "🎉", "👏", "🙌", "💯", "⭐", "🔥", "👨‍💻", "📝"]

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 min-h-screen scroll-hidden">
      <Header title="Recruiters" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className=" p-4 sticky top-0 z-20">
        
        <div className="flex justify-center mb-6 overflow-x-auto pb-2">
          <div className="bg-gray-800 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveFilter("All")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === "All"
                  ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              All Recruiters
            </button>
            <button
              onClick={() => setActiveFilter("Applied")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === "Applied"
                  ? "bg-gradient-to-r from-yellow-600 to-yellow-700 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Applied
            </button>
            <button
              onClick={() => setActiveFilter("Interview Scheduled")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === "Interview Scheduled"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Interview
            </button>
            <button
              onClick={() => setActiveFilter("Hired")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === "Hired"
                  ? "bg-gradient-to-r from-green-600 to-green-700 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Hired
            </button>
            <button
              onClick={() => setActiveFilter("Offer Sent")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === "Offer Sent"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Offer Sent
            </button>
            <button
              onClick={() => setActiveFilter("Rejected")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === "Rejected"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Rejected
            </button>
          </div>
        </div>

        
       
      </div>
      <Toaster />

      <div
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-auto px-6 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        {currentApplicants.map((applicant) => (
          <motion.div
            key={applicant.id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-white">{applicant.name}</h3>
              <span
                className={`px-3 py-1 text-white text-xs font-semibold rounded-full ${getStatusColor(applicant.status)}`}
              >
                {applicant.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-300">
                <Briefcase className="w-4 h-4 mr-2 text-purple-400" />
                <p className="text-sm">{applicant.position}</p>
              </div>

              <div className="flex items-center text-gray-300">
                <FileText className="w-4 h-4 mr-2 text-purple-400" />
                <p className="text-sm">Job Title: {applicant.jobTitle}</p>
              </div>

              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2 text-purple-400" />
                <p className="text-sm">{applicant.email}</p>
              </div>

              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2 text-purple-400" />
                <p className="text-sm">{applicant.phone}</p>
              </div>

              <div className="flex items-center text-gray-300">
                <User className="w-4 h-4 mr-2 text-purple-400" />
                <p className="text-sm">Experience: {applicant.experience}</p>
              </div>

              <div className="flex items-center text-gray-300">
                <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                <p className="text-sm">Applied: {applicant.appliedDate}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-400 mb-1">Skills</p>
              <div className="flex flex-wrap gap-1">
                {applicant.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Status Update Section */}
            <div className="mt-auto">
              <label htmlFor={`status-${applicant.id}`} className="block text-sm font-medium text-gray-300 mb-1">
                Update Status
              </label>
              <select
                id={`status-${applicant.id}`}
                value={applicant.status}
                onChange={(e) => updateStatus(applicant.id, e.target.value)}
                className="block w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white text-sm mb-3"
              >
                <option value="Applied">Applied</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Hired">Hired</option>
                <option value="Offer Sent">Offer Sent</option>
                <option value="Rejected">Rejected</option>
              </select>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => openChat(applicant)}
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm flex-1 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 mr-1 text-white" />
                  Chat
                </button>

                <button
                  onClick={() => {
                    setSelectedApplicant(applicant)
                    setShowSlider(true)
                  }}
                  className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm flex-1 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>

                {(applicant.status === "Hired" || applicant.status === "Offer Sent") && (
                  <button
                    onClick={() => openOfferLetter(applicant)}
                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm flex-1 transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Offer Letter
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 mb-8">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1 ? "text-gray-500 cursor-not-allowed" : "text-white hover:bg-gray-700"
              }`}
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === number
                    ? "bg-purple-600"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages ? "text-gray-500 cursor-not-allowed" : "text-white hover:bg-gray-700"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Offer Letter Modal */}
      <AnimatePresence>
        {showOfferLetter && selectedApplicant && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">
                  {editMode ? "Edit Offer Letter" : "Offer Letter Template"}
                </h2>
                <button onClick={() => setShowOfferLetter(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {editMode ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Annual Salary ($)</label>
                      <input
                        type="text"
                        value={offerLetterTemplate.salary}
                        onChange={(e) => setOfferLetterTemplate({ ...offerLetterTemplate, salary: e.target.value })}
                        className="w-full p-2 border rounded text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={offerLetterTemplate.startDate}
                        onChange={(e) => setOfferLetterTemplate({ ...offerLetterTemplate, startDate: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 text-black  focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Response By Date</label>
                      <input
                        type="date"
                        value={offerLetterTemplate.responseDate}
                        onChange={(e) =>
                          setOfferLetterTemplate({ ...offerLetterTemplate, responseDate: e.target.value })
                        }
                        className="w-full p-2 border rounded text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                      <textarea
                        value={offerLetterTemplate.benefits}
                        onChange={(e) => setOfferLetterTemplate({ ...offerLetterTemplate, benefits: e.target.value })}
                        rows={3}
                        className="w-full p-2 border rounded focus:ring-2 text-black focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Terms</label>
                      <textarea
                        value={offerLetterTemplate.additionalTerms}
                        onChange={(e) =>
                          setOfferLetterTemplate({ ...offerLetterTemplate, additionalTerms: e.target.value })
                        }
                        rows={4}
                        className="w-full p-2 border rounded focus:ring-2 text-black focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-right mb-8">
                      <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="mb-8">
                      <p className="text-gray-800">Dear {selectedApplicant.name},</p>
                    </div>

                    <div className="space-y-4 text-gray-700">
                      <p>
                        We are pleased to offer you the position of <strong>{selectedApplicant.position}</strong> at our
                        company. We were impressed with your background and experience, and we believe you would be a
                        valuable asset to our team.
                      </p>

                      <p>
                        This position offers an annual salary of ${offerLetterTemplate.salary}, with benefits including{" "}
                        {offerLetterTemplate.benefits}. Your anticipated start date will be{" "}
                        {new Date(offerLetterTemplate.startDate).toLocaleDateString()}.
                      </p>

                      <p>{offerLetterTemplate.additionalTerms}</p>

                      <p>
                        Please review the attached documents for more details about your compensation package, benefits,
                        and company policies. To accept this offer, please sign and return this letter by{" "}
                        {new Date(offerLetterTemplate.responseDate).toLocaleDateString()}.
                      </p>

                      <p>
                        We are excited about the possibility of you joining our team and look forward to your response.
                      </p>
                    </div>

                    <div className="mt-8">
                      <p className="text-gray-800">Sincerely,</p>
                      <p className="mt-4 text-gray-800">HR Department</p>
                      <p className="text-gray-600">Your Company Name</p>
                    </div>

                    <div className="mt-12 pt-8 border-t">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-gray-600 mb-8">Candidate Signature:</p>
                          <p className="text-gray-600">Date:</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-8">Company Representative:</p>
                          <p className="text-gray-600">Date:</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="border-t p-4 flex justify-end gap-3 bg-gray-50">
                {editMode ? (
                  <>
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveOfferLetter}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowOfferLetter(false)}
                      className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                    >
                      Close
                    </button>
                    <button
                      onClick={copyOfferLetter}
                      className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                    <button
                      onClick={() => setEditMode(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit Template
                    </button>
                    <button
                      onClick={sendOfferLetter}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Send Offer
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChat && selectedApplicant && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-100 rounded-lg shadow-xl w-full max-w-md h-[80vh] flex flex-col"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Chat Header */}
              <div className="bg-gray-800 text-white p-3 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                    <User className="w-6 h-6 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedApplicant.name}</h3>
                    <p className="text-xs text-gray-300">{selectedApplicant.jobTitle}</p>
                  </div>
                </div>
                <button onClick={() => setShowChat(false)} className="text-gray-300 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-100 " ref={chatMessagesRef}>
                <div className="space-y-3">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"}`}>
                      {message.sender === "system" ? (
                        <div className="bg-gray-200 text-gray-500 text-xs py-1 px-3 rounded-full mx-auto my-2">
                          {message.text}
                        </div>
                      ) : message.isFile ? (
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 ${
                            message.sender === "you"
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-white text-gray-800 rounded-bl-none shadow"
                          }`}
                        >
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            <p className="text-sm">{message.text}</p>
                            <Download className="w-4 h-4 ml-2 cursor-pointer" />
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs opacity-70">{message.time}</p>
                            {message.sender === "you" && (
                              <span className="text-xs opacity-70">{message.status === "sent" ? "✓" : "✓✓"}</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 ${
                            message.sender === "you"
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-white text-gray-800 rounded-bl-none shadow"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs opacity-70">{message.time}</p>
                            {message.sender === "you" && (
                              <span className="text-xs opacity-70">{message.status === "sent" ? "✓" : "✓✓"}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 rounded-lg rounded-bl-none shadow px-3 py-2 max-w-[80%]">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Emoji Picker */}
              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div
                    className="p-2 border-t bg-white"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => addEmoji(emoji)}
                          className="text-xl hover:bg-gray-100 p-1 rounded"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Input */}
              <div className="p-3 border-t bg-white rounded-b-lg">
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                  <button onClick={handleAttachment} className="text-gray-500 hover:text-gray-700">
                    <Paperclip className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() =>
                      toast.success("Image upload feature initiated", {
                        icon: "📷",
                        style: {
                          borderRadius: "10px",
                          background: "#333",
                          color: "#fff",
                        },
                      })
                    }
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Image className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-full text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button onClick={sendMessage} className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Candidate Details Slider */}
      <AnimatePresence>
        {showSlider && selectedApplicant && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSlider(false)}
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
                  <h2 className="text-xl font-semibold text-white">Recruiter Profile</h2>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleShortlist(selectedApplicant.id)}
                      className={`p-2 rounded-full transition-colors ${
                        shortlistedRecruiters.includes(selectedApplicant.id)
                          ? "bg-yellow-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                      title={
                        shortlistedRecruiters.includes(selectedApplicant.id)
                          ? "Remove from shortlist"
                          : "Add to shortlist"
                      }
                    >
                      {shortlistedRecruiters.includes(selectedApplicant.id) ? (
                        <Bookmark className="w-5 h-5 fill-current" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => setShowSlider(false)}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-6 border border-gray-700">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                      {selectedApplicant.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white">{selectedApplicant.name}</h3>
                      <p className="text-purple-400">{selectedApplicant.position}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm text-white ${getStatusColor(selectedApplicant.status)}`}
                        >
                          {selectedApplicant.status}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm bg-indigo-900/40 text-indigo-400 border border-indigo-800/50">
                          {selectedApplicant.jobTitle}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
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
                        <p className="text-sm text-gray-400">Position</p>
                        <p className="text-white">{selectedApplicant.position}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Experience</p>
                        <p className="text-white">{selectedApplicant.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Education</p>
                        <p className="text-white">{selectedApplicant.education}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Applied Date</p>
                        <p className="text-white">{selectedApplicant.appliedDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                    <Award size={20} className="text-purple-400" /> Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplicant.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 rounded-full text-sm bg-gray-700 text-white">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowSlider(false)
                      openChat(selectedApplicant)
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                  >
                    <MessageSquare size={18} />
                    Chat
                  </button>
                  {(selectedApplicant.status === "Hired" || selectedApplicant.status === "Offer Sent") && (
                    <button
                      onClick={() => {
                        setShowSlider(false)
                        openOfferLetter(selectedApplicant)
                      }}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                      <FileText size={18} />
                      Offer Letter
                    </button>
                  )}
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

const getStatusColor = (status) => {
  switch (status) {
    case "Applied":
      return "bg-yellow-500"
    case "Interview Scheduled":
      return "bg-blue-500"
    case "Hired":
      return "bg-green-500"
    case "Offer Sent":
      return "bg-purple-500"
    case "Rejected":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getFilterBgColor = (filter) => {
  switch (filter) {
    case "Applied":
      return "bg-gradient-to-r from-yellow-600 to-yellow-700"
    case "Interview Scheduled":
      return "bg-gradient-to-r from-blue-600 to-blue-700"
    case "Hired":
      return "bg-gradient-to-r from-green-600 to-green-700"
    case "Offer Sent":
      return "bg-gradient-to-r from-purple-600 to-purple-700"
    case "Rejected":
      return "bg-gradient-to-r from-red-600 to-red-700"
    default:
      return "bg-gradient-to-r from-indigo-600 to-indigo-700"
  }
}

export default Recruit


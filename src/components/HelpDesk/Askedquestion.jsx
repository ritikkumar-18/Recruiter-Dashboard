import { useState, useEffect, useRef } from "react"
import { ChevronDown, Search, Menu, X } from "lucide-react"

import { motion } from "framer-motion"
import Header from "../Common/Header"

const Askedquestion = () => {
  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      questions: [
        {
          question: "How do I create a job posting?",
          answer:
            'To create a job posting, navigate to the "Job Opening" section in the sidebar, click on "Create New Job," and fill out the required details such as job title, description, and requirements. You can also use templates to speed up the process and ensure consistency across your job postings.',
        },
        {
          question: "How can I search for candidates?",
          answer:
            'You can search for candidates by visiting the "Search Candidate" section. Use filters like skills, experience, and location to find the best matches for your job opening. The advanced search feature allows you to use Boolean operators for more precise results.',
        },
        {
          question: "What is the shortlisting process?",
          answer:
            'The shortlisting process involves reviewing candidate profiles, resumes, and applications. You can shortlist candidates by marking them as "Shortlisted" in the "Candidate" section. You can also add notes and ratings to help with your decision-making process.',
        },
      ],
    },
    {
      id: "interviews",
      title: "Interviews & Scheduling",
      questions: [
        {
          question: "How do I schedule interviews?",
          answer:
            'You can schedule interviews by going to the "Calendar" section. Click on a date, add the candidate details, and set the interview time. Notifications will be sent to both you and the candidate. You can also set up automated reminders to reduce no-shows.',
        },
        {
          question: "Can I conduct video interviews through the platform?",
          answer:
            'Yes, our platform supports video interviews. When scheduling an interview, select "Video Interview" as the interview type. The system will automatically generate a secure link that will be sent to all participants. You can also record interviews for later review with candidate permission.',
        },
        {
          question: "How do I manage interview feedback?",
          answer:
            'After an interview, you can submit feedback through the "Interview Feedback" form accessible from the candidate profile or calendar event. You can rate different skills, add comments, and share feedback with other team members involved in the hiring process.',
        },
      ],
    },
    {
      id: "templates",
      title: "Templates & Communication",
      questions: [
        {
          question: "Can I customize Offer templates?",
          answer:
            'Yes, you can customize Offer templates in the "Template" section. Choose from pre-designed templates or create your own to communicate with candidates effectively. You can save your customized templates for future use and share them with your team.',
        },
        {
          question: "How do I send bulk communications to candidates?",
          answer:
            'To send bulk communications, go to the "Candidates" section, select multiple candidates using the checkboxes, then click on "Bulk Actions" and choose "Send Communication". You can use templates and personalize messages with candidate-specific information.',
        },
        {
          question: "Are there templates for rejection letters?",
          answer:
            'Yes, we provide several professionally written rejection letter templates that maintain a positive candidate experience. You can find these in the "Templates" section under "Rejection Communications". These templates can be customized to include specific feedback if desired.',
        },
      ],
    },
    {
      id: "account",
      title: "Account Management",
      questions: [
        {
          question: "How do I add team members to my account?",
          answer:
            'To add team members, go to "Settings" > "Team Management" and click "Add Team Member". Enter their email address and select their role (Admin, Recruiter, Hiring Manager, etc.). They will receive an invitation email with instructions to set up their account.',
        },
        {
          question: "What are the different user roles available?",
          answer:
            "Our platform offers several roles including Admin (full access), Recruiter (can manage jobs and candidates), Hiring Manager (can review candidates and provide feedback), and Interviewer (limited access to assigned candidates and interview schedules).",
        },
        {
          question: "How do I update my subscription plan?",
          answer:
            'You can update your subscription plan by going to "Settings" > "Billing & Subscription" and clicking "Change Plan". You\'ll see available options with detailed feature comparisons. Changes to higher tiers take effect immediately, while downgrades apply at the end of your current billing cycle.',
        },
      ],
    },
    {
      id: "reports",
      title: "Analytics & Reporting",
      questions: [
        {
          question: "What reports are available on the platform?",
          answer:
            'Our platform offers various reports including Recruitment Funnel Analytics, Time-to-Hire Metrics, Source Effectiveness, Interviewer Performance, and Custom Reports. These can be accessed from the "Analytics" section in the main navigation.',
        },
        {
          question: "Can I export reports to other formats?",
          answer:
            'Yes, all reports can be exported to Excel, CSV, or PDF formats. When viewing any report, look for the "Export" button in the top right corner. You can also schedule automated report exports to be sent to specified email addresses on a recurring basis.',
        },
        {
          question: "How can I create custom reports?",
          answer:
            'To create custom reports, go to "Analytics" > "Custom Reports" and click "Create New Report". You can select metrics, dimensions, filters, and visualization types. Save your custom reports for future use and share them with team members.',
        },
      ],
    },
  ]

  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id)
  const [openQuestionId, setOpenQuestionId] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredFAQs, setFilteredFAQs] = useState(faqCategories)
  const contentRef = useRef(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()

    
    window.addEventListener("resize", checkMobile)

    
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFAQs(faqCategories)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = faqCategories
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (item) => item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query),
        ),
      }))
      .filter((category) => category.questions.length > 0)

    setFilteredFAQs(filtered)

    // If we have results but the active category has no questions,
    // automatically switch to the first category with results
    if (filtered.length > 0) {
      const currentCategoryHasQuestions = filtered.some((cat) => cat.id === activeCategory && cat.questions.length > 0)

      if (!currentCategoryHasQuestions) {
        setActiveCategory(filtered[0].id)
      }
    }
  }, [searchQuery, activeCategory])

  const toggleQuestion = (questionId) => {
    setOpenQuestionId(openQuestionId === questionId ? null : questionId)
  }

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    setOpenQuestionId(null)

    // Close sidebar on mobile when category is selected
    if (isMobile) {
      setSidebarOpen(false)
    }

    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }

  const getActiveQuestions = () => {
    const activeCategory = filteredFAQs.find((cat) => cat.id === activeCategory)
    return activeCategory ? activeCategory.questions : []
  }

  const getQuestionId = (categoryId, questionIndex) => `${categoryId}-q${questionIndex}`

  return (
    <div className="flex-1 overflow-hidden relative z-10 bg-gray-900 flex flex-col">
      <Header title={"Frequently Asked Questions"}>
        
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="sr-only">Toggle sidebar</span>
        </button>
      </Header>
    <motion.div  
         initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
      <div className="flex flex-1 overflow-hidden relative">
        {/* Overlay for mobile */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div
          className={`
            ${isMobile ? "fixed left-0 top-[57px] bottom-0 z-20" : "relative"} 
            w-72 bg-gray-800 overflow-y-auto flex-shrink-0 border rounded-lg md:ml-4 md:mt-4 sm:mt-10 md:my-4 border-gray-700
            transition-transform duration-300 ease-in-out
            ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"}
          `}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-white">Questions</h2>

            {/* Search box */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category navigation */}
            <nav className="space-y-1">
              {filteredFAQs.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeCategory === category.id ? "bg-blue-600 text-white" : "text-blue-400 hover:bg-gray-700 "
                  }`}
                >
                  {`${index + 1}. ${category.title}`}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 md:m-4 bg-gray-800 border border-gray-700 rounded-lg"
        >
          <div>
            {filteredFAQs.map(
              (category) =>
                category.id === activeCategory && (
                  <div key={category.id}>
                    <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-white flex items-center sm:mt-4 md:mt-0">
                      {isMobile && (
                        <button
                          onClick={() => setSidebarOpen(true)}
                          className="mr-2 p-1 rounded-md bg-gray-700 hover:bg-gray-600"
                        >
                          <Menu size={18} />
                        </button>
                      )}
                      {category.title}
                    </h1>

                    {category.questions.map((item, qIndex) => {
                      const questionId = getQuestionId(category.id, qIndex)
                      return (
                        <div key={questionId} className="mb-4">
                          <div
                            onClick={() => toggleQuestion(questionId)}
                            className={`p-4 md:p-6 rounded-lg cursor-pointer transition-colors relative border-2 ${
                              openQuestionId === questionId
                                ? "bg-gray-700 border-teal-500"
                                : "bg-gray-700 border-transparent hover:border-teal-500"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <h2 className="text-base md:text-lg font-semibold text-white pr-8">{`${qIndex + 1}. ${item.question}`}</h2>
                              <div
                                className={`absolute right-4 md:right-6 transition-transform duration-300 ${
                                  openQuestionId === questionId ? "rotate-180" : "rotate-0"
                                }`}
                              >
                                <ChevronDown className="text-teal-400" />
                              </div>
                            </div>
                          </div>

                          {openQuestionId === questionId && (
                            <div className="overflow-hidden transition-all duration-300">
                              <div className="p-4 md:p-6 bg-gray-600 border border-teal-300 rounded-lg mt-1">
                                <p className="text-gray-200 text-sm md:text-base">{item.answer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
      </motion.div>
      
    </div>
  )
}

export default Askedquestion


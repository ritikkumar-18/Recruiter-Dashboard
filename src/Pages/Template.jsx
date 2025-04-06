import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, X, Filter, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { toast, Toaster } from "react-hot-toast"
import Header from "../components/Common/Header"

const predefinedTemplates = [
  {
    id: 1,
    title: "Standard Offer Letter",
    description: "A professional, straightforward offer letter suitable for most positions",
    category: "Human Resources",
    content: `
      Dear [Candidate Name],

      We are pleased to offer you the position of [Position] at [Company Name]. We were impressed with your background and experience, and we believe you would be a valuable asset to our team.

      This position offers an annual salary of $[Salary], with benefits including health insurance, retirement plan, and [Number] days of paid time off per year. Your anticipated start date will be [Start Date].

      Please review the attached documents for more details about your compensation package, benefits, and company policies. To accept this offer, please sign and return this letter by [Response Date].

      Sincerely,
      [HR Manager Name]
      [Company Name]
    `,
  },
  {
    id: 2,
    title: "Tech Position Offer",
    description: "Tailored for software engineers and technical roles",
    category: "Technology",
    content: `
      Dear [Candidate Name],

      Congratulations! We are thrilled to offer you the [Position] role at [Company Name]. Your technical expertise and problem-solving abilities stood out during our interview process.

      Your compensation package includes:
      - Base salary: $[Salary] per year
      - Stock options: [Number] shares vesting over 4 years
      - Annual performance bonus: Up to [Percentage]% of base salary
      - Comprehensive health, dental, and vision insurance
      - Flexible work arrangements with [Number] days of remote work per week
      - Professional development budget of $[Amount] per year

      We're excited about the contributions you'll make to our engineering team. Your start date would be [Start Date].

      To accept this offer, please sign and return the enclosed documents by [Response Date].

      Welcome to the team!

      [CTO/Engineering Manager Name]
      [Company Name]
    `,
  },
  {
    id: 3,
    title: "Sales Commission Agreement",
    description: "Template for sales roles with commission structure",
    category: "Finance",
    content: `
      Dear [Sales Representative Name],

      This letter outlines the commission structure for your role as [Sales Position] at [Company Name].

      Base Salary: $[Base Salary] per year
      Commission Rate: [Commission Percentage]% on all qualified sales
      Bonus Threshold: Additional [Bonus Percentage]% when exceeding quarterly targets of $[Target Amount]

      Commission payments will be processed [Payment Schedule] and included with your regular paycheck.

      Please sign below to acknowledge your understanding and acceptance of this commission structure.

      [Sales Manager Name]
      [Company Name]
    `,
  },
  {
    id: 4,
    title: "Marketing Campaign Brief",
    description: "Comprehensive brief for new marketing campaigns",
    category: "Marketing",
    content: `
      CAMPAIGN BRIEF: [Campaign Name]

      OBJECTIVE:
      [Campaign Objective]

      TARGET AUDIENCE:
      [Target Demographic]

      KEY MESSAGING:
      [Primary Message]

      CHANNELS:
      [Channel List]

      TIMELINE:
      Start Date: [Start Date]
      End Date: [End Date]

      BUDGET:
      Total Allocation: $[Budget Amount]

      SUCCESS METRICS:
      [KPI List]

      APPROVALS:
      [Marketing Director]
      [Brand Manager]
    `,
  },
  {
    id: 5,
    title: "Performance Improvement Plan",
    description: "Structured plan for employee performance enhancement",
    category: "Human Resources",
    content: `
      PERFORMANCE IMPROVEMENT PLAN

      Employee: [Employee Name]
      Position: [Position]
      Manager: [Manager Name]
      Date Issued: [Issue Date]
      Review Period: [Review Period]

      AREAS FOR IMPROVEMENT:
      [Improvement Areas]

      SPECIFIC GOALS:
      [Measurable Goals]

      RESOURCES PROVIDED:
      [Support Resources]

      PROGRESS REVIEW SCHEDULE:
      [Review Schedule]

      CONSEQUENCES OF NOT MEETING GOALS:
      [Consequences]

      Employee Signature: _______________
      Manager Signature: _______________
    `,
  },
  {
    id: 6,
    title: "Project Proposal",
    description: "Detailed project proposal template for new initiatives",
    category: "Technology",
    content: `
      PROJECT PROPOSAL: [Project Name]

      EXECUTIVE SUMMARY:
      [Brief Summary]

      BUSINESS CASE:
      [Business Justification]

      SCOPE:
      [Project Scope]

      TIMELINE:
      [Project Timeline]

      RESOURCE REQUIREMENTS:
      [Resource List]

      BUDGET:
      [Budget Breakdown]

      RISK ASSESSMENT:
      [Risk Factors]

      APPROVAL SIGNATURES:
      [Project Sponsor]
      [Department Head]
    `,
  },
  {
    id: 7,
    title: "Investment Recommendation",
    description: "Financial advisor template for investment recommendations",
    category: "Finance",
    content: `
      INVESTMENT RECOMMENDATION

      Client: [Client Name]
      Advisor: [Advisor Name]
      Date: [Date]

      RECOMMENDATION SUMMARY:
      [Investment Summary]

      INVESTMENT DETAILS:
      Asset Class: [Asset Class]
      Expected Return: [Expected Return]
      Risk Level: [Risk Level]
      Time Horizon: [Time Horizon]

      RATIONALE:
      [Investment Rationale]

      ALTERNATIVES CONSIDERED:
      [Alternative Investments]

      NEXT STEPS:
      [Action Items]

      Client Acknowledgment: _______________
    `,
  },
  {
    id: 8,
    title: "Product Launch Plan",
    description: "Comprehensive template for new product launches",
    category: "Marketing",
    content: `
      PRODUCT LAUNCH PLAN: [Product Name]

      PRODUCT OVERVIEW:
      [Product Description]

      TARGET MARKET:
      [Target Market]

      PRICING STRATEGY:
      [Pricing Details]

      MARKETING ACTIVITIES:
      Pre-Launch: [Pre-Launch Activities]
      Launch Day: [Launch Day Activities]
      Post-Launch: [Post-Launch Activities]

      SUCCESS METRICS:
      [KPIs]

      TEAM RESPONSIBILITIES:
      [Team Assignments]

      TIMELINE:
      [Launch Timeline]
    `,
  },
  {
    id: 9,
    title: "Remote Work Policy",
    description: "Policy template for remote work arrangements",
    category: "Human Resources",
    content: `
      REMOTE WORK POLICY

      Effective Date: [Effective Date]

      ELIGIBILITY:
      [Eligibility Criteria]

      WORK EXPECTATIONS:
      Hours: [Work Hours]
      Availability: [Availability Requirements]
      Communication: [Communication Protocols]

      EQUIPMENT:
      [Equipment Provisions]

      SECURITY REQUIREMENTS:
      [Security Protocols]

      PERFORMANCE EVALUATION:
      [Evaluation Methods]

      POLICY REVIEW:
      [Review Schedule]

      Employee Acknowledgment: _______________
    `,
  },
  {
    id: 10,
    title: "API Documentation",
    description: "Template for documenting API endpoints",
    category: "Technology",
    content: `
      API DOCUMENTATION: [API Name]

      BASE URL:
      [Base URL]

      AUTHENTICATION:
      [Authentication Method]

      ENDPOINTS:

      GET [Endpoint Path]
      Description: [Endpoint Description]
      Parameters: [Parameter List]
      Response Format: [Response Format]
      Example: [Example Request/Response]

      POST [Endpoint Path]
      Description: [Endpoint Description]
      Request Body: [Request Format]
      Response Format: [Response Format]
      Example: [Example Request/Response]

      ERROR CODES:
      [Error Code List]
    `,
  },
  {
    id: 11,
    title: "Budget Proposal",
    description: "Detailed budget proposal template",
    category: "Finance",
    content: `
      BUDGET PROPOSAL: [Department/Project]

      FISCAL YEAR: [Fiscal Year]
      PREPARED BY: [Preparer Name]
      DATE: [Preparation Date]

      EXECUTIVE SUMMARY:
      [Budget Summary]

      REVENUE PROJECTIONS:
      [Revenue Details]

      EXPENSE CATEGORIES:
      Personnel: $[Personnel Cost]
      Operations: $[Operations Cost]
      Capital Expenditures: $[CapEx]
      Marketing: $[Marketing Cost]
      Other: $[Other Costs]

      JUSTIFICATIONS:
      [Budget Justifications]

      APPROVAL SIGNATURES:
      [Finance Director]
      [Department Head]
    `,
  },
  {
    id: 12,
    title: "Customer Satisfaction Survey",
    description: "Template for gathering customer feedback",
    category: "Marketing",
    content: `
      CUSTOMER SATISFACTION SURVEY

      Dear [Customer Name],

      Thank you for choosing [Company Name]. We value your feedback and would appreciate if you could take a few minutes to complete this survey.

      1. How would you rate your overall experience with our [Product/Service]?
         [Rating Scale]

      2. What aspects of our [Product/Service] do you like the most?
         [Text Field]

      3. What areas do you think we could improve?
         [Text Field]

      4. How likely are you to recommend our [Product/Service] to others?
         [Rating Scale]

      5. Additional comments:
         [Text Field]

      Thank you for your valuable feedback!
      [Company Name] Team
    `,
  },
]


const categories = [
  { name: "All Templates", count: predefinedTemplates.length },
  { name: "Technology", count: predefinedTemplates.filter((t) => t.category === "Technology").length },
  { name: "Finance", count: predefinedTemplates.filter((t) => t.category === "Finance").length },
  { name: "Marketing", count: predefinedTemplates.filter((t) => t.category === "Marketing").length },
  { name: "Human Resources", count: predefinedTemplates.filter((t) => t.category === "Human Resources").length },
  { name: "My Templates", count: 1 },
]

const Template = () => {
  const [templates, setTemplates] = useState(predefinedTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [activeCategory, setActiveCategory] = useState("All Templates")
  const [searchQuery, setSearchQuery] = useState("")
  
  const itemsPerPage = 10

  // Filter templates based on active category and search query
  useEffect(() => {
    let filtered = predefinedTemplates

    // Apply category filter
    if (activeCategory !== "All Templates" && activeCategory !== "My Templates") {
      filtered = filtered.filter((template) => template.category === activeCategory)
    } else if (activeCategory === "My Templates") {
      // For demo purposes, just show one template as "My Template"
      filtered = [predefinedTemplates[0]]
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (template) =>
          template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setTemplates(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [activeCategory, searchQuery])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTemplates = templates.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(templates.length / itemsPerPage)

  const previewTemplate = (template) => {
    setSelectedTemplate(template)
    setShowPreview(true)

    const placeholders = template.content.match(/\[(.*?)\]/g) || []
    const initialValues = {}
    placeholders.forEach((placeholder) => {
      const key = placeholder.slice(1, -1)
      initialValues[key] = ""
    })
    setFormValues(initialValues)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const generateDocument = () => {
    let generatedContent = selectedTemplate.content
    Object.keys(formValues).forEach((key) => {
      generatedContent = generatedContent.replace(`[${key}]`, formValues[key])
    })

    const element = document.createElement("a")
    const file = new Blob([generatedContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${selectedTemplate.title.replace(/\s+/g, "_")}_generated.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast.success("Document generated and downloaded!", {
      icon: "📄",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    })
  }

  const getContentPreview = (content) => {
    return content.trim().substring(0, 100) + "..."
  }

  
  const getCategoryGradient = (category) => {
    switch (category) {
      case "Technology":
        return "from-blue-600 to-blue-700"
      case "Finance":
        return "from-green-600 to-green-700"
      case "Marketing":
        return "from-purple-600 to-purple-700"
      case "Human Resources":
        return "from-pink-600 to-pink-700"
      case "My Templates":
        return "from-yellow-600 to-yellow-700"
      default:
        return "from-blue-600 via-purple-600 to-pink-600"
    }
  }

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 scroll-hidden">
      <Header title="Templates" />
      <Toaster />
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className=" p-4 sticky top-0 z-2">
        
        <div className="flex justify-center mb-6 overflow-x-auto pb-2">
          <div className="bg-gray-800 rounded-lg p-1 flex">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category.name
                    ? `bg-gradient-to-r ${getCategoryGradient(category.name)} text-white`
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                {category.name} <span className="ml-1 opacity-70">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {currentTemplates.map((template) => (
              <motion.div
                key={template.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
                whileHover={{ y: -5 }}
              >
                <div className="p-4 bg-gray-750 border-b border-gray-700 flex-1">
                  <div className="text-xs text-blue-400 mb-1">{template.category}</div>
                  <h3 className="text-lg font-semibold text-white mb-1 truncate">{template.title}</h3>
                  <p className="text-gray-400 text-xs mb-2 line-clamp-1">{template.description}</p>
                  <div className="bg-gray-900 p-2 rounded text-gray-400 text-xs h-20 overflow-hidden whitespace-pre-line">
                    {getContentPreview(template.content)}
                  </div>
                </div>

                {/* Bottom half: Info and action */}
                <div className="p-4">
                  <button
                    onClick={() => previewTemplate(template)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
                  >
                    Preview & Generate
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
       {totalPages > 1 && (
        <div className="flex justify-center mt-8">
        <div className="flex gap-2">
         <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg transition-colors ${
            currentPage === 1
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
               }`}>
         <ChevronLeft size={18} />
      </button>

      {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
        let pageNum =
          currentPage <= 3
            ? index + 1
            : currentPage >= totalPages - 2
              ? totalPages - 4 + index
              : currentPage - 2 + index;

        if (pageNum <= 0) pageNum = 1;
        if (pageNum > totalPages) return null;

        return (
          <button
            key={index}
            onClick={() => setCurrentPage(pageNum)}
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
                  );
                   })}

                 <button
                 onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                 disabled={currentPage === totalPages}
                 className={`px-3 py-2 rounded-lg transition-colors ${
                 currentPage === totalPages
                 ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                 }`}>
               <ChevronRight size={18} />
               </button>
               </div>
             </div>
           )}
        </div>

        {/* Template Preview Modal */}
        <AnimatePresence>
          {showPreview && selectedTemplate && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto scroll-hidden"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
              >
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-xl font-bold text-gray-800">{selectedTemplate.title}</h2>
                  <button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {Object.keys(formValues).map((key) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
                        <input
                          type="text"
                          name={key}
                          value={formValues[key]}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-400 bg-white text-gray-800 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                    <h3 className="font-medium text-gray-700 mb-2">Preview</h3>
                    <div className="whitespace-pre-line text-gray-600 text-sm max-h-60 overflow-y-auto p-2">
                      {Object.keys(formValues).reduce(
                        (content, key) => content.replace(`[${key}]`, formValues[key] || `[${key}]`),
                        selectedTemplate.content,
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t p-4 flex justify-end bg-gray-50">
                  <button
                    onClick={generateDocument}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Generate Document
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

export default Template


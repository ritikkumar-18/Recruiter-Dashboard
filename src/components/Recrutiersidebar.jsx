import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FiBarChart2, FiLogOut, FiSettings } from "react-icons/fi"
import { BiMenu } from "react-icons/bi"
import { Link, useLocation } from "react-router-dom"
import {
  BookOpen,
  BookTemplate,
  Briefcase,
  Download,
  HardDrive,
  MessageCircle,
  MessagesSquareIcon,
  Shield,
  UserCog,
  UserSearch,
} from "lucide-react"
import { FaQuestionCircle, FaComments, FaRegSmile, FaChevronDown } from "react-icons/fa"

const SIDEBAR = [
  { name: "Overview", icon: FiBarChart2, color: "#8B5CF6", href: "/" },
  { name: "Job Opening", icon: BookOpen, color: "#8B5CF6", href: "/jobopening" },
  { name: "Selected Users", icon: UserSearch, color: "#8B5CF6", href: "/candidate" },
  { name: "Recruit", icon: Briefcase, color: "#8B5CF6", href: "/recruit" },
  { name: "Search Candidate", icon: Download, color: "#8B5CF6", href: "/resume" },
  { name:  "Buy Subscription",icon:Shield,color:"#8B5CF6",href:"/buysubscription"},
  { name: "Template", icon: BookTemplate, color: "#8B5CF6", href: "/template" },
  { name: "HRM", icon: HardDrive, color: "#8B5CF6", href: "/hrm" },
  { name: "Sub Admin", icon: UserCog, color: "#8B5CF6", href: "/subadmin" },
  { name: "Chat", icon: MessageCircle, color: "#8B5CF6", href: "/chat" },
  {
    name: "Help Desk",
    icon: MessagesSquareIcon,
    color: "#8B5CF6",
    href: "#",
    dropdown: [
      { name: "FAQ", icon: FaQuestionCircle, href: "/helpdesk/faq" },
      { name: "Support Chat", icon: FaComments, href: "/helpdesk/support-chat" },
      { name: "Feedback", icon: FaRegSmile, href: "/helpdesk/feedback" },
    ],
  },
  { name: "Settings", icon: FiSettings, color: "#8B5CF6", href: "/settings" },
  { name: "Logout", icon: FiLogOut, color: "#8B5CF6", href: "/logout" },
]

const RecruiterSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768)
  const [openDropdown, setOpenDropdown] = useState(null) // Track which dropdown is open
  const location = useLocation()

  const handleResize = () => {
    setIsSidebarOpen(window.innerWidth > 768)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleDropdown = (name, e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setOpenDropdown(openDropdown === name ? null : name)
  }

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}
    >
      <div className="h-full bg-gray-800 bg-opacity-80 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen((prevState) => !prevState)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <BiMenu size={24} className="text-gray-300" />
        </motion.button>

        <nav className="mt-8 flex-grow overflow-y-auto max-h-[calc(100vh-100px)] scroll-hidden">
          {SIDEBAR.map((item) => (
            <div key={item.href || item.name}>
              {/* Regular menu item or dropdown trigger */}
              {item.dropdown ? (
                <div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg transition-all mb-2 relative cursor-pointer ${
                    openDropdown === item.name ? "bg-gray-700" : ""
                  }`}
                  onClick={(e) => toggleDropdown(item.name, e)}
                >
                  <div className={`relative transition-all duration-300 text-gray-400`}>
                    <item.icon size={20} style={{ minWidth: "20px" }} />
                  </div>

                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="ml-4 whitespace-nowrap flex-1"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {isSidebarOpen && (
                    <FaChevronDown
                      className={`transition-transform duration-200 ${openDropdown === item.name ? "rotate-180" : ""}`}
                      size={12}
                    />
                  )}
                </div>
              ) : (
                <Link to={item.href}>
                  <motion.div
                    className={`flex items-center p-4 text-sm font-medium rounded-lg transition-all mb-2 relative cursor-pointer ${
                      location.pathname === item.href ? "bg-gray-700" : ""
                    }`}
                    initial={{ opacity: 0, x: isSidebarOpen ? -10 : 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isSidebarOpen ? 10 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className={`relative transition-all duration-300 ${
                        location.pathname === item.href ? "text-teal-500" : "text-gray-400"
                      }`}
                    >
                      <item.icon size={20} style={{ minWidth: "20px" }} />
                    </motion.div>

                    <AnimatePresence>
                      {isSidebarOpen && (
                        <motion.span
                          className="ml-4 whitespace-nowrap"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {location.pathname === item.href && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-1 bg-teal-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                </Link>
              )}

              {/* Dropdown items */}
              <AnimatePresence>
                {item.dropdown && openDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                    animate={{ opacity: 1, height: "auto", overflow: "visible" }}
                    exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.dropdown.map((subItem) => (
                      <Link key={subItem.href} to={subItem.href}>
                        <motion.div
                          className={`flex items-center p-4 text-sm font-medium rounded-lg transition-all mb-2 relative cursor-pointer ${
                            location.pathname === subItem.href ? "bg-gray-700" : ""
                          } ${isSidebarOpen ? "pl-10" : ""}`}
                        >
                          <motion.div
                            className={`relative transition-all duration-300 ${
                              location.pathname === subItem.href ? "text-teal-500" : "text-gray-400"
                            }`}
                          >
                            <subItem.icon size={16} style={{ minWidth: "16px" }} />
                          </motion.div>

                          <AnimatePresence>
                            {isSidebarOpen && (
                              <motion.span
                                className="ml-4 whitespace-nowrap"
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {subItem.name}
                              </motion.span>
                            )}
                          </AnimatePresence>

                          {location.pathname === subItem.href && (
                            <motion.div
                              className="absolute bottom-0 left-0 w-full h-1 bg-teal-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>
    </motion.div>
  )
}

export default RecruiterSidebar


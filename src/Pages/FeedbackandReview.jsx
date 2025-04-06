// import React from 'react'
// import Header from '../components/Common/Header';
// import { FaStar, FaExclamationCircle, FaRegCommentDots } from 'react-icons/fa';
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Toaster,toast } from 'react-hot-toast';


// const FeedbackandReview = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [ratings, setRatings] = useState({ employer: 0, jobPost: 0 });
//   const [comment, setComment] = useState('');
//   const [reportedContent, setReportedContent] = useState('');

//   const handleFeedbackSubmit = (e) => {
//     e.preventDefault();
//     if (comment.trim() !== '') {
//       const newFeedback = {
//         id: Date.now(),
//         comment,
//         rating: ratings.employer, 
//         type: 'employer', 
//       };
//       setFeedbacks([newFeedback, ...feedbacks]);
//       setComment('');
//     }
//   };

//   const handleReportSubmit = (e) => {
//     e.preventDefault();
//     if (reportedContent.trim() !== '') {
//       toast.success("Reported Successfully");
//       setReportedContent('');
//     }
//   };

//   return (
//     <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
//       <Header title={"Feedback & Review"} />
//       <Toaster/>
//       < motion.section className="bg-gray-900 p-6 rounded-lg shadow-md mb-6"
//        initial={{ opacity: 0, y: 20 }}
//        animate={{ opacity: 1, y: 0 }}
//        transition={{ duration: 0.5 }}>
//         <h3 className="text-xl font-semibold mb-4">Leave a Feedback</h3>
//         <form onSubmit={handleFeedbackSubmit} className="space-y-4">
//           <div className="flex items-center">
//             {/* <span className="text-gray-500 mr-4">Rating:</span>
//             <div className="flex space-x-1">
//               {[1, 2, 3, 4, 5].map((value) => (
//                 <FaStar
//                   key={value}
//                   className={`cursor-pointer ${ratings.employer >= value ? 'text-yellow-500' : 'text-gray-300'}`}
//                   onClick={() => setRatings((prev) => ({ ...prev, employer: value }))}
//                 />
//               ))}
//             </div> */}
//           </div>
//           <textarea
//             className="w-full p-3 border rounded-md bg-gray-900 text-white"
//             placeholder="Leave a comment..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)} />
//           <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Submit Feedback </button>
//         </form>
//       </motion.section>

//       <motion.section className="bg-gray-900 p-6 rounded-lg shadow-md mb-6"
//        initial={{ opacity: 0, y: 20 }}
//        animate={{ opacity: 1, y: 0 }}
//        transition={{ duration: 0.5 }}>
//         <h3 className="text-xl font-semibold mb-4">Recent Feedback</h3>
//         <ul className="space-y-4 ">
//           {feedbacks.map((feedback) => (
//             <li key={feedback.id} className="flex items-start space-x-3">
//               <div className="flex space-x-1">
//                 {[...Array(feedback.rating)].map((_, i) => (
//                   <FaStar key={i} className="text-yellow-500" />
//                 ))}
//               </div>
//               <div>
//                 <p className="text-gray-300">{feedback.comment}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </motion.section>

//       <motion.section className="bg-gray-900 p-6 rounded-lg shadow-md"
//        initial={{ opacity: 0, y: 20 }}
//        animate={{ opacity: 1, y: 0 }}
//        transition={{ duration: 0.5 }}>
//         <h3 className="text-xl font-semibold mb-4">Report Content</h3>
//         <form onSubmit={handleReportSubmit} className="space-y-4">
//           <div className="flex items-center">
//             <FaExclamationCircle className="text-red-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Describe the issue..."
//               className="w-full p-3 border rounded-md text-white bg-gray-900 "
//               value={reportedContent}
//               onChange={(e) => setReportedContent(e.target.value)} />
//           </div>
//           <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded-lg">
//             Report Issue
//           </button>
//         </form>
//       </motion.section>
       
//       </div>
//   )
// }

// export default FeedbackandReview


// import { useState, useRef } from "react"
// import { FaStar, FaExclamationCircle, FaRegCommentDots, FaTimes } from "react-icons/fa"
// import { motion, AnimatePresence } from "framer-motion"
// import { toast, Toaster } from "react-hot-toast"
// import Header from "../components/Common/Header"

// const FeedbackAndReview = () => {
  
//   const [feedbacks, setFeedbacks] = useState([])
//   const [rating, setRating] = useState(0)
//   const [comment, setComment] = useState("")
//   const [reportedContent, setReportedContent] = useState("")
//   const [reportCategory, setReportCategory] = useState("")

  
//   const [activeModal, setActiveModal] = useState(null)
//   const [isSubmitting, setIsSubmitting] = useState(false)

  
//   const modalRef = useRef(null)

  
//   const openModal = (modalType) => {
//     setActiveModal(modalType)
//     document.body.style.overflow = "hidden"
//   }

  
//   const closeModal = () => {
//     setActiveModal(null)
//     document.body.style.overflow = "auto"
//   }

  
//   const handleRatingClick = (value) => {
//     setRating(value)
//   }

  
//   const handleFeedbackSubmit = (e) => {
//     e.preventDefault()

//     if (rating === 0) {
//       toast.error("Please select a rating")
//       return
//     }

//     if (comment.trim() === "") {
//       toast.error("Please enter a comment")
//       return
//     }

//     setIsSubmitting(true)

    
//     setTimeout(() => {
//       const newFeedback = {
//         id: Date.now(),
//         comment,
//         rating,
//         date: new Date().toLocaleDateString(),
//       }

//       setFeedbacks([newFeedback, ...feedbacks])
//       setComment("")
//       setRating(0)
//       setIsSubmitting(false)
//       closeModal()
//       toast.success("Feedback submitted successfully!")
//     }, 800)
//   }

  
//   const handleReportSubmit = (e) => {
//     e.preventDefault()

//     if (reportCategory.trim() === "") {
//       toast.error("Please select a category")
//       return
//     }

//     if (reportedContent.trim() === "") {
//       toast.error("Please describe the issue")
//       return
//     }

//     setIsSubmitting(true)

    
//     setTimeout(() => {
//       setReportedContent("")
//       setReportCategory("")
//       setIsSubmitting(false)
//       closeModal()
//       toast.success("Issue reported successfully!")
//     }, 800)
//   }

  
//   const backdropVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
//   }

//   const modalVariants = {
//     hidden: {
//       opacity: 0,
//       y: 50,
//       scale: 0.95,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         damping: 25,
//         stiffness: 500,
//       },
//     },
//     exit: {
//       opacity: 0,
//       y: 50,
//       scale: 0.95,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   }

//   const cardVariants = {
//     initial: { scale: 1 },
//     hover: {
//       scale: 1.05,
//       boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 10,
//       },
//     },
//     tap: { scale: 0.98 },
//   }

  
//   const reportCategories = ["Technical Issue", "Content Problem", "User Behavior", "Billing Issue", "Other"]

//   return (
//     <div className="flex-1 overflow-auto relative z-10 bg-gray-900 min-h-screen">
//           <Header title={"Feedback & Review"} />
//       <Toaster />

//       {/* Header */}
//       <div className="max-w-6xl mx-auto mb-10 text-center p-5">
//         <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//           Feedback & Issues
//         </h1>
//         <p className="text-gray-300 max-w-2xl mx-auto">
//           Help us improve by sharing your experience or reporting any issues you've encountered
//         </p>
//       </div>

//       {/* Option Cards */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-5">
//         <motion.div
//           variants={cardVariants}
//           initial="initial"
//           whileHover="hover"
//           whileTap="tap"
//           onClick={() => openModal("feedback")}
//           className="bg-gradient-to-br from-blue-900/40 to-blue-700/20 backdrop-blur-sm rounded-xl p-6 cursor-pointer border border-blue-600/30 shadow-lg hover:shadow-blue-500/10 transition-all"
//         >
//           <div className="flex flex-col items-center text-center space-y-4">
//             <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
//               <FaRegCommentDots className="w-8 h-8 text-blue-400" />
//             </div>
//             <h3 className="text-xl font-bold">Share Your Feedback</h3>
//             <p className="text-gray-300">Let us know about your experience and help us improve our services</p>
//             <motion.button
//               className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-medium transition-colors"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Give Feedback
//             </motion.button>
//           </div>
//         </motion.div>

//         <motion.div
//           variants={cardVariants}
//           initial="initial"
//           whileHover="hover"
//           whileTap="tap"
//           onClick={() => openModal("report")}
//           className="bg-gradient-to-br from-red-900/40 to-red-700/20 backdrop-blur-sm rounded-xl p-6 cursor-pointer border border-red-600/30 shadow-lg hover:shadow-red-500/10 transition-all"
//         >
//           <div className="flex flex-col items-center text-center space-y-4">
//             <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
//               <FaExclamationCircle className="w-8 h-8 text-red-400" />
//             </div>
//             <h3 className="text-xl font-bold">Report an Issue</h3>
//             <p className="text-gray-300">Encountered a problem? Let us know so we can address it promptly</p>
//             <motion.button
//               className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm font-medium transition-colors"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Report Issue
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>

//       {/* Recent Feedback Section */}
//       {feedbacks.length > 0 && (
//         <div className="max-w-4xl mx-auto mb-12">
//           <h2 className="text-2xl font-bold mb-6 flex items-center">
//             <span className="w-10 h-1 bg-blue-500 rounded-full mr-3"></span>
//             Recent Feedback
//           </h2>

//           <div className="space-y-4">
//             {feedbacks.map((feedback) => (
//               <motion.div
//                 key={feedback.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4"
//               >
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
//                   <div className="flex items-center">
//                     <div className="flex space-x-1 mr-3">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <FaStar
//                           key={star}
//                           className={`w-4 h-4 ${star <= feedback.rating ? "text-yellow-400" : "text-gray-600"}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-400">{feedback.rating}/5</span>
//                   </div>
//                   <span className="text-xs text-gray-400">{feedback.date}</span>
//                 </div>
//                 <p className="text-gray-200">{feedback.comment}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Modals */}
//       <AnimatePresence>
//         {activeModal && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//             variants={backdropVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             onClick={closeModal}
//           >
//             <motion.div
//               ref={modalRef}
//               className={`w-full max-w-md rounded-2xl shadow-2xl ${
//                 activeModal === "feedback"
//                   ? "bg-gradient-to-b from-gray-800 to-gray-900 border border-blue-900/50"
//                   : "bg-gradient-to-b from-gray-800 to-gray-900 border border-red-900/50"
//               }`}
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Feedback Modal */}
//               {activeModal === "feedback" && (
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-6">
//                     <h3 className="text-xl font-bold text-white">Share Your Feedback</h3>
//                     <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
//                       <FaTimes className="w-5 h-5" />
//                     </button>
//                   </div>

//                   <form onSubmit={handleFeedbackSubmit}>
//                     <div className="mb-6">
//                       <label className="block text-sm font-medium text-gray-300 mb-2">
//                         How would you rate your experience?
//                       </label>
//                       <div className="flex space-x-2 items-center">
//                         {[1, 2, 3, 4, 5].map((value) => (
//                           <motion.button
//                             key={value}
//                             type="button"
//                             whileHover={{ scale: 1.2 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => handleRatingClick(value)}
//                             className="focus:outline-none"
//                           >
//                             <FaStar
//                               className={`w-8 h-8 ${
//                                 value <= rating ? "text-yellow-400" : "text-gray-600"
//                               } transition-colors`}
//                             />
//                           </motion.button>
//                         ))}
//                         {rating > 0 && <span className="ml-2 text-gray-300 text-sm">{rating}/5</span>}
//                       </div>
//                     </div>

//                     <div className="mb-6">
//                       <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
//                         Your Feedback
//                       </label>
//                       <textarea
//                         id="comment"
//                         rows="4"
//                         className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="Tell us about your experience..."
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                       ></textarea>
//                     </div>

//                     <div className="flex justify-end">
//                       <motion.button
//                         type="button"
//                         onClick={closeModal}
//                         className="px-4 py-2 mr-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition-colors"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         disabled={isSubmitting}
//                       >
//                         Cancel
//                       </motion.button>
//                       <motion.button
//                         type="submit"
//                         className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? (
//                           <>
//                             <svg
//                               className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                             >
//                               <circle
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                               ></circle>
//                               <path
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                               ></path>
//                             </svg>
//                             Submitting...
//                           </>
//                         ) : (
//                           <>Submit Feedback</>
//                         )}
//                       </motion.button>
//                     </div>
//                   </form>
//                 </div>
//               )}

//               {/* Report Modal */}
//               {activeModal === "report" && (
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-6">
//                     <h3 className="text-xl font-bold text-white">Report an Issue</h3>
//                     <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
//                       <FaTimes className="w-5 h-5" />
//                     </button>
//                   </div>

//                   <form onSubmit={handleReportSubmit}>
//                     <div className="mb-6">
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Issue Category</label>
//                       <select
//                         className="w-full px-4 py-3 bg-gray-700/90 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//                         value={reportCategory}
//                         onChange={(e) => setReportCategory(e.target.value)}
//                       >
//                         <option value="">Select a category</option>
//                         {reportCategories.map((category) => (
//                           <option key={category} value={category}>
//                             {category}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="mb-6">
//                       <label htmlFor="reportedContent" className="block text-sm font-medium text-gray-300 mb-2">
//                         Describe the Issue
//                       </label>
//                       <textarea
//                         id="reportedContent"
//                         rows="4"
//                         className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//                         placeholder="Please provide details about the issue..."
//                         value={reportedContent}
//                         onChange={(e) => setReportedContent(e.target.value)}
//                       ></textarea>
//                     </div>

//                     <div className="flex justify-end">
//                       <motion.button
//                         type="button"
//                         onClick={closeModal}
//                         className="px-4 py-2 mr-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition-colors"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         disabled={isSubmitting}
//                       >
//                         Cancel
//                       </motion.button>
//                       <motion.button
//                         type="submit"
//                         className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? (
//                           <>
//                             <svg
//                               className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                             >
//                               <circle
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                               ></circle>
//                               <path
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                               ></path>
//                             </svg>
//                             Submitting...
//                           </>
//                         ) : (
//                           <>Submit Report</>
//                         )}
//                       </motion.button>
//                     </div>
//                   </form>
//                 </div>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default FeedbackAndReview

import { useState, useRef, useEffect } from "react"
import { FaStar, FaExclamationCircle, FaRegCommentDots, FaTimes, FaPaperclip, FaHistory, FaFilter, FaSearch } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { toast, Toaster } from "react-hot-toast"
import Header from "../components/Common/Header"

const FeedbackAndReview = () => {
  // State for feedback system
  const [feedbacks, setFeedbacks] = useState([])
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [feedbackTitle, setFeedbackTitle] = useState("")
  const [feedbackType, setFeedbackType] = useState("general")
  
  // State for issue reporting
  const [reportedContent, setReportedContent] = useState("")
  const [reportCategory, setReportCategory] = useState("")
  const [reportTitle, setReportTitle] = useState("")
  const [attachments, setAttachments] = useState([])
  const [priority, setPriority] = useState("medium")
  
  // UI state
  const [activeModal, setActiveModal] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("feedback") // 'feedback' or 'reports'
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all") // 'all', 'feature', 'bug', 'complaint'
  const [sortBy, setSortBy] = useState("newest")
  
  // User reports history
  const [userReports, setUserReports] = useState([])
  
  const modalRef = useRef(null)
  const fileInputRef = useRef(null)

  
  useEffect(() => {
    const sampleFeedbacks = [
      {
        id: 1,
        title: "Great app experience",
        comment: "I've been using this app for months and it's been fantastic. The interface is intuitive and features are well thought out.",
        rating: 5,
        type: "general",
        date: new Date('2023-05-15').toLocaleDateString(),
        user: "John D."
      },
      {
        id: 2,
        title: "Feature request",
        comment: "It would be great to have dark mode support across all screens. Currently some screens still show bright white backgrounds.",
        rating: 4,
        type: "feature",
        date: new Date('2023-06-02').toLocaleDateString(),
        user: "Sarah M."
      },
      {
        id: 3,
        title: "Bug in settings page",
        comment: "When I try to change my notification preferences, the changes don't save after refreshing the page.",
        rating: 2,
        type: "bug",
        date: new Date('2023-06-10').toLocaleDateString(),
        user: "Alex T."
      }
    ]
    
    const sampleReports = [
      {
        id: 1,
        title: "Unauthorized transaction",
        content: "I noticed a charge on my account that I didn't authorize. Please investigate.",
        category: "Billing Issue",
        status: "resolved",
        priority: "high",
        date: new Date('2023-05-20').toLocaleDateString(),
        response: "We've refunded the unauthorized charge and secured your account."
      },
      {
        id: 2,
        title: "App crashing on launch",
        content: "After the latest update, the app crashes immediately when I try to open it.",
        category: "Technical Issue",
        status: "in-progress",
        priority: "high",
        date: new Date('2023-06-05').toLocaleDateString(),
        response: "Our team is working on a fix. Try clearing your app cache in the meantime."
      }
    ]
    
    setFeedbacks(sampleFeedbacks)
    setUserReports(sampleReports)
  }, [])

  // Modal handlers
  const openModal = (modalType) => {
    setActiveModal(modalType)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setActiveModal(null)
    document.body.style.overflow = "auto"
    setAttachments([])
  }

  // Feedback handlers
  const handleRatingClick = (value) => {
    setRating(value)
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + attachments.length > 3) {
      toast.error("You can upload a maximum of 3 files")
      return
    }
    
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf']
      const isSizeValid = file.size <= 5 * 1024 * 1024 // 5MB
      
      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name} has an invalid file type (only JPG, PNG, PDF allowed)`)
        return false
      }
      if (!isSizeValid) {
        toast.error(`${file.name} is too large (max 5MB)`)
        return false
      }
      return true
    })
    
    setAttachments([...attachments, ...validFiles])
  }

  const removeAttachment = (index) => {
    const newAttachments = [...attachments]
    newAttachments.splice(index, 1)
    setAttachments(newAttachments)
  }

  const handleFeedbackSubmit = (e) => {
    e.preventDefault()

    if (rating === 0 && feedbackType !== "feature") {
      toast.error("Please select a rating")
      return
    }

    if (feedbackTitle.trim() === "") {
      toast.error("Please enter a title")
      return
    }

    if (comment.trim() === "") {
      toast.error("Please enter your feedback")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newFeedback = {
        id: Date.now(),
        title: feedbackTitle,
        comment,
        rating,
        type: feedbackType,
        date: new Date().toLocaleDateString(),
        user: "You", // In a real app, this would be the logged in user
        attachments: attachments.map(file => file.name)
      }

      setFeedbacks([newFeedback, ...feedbacks])
      setComment("")
      setFeedbackTitle("")
      setRating(0)
      setFeedbackType("general")
      setAttachments([])
      setIsSubmitting(false)
      closeModal()
      toast.success("Feedback submitted successfully!")
    }, 800)
  }

  const handleReportSubmit = (e) => {
    e.preventDefault()

    if (reportTitle.trim() === "") {
      toast.error("Please enter a title for your report")
      return
    }

    if (reportCategory.trim() === "") {
      toast.error("Please select a category")
      return
    }

    if (reportedContent.trim() === "") {
      toast.error("Please describe the issue")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        title: reportTitle,
        content: reportedContent,
        category: reportCategory,
        priority,
        status: "submitted",
        date: new Date().toLocaleDateString(),
        attachments: attachments.map(file => file.name),
        response: ""
      }

      setUserReports([newReport, ...userReports])
      setReportedContent("")
      setReportCategory("")
      setReportTitle("")
      setPriority("medium")
      setAttachments([])
      setIsSubmitting(false)
      closeModal()
      toast.success("Issue reported successfully!")
      setActiveTab("reports") // Switch to reports tab to see the new submission
    }, 800)
  }

  // Filter and sort functions
  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         feedback.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || feedback.type === filter
    return matchesSearch && matchesFilter
  })

  const sortedFeedbacks = [...filteredFeedbacks].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date)
    } else if (sortBy === "highest") {
      return b.rating - a.rating
    } else {
      return a.rating - b.rating
    }
  })

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  }

  const cardVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.98 },
  }

  // Data options
  const feedbackTypes = [
    { value: "general", label: "General Feedback" },
    { value: "feature", label: "Feature Request" },
    { value: "bug", label: "Bug Report" },
    { value: "complaint", label: "Complaint" }
  ]

  const reportCategories = [
    "Technical Issue", 
    "Content Problem", 
    "User Behavior", 
    "Billing Issue", 
    "Security Concern",
    "Other"
  ]

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "critical", label: "Critical" }
  ]

  const statusColors = {
    submitted: "bg-blue-500",
    "in-progress": "bg-yellow-500",
    resolved: "bg-green-500",
    rejected: "bg-red-500"
  }

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 min-h-screen scroll-hidden">
      <Header title={"Feedback & Issues"} />
      <Toaster/>
      <motion.div  
         initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 text-center p-5">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Feedback & Issue Center
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Share your experience, suggest improvements, or report issues to help us serve you better
        </p>
      </div>

      {/* Option Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-5">
        <motion.div
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => openModal("feedback")}
          className="bg-gradient-to-br from-blue-900/40 to-blue-700/20 backdrop-blur-sm rounded-xl p-6 cursor-pointer border border-blue-600/30 shadow-lg hover:shadow-blue-500/10 transition-all"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
              <FaRegCommentDots className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold">Share Your Feedback</h3>
            <p className="text-gray-300">Rate your experience, suggest features, or report bugs</p>
            <motion.button
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Give Feedback
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => openModal("report")}
          className="bg-gradient-to-br from-red-900/40 to-red-700/20 backdrop-blur-sm rounded-xl p-6 cursor-pointer border border-red-600/30 shadow-lg hover:shadow-red-500/10 transition-all"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
              <FaExclamationCircle className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-bold">Report an Issue</h3>
            <p className="text-gray-300">Encountered a problem? Report it to our support team</p>
            <motion.button
              className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Report Issue
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Tabs for Feedback and Reports */}
      <div className="max-w-6xl mx-auto mb-6 px-5">
        <div className="flex border-b border-gray-700">
          <button
            className={`py-3 px-6 font-medium text-sm flex items-center ${activeTab === "feedback" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
            onClick={() => setActiveTab("feedback")}
          >
            <FaRegCommentDots className="mr-2" />
            Feedback ({feedbacks.length})
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm flex items-center ${activeTab === "reports" ? "text-red-400 border-b-2 border-red-400" : "text-gray-400 hover:text-white"}`}
            onClick={() => setActiveTab("reports")}
          >
            <FaExclamationCircle className="mr-2" />
            My Reports ({userReports.length})
          </button>
        </div>
      </div>

      {/* Feedback List Section */}
      {activeTab === "feedback" && (
        <div className="max-w-6xl mx-auto mb-12 px-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="w-10 h-1 bg-blue-500 rounded-full mr-3"></span>
              Community Feedback
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search feedback..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <div className="relative">
                  <select
                    className="appearance-none pl-3 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="general">General</option>
                    <option value="feature">Feature Requests</option>
                    <option value="bug">Bug Reports</option>
                    <option value="complaint">Complaints</option>
                  </select>
                  <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select
                    className="appearance-none pl-3 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                  </select>
                  <FaHistory className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {sortedFeedbacks.length > 0 ? (
            <div className="space-y-4">
              {sortedFeedbacks.map((feedback) => (
                <motion.div
                  key={feedback.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-blue-500/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs rounded mr-3 ${
                        feedback.type === "feature" ? "bg-green-900/50 text-green-400" :
                        feedback.type === "bug" ? "bg-red-900/50 text-red-400" :
                        feedback.type === "complaint" ? "bg-yellow-900/50 text-yellow-400" :
                        "bg-blue-900/50 text-blue-400"
                      }`}>
                        {feedbackTypes.find(t => t.value === feedback.type)?.label || feedback.type}
                      </span>
                      <h3 className="font-medium text-white">{feedback.title}</h3>
                    </div>
                    <span className="text-xs text-gray-400">{feedback.date}</span>
                  </div>
                  
                  {feedback.rating > 0 && (
                    <div className="flex items-center mb-2">
                      <div className="flex space-x-1 mr-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`w-4 h-4 ${star <= feedback.rating ? "text-yellow-400" : "text-gray-600"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">{feedback.rating}/5</span>
                    </div>
                  )}
                  
                  <p className="text-gray-200 mb-3">{feedback.comment}</p>
                  
                  {feedback.attachments && feedback.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {feedback.attachments.map((file, index) => (
                        <span key={index} className="text-xs bg-gray-700/50 px-2 py-1 rounded flex items-center">
                          <FaPaperclip className="mr-1 text-gray-400" />
                          {file}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Posted by {feedback.user}</span>
                    <button className="text-blue-400 hover:text-blue-300 text-sm">
                      Reply
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-400">No feedback found matching your criteria</p>
              <button 
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium"
                onClick={() => {
                  setSearchTerm("")
                  setFilter("all")
                  setSortBy("newest")
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Reports List Section */}
      {activeTab === "reports" && (
        <div className="max-w-6xl mx-auto mb-12 px-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="w-10 h-1 bg-red-500 rounded-full mr-3"></span>
              My Reported Issues
            </h2>
            
            <div className="flex gap-3 mt-4 md:mt-0">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {userReports.length > 0 ? (
            <div className="space-y-4">
              {userReports.map((report) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-red-500/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs rounded mr-3 ${statusColors[report.status] || "bg-gray-700"}`}>
                        {report.status.replace("-", " ")}
                      </span>
                      <h3 className="font-medium text-white">{report.title}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        report.priority === "high" || report.priority === "critical" ? "bg-red-900/50 text-red-400" :
                        report.priority === "medium" ? "bg-yellow-900/50 text-yellow-400" :
                        "bg-green-900/50 text-green-400"
                      }`}>
                        {report.priority} priority
                      </span>
                      <span className="text-xs text-gray-400">{report.date}</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-300 mb-1"><span className="font-medium">Category:</span> {report.category}</p>
                    <p className="text-gray-200">{report.content}</p>
                  </div>
                  
                  {report.attachments && report.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {report.attachments.map((file, index) => (
                        <span key={index} className="text-xs bg-gray-700/50 px-2 py-1 rounded flex items-center">
                          <FaPaperclip className="mr-1 text-gray-400" />
                          {file}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {report.response && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <h4 className="text-sm font-medium text-green-400 mb-1">Admin Response:</h4>
                      <p className="text-gray-300 text-sm">{report.response}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-end mt-3">
                    <button className="text-red-400 hover:text-red-300 text-sm">
                      Update Status
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-400">You haven't submitted any reports yet</p>
              <button 
                className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium"
                onClick={() => openModal("report")}
              >
                Report an Issue
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      
      <AnimatePresence>
  {activeModal && (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={closeModal}
    >
      {/* Feedback Modal */}
      {activeModal === "feedback" && (
        <motion.div
          ref={modalRef}
          className="h-full w-full md:max-w-[50vw]  bg-gradient-to-b from-gray-800 to-gray-900 border-l border-blue-900/50 shadow-2xl overflow-hidden"
          variants={{
            hidden: { x: "100%", opacity: 0 },
            visible: { 
              x: 0, 
              opacity: 1,
              transition: {
                type: "spring",
                damping: 30,
                stiffness: 400
              }
            },
            exit: {
              x: "100%",
              opacity: 0,
              transition: {
                duration: 0.2
              }
            }
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-gray-800/90 backdrop-blur-sm p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Share Your Feedback</h3>
              <button 
                onClick={closeModal} 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 scroll-hidden">
              <form onSubmit={handleFeedbackSubmit}>
              <div className="mb-4">
                <label htmlFor="feedbackTitle" className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  id="feedbackTitle"
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Brief summary of your feedback"
                  value={feedbackTitle}
                  onChange={(e) => setFeedbackTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Feedback Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFeedbackType(type.value)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        feedbackType === type.value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {feedbackType !== "feature" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    How would you rate your experience?
                  </label>
                  <div className="flex space-x-2 items-center">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <motion.button
                        key={value}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRatingClick(value)}
                        className="focus:outline-none"
                      >
                        <FaStar
                          className={`w-6 h-6 ${
                            value <= rating ? "text-yellow-400" : "text-gray-600"
                          } transition-colors`}
                        />
                      </motion.button>
                    ))}
                    {rating > 0 && <span className="ml-2 text-gray-300 text-sm">{rating}/5</span>}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Feedback
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={
                    feedbackType === "feature" 
                      ? "Describe the feature you'd like to see..." 
                      : "Tell us about your experience..."
                  }
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Attachments (optional)
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="w-full py-6 flex flex-col items-center justify-center bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <FaPaperclip className="w-5 h-5 text-gray-400 mb-2" />
                    <p className="text-gray-300 text-sm">Click to upload files</p>
                    <p className="text-gray-500 text-xs mt-1">JPG, PNG, PDF (max 5MB each)</p>
                  </button>
                  
                  {attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700/50 p-2 rounded">
                          <div className="flex items-center">
                            <FaPaperclip className="text-gray-400 mr-2" />
                            <span className="text-gray-300 text-sm truncate max-w-[180px]">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                      <p className="text-gray-500 text-xs mt-2">
                        {attachments.length}/3 files attached ({Math.round(attachments.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024)}MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
              </form>
            </div>

            {/* Sticky Footer */}
            <div className="sticky bottom-0 bg-gray-800/90 backdrop-blur-sm p-4 border-t border-gray-700">
              <div className="flex justify-end">
                <motion.button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 mr-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isSubmitting}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  onClick={handleFeedbackSubmit}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Issue Report Modal */}
      {activeModal === "report" && (
        <motion.div
          ref={modalRef}
          className="h-full w-full md:max-w-[50vw]  bg-gradient-to-b from-gray-800 to-gray-900 border-l border-red-900/50 shadow-2xl overflow-hidden"
          variants={{
            hidden: { x: "100%", opacity: 0 },
            visible: { 
              x: 0, 
              opacity: 1,
              transition: {
                type: "spring",
                damping: 30,
                stiffness: 400
              }
            },
            exit: {
              x: "100%",
              opacity: 0,
              transition: {
                duration: 0.2
              }
            }
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-gray-800/90 backdrop-blur-sm p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Report an Issue</h3>
              <button 
                onClick={closeModal} 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 scroll-hidden">
              <form onSubmit={handleReportSubmit}>
                <div className="mb-4">
                  <label htmlFor="reportTitle" className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    id="reportTitle"
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Brief summary of the issue"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Issue Category
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-gray-700/90 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    value={reportCategory}
                    onChange={(e) => setReportCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {reportCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Priority
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {priorityOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setPriority(option.value)}
                        className={`px-3 py-2 rounded-lg text-sm ${
                          priority === option.value
                            ? option.value === "critical" ? "bg-red-600 text-white" :
                              option.value === "high" ? "bg-red-600/80 text-white" :
                              option.value === "medium" ? "bg-yellow-600 text-white" :
                              "bg-green-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="reportedContent" className="block text-sm font-medium text-gray-300 mb-2">
                    Describe the Issue
                  </label>
                  <textarea
                    id="reportedContent"
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Please provide detailed information about the issue..."
                    value={reportedContent}
                    onChange={(e) => setReportedContent(e.target.value)}
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Attachments (optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      multiple
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="w-full py-6 flex flex-col items-center justify-center bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <FaPaperclip className="w-5 h-5 text-gray-400 mb-2" />
                      <p className="text-gray-300 text-sm">Click to upload files</p>
                      <p className="text-gray-500 text-xs mt-1">JPG, PNG, PDF (max 5MB each)</p>
                    </button>
                    
                    {attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-700/50 p-2 rounded">
                            <div className="flex items-center">
                              <FaPaperclip className="text-gray-400 mr-2" />
                              <span className="text-gray-300 text-sm truncate max-w-[180px]">{file.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="text-gray-400 hover:text-red-400"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ))}
                        <p className="text-gray-500 text-xs mt-2">
                          {attachments.length}/3 files attached ({Math.round(attachments.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024)}MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Sticky Footer */}
            <div className="sticky bottom-0 bg-gray-800/90 backdrop-blur-sm p-4 border-t border-gray-700">
              <div className="flex justify-end">
                <motion.button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 mr-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isSubmitting}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  onClick={handleReportSubmit}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )}
</AnimatePresence>
</motion.div>
    </div>
  )
}

export default FeedbackAndReview
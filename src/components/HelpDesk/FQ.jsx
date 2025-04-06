import React from 'react'

import { FaStar, FaExclamationCircle, FaRegCommentDots } from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster,toast } from 'react-hot-toast';
import Header from '../Common/Header';



const FeedbackandReview = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratings, setRatings] = useState({ employer: 0, jobPost: 0 });
  const [comment, setComment] = useState('');
  const [reportedContent, setReportedContent] = useState('');

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      const newFeedback = {
        id: Date.now(),
        comment,
        rating: ratings.employer, 
        type: 'employer', 
      };
      setFeedbacks([newFeedback, ...feedbacks]);
      setComment('');
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (reportedContent.trim() !== '') {
      toast.success("Reported Successfully");
      setReportedContent('');
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
      <Header title={"Feedback & Review"} />
      <Toaster/>
      < motion.section className="bg-gray-900 p-6 rounded-lg shadow-md mb-6"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}>
        <h3 className="text-xl font-semibold mb-4">Leave a Feedback</h3>
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          <div className="flex items-center">
            {/* <span className="text-gray-500 mr-4">Rating:</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <FaStar
                  key={value}
                  className={`cursor-pointer ${ratings.employer >= value ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => setRatings((prev) => ({ ...prev, employer: value }))}
                />
              ))}
            </div> */}
          </div>
          <textarea
            className="w-full p-3 border rounded-md bg-gray-900 text-white"
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)} />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Submit Feedback </button>
        </form>
      </motion.section>

      <motion.section className="bg-gray-900 p-6 rounded-lg shadow-md mb-6"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}>
        <h3 className="text-xl font-semibold mb-4">Recent Feedback</h3>
        <ul className="space-y-4 ">
          {feedbacks.map((feedback) => (
            <li key={feedback.id} className="flex items-start space-x-3">
              <div className="flex space-x-1">
                {[...Array(feedback.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <div>
                <p className="text-gray-300">{feedback.comment}</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section className="bg-gray-900 p-6 rounded-lg shadow-md"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}>
        <h3 className="text-xl font-semibold mb-4">Report Content</h3>
        <form onSubmit={handleReportSubmit} className="space-y-4">
          <div className="flex items-center">
            <FaExclamationCircle className="text-red-500 mr-2" />
            <input
              type="text"
              placeholder="Describe the issue..."
              className="w-full p-3 border rounded-md text-white bg-gray-900 "
              value={reportedContent}
              onChange={(e) => setReportedContent(e.target.value)} />
          </div>
          <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded-lg">
            Report Issue
          </button>
        </form>
      </motion.section>
       
      </div>
  )
}

export default FeedbackandReview
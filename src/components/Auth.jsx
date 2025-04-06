

import { useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { motion } from "framer-motion"

import { Routes, Route, useNavigate } from "react-router-dom"
import OverviewRecruit from "../Pages/Overviewrecruit"
import RecruiterSidebar from "./Recrutiersidebar"
import Recruit from "../Pages/Recruit"
import Jobopening from "../Pages/Jobopening"
import Candidate from "../Pages/Candidate search"
import pointSound from "/blip.mp3"
import ResumeSearch from "../Pages/Resume"
import BuySubscription from "../Pages/BuySubscription"
import Template from "../Pages/Template"

import Askedquestion from "./HelpDesk/Askedquestion"
import SupportChat from "./HelpDesk/SupportChat"
import Profile from "./Profile/Profile"
import Notification from "./Notification/Notification"
import Settings from "../Pages/Settings"
import Logout from "../Pages/Logout"
import RecruiterChat from "../Pages/RecruiterChat"
import SubAdmin from "../Pages/SubAdmin"
import Payment from "../Pages/Payment"
import HRM from "../Pages/HRM"
import FeedbackandReview from "./HelpDesk/FQ"


function Auth() {
  const [currentPage, setCurrentPage] = useState("login")
  const [userDetails, setUserDetails] = useState({ username: "", role: "" })

  const playPointSound = () => {
    const audio = new Audio(pointSound)
    audio.play()
  }

  const users = {
    "r@gmail.com": { password: "123", role: "recruiter" },
  }

  const handleLogin = (email, password) => {
    if (users[email] && users[email].password === password) {
      setUserDetails({ username: email, role: users[email].role })
      setCurrentPage("recruiterDashboard")
      toast.success("Welcome to the Recruiter Dashboard.")
    } else {
      toast.error("Invalid Credentials")
      playPointSound()
    }
  }

  const handleLogout = () => {
    setCurrentPage("login")
    toast.success("You have been logged out.")
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Toaster />
      {currentPage === "login" && <LoginPage onLogin={handleLogin} />}
      {currentPage === "recruiterDashboard" && <RecruiterDashboard userDetails={userDetails} onLogout={handleLogout} />}
    </div>
  )
}

function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(username, password)
    navigate("/")
    setUsername("")
    setPassword("")
  }

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault()

    if (signupEmail === "") {
      toast.error("Email field cannot be empty.", {
        style: {
          background: "#f8d7da",
        },
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(signupEmail)) {
      toast.error("Invalid email format.")
      return
    }

    // If validation passes, send the OTP
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("OTP sent successfully!")
          setOtpSent(true)
          setOtp("")
        }, 2000)
      }),
      {
        loading: "Sending OTP...",
        success: "OTP sent successfully!",
        error: "Failed to send OTP.",
      },
    )
    setSignupEmail("")
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    if (otp === "1234") {
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("OTP verified successfully!")
            setIsOtpVerified(true)
            setOtp("")
          }, 2000)
        }),
        {
          loading: "Verifying OTP...",
          success: "OTP verified successfully!",
          error: "Invalid OTP!",
        },
      )
      setNewPassword("")
      setConfirmPassword("")
    } else {
      toast.error("Invalid OTP!")
      playPointSound() // Play beep sound
    }
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.")
    } else if (newPassword !== confirmPassword) {
      setPasswordError("Password does not match. Please try again.")
    } else {
      setPasswordError("")
      toast.success("Password reset successfully!")
      setIsLogin(true) // Redirect to login
      setOtpSent(false)
      setIsOtpVerified(false)
    }
  }

  return (
    <div className="flex w-4/5 h-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="hidden md:block w-4/6 relative bg-gray-800">
        <video className="w-full h-full object-cover" autoPlay loop muted playsInline preload="auto">
          <source src="https://videos.pexels.com/video-files/1390942/1390942-sd_960_506_24fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8">
        {isLogin ? (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="md:text-2xl :text-xl font-bold text-center mb-6 ">Recruiter Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
              >
                Login
              </button>
            </form>
            <div className="text-center mt-4">
              <button onClick={() => setIsLogin(false)} className="text-purple-600 hover:underline">
                Forgot Password?
              </button>
              <div className="mt-2">
                <a href="https://static-page-0011.netlify.app/" className="text-purple-600 hover:underline">
                  Sign Up
                </a>
              </div>
            </div>
          </motion.div>
        ) : otpSent ? (
          isOtpVerified ? (
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-2xl font-bold text-center mb-6">Create New Password</h2>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                >
                  Submit
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-2xl font-bold text-center mb-6">Enter OTP</h2>
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700">OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the OTP"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                >
                  Verify OTP
                </button>
              </form>
            </motion.div>
          )
        ) : (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-gray-700 text-center">
                  In order to retrieve your password, please enter <br />
                  registered email ID
                </label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
              >
                Send OTP
              </button>
            </form>
            <div className="text-center mt-4">
              <button onClick={() => setIsLogin(true)} className="text-purple-600 hover:underline">
                Back to Login
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function RecruiterDashboard({ onLogout }) {
  return (
    <div className="flex bg-gray-900 text-gray-100 overflow-hidden w-full h-full">
      <RecruiterSidebar />
      <Routes>
        <Route path="/" element={<OverviewRecruit />} />
        <Route path="/recruit" element={<Recruit/>}/>
        <Route path="/job-opening" element={<Jobopening/>} />
        <Route path="/candidate" element={<Candidate/>} />
        <Route path="/jobopening" element={<Jobopening />} />
        
        <Route path="/resume" element={<ResumeSearch/>} />
        <Route path="/buysubscription" element={<BuySubscription />} />
        <Route path="/template" element={<Template/>} />
        
        <Route path="/helpdesk/feedback" element={<FeedbackandReview/>} />
        <Route path="/helpdesk/faq" element={<Askedquestion />} />
        <Route path="/helpdesk/support-chat" element={<SupportChat />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/hrm" element={<HRM />} />
        <Route path="/subadmin" element={<SubAdmin/>} />
        <Route path="/chat" element={<RecruiterChat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout onLogout={onLogout} />} />
      </Routes>
    </div>
  )
}

export default Auth


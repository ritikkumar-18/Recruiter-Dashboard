import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Smile, Paperclip, Send, Trash2, ImageIcon, X } from "lucide-react"

import { Toaster, toast } from "react-hot-toast"
import EmojiPicker from "emoji-picker-react"
import Header from "../Common/Header"


const SupportChat = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isWaitingForReply, setIsWaitingForReply] = useState(false)
  const [isSupportTyping, setIsSupportTyping] = useState(false)
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false)
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const chatContainerRef = useRef(null)

  // Send a message
  const sendMessage = () => {
    if (newMessage.trim() === "") return

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: "recruiter",
      timestamp: new Date().toLocaleTimeString(),
      status: "sent", // Initial status
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
    setIsWaitingForReply(true)

    // Close emoji picker if open
    if (emojiPickerOpen) setEmojiPickerOpen(false)

    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, status: "delivered" } : msg)))
    }, 1000)

    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, status: "read" } : msg)))
      toast.success("Message read!", {
        icon: "✓✓",
        position: "bottom-right",
      })
    }, 2000)

    // Simulate support typing and reply
    setIsSupportTyping(true)
    setTimeout(() => {
      const supportReply = {
        id: Date.now() + 1,
        text: "Thank you for your message. Our support team will get back to you shortly.",
        sender: "support",
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, supportReply])
      setIsWaitingForReply(false)
      setIsSupportTyping(false)
      toast.success("New message received", {
        position: "bottom-right",
      })
    }, 3000)
  }

  // Handle attachment
  const handleAttachment = (type) => {
    const attachmentMessage = {
      id: Date.now(),
      text: `[${type} attachment]`,
      sender: "recruiter",
      timestamp: new Date().toLocaleTimeString(),
      status: "sent",
    }
    setMessages((prev) => [...prev, attachmentMessage])
    setAttachmentMenuOpen(false)
    toast.success(`${type} attached successfully!`, {
      position: "bottom-right",
    })
  }

  // Clear chat with custom confirmation modal
  const clearChat = () => {
    setShowConfirmModal(true)
  }

  const confirmClearChat = () => {
    setMessages([])
    setIsWaitingForReply(false)
    setIsSupportTyping(false)
    setShowConfirmModal(false)
    toast.success("Chat history cleared", {
      icon: "🗑️",
      position: "bottom-right",
    })
  }

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  // Add emoji to the message
  const addEmoji = (emoji) => {
    setNewMessage((prev) => prev + emoji.emoji)
  }

  // Handle click outside emoji picker to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerOpen && !event.target.closest(".emoji-picker-container")) {
        setEmojiPickerOpen(false)
      }
      if (attachmentMenuOpen && !event.target.closest(".attachment-menu-container")) {
        setAttachmentMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [emojiPickerOpen, attachmentMenuOpen])

  return (
    <div className="flex flex-col h-screen md:w-full bg-gray-900 text-white">
      <Header title={"Support Chat"} />
      <Toaster />
      

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 w-full max-w-7xl  scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p className="text-xl mb-2">No messages yet</p>
              <p className="text-sm">Start a conversation with our support team</p>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.sender === "recruiter" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] sm:max-w-[70%] p-4 rounded-lg ${
                msg.sender === "recruiter"
                  ? "bg-green-700 text-white rounded-tr-none"
                  : "bg-gray-700 text-gray-300 rounded-tl-none"
              }`}
            >
              <p className="break-words">{msg.text}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-100">{msg.timestamp}</span>
                {msg.sender === "recruiter" && (
                  <span className="text-xs text-gray-400 ml-2">
                    {msg.status === "sent" && "✓"}
                    {msg.status === "delivered" && "✓✓"}
                    {msg.status === "read" && <span className="text-teal-400">✓✓</span>}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        <AnimatePresence>
          {isSupportTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gray-700 p-4 rounded-lg rounded-tl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Message Input (Fixed at the Bottom) */}
      <div className="sticky bottom-0 bg-gray-800 p-4 border-t border-gray-700">
        <div className="max-w-7xl mx-auto w-full flex items-end space-x-2 sm:space-x-4">
          {/* Attachment Menu */}
          <div className="relative attachment-menu-container">
            <button
              onClick={() => setAttachmentMenuOpen(!attachmentMenuOpen)}
              className="md:p-2 sm:p-0 hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Add attachment"
            >
              <Paperclip className="md:w-5 md:h-5 sm:w-5 sm:h-5 text-gray-400" />
            </button>

            {attachmentMenuOpen && (
              <div className="absolute bottom-12 left-0 bg-gray-800 rounded-lg shadow-lg p-2 border border-gray-700 z-10 w-40">
                <button
                  onClick={() => handleAttachment("image")}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded w-full"
                >
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                  <span>Image</span>
                </button>
                <button
                  onClick={() => handleAttachment("file")}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded w-full"
                >
                  <Paperclip className="w-5 h-5 text-gray-400" />
                  <span>File</span>
                </button>
              </div>
            )}
          </div>

          {/* Emoji Picker */}
          <div className="relative emoji-picker-container ">
            <button
              onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
              className="p-2 sm:p-0 hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Add emoji"
            >
              <Smile className="md:w-5 md:h-5 sm:w-5 sm:h-5 text-gray-400" />
            </button>

            {emojiPickerOpen && (
              <div className="absolute bottom-12 left-0 z-10">
                <EmojiPicker onEmojiClick={addEmoji}  />
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="w-full p-2 sm:p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
              disabled={isWaitingForReply}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={sendMessage}
            disabled={isWaitingForReply || newMessage.trim() === ""}
            className="md:px-4 md:py-3 sm:px-2 sm:py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="w-10 h-6 sm:w-5 sm:h-5" />
          </button>

          {/* Clear Chat Button */}
          <button
            onClick={clearChat}
            className="md:px-4 md:py-3 sm:px-2 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            aria-label="Clear chat"
          >
            <Trash2 className="w-10 h-6 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-lg p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Clear Chat History</h3>
              <button onClick={() => setShowConfirmModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="mb-6">Are you sure you want to clear all chat messages? This action cannot be undone.</p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearChat}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
              >
                Clear Chat
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
    </div>
  )
}

export default SupportChat


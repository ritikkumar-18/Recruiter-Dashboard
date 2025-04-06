import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  BiSearch, 
  BiDotsVerticalRounded, 
  BiMicrophone, 
  BiSmile, 
  BiPaperclip, 
  BiSend, 
  BiArrowBack,
  BiFilter
} from 'react-icons/bi';
import { IoCall, IoVideocam } from 'react-icons/io5';
import { BsCheck, BsCheckAll, BsImage, BsFileEarmark, BsCamera } from 'react-icons/bs';
import { RiChatNewLine } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';
import EmojiPicker from "emoji-picker-react";

const RecruiterChat = () => {
  // Sample contacts data
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      lastMessage: "When can we schedule the interview?",
      time: "10:30 AM",
      unread: 2,
      online: true,
      status: "Active now",
      role: "Senior Developer",
      company: "Tech Corp"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      lastMessage: "I sent you the resume as requested",
      time: "Yesterday",
      unread: 0,
      online: true,
      status: "Online",
      role: "UX Designer",
      company: "Design Studio"
    },
    {
      id: 3,
      name: "Michael Brown",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      lastMessage: "Thanks for the opportunity",
      time: "Yesterday",
      unread: 0,
      online: false,
      status: "Last seen today at 12:45 PM",
      role: "Product Manager",
      company: "Innovate Inc"
    },
  ]);

  // Sample messages data
  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        text: "Hello, I saw your job posting for the Senior Developer position",
        time: "10:00 AM",
        sender: "them",
        status: "read",
      },
      {
        id: 2,
        text: "I have 5 years of experience with React and Node.js",
        time: "10:01 AM",
        sender: "them",
        status: "read",
      },
      {
        id: 3,
        text: "Hi John, thanks for reaching out! Your experience sounds great.",
        time: "10:15 AM",
        sender: "me",
        status: "read",
      },
    ],
    2: [
      {
        id: 1,
        text: "Hello, I am interested in the UX Designer position",
        time: "Yesterday",
        sender: "them",
        status: "read",
      },
      {
        id: 2,
        text: "I have attached my portfolio for your review",
        time: "Yesterday",
        sender: "them",
        status: "read",
        file: { name: "portfolio.pdf", size: "2.3 MB" },
      },
    ],
  });

  // UI state
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showChatList, setShowChatList] = useState(true);
  const [showContactMenu, setShowContactMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mutedContacts, setMutedContacts] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [isVideoCalling, setIsVideoCalling] = useState(false);

  const messagesEndRef = useRef(null);
  const menuRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, selectedContact]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowContactMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter contacts based on search term and active tab
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "unread") return matchesSearch && contact.unread > 0;
    return matchesSearch;
  });

  // Send a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "me",
      status: "sent",
    };

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg],
    }));

    setContacts(prev =>
      prev.map(contact =>
        contact.id === selectedContact.id 
          ? { ...contact, lastMessage: newMessage, time: "Just now" } 
          : contact
      )
    );

    setNewMessage("");
    setShowEmojiPicker(false);
    setShowAttachments(false);

    // Auto-response after 1-3 seconds
    setTimeout(() => {
      const responses = [
        "Thanks for your message!",
        "I'll get back to you soon.",
        "We're reviewing your application.",
        "Can we schedule a call to discuss this further?",
        "Your qualifications look impressive!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const autoResponse = {
        id: Date.now(),
        text: randomResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sender: "them",
        status: "delivered",
      };

      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: [...(prev[selectedContact.id] || []), autoResponse],
      }));

      setContacts(prev =>
        prev.map(contact =>
          contact.id === selectedContact.id 
            ? { ...contact, lastMessage: randomResponse, time: "Just now" } 
            : contact
        )
      );
    }, 1000 + Math.random() * 2000);
  };

  // Select a contact
  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    if (contact.unread > 0) {
      setContacts(prev => 
        prev.map(c => c.id === contact.id ? { ...c, unread: 0 } : c)
      );
    }
    if (isMobile) setShowChatList(false);
    setShowContactMenu(false);
  };

  // Handle key press in input
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render message status icon
  const renderMessageStatus = (status) => {
    switch (status) {
      case "sent": return <BsCheck className="text-gray-400" />;
      case "delivered": return <BsCheckAll className="text-gray-400" />;
      case "read": return <BsCheckAll className="text-blue-500" />;
      default: return null;
    }
  };

  // Handle emoji click
  const handleEmojiClick = (emojiData) => {
    setNewMessage(prev => prev + emojiData.emoji);
    inputRef.current.focus();
  };

  // Handle voice recording
  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In a real app, you would send the recorded audio here
    const newMsg = {
      id: Date.now(),
      text: "Voice message",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "me",
      status: "sent",
      isVoiceMessage: true
    };

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg],
    }));

    setContacts(prev =>
      prev.map(contact =>
        contact.id === selectedContact.id 
          ? { ...contact, lastMessage: "Voice message", time: "Just now" } 
          : contact
      )
    );
  };

  // Handle call functions
  const handleCall = () => {
    setIsCalling(true);
  };

  const handleVideoCall = () => {
    setIsVideoCalling(true);
  };

  const endCall = () => {
    setIsCalling(false);
    setIsVideoCalling(false);
  };

  // Handle attachment functions
  const handleImageUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const newMsg = {
          id: Date.now(),
          text: "",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sender: "me",
          status: "sent",
          file: { name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`, type: "image" }
        };

        setMessages(prev => ({
          ...prev,
          [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg],
        }));

        setContacts(prev =>
          prev.map(contact =>
            contact.id === selectedContact.id 
              ? { ...contact, lastMessage: "Image", time: "Just now" } 
              : contact
          )
        );
      }
    };
    fileInput.click();
  };

  const handleDocumentUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const newMsg = {
          id: Date.now(),
          text: "",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sender: "me",
          status: "sent",
          file: { name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`, type: "document" }
        };

        setMessages(prev => ({
          ...prev,
          [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg],
        }));

        setContacts(prev =>
          prev.map(contact =>
            contact.id === selectedContact.id 
              ? { ...contact, lastMessage: "Document", time: "Just now" } 
              : contact
          )
        );
      }
    };
    fileInput.click();
  };

  const handleCamera = () => {
    // In a real app, this would access the device camera
    alert("Camera functionality would be implemented here");
  };

  // Handle contact menu functions
  const handleViewProfile = () => {
    setShowProfileModal(true);
    setShowContactMenu(false);
  };

  const handleMuteNotifications = () => {
    if (selectedContact) {
      if (mutedContacts.includes(selectedContact.id)) {
        setMutedContacts(mutedContacts.filter(id => id !== selectedContact.id));
      } else {
        setMutedContacts([...mutedContacts, selectedContact.id]);
      }
    }
    setShowContactMenu(false);
  };

  const handleClearChat = () => {
    if (selectedContact) {
      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: []
      }));
    }
    setShowContactMenu(false);
  };

  const handleDeleteChat = () => {
    if (selectedContact) {
      setMessages(prev => {
        const newMessages = {...prev};
        delete newMessages[selectedContact.id];
        return newMessages;
      });
      setContacts(prev => prev.filter(contact => contact.id !== selectedContact.id));
      setSelectedContact(null);
    }
    setShowContactMenu(false);
  };

  const handleNewChat = () => {
    // In a real app, this would open a contact selector
    alert("New chat functionality would be implemented here");
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Recruiter Chat</h1>
      </header>
      
      <motion.div 
        className="flex flex-1 overflow-hidden p-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Sidebar - Contacts List */}
        {(showChatList || !isMobile) && (
          <div className=" md:w-96 sm:w-80 bg-gray-800 border-r border-gray-700 flex flex-col h-full">
            {/* User Profile Header */}
            <div className="p-3 bg-gray-800 flex justify-between items-center border-b border-gray-700">
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/men/10.jpg" 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
             
            </div>

            {/* Search */}
            <div className="p-3 bg-gray-800 border-b border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search or start new chat"
                  className="w-full bg-gray-700 text-white py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700 bg-gray-800">
              <button
                className={`flex-1 py-3 text-sm font-medium ${activeTab === "all" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400"}`}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>
              <button
                className={`flex-1 py-3 text-sm font-medium ${activeTab === "unread" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400"}`}
                onClick={() => setActiveTab("unread")}
              >
                Unread
              </button>
              
            </div>

            {/* Contacts */}
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <div
                    key={contact.id}
                    className={`flex items-center p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 ${selectedContact?.id === contact.id ? "bg-gray-700" : ""}`}
                    onClick={() => handleSelectContact(contact)}
                  >
                    <div className="relative">
                      <img
                        src={contact.avatar || "/placeholder.svg"}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-800"></span>
                      )}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-white truncate">{contact.name}</h3>
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{contact.time}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                        {contact.unread > 0 && (
                          <span className="ml-2 bg-purple-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                            {contact.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400">No contacts found</div>
              )}
            </div>
          </div>
        )}

        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col h-full ${(!showChatList && isMobile) || !isMobile ? "flex" : "hidden md:flex"}`}>
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-3 bg-gray-800 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center">
                  {isMobile && (
                    <button 
                      className="mr-2 text-gray-400 hover:text-white" 
                      onClick={() => setShowChatList(true)}
                    >
                      <BiArrowBack className="text-xl" />
                    </button>
                  )}
                  <div className="relative">
                    <img
                      src={selectedContact.avatar || "/placeholder.svg"}
                      alt={selectedContact.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {selectedContact.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-800"></span>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-white">{selectedContact.name}</h3>
                    <p className="text-xs text-gray-400">
                      {selectedContact.online ? selectedContact.status : selectedContact.status}
                    </p>
                  </div>
                </div>
                
              </div>

              {/* Messages */}
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 bg-gray-900 bg-opacity-95"
              >
                <div className="space-y-2">
                  {messages[selectedContact.id]?.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${message.sender === "me" ? "bg-purple-600 text-white rounded-tr-none" : "bg-gray-700 text-white rounded-tl-none"}`}
                      >
                        {message.file && (
                          <div className="mb-2 p-2 bg-gray-800 rounded flex items-center">
                            {message.file.type === "image" ? (
                              <BsImage className="text-purple-400 mr-2" />
                            ) : (
                              <BsFileEarmark className="text-purple-400 mr-2" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{message.file.name}</p>
                              <p className="text-xs text-gray-400">{message.file.size}</p>
                            </div>
                          </div>
                        )}
                        {message.isVoiceMessage && (
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                            <span>Voice message</span>
                          </div>
                        )}
                        {message.text && <p className="text-white">{message.text}</p>}
                        <div className="flex items-center justify-end mt-1 space-x-1 text-xs text-gray-300">
                          <span>{message.time}</span>
                          {message.sender === "me" && renderMessageStatus(message.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input */}
              <div className="p-3 bg-gray-800 border-t border-gray-700">
                {showEmojiPicker && (
                  <div className="absolute bottom-20 left-4 z-10">
                    <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
                  </div>
                )}

                {showAttachments && (
                  <div className="flex justify-around p-2 mb-2 bg-gray-700 rounded-lg">
                    <button 
                      className="flex flex-col items-center text-gray-400 hover:text-purple-400"
                      onClick={handleImageUpload}
                    >
                      <div className="bg-purple-900/40 p-2 rounded-full mb-1">
                        <BsImage className="text-lg" />
                      </div>
                      <span className="text-xs">Image</span>
                    </button>
                    <button 
                      className="flex flex-col items-center text-gray-400 hover:text-purple-400"
                      onClick={handleDocumentUpload}
                    >
                      <div className="bg-purple-900/40 p-2 rounded-full mb-1">
                        <BsFileEarmark className="text-lg" />
                      </div>
                      <span className="text-xs">Document</span>
                    </button>
                    <button 
                      className="flex flex-col items-center text-gray-400 hover:text-purple-400"
                      onClick={handleCamera}
                    >
                      <div className="bg-purple-900/40 p-2 rounded-full mb-1">
                        <BsCamera className="text-lg" />
                      </div>
                      <span className="text-xs">Camera</span>
                    </button>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <button
                    className={`text-gray-400 hover:text-purple-400 p-2 ${showEmojiPicker ? "text-purple-400" : ""}`}
                    onClick={() => {
                      setShowEmojiPicker(!showEmojiPicker);
                      setShowAttachments(false);
                    }}
                  >
                    <BiSmile className="text-2xl" />
                  </button>
                  <button
                    className={`text-gray-400 hover:text-purple-400 p-2 ${showAttachments ? "text-purple-400" : ""}`}
                    onClick={() => {
                      setShowAttachments(!showAttachments);
                      setShowEmojiPicker(false);
                    }}
                  >
                    <BiPaperclip className="text-2xl" />
                  </button>
                  <div className="flex-1 bg-gray-700 rounded-full px-4 py-2">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Type a message"
                      className="w-full bg-transparent text-white focus:outline-none"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                  </div>
                  <button 
                    className="text-gray-400 hover:text-purple-400 p-2" 
                    onClick={newMessage.trim() ? handleSendMessage : isRecording ? stopRecording : startRecording}
                  >
                    {newMessage.trim() ? (
                      <BiSend className="text-2xl text-purple-400" />
                    ) : isRecording ? (
                      <div className="w-6 h-6 rounded-full bg-red-500 animate-pulse"></div>
                    ) : (
                      <BiMicrophone className="text-2xl" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Empty state when no chat is selected
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gray-900 h-full">
              <div className="bg-gray-800 p-8 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">Recruiter Chat</h2>
              <p className="text-gray-400 max-w-md mb-6">
                Select a candidate from the list to start chatting about job opportunities
              </p>
              {isMobile && (
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition-colors"
                  onClick={() => setShowChatList(true)}
                >
                  View Contacts
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RecruiterChat;
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, BriefcaseIcon, CheckCircle2, AlertCircle, MessageSquare, Users, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Header from "../Common/Header";

const Notification = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "unread"

  // Simulate fetching recruiter notifications from an API
  const fetchNotifications = (pageNumber) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date();
        const notifications = [];

        const candidates = [
          { name: "Alex Johnson", role: "Senior Frontend Developer" },
          { name: "Sam Wilson", role: "Full Stack Engineer" },
          { name: "Taylor Smith", role: "UX Designer" },
          { name: "Jordan Lee", role: "DevOps Engineer" },
          { name: "Casey Kim", role: "Product Manager" }
        ];

        const companies = [
          { name: "TechCorp", industry: "Software" },
          { name: "DesignHub", industry: "Creative" },
          { name: "DataSystems", industry: "Analytics" },
          { name: "CloudNine", industry: "Infrastructure" }
        ];

        // Generate recruiter-specific notifications
        for (let i = 0; i < 10; i++) {
          const randomHours = Math.floor(Math.random() * 168); // 7 days in hours
          const timestamp = new Date(now.getTime() - randomHours * 60 * 60 * 1000);

          const types = [
            "new_application",
            "interview_scheduled",
            "candidate_message",
            "hiring_decision",
            "profile_view",
            "job_post",
            "meeting_reminder"
          ];
          const randomType = types[Math.floor(Math.random() * types.length)];
          const randomCandidate = candidates[Math.floor(Math.random() * candidates.length)];
          const randomCompany = companies[Math.floor(Math.random() * companies.length)];

          const notification = {
            id: pageNumber * 100 + i,
            type: randomType,
            candidate: randomCandidate,
            company: randomCompany,
            timestamp,
            isRead: Math.random() > 0.5,
            priority: Math.random() > 0.8 ? "high" : Math.random() > 0.5 ? "medium" : "low"
          };

          // Set content based on notification type
          switch (randomType) {
            case "new_application":
              notification.content = `${randomCandidate.name} applied for ${randomCandidate.role} position`;
              notification.action = "Review application";
              break;
            case "interview_scheduled":
              notification.content = `Interview with ${randomCandidate.name} scheduled for tomorrow`;
              notification.action = "View schedule";
              break;
            case "candidate_message":
              notification.content = `New message from ${randomCandidate.name} regarding ${randomCandidate.role} position`;
              notification.action = "Reply";
              break;
            case "hiring_decision":
              notification.content = `Hiring team needs your decision on ${randomCandidate.name}`;
              notification.action = "Make decision";
              break;
            case "profile_view":
              notification.content = `Your company profile was viewed by ${randomCandidate.name}`;
              notification.action = "View profile";
              break;
            case "job_post":
              notification.content = `New applicants for ${randomCandidate.role} position at ${randomCompany.name}`;
              notification.action = "View applicants";
              break;
            case "meeting_reminder":
              notification.content = `Team meeting in 30 minutes to discuss ${randomCandidate.role} hiring`;
              notification.action = "Join meeting";
              break;
            default:
              break;
          }

          notifications.push(notification);
        }

        // Sort by timestamp
        notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        resolve(notifications);
      }, 800);
    });
  };

  useEffect(() => {
    loadMoreNotifications();
  }, []);

  const loadMoreNotifications = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const newNotifications = await fetchNotifications(page);
      if (newNotifications.length > 0) {
        setVisibleNotifications((prev) => [...prev, ...newNotifications]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore && !loading) {
      loadMoreNotifications();
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "new_application":
        return <FileText className="w-5 h-5 text-blue-400" />;
      case "interview_scheduled":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "candidate_message":
        return <MessageSquare className="w-5 h-5 text-purple-400" />;
      case "hiring_decision":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case "profile_view":
        return <Users className="w-5 h-5 text-indigo-400" />;
      case "job_post":
        return <BriefcaseIcon className="w-5 h-5 text-orange-400" />;
      case "meeting_reminder":
        return <Bell className="w-5 h-5 text-red-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-red-500";
      case "medium":
        return "border-yellow-500";
      case "low":
        return "border-gray-500";
      default:
        return "border-gray-500";
    }
  };

  const groupNotificationsByDate = (notifications) => {
    const groups = {};

    notifications.forEach((notification) => {
      const date = notification.timestamp.toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
    });

    return groups;
  };

  const getDateHeader = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
      });
    }
  };

  // Filter notifications based on the selected filter
  const filteredNotifications = visibleNotifications.filter((notification) => {
    if (filter === "unread") return !notification.isRead;
    return true;
  });

  const groupedNotifications = groupNotificationsByDate(filteredNotifications);

  // Handle "Mark as Read"
  const markAsRead = (id) => {
    setVisibleNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  // Handle "Mark All as Read"
  const markAllAsRead = () => {
    setVisibleNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  return (
    <div className="flex-1 overflow-auto relative bg-gray-700 min-h-screen text-gray-100">
      <Header title="Company's Notifications" />

      {/* Filter and Mark All as Read */}
      <div className="flex justify-between items-center p-4 md:p-6 flex-wrap gap-3 bg-gray-800 border-b border-gray-600">
        <div className="flex gap-2 md:gap-4">
          <button
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-sm md:text-base transition-colors ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-200 hover:bg-gray-500"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-sm md:text-base transition-colors ${
              filter === "unread" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-200 hover:bg-gray-500"
            }`}
            onClick={() => setFilter("unread")}
          >
            Unread
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors text-sm md:text-base"
            onClick={markAllAsRead}
          >
            Mark All as Read
          </button>
          <div className="flex items-center gap-1 bg-gray-600 px-2 py-1 rounded-full">
            <Bell className="text-blue-400 w-4 h-4" />
            <span className="text-xs font-semibold">{visibleNotifications.filter((n) => !n.isRead).length}</span>
          </div>
        </div>
      </div>

      {/* Notification List */}
      <div className="h-[calc(100vh-10rem)] overflow-y-auto px-4 md:px-6 scroll-hidden bg-gray-900" onScroll={handleScroll}>
        {Object.entries(groupedNotifications).length > 0 ? (
          Object.entries(groupedNotifications).map(([date, notifications]) => (
            <div key={date} className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 sticky top-0 bg-gray-900 py-2 z-10">
                {getDateHeader(date)}
              </h3>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-4 rounded-lg cursor-pointer border-l-4 ${getPriorityColor(notification.priority)} ${
                      notification.isRead
                        ? "bg-gray-800 border-gray-400"
                        : "bg-gray-700 border-blue-400"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        notification.isRead ? "bg-gray-500" : "bg-gray-700"
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-gray-100">{notification.content}</span>
                          {!notification.isRead && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">New</span>
                          )}
                          {notification.priority === "high" && (
                            <span className="text-xs bg-red-900 text-red-200 px-2 py-0.5 rounded-full">High Priority</span>
                          )}
                        </div>
                        
                        <div className="mt-2 text-sm text-gray-300">
                          {notification.candidate && (
                            <span className="font-medium">{notification.candidate.name}</span>
                          )}
                          {notification.company && (
                            <span className="ml-2">• {notification.company.name}</span>
                          )}
                        </div>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </span>
                          <span className="text-xs bg-gray-500 px-2 py-1 rounded-md text-gray-100">
                            {notification.action}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-10">
            <Bell className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-300 text-lg">No notifications to display</p>
            {filter === "unread" && (
              <p className="text-gray-400 mt-2">Try switching to "All" notifications</p>
            )}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        )}

        {!hasMore && visibleNotifications.length > 0 && (
          <div className="text-center py-6 text-gray-400 text-sm">
            You're all caught up with notifications!
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
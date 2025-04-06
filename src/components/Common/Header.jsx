// import { BellRing } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const Header = ({ title }) => {
//   const [notifications] = useState([
//     "You have a new message.",
//     "Your profile has been updated.",
//     "Someone liked your post.",
//   ]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const dropdownRef = useRef(null);
//   const bellRef = useRef(null);
//   const navigate = useNavigate();

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         bellRef.current &&
//         !bellRef.current.contains(event.target)
//       ) {
//         setShowNotifications(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

  
//   const handleNotificationClick = () => {
//     navigate("/notifications");
//   };

//   return (
//     <>
//       <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 fixed top-0 sm:w-[80%] md:w-[100%] z-50">
//         <div className="max-w-none mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
//           <div
//             className="relative md:mr-64"
//             onMouseEnter={() => setShowNotifications(true)}>
          
//             <button
//               className="focus:outline-none"
//               onClick={() => setShowNotifications((prev) => !prev)}
//               ref={bellRef}
//             >
//               <BellRing className="text-gray-100" size={24} />
//             </button>

          
//             {showNotifications && (
//               <div
//                 ref={dropdownRef}
//                 className="absolute right-0 mt-2 w-72 sm:w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 transition-opacity duration-300 ease-in-out opacity-100"
//                 onMouseEnter={() => setShowNotifications(true)}
//                 onMouseLeave={() => setShowNotifications(false)}
//               >
//                 <div className="px-4 py-2 bg-gray-800 text-gray-300 font-medium">
//                   Notifications
//                 </div>
//                 <ul className="divide-y divide-gray-700">
//                   {notifications.length > 0 ? (
//                     notifications.map((notification, index) => (
//                       <li
//                         key={index}
//                         onClick={handleNotificationClick} // Redirects to notification page
//                         className="px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:cursor-pointer"
//                       >
//                         {notification}
//                       </li>
//                     ))
//                   ) : (
//                     <li className="px-4 py-3 text-sm text-gray-400">
//                       No new notifications.
//                     </li>
//                   )}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       <div className="pt-[72px] md:pt-[80px]"></div>
//     </>
//   );
// };

// export default Header;
import { BellRing, User, UserCircle2 } from "lucide-react"; // Import User icon
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const [notifications] = useState([
    "You have a new message.",
    "Your profile has been updated.",
    "Someone liked your post.",
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const bellRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        bellRef.current &&
        !bellRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  
  const handleProfileClick = () => {
    navigate("/profile"); 
  };

  return (
    <>
      <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 fixed top-0 w-full z-50">
        <div className="max-w-none mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="md:text-2xl sm:text-xl font-semibold text-gray-100">{title}</h1>

          
          <div className="flex items-center gap-4 md:mr-64 sm:mr-20">
            
            <div
              className="relative"
              onMouseEnter={() => setShowNotifications(true)}
            >
              <button
                className="focus:outline-none"
                onClick={() => setShowNotifications((prev) => !prev)}
                ref={bellRef}
              >
                <BellRing className="text-gray-100" size={24} />
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-72 sm:w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 transition-opacity duration-300 ease-in-out opacity-100"
                  onMouseEnter={() => setShowNotifications(true)}
                  onMouseLeave={() => setShowNotifications(false)}
                >
                  <div className="px-4 py-2 bg-gray-800 text-gray-300 font-medium">
                    Notifications
                  </div>
                  <ul className="divide-y divide-gray-700">
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <li
                          key={index}
                          onClick={handleNotificationClick}
                          className="px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:cursor-pointer"
                        >
                          {notification}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-3 text-sm text-gray-400">
                        No new notifications.
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Profile Icon */}
            <button
              className="focus:outline-none"
              onClick={handleProfileClick}
            >
              <UserCircle2 className="text-gray-100 mb-2" size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to account for the fixed header */}
      <div className="pt-[72px] md:pt-[68px]"></div>
    </>
  );
};

export default Header;
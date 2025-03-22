// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import LogoutButton from "./LogoutButton";

// function Navbar() {
//   const { isAuthenticated, userRole } = useAuth();

//   return (
//     <nav className="p-4 bg-gray-800 text-white flex justify-between z-50">
//       <h1 className="text-xl font-bold">🔥 Techno Club </h1>

//       <ul className="flex gap-6">
//         {!isAuthenticated ? (
//           <>
//             <li><Link to="/register">Register</Link></li>
//             <li><Link to="/login">Login</Link></li>
//           </>
//         ) : (
//           <>
//             {/* Applicant Navigation */}
//             {userRole === "applicant" && (
//               <>
//                 <li><Link to="/homeuser">Home</Link></li>
//                 <li><Link to="/chatbot">Chatbot</Link></li>
                
                
                
//                 {/* <li><Link to="/faqs">FAQ's</Link></li> */}
                
//                 {/* <li><Link to="/profile">Profile</Link></li> */}
//                 <li><Link to="/events">Events</Link></li>
//                 <li><Link to="/my-events">My-Events</Link></li>
//                 <li><Link to="/explore">Explore</Link></li>
//                 <li><Link to="/recommended">Recommended</Link></li>
//                 <li><Link to="/calendar">Calendar</Link></li>
//                 <li><Link to="/community">Community</Link></li>
//                 <li><Link to="/services">Services</Link></li>
//                 <li><Link to="/about">About</Link></li>

                
                

//               </>
//             )}

//             {/* Officer Navigation */}
//             {userRole === "officer" && (
//               <>
//                 <li className="ml-1"><Link to="/homeofficer">Home</Link></li>
//                 <li><Link to="/chatbot">Chat Bot</Link></li>

//                 <li><Link to="/organizedevent">Organized Event</Link></li>
//                 <li><Link to="/resourcesystem">Resources System</Link></li>
//                 {/* <li><Link to="/all-users">All Registered</Link></li> */}
//                 <li><Link to="/miniinfo">Mini View</Link></li>
              
//               </>
//             )}

//             {/* Admin Navigation */}
//             {userRole === "admin" && (
//               <>
//                 <li><Link to="/homeadmin">Home</Link></li>

//               </>
//             )}

//             <li><LogoutButton /></li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;



import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";

function Navbar() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <nav className="p-4 bg-dark text-white flex justify-between items-center shadow-lg z-50">
      {/* Logo */}
      <h1 className="text-xl font-bold">🔥 Techno Club</h1>

      {/* Navigation Links */}
      <ul className="flex gap-6 items-center">
        {!isAuthenticated ? (
          <>
            <li><Link to="/register" className="hover:text-blue-400 transition">Register</Link></li>
            <li><Link to="/login" className="hover:text-blue-400 transition">Login</Link></li>
          </>
        ) : (
          <>
            {/* Applicant Navigation */}
            {userRole === "applicant" && (
              <>
                <li><Link to="/homeuser" className="nav-link">Home</Link></li>
                <li><Link to="/chatbot" className="nav-link">Chatbot</Link></li>
                <li><Link to="/events" className="nav-link">Events</Link></li>
                <li><Link to="/my-events" className="nav-link">My Events</Link></li>
                <li><Link to="/explore" className="nav-link">Explore</Link></li>
                <li><Link to="/recommended" className="nav-link">Recommended</Link></li>
                <li><Link to="/calendar" className="nav-link">Calendar</Link></li>
                <li><Link to="/community" className="nav-link">Community</Link></li>
                <li><Link to="/services" className="nav-link">Services</Link></li>
                <li><Link to="/about" className="nav-link">About</Link></li>
              </>
            )}

            {/* Officer Navigation */}
            {userRole === "officer" && (
              <>
                <li><Link to="/homeofficer" className="nav-link">Home</Link></li>
                <li><Link to="/chatbot" className="nav-link">Chat Bot</Link></li>
                <li><Link to="/organizedevent" className="nav-link">LeaderBoard</Link></li>
                <li><Link to="/resourcesystem" className="nav-link">Organized Event </Link></li>
                <li><Link to="/miniinfo" className="nav-link">Mini View</Link></li>
              </>
            )}

            {/* Admin Navigation */}
            {userRole === "admin" && (
              <>
                <li><Link to="/homeadmin" className="nav-link">Home</Link></li>
              </>
            )}

            {/* Logout Button */}
            <li><LogoutButton /></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

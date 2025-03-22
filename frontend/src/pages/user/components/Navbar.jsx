import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// import "../styles/styles.css";
import LogoutButton from "../../../components/LogoutButton";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null); // 🔹 Ref for handling outside clicks

  // 🔹 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
//     <nav className="bg-black px-6 rounded-xl shadow-lg">
//     <div className="container mx-auto flex justify-between items-center">
//         {/* 🚀 Logo */}
//         <h2 className="text-2xl font-bold text-gray-900 flex items-center">
//             🚀 Techno Clubs
//         </h2>

//         {/* 📌 Navigation Links */}
//         <ul className="hidden md:flex space-x-6 text-xl font-medium text-gray-900">
//             <li><Link to="/homeuser" className="hover:text-blue-700 transition duration-200">Home</Link></li>
//             <li><Link to="/about" className="hover:text-blue-700 transition duration-200">About</Link></li>
//             <li><Link to="/community" className="hover:text-blue-700 transition duration-200">Community Forum</Link></li>
//             <li><Link to="/chatbot" className="hover:text-blue-700 transition duration-200">Chatbot</Link></li>
//             <li><Link to="/faqs" className="hover:text-blue-700 transition duration-200">FAQs</Link></li>
//             <li><Link to="/services" className="hover:text-blue-700 transition duration-200">Services</Link></li>
//             <li><LogoutButton /></li>  
//         </ul>
//     </div>
// </nav>
<nav className="bg-black px-4 py-3 rounded-xl shadow-lg">
<div className="container mx-auto d-flex justify-between align-items-center">
    {/* 🚀 Logo */}
    <h2 className="fs-3 fw-bold text-white d-flex align-items-center m-0">
        🚀 Techno Clubs
    </h2>

    {/* 📌 Navigation Links */}
    <ul className="d-none d-md-flex gap-4 fs-5 fw-medium text-white m-0">
        <li className="nav-item">
            <Link to="/homeuser" className="nav-link text-white">Home</Link>
        </li>
        <li className="nav-item">
            <Link to="/chatbot" className="nav-link text-white">ChatBot</Link>
        </li>
        <li className="nav-item">
            <Link to="/events" className="nav-link text-white">Events</Link>
        </li>

        <li className="nav-item">
            <Link to="/community" className="nav-link text-white">Community Forum</Link>
        </li>
        <li className="nav-item">
            <Link to="/faqs" className="nav-link text-white">FAQs</Link>
        </li>
        <li className="nav-item">
            <Link to="/services" className="nav-link text-white">Services</Link>
        </li>
        <li className="nav-item">
            <Link to="/about" className="nav-link text-white">About</Link>
        </li>
        <li className="nav-item">
            <LogoutButton />
        </li>
    </ul>
</div>
</nav>
  );
};

export default Navbar;

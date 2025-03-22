import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import MiniInfo from './pages/officer/MiniInfo'

// Applicant Pages
import HomeUser from "./pages/user/HomeUser";
import Home from "./pages/user/pages/Home"
// import Chatbot from "./pages/user/pages/Chatbot"
import About from "./pages/user/pages/About"
import CommunityForum from "./pages/user/pages/CommunityForum"
import Event from "./pages/user/pages/Event"
import ExploreEvents from "./pages/user/pages/ExploreEvents"
import FAQs from "./pages/user/pages/FAQs"
import GoogleCalendar from "./pages/user/pages/GoogleCal"
import MyEvents from "./pages/user/pages/MyEvents"
import Profile from "./pages/user/pages/Profile"
import RecommEvents from "./pages/user/pages/RecommEvents"
import Services from "./pages/user/pages/Services"
import Testimonials from "./pages/user/pages/Testimonials"
import ExploreClubs from './pages/user/pages/ExploreClubs'
import MyClubs from './pages/user/pages/MyClubs'
import ClubEvents from './pages/user/pages/ClubEvents'
import ClubAnnouncements from './pages/user/pages/ClubAnnouncements'
import SingleEventPage from './pages/user/pages/SingleEventPage'



// Officer Pages
import ChatBot from "./pages/officer/ChatBot";
import HomeOfficer from "./pages/officer/HomeOfficer";
import AllUsers from "./pages/officer/AllUsers";
import OrganisedEvent from "./pages/officer/OrganisedEvent";
import ResourceOptimizationSystem from  './pages/officer/ResourceOptimizationSystem'

// Admin Pages
import HomeAdmin from "./pages/admin/HomeAdmin";


// Import the 3D Book Experience
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {Experience} from "../src/pages/user/components/Experience";
import {UI} from "../src/pages/user/components/UI";

// New Book Experience Page Component
const BookExperience = () => (
  <>
    <UI />
    <Loader />
    <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
      <group position-y={0}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </group>
    </Canvas>
  </>
);

const ProtectedRoute = ({ element, roles }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/404" />; // Redirect unauthorized users to 404
  }

  return element;
};

function AppRoutes() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Routes>
      {/* Redirect logged-in users away from login/register */}
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

      {/* Applicant Routes */}
      {/* <Route path="/homeuser" element={<ProtectedRoute element={<HomeUser />} roles={["applicant"]} />} /> */}
      <Route path="/homeuser" element={<ProtectedRoute element={<Home />} roles={["applicant"]} />} />
      <Route path="/about" element={<ProtectedRoute element={<About />} roles={["applicant"]} />} />
      <Route path="/community" element={<ProtectedRoute element={<CommunityForum />} roles={["applicant"]} />} />
      {/* <Route path="/chatbot" element={<ProtectedRoute element={<ChatBot />} roles={["applicant"]} />} /> */}

      <Route path="/faqs" element={<ProtectedRoute element={<FAQs />} roles={["applicant"]} />} />
      <Route path="/register" element={<ProtectedRoute element={<Register />} roles={["applicant"]} />} />
      <Route path="/services" element={<ProtectedRoute element={<Services />} roles={["applicant"]} />} />

      <Route path="/profile" element={<ProtectedRoute element={<Profile />} roles={["applicant"]} />} />
      <Route path="/events" element={<ProtectedRoute element={<Event />} roles={["applicant"]} />} />
      <Route path="/my-events" element={<ProtectedRoute element={<MyEvents />} roles={["applicant"]} />} />

      <Route path="/explore" element={<ProtectedRoute element={<ExploreEvents />} roles={["applicant"]} />} />
      <Route path="/recommended" element={<ProtectedRoute element={<RecommEvents />} roles={["applicant"]} />} />
      <Route path="/calendar" element={<ProtectedRoute element={<GoogleCalendar />} roles={["applicant"]} />} />

      <Route path="/clubs/explore" element={<ProtectedRoute element={<ExploreClubs />} roles={["applicant"]} />} />
<Route path="/clubs/my-clubs" element={<ProtectedRoute element={<MyClubs />} roles={["applicant"]} />} />
<Route path="/clubs/events" element={<ProtectedRoute element={<ClubEvents />} roles={["applicant"]} />} />
<Route path="/clubs/announcements" element={<ProtectedRoute element={<ClubAnnouncements />} roles={["applicant"]} />} />
<Route path="/clubs" element={<ProtectedRoute element={<SingleEventPage />} roles={["applicant"]} />} />

          {/* New Route for 3D Book Experience */}
          <Route path="/book-experience" element={<BookExperience />} roles={["applicant"]} />


      
      {/* Officer Routes */}
      <Route path="/resourcesystem" element={<ProtectedRoute element={<ResourceOptimizationSystem />} roles={["officer"]} />} />
      <Route path="/homeofficer" element={<ProtectedRoute element={<HomeOfficer />} roles={["officer"]} />} />
      <Route path="/chatbot" element={<ProtectedRoute element={<ChatBot />} roles={["officer","applicant"]} />} />
      <Route path="/organizedevent" element={<ProtectedRoute element={<OrganisedEvent />} roles={["officer"]} />} />      
      <Route path="/all-users" element={<ProtectedRoute element={<AllUsers />} roles={["officer"]} />} />
      <Route path="/miniinfo" element={<ProtectedRoute element={<MiniInfo />} roles={["officer"]} />} />

      {/* Admin Routes */}
      <Route path="/homeadmin" element={<ProtectedRoute element={<HomeAdmin />} roles={["admin"]} />} />

      {/* Redirect to home based on role */}
      <Route path="/" element={
        isAuthenticated ? (
          userRole === "applicant" ? <Navigate to="/homeuser" /> :
          userRole === "officer" ? <Navigate to="/homeofficer" /> :
          userRole === "admin" ? <Navigate to="/homeadmin" /> :
          <Navigate to="/login" />
        ) : <Navigate to="/login" />
      } />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
      <Route path="/404" element={<NotFound />} />

    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
        {localStorage.getItem('authToken') && <Footer />}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });

      logout();
      navigate("/login"); 
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "applicant",
    uniqueKey: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      setSuccess(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-sky-600">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" required 
            onChange={handleChange} className="w-full p-2 border rounded" />

          <input type="email" name="email" placeholder="Email Address" required 
            onChange={handleChange} className="w-full p-2 border rounded" />

          <input type="password" name="password" placeholder="Password" required 
            onChange={handleChange} className="w-full p-2 border rounded" />

          <select name="role" onChange={handleChange} className="w-full p-2 border rounded">
            <option value="applicant">Memeber</option>
            <option value="officer">Techno Cl`ub</option>
            <option value="admin">Admin</option>
          </select>

          {formData.role !== "applicant" && (
            <input type="text" name="uniqueKey" placeholder="Department Unique Key" required 
              onChange={handleChange} className="w-full p-2 border rounded" />
          )}

          <button type="submit" className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition">
            Register
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-sky-600">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

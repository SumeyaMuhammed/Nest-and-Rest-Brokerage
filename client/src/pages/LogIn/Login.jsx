import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axiosInstance"; // Import the Axios instance
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    } 
    else if (!formData.username) { // Adjust as per your API's requirements
      newErrors.username = "Please enter a valid username";
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("/login", formData);

      // Check response
      if (response.status === 200) {
        // Save auth details to localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", response.data.role); // role: 'admin' or 'user'

        // Redirect based on role
        if (response.data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        setServerError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setServerError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear individual field error
  };

  return (
    <section className="loginSection">
      <div className="containerLogin">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="formContainer">
          <label htmlFor="username">Username or Email</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit">Login</button>
          {serverError && <p className="error">{serverError}</p>}
        </form>
        <p>
          Don&apos;t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

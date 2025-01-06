import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import axiosInstance from "../../api/axiosInstance";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  // Define role mapping at the top of the component
  const roleMapping = {
    1: "admin", // Role ID 1 maps to "admin"
    2: "user",  // Role ID 2 maps to "user"
  };

  const validateForm = () => {
    const newErrors = {};
    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    } 
    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setErrors({}); // Clear form-specific errors
    setServerError(""); // Clear general server errors
    if (!validateForm()) {
      return; // Don't submit if validation fails
    }
  
    try {
      const response = await axiosInstance.post("/users/login", formData);
      console.log(response);
      if (response.data && response.data.token && response.data.role_id) {
        const role = roleMapping[response.data.role_id];
  
        if (role) {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("role", role); // Save the role name
          localStorage.setItem("authToken", response.data.token); // Save the JWT token
  
          if (role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/dashboard");
          }
        } else {
          setErrors({ server: "Invalid role ID returned from the backend." });
          setTimeout(() => setErrors((prev) => ({ ...prev, server: "" })), 3000); // Clear error after 5 seconds
        }
      } else {
        setErrors({ server: "Invalid credentials or missing role ID." });
        setTimeout(() => setErrors((prev) => ({ ...prev, server: "" })), 3000); // Clear error after 5 seconds
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        username: error.response?.data|| "Invalid username or password.",
      });
      console.log(error.response?.data); // Set field-specific error for username
      setFormData({ username: "", password: "" }); // Clear form fields after error
      setTimeout(() => setErrors({}), 3000); // Clear all errors after 5 seconds
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error as user types
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name]; // Remove error for the specific field when typing
      return newErrors;
    });
  };

  return (
    <section className="loginSection">
      <div className="containerLogin">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="formContainer" noValidate>
          <label htmlFor="username">Username</label>
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

          {/* Only show server error if present */}
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

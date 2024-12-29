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
      const response = await axiosInstance.post("/users/login", formData);

      // Log the entire response object to see what you're getting
      console.log("API Response:", response);
      console.log(errors);
      // Ensure the API response contains the token and role_id
      if (response.data && response.data.token && response.data.role_id) {
        const role = roleMapping[response.data.role_id];
        console.log("Role ID:", response.data.role_id);
        console.log("Mapped Role:", role);
  
        // Check if the role is valid
        if (role) {
          // Save auth details to localStorage
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("role", role); // Save the role name
          localStorage.setItem("authToken", response.data.token); // Save the JWT token
  
          // Redirect based on role
          if (role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/dashboard");
          }
        } else {
          setServerError("Invalid role ID returned from the backend.");
        }
      } else {
        setServerError("Invalid credentials or missing role ID.");
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

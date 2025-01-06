import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./register.module.css";
import axiosInstance from "../../api/axiosInstance";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Add useNavigate for redirection

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(formData.password)) {
      newErrors.password = "Password must include letters, numbers, and special characters.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosInstance.post("/users/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.data && response.data.token) {
        // Automatically log in the user by storing the token
        localStorage.setItem("authToken", response.data.token);

        // Redirect to the dashboard
        navigate("/dashboard");
      } else {
        throw new Error("Registration successful, but no token received.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
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
    <section className={classes.registerSection}>
      <div className={classes.containerRegister}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className={classes.formContainer} noValidate>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? classes.inputError : ""}
          />
          {errors.username && <p className={classes.error}>{errors.username}</p>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? classes.inputError : ""}
          />
          {errors.email && <p className={classes.error}>{errors.email}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? classes.inputError : ""}
          />
          {errors.password && <p className={classes.error}>{errors.password}</p>}

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? classes.inputError : ""}
          />
          {errors.confirmPassword && (
            <p className={classes.error}>{errors.confirmPassword}</p>
          )}

          <button type="submit" className={classes.submitButton}>
            Sign Up
          </button>
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;

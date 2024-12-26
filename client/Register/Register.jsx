import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axiosInstance"; // Import Axios instance
import classes from "./register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Email validation regex
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

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
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
    setSuccessMessage("");
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log(response.data);
      setSuccessMessage("Registration successful! Please login.");
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
      setErrors({});
    } catch (error) {
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
            // Remove 'required' attribute
            // required
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
            // Remove 'required' attribute
            // required
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
            // Remove 'required' attribute
            // required
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
            // Remove 'required' attribute
            // required
            className={errors.confirmPassword ? classes.inputError : ""}
          />
          {errors.confirmPassword && (
            <p className={classes.error}>{errors.confirmPassword}</p>
          )}

          <button type="submit" className={classes.submitButton}>Sign Up</button>
          {successMessage && (
            <p className={classes.success}>{successMessage}</p>
          )}
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

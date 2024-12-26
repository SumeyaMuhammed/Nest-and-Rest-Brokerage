// import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import classes from "./register.module.css";
const Register = () => {
  return (
    <>
      <section className={classes.registerSection}>
        
      <div className={classes.containerRegister}>
        <h2>Sign Up</h2>
        <form action="#" method="POST" className={classes.formContainer}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required/>

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required/>

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required/>

          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirm-password" required/>

          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
      </section>
    </>
  );
};

export default Register;

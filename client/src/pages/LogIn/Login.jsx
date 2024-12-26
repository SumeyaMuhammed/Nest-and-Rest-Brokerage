import { Link } from "react-router-dom";
import "./Login.css"
const Login = () => {
  return (
    <>
    <section className="loginSection">
    <div className="containerLogin">
        <h2>Login</h2>
        <form action="#" method="POST" className="formContainer">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />

            <button type="submit">Login</button>
        </form>
        <p>Don&apos;t have an account? <Link to="/register">Sign Up</Link></p>
    </div>
    </section>
    </>
  )
}

export default Login;

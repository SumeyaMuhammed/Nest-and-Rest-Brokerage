import  classes from "./header.module.css" ;
const Header = () => {
  return (
    <>
    <header>
        <div className={classes.navbar}>
            <div className={classes.logo}>
              <a href="#">Nest & Ride</a>
            </div>
            <nav>
              <a href="#packages">Home</a>
              <a href="#products">Services</a>
              <a href="About.html">About</a>
              <a href="#contact">Get in Touch</a>
            </nav>
            <button>Sign Up</button>
        </div>
    </header>
    </>
  )
}

export default Header
import classes from "./footer.module.css"
import { FaLinkedinIn, FaFacebookF, FaTwitter, FaPaperPlane } from 'react-icons/fa';
const Footer = () => {
  return (
    <>
    <footer className={classes.footer}>
      <div className={`${classes.footerContent} ${classes.navbar}`}>
          <div className={classes.logo}>
            <a href="#">Nest & Ride</a>
          </div>
          <div className={classes.socialIcons}>
            <a href="#"><FaPaperPlane /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaFacebookF /></a> 
          </div>
          <div>
            <p>Developed by:</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer

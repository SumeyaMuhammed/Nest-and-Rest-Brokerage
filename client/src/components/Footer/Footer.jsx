import classes from "./footer.module.css"
import { FaLinkedinIn, FaFacebookF, FaTwitter, FaPaperPlane } from 'react-icons/fa';
const Footer = () => {
  return (
    <>
    <footer>
            <div className={`${classes.footerContent} ${classes.navbar}`}>
                <div className={classes.logo}>
                    <img
                className={classes.logoimg}
                src="/static/images/pngtree-github-icon-design-vector-png-image_5544222.png"
                alt="logo"
                width="35px"
                />
                    <a href="#">Nest & Ride</a>
                </div>
                <div className={classes.socialIcons}>
      <a href="#">
        <FaPaperPlane />
      </a>
      <a href="#">
        <FaLinkedinIn />
      </a>
      <a href="#">
        <FaTwitter />
      </a>
      <a href="#">
        <FaFacebookF />
      </a>
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
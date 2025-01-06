import Layout from '../../components/Layout/Layout';
import classes from './GetInTouch.module.css';
import { useEffect } from 'react';

const GetInTouch = () => {
    useEffect(() => {
        // Check if there's an anchor link
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
            // Adjust scroll position to account for fixed header (if any)
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Adjust the value (100) based on your header height
                behavior: 'smooth',
            });
            }
        }
        }, []);
    return (
        <Layout>
        <div className={classes["get-in-touch-container"]}>
            <h1 className={classes["get-in-touch-heading"]} id='getintouch'>Get in Touch</h1>
            <p className={classes["get-in-touch-subheading"]}>
                Have questions or need assistance? <br />Reach out to us using the details below or fill out the contact form.
            </p>
            
            <div className={classes["contact-info"]}>
                <div>
                    <h3 className={classes["contact-heading"]}>Contact Information</h3>
                    <p>
                        <strong>Email:</strong> 
                        <a href="mailto:NestRest.gmail.com" className={classes.link}>NestRest.gmail.com</a>
                    </p>
                    <p>
                        <strong>Phone:</strong> 
                        <a href="tel:+1234567890" className={classes.link}>+251 123 567 890</a>
                    </p>
                    <p><strong>Address:</strong> Herimata Mentina, Jimma, Ethiopia</p>
                </div>
            </div>

            <div className={classes["form-container"]}>
                <h3 className={classes["contact-heading"]}>Send Us a Message</h3>
                <form className={classes["contact-form"]}>
                    <input 
                        type="text" 
                        placeholder="Your Name" 
                        className={classes["form-input"]} 
                    />
                    <input 
                        type="email" 
                        placeholder="Your Email" 
                        className={classes["form-input"]} 
                    />
                    <input 
                        type="tel" 
                        placeholder="Your Phone Number" 
                        className={classes["form-input"]} 
                    />
                    <textarea 
                        placeholder="Your Message" 
                        className={classes["form-textarea"]} 
                    ></textarea>
                    <button type="submit" className={classes["form-button"]}>
                        Send Message
                    </button>
                </form>
            </div>
        </div>
        </Layout>
    );
};

export default GetInTouch;

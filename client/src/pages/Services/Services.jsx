// Services.js
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import styles from './Services.module.css';
import  buyer  from '../../assets/images/buyer.jpg';
import seller from '../../assets/images/seller.jpg';
import broker from '../../assets/images/broker.jpg';
import { FaRegLightbulb, FaHandshake, FaUsers } from 'react-icons/fa';
const Services = () => {
  return (
    <Layout>
      <div className={styles.servicesPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <h1 className={styles.title}>Our Services</h1>
          <p className={styles.subtitle}>
            Discover how we make buying and selling cars and houses simple, seamless, and stress-free.
          </p>
        </section>

        {/* Services Grid */}
        <section className={styles.servicesGrid}>
          <div className={styles.serviceBox}>
            <div className={styles.cardImage}>
              <img
                src={buyer}
                alt="Buyers"
                className={styles.serviceImage}
              />
            </div>
            <h2>For Buyers</h2>
            <p>
              Explore a curated selection of premium cars and luxurious houses with detailed listings and expert guidance.
            </p>
          </div>

          <div className={styles.serviceBox}>
            <div className={styles.cardImage}>
              <img
                src={seller}
                alt="Sellers"
                className={styles.serviceImage}
              />
            </div>
            <h2>For Sellers</h2>
            <p>
              List your properties or vehicles effortlessly and reach a wide audience for quick, profitable sales.
            </p>
          </div>

          <div className={styles.serviceBox}>
            <div className={styles.cardImage}>
              <img
                src={broker}
                alt="Broker"
                className={styles.serviceImage}
              />
            </div>
            <h2>Verified Brokers</h2>
            <p>
              Connect with experienced brokers who provide transparent, personalized, and reliable support.
            </p>
          </div>
        </section>

        {/* Why Choose Us Section */}

        <section className={styles.whyChooseUs}>
          <h2>Why Choose Us?</h2>
          <div className={styles.reasonsGrid}>
            <div className={styles.reasonBox}>
              <FaRegLightbulb color='#ff6b00' size={60} className={styles.icon} />  {/* Icon for Expertise */}
              <h3>Expertise</h3>
              <p>Over a decade of experience in real estate and automotive brokerage.</p>
              <p>
                Our team consists of industry professionals who understand the market trends and are equipped to offer invaluable advice for buying or selling your assets effectively.
              </p>
            </div>

            <div className={styles.reasonBox}>
              <FaHandshake color='#ff6b00' size={60} className={styles.icon} /> {/* Icon for Transparency */}
              <h3>Transparency</h3>
              <p>Accurate listings and clear communication at every step.</p>
              <p>
                We ensure that every listing provides detailed and truthful information, making it easy for you to make well-informed decisions without hidden surprises.
              </p>
            </div>

            <div className={styles.reasonBox}>
              <FaUsers color='#ff6b00' size={60} className={styles.icon} /> 
              <h3>Client-Centric Approach</h3>
              <p>We prioritize your needs to deliver tailored solutions.</p>
              <p>
                Our personalized approach allows us to focus on your unique preferences and requirements, ensuring a seamless experience from start to finish.
              </p>
            </div>
          </div>
        </section>



        {/* Call to Action Section */}
        <section className={styles.ctaSection}>
          <h2>Ready to Get Started?</h2>
          <p>
            Whether you are buying your dream home, selling your car, or looking for expert advice, we are here to help.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/Dashboard#carList" className={styles.navLink}>
            <button className={styles.ctaButton}>Browse Cars</button>
          </Link>
            <Link to="/Dashboard#houseList" className={styles.navLink}>
            <button className={styles.ctaButton}>Browse Houses</button>
          </Link>
            
            <Link to="/GetInTouch#getintouch" className={styles.navLink}>
            <button className={styles.ctaButton}>Get in Touch</button>
          </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Services;

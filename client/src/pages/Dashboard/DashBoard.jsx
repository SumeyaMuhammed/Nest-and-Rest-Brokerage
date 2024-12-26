
import  { useState, useEffect } from 'react';
import styles from './LogIn.module.css';

// Sample data fetching function for cars and houses

const DashBoard = () => {
  const [cars, setCars] = useState([]);
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    setCars(fetchCars());
    setHouses(fetchHouses());
  }, []);
// In a real-world scenario, these would come from an API
const fetchCars = () => {
  return [
    {
      car_id: 1,
      title: '2020 BMW X5',
      description: 'Luxury SUV with premium features.',
      price: 55000.00,
      make: 'BMW',
      model: 'X5',
      year: 2020,
      mileage: 20000,
      color: 'Black',
      image_url: 'https://example.com/bmw_x5.jpg',
    },
    {
      car_id: 2,
      title: '2019 Audi Q7',
      description: 'Spacious and reliable SUV.',
      price: 48000.00,
      make: 'Audi',
      model: 'Q7',
      year: 2019,
      mileage: 15000,
      color: 'White',
      image_url: 'https://example.com/audi_q7.jpg',
    },
  ];
};

const fetchHouses = () => {
  return [
    {
      house_id: 1,
      title: 'Luxury Villa in Beverly Hills',
      description: 'A luxurious 5-bedroom villa with stunning views.',
      price: 2000000.00,
      num_bedrooms: 5,
      num_bathrooms: 5,
      area_sqft: 5000,
      location: 'Beverly Hills, CA',
      image_url: 'https://example.com/villa.jpg',
    },
    {
      house_id: 2,
      title: 'Modern Apartment in New York',
      description: 'A sleek 3-bedroom apartment in the heart of NYC.',
      price: 1200000.00,
      num_bedrooms: 3,
      num_bathrooms: 2,
      area_sqft: 2000,
      location: 'New York, NY',
      image_url: 'https://example.com/ny_apartment.jpg',
    },
  ];
};

  return (
    <div className={styles.container}>
      <section className={styles.introSection}>
        <h2>Welcome to Our Brokerage</h2>
        <p>We offer premium cars and luxurious homes to suit your lifestyle.</p>
        <p>Explore our listings for the best deals in real estate and automobiles.</p>
      </section>

      {/* Cars Section */}
      <section className={styles.section}>
        <h2>Cars</h2>
        <div className={styles.slider}>
          {cars.map((car) => (
            <div className={styles.card} key={car.car_id}>
              <img src={car.image_url} alt={car.title} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <h3>{car.title}</h3>
                <p>{car.description}</p>
                <p><strong>Price:</strong> ${car.price}</p>
                <p><strong>Year:</strong> {car.year}</p>
                <p><strong>Mileage:</strong> {car.mileage} miles</p>
                <p><strong>Color:</strong> {car.color}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Houses Section */}
      <section className={styles.section}>
        <h2>Houses</h2>
        <div className={styles.slider}>
          {houses.map((house) => (
            <div className={styles.card} key={house.house_id}>
              <img src={house.image_url} alt={house.title} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <h3>{house.title}</h3>
                <p>{house.description}</p>
                <p><strong>Price:</strong> ${house.price}</p>
                <p><strong>Bedrooms:</strong> {house.num_bedrooms}</p>
                <p><strong>Bathrooms:</strong> {house.num_bathrooms}</p>
                <p><strong>Area:</strong> {house.area_sqft} sqft</p>
                <p><strong>Location:</strong> {house.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};



export default DashBoard;
import { useState } from "react";
import styles from "./Dashboard.module.css";

const DashBoard = () => {
  const [cars] = useState(fetchCars());
  const [houses] = useState(fetchHouses());
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

  // Filtered data based on search input
  const filteredCars = cars.filter((car) =>
    car.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredHouses = houses.filter((house) =>
    house.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.userDashboard}>
      {/* Intro Section */}
      <section className={styles.introSection}>
        <h1>Welcome to Our Brokerage</h1>
        <p>Your one-stop destination for premium cars and luxurious homes.</p>
      </section>

      {/* Search Bar */}
      <section className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search cars or houses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </section>

      {/* User Profile Section */}
      <section className={styles.profileSection}>
        <img src="https://via.placeholder.com/100" alt="User Avatar" className={styles.avatar} />
        <div>
          <h3>Welcome, [Users Name]</h3>
          <p>Member since: Jan 2022</p>
          <p>Total Listings Viewed: 50</p>
        </div>
      </section>

      {/* Cars Section */}
      <section className={styles.section}>
        <h2>Cars</h2>
        <div className={styles.grid}>
          {filteredCars.map((car) => (
            <div className={styles.card} key={car.car_id}>
              <img
                src={car.image_url}
                alt={car.title}
                className={styles.cardImage}
              />
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
        <div className={styles.grid}>
          {filteredHouses.map((house) => (
            <div className={styles.card} key={house.house_id}>
              <img
                src={house.image_url}
                alt={house.title}
                className={styles.cardImage}
              />
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

      {/* Promotions Section */}
      <section className={styles.promotionsSection}>
        <h2>Exclusive Offers</h2>
        <p>🔥 Get 20% off on select car models this month!</p>
        <p>🏡 Limited-time offers on luxury homes!</p>
      </section>

      {/* Activity Feed */}
      <section className={styles.activitySection}>
        <h2>Activity Feed</h2>
        <ul className={styles.activityList}>
          <li>User viewed Car 1.</li>
          <li>User saved House 3.</li>
          <li>New promotion on SUVs announced!</li>
        </ul>
      </section>
    </div>
  );
};

// Dummy data generation functions
const fetchCars = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    car_id: i + 1,
    title: `Car ${i + 1}`,
    description: `Description for Car ${i + 1}`,
    price: (50000 + i * 1000).toFixed(2),
    year: 2020 + (i % 3),
    mileage: 20000 + i * 100,
    color: ["Black", "White", "Red"][i % 3],
    image_url: `https://example.com/car${i + 1}.jpg`,
  }));
};

const fetchHouses = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    house_id: i + 1,
    title: `House ${i + 1}`,
    description: `Description for House ${i + 1}`,
    price: (1000000 + i * 50000).toFixed(2),
    num_bedrooms: 3 + (i % 3),
    num_bathrooms: 2 + (i % 2),
    area_sqft: 2000 + i * 100,
    location: `City ${i + 1}`,
    image_url: `https://example.com/house${i + 1}.jpg`,
  }));
};

export default DashBoard;

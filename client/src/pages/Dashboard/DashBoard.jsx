// Dashboard.js
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import styles from "./Dashboard.module.css";
import Layout from "../../components/Layout/Layout";

const baseURL = axiosInstance.defaults.baseURL;

const DashBoard = () => {
  const [cars, setCars] = useState([]);
  const [houses, setHouses] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [error, setError] = useState("");

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsResponse = await axiosInstance.get("/cars");
        const housesResponse = await axiosInstance.get("/houses");
        setCars(carsResponse.data);
        setHouses(housesResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  // Filtered data based on search input
  const filteredCars = cars.filter((car) =>
    car.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredHouses = houses.filter((house) =>
    house.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className={styles.userDashboard}>
        <section className={styles.introSection}>
          <h1>Welcome to Our Brokerage</h1>
          <p>Your one-stop destination for premium cars and luxurious homes.</p>
        </section>

        <section className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search cars or houses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </section>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <section className={styles.section}>
          <h2>Cars</h2>
          {filteredCars.length > 0 ? (
            <div className={styles.grid}>
              {filteredCars.map((car) => (
                <div className={styles.card} key={car.id}>
                  <img
                    src={
                      car.image_url && car.image_url.startsWith("http")
                        ? car.image_url
                        : `${baseURL}${car.image_url}`
                    }
                    alt={car.title || "Car Image"}
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
          ) : (
            <p>No cars found.</p>
          )}
        </section>

        <section className={styles.section}>
          <h2>Houses</h2>
          {filteredHouses.length > 0 ? (
            <div className={styles.grid}>
              {filteredHouses.map((house) => (
                <div className={styles.card} key={house.id}>
                  <img
                    src={
                      house.image_url
                        ? house.image_url.startsWith("http")
                          ? house.image_url
                          : `${baseURL}${house.image_url}`
                        : "default-placeholder.jpg"
                    }
                    alt={house.title || "House Image"}
                    className={styles.houseImage}
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
          ) : (
            <p>No houses found.</p>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default DashBoard;

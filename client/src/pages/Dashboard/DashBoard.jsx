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

  // Filter criteria state for cars
  const [carFilters, setCarFilters] = useState({
    color: "",
    year: "",
    price: "",
  });

  // Filter criteria state for houses
  const [houseFilters, setHouseFilters] = useState({
    price: "",
    location: "",
    num_bedrooms: "",
    area: "",
  });

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsResponse = await axiosInstance.get("/cars");
        const housesResponse = await axiosInstance.get("/houses/");
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
  const filteredCars = cars
    .filter((car) =>
      car.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((car) => {
      return carFilters.color
        ? car.color.toLowerCase() === carFilters.color.toLowerCase()
        : true;
    })
    .filter((car) => {
      return carFilters.year ? car.year === parseInt(carFilters.year) : true;
    })
    .filter((car) => {
      return carFilters.price ? car.price <= parseInt(carFilters.price) : true;
    });

  const filteredHouses = houses
    .filter((house) =>
      house.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((house) => {
      return houseFilters.price
        ? house.price <= parseInt(houseFilters.price)
        : true;
    })
    .filter((house) => {
      return houseFilters.location
        ? house.location.toLowerCase().includes(houseFilters.location.toLowerCase())
        : true;
    })
    .filter((house) => {
      return houseFilters.num_bedrooms
        ? house.num_bedrooms === parseInt(houseFilters.num_bedrooms)
        : true;
    })
    .filter((house) => {
      return houseFilters.area ? house.area_sqft <= parseInt(houseFilters.area) : true;
    });

  const handleCarFilterChange = (e) => {
    const { name, value } = e.target;
    setCarFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleHouseFilterChange = (e) => {
    const { name, value } = e.target;
    setHouseFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Layout>
      <div className={styles.userDashboard} id="dashBoard">

        <section className={styles.introSection}>
          <h1>Welcome to Our Brokerage</h1>
          <p>Your one-stop destination for premium cars and luxurious homes.</p>
        </section>
        {/* Navigation Section */}
        <nav className={styles.navSection}>
          <a href="#houseList" className={styles.navLink}>
            Go to Houses
          </a>
        </nav>

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

        {/* Cars Section */}
        <section className={styles.section}>
          <h2 id="carList">Cars</h2>

          <div className={styles.filterSection}>
            <input
              type="text"
              name="color"
              placeholder="Car Color"
              value={carFilters.color}
              onChange={handleCarFilterChange}
            />
            <input
              type="text"
              name="year"
              placeholder="Car Year"
              value={carFilters.year}
              onChange={handleCarFilterChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Max Price"
              value={carFilters.price}
              onChange={handleCarFilterChange}
            />
          </div>

          {filteredCars.length > 0 ? (
            <div className={styles.grid}>
              {filteredCars.map((car) => (
                <div className={styles.card} key={car.id}>
                  <img
                    src={
                      car.image_url
                        ? car.image_url.startsWith("http")
                          ? car.image_url
                          : `${baseURL}${car.image_url}`
                        : "default-placeholder.jpg"
                    }
                    alt={car.title || "Car Image"}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardContent}>
                    <h3>{car.title}</h3>
                    <p>{car.description}</p>
                    <p>
                      <strong>Price:</strong> ${car.price}
                    </p>
                    <p>
                      <strong>Year:</strong> {car.year}
                    </p>
                    <p>
                      <strong>Mileage:</strong> {car.mileage} miles
                    </p>
                    <p>
                      <strong>Color:</strong> {car.color}
                    </p>
                    <p>
                      <strong>Broker Email:</strong>{" "}
                      {car.email ? (
                        <a href={`mailto:${car.email}`}>{car.email}</a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <p>
                      <strong>Broker Phone:</strong>{" "}
                      {car.phone ? (
                        <a href={`tel:${car.phone}`}>{car.phone}</a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No cars found.</p>
          )}
        </section>

        {/* Houses Section */}
        <section className={styles.section}>
          <nav className={styles.navSection}>
            <a href="#carList" className={styles.navLink}>
              Go to Cars
            </a>
          </nav>
          <h2 id="houseList">Houses</h2>

          <div className={styles.filterSection}>
            <input
              type="number"
              name="price"
              placeholder="Max Price"
              value={houseFilters.price}
              onChange={handleHouseFilterChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={houseFilters.location}
              onChange={handleHouseFilterChange}
            />
            <input
              type="number"
              name="num_bedrooms"
              placeholder="Number of Bedrooms"
              value={houseFilters.num_bedrooms}
              onChange={handleHouseFilterChange}
            />
            <input
              type="number"
              name="area"
              placeholder="Max Area (sqft)"
              value={houseFilters.area}
              onChange={handleHouseFilterChange}
            />
          </div>

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
                    className={styles.cardImage}
                  />
                  <div className={styles.cardContent}>
                    <h3>{house.title}</h3>
                    <p>{house.description}</p>
                    <p>
                      <strong>Price:</strong> ${house.price}
                    </p>
                    <p>
                      <strong>Bedrooms:</strong> {house.num_bedrooms}
                    </p>
                    <p>
                      <strong>Bathrooms:</strong> {house.num_bathrooms}
                    </p>
                    <p>
                      <strong>Area:</strong> {house.area_sqft} sqft
                    </p>
                    <p>
                      <strong>Location:</strong> {house.location}
                    </p>
                    <p>
                      <strong>Broker Email:</strong>{" "}
                      {house.email ? (
                        <a href={`mailto:${house.email}`}>{house.email}</a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <p>
                      <strong>Broker Phone:</strong>{" "}
                      {house.phone ? (
                        <a href={`tel:${house.phone}`}>{house.phone}</a>
                      ) : (
                        "N/A"
                      )}
                    </p>
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

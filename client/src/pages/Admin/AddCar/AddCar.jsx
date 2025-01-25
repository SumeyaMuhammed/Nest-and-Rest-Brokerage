import { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance'; 
import classes from './AddCar.module.css'; 
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Layout from '../../../components/Layout/Layout';
const baseURL = axiosInstance.defaults.baseURL;

const ManageCar = () => {
  const [cars, setCars] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [newCar, setNewCar] = useState({
    title: '',
    description: '',
    price: '',
    make: '',
    model: '',
    year: '',
    mileage: '',
    color: '',
    image_url: '',
    name: '',
  });
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchData = async () => {
    try {
      const [carsResponse, brokersResponse] = await Promise.all([
        axiosInstance.get('/cars'),
        axiosInstance.get('/brokers') // Fetch all brokers
      ]);

      // Filter brokers based on their availability status
      const availableBrokers = brokersResponse.data.filter(broker => broker.status === 'available');
      setCars(carsResponse.data);
      setBrokers(availableBrokers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch cars and brokers from the API on component mount
    fetchData();
  }, []);
  

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);

      // Cleanup the timer if component unmounts or message changes
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({
      ...newCar,
      [name]: value,
    });
  };

  const handleAddCar = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!newCar.title) {
      setMessage('Error: Car title is required.');
      return;
    }
    if (!newCar.price || isNaN(newCar.price) || newCar.price <= 0) {
      setMessage('Error: A valid price is required.');
      return;
    }
    if (!newCar.make) {
      setMessage('Error: Car make is required.');
      return;
    }
    if (!newCar.model) {
      setMessage('Error: Car model is required.');
      return;
    }
    if (
      !newCar.year ||
      isNaN(newCar.year) ||
      newCar.year < 1886 ||
      newCar.year > new Date().getFullYear()
    ) {
      setMessage('Error: A valid year is required.');
      return;
    }

    try {
      let response;
      if (isEditing) {
        // Update existing car
        response = await axiosInstance.put(`/cars/update/${editingCarId}`, newCar);
        // Update cars state with the updated car
        setCars((prevCars) =>
          prevCars.map((car) =>
            car.car_id === editingCarId ? { ...car, ...response.data } : car
          )
        );
        setMessage('Car updated successfully.');
        setIsEditing(false);
        setEditingCarId(null);
      } else {
        // Add new car
        response = await axiosInstance.post('/cars/add', newCar);
        setCars((prevCars) => [...prevCars, response.data]);
        setMessage('Car added successfully.');
      }

      // Reset form after submission
      setNewCar({
        title: '',
        description: '',
        price: '',
        make: '',
        model: '',
        year: '',
        mileage: '',
        color: '',
        image_url: '',
        name: '',
      });
      setIsFormVisible(false); // Hide form

      // Re-fetch the cars data to ensure the state is always up-to-date
      fetchData();
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;
        if (status === 400) {
          setMessage(data.message || 'Invalid input. Please check all fields.');
        } else if (status === 500) {
          setMessage('Server error. Please try again later.');
        } else {
          setMessage('Failed to add/update car. Unexpected error occurred.');
        }
      } else {
        console.error('Unexpected error:', error);
        setMessage('Failed to add/update car due to an unknown error.');
      }
    }
  };
  
  const handleEditCar = (carId) => {
    const carToEdit = cars.find((car) => car.car_id === carId);
    setNewCar(carToEdit);
    setIsEditing(true);
    setEditingCarId(carId);
    setIsFormVisible(true);
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axiosInstance.delete(`/cars/delete/${carId}`);
      setCars(cars.filter((car) => car.car_id !== carId));
      setMessage('Car deleted successfully.');
    } catch (error) {
      console.error('Error deleting car:', error);
      setMessage('Failed to delete car.');
    }
  };

  return (
    <Layout>
      <div className={classes.manageCar}>
        {message && <div className={classes.successMessage}>{message}</div>}

        {!isFormVisible && (
          <>
            <div className={classes.buttonBox}>
              <button
                onClick={() => setIsFormVisible(true)}
                className={classes.addCarButton}
              >
                Add Car
              </button>
            </div>
            <table className={classes.carTable}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Price</th>
                  <th>Mileage</th>
                  <th>Color</th>
                  <th>Broker name</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars?.map((car) => (
                  <tr key={car?.car_id}>
                    <td>{car?.title}</td>
                    <td>{car?.make}</td>
                    <td>{car?.model}</td>
                    <td>{car?.year}</td>
                    <td>{car?.price}</td>
                    <td>{car?.mileage}</td>
                    <td>{car?.color}</td>
                    <td>{brokers?.find((broker) => broker?.broker_id === car?.broker_id)?.name}</td>
                    <td>
                      <img
                        src={
                          car.image_url
                            ? car.image_url.startsWith('http')
                              ? car.image_url
                              : `${baseURL}${car.image_url}`
                            : 'default-placeholder.jpg'
                        }
                      />
                    </td>
                    <td>
                      <button
                        className={classes.editButton}
                        onClick={() => handleEditCar(car?.car_id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className={classes.deleteButton}
                        onClick={() => handleDeleteCar(car?.car_id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {isFormVisible && (
          <form className={classes.carForm} onSubmit={handleAddCar}>
            <h3>{isEditing ? 'Edit Car' : 'Add Car'}</h3>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newCar.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newCar.description}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newCar.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="make"
              placeholder="Make"
              value={newCar.make}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={newCar.model}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={newCar.year}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="mileage"
              placeholder="Mileage"
              value={newCar.mileage}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={newCar.color}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="image_url"
              placeholder="Image URL"
              value={newCar.image_url}
              onChange={handleInputChange}
            />
            <select
              name="name"
              value={newCar.name}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Broker</option>
              {brokers.map((broker) => (
                <option key={broker.id} value={broker.id}>
                  {broker.name}
                </option>
              ))}
            </select>
            <button type="submit">{isEditing ? 'Update Car' : 'Add Car'}</button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default ManageCar;

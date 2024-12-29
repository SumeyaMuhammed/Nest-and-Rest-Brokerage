import { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance'; 
import classes from './AddCar.module.css'; 
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ManageCar = () => {
  const [cars, setCars] = useState([]);
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
    broker_id: '',
  });
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Fetch cars from the API on component mount
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

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
    if (!newCar.year || isNaN(newCar.year) || newCar.year < 1886 || newCar.year > new Date().getFullYear()) {
        setMessage('Error: A valid year is required.');
        return;
    }

    try {
        if (isEditing) {
            // Update existing car
            const response = await axiosInstance.put(`/cars/update/${editingCarId}`, newCar);

            // Update cars state with the updated car
            setCars((prevCars) =>
                prevCars.map((car) =>
                    car.car_id === editingCarId ? { ...car, ...response.data } : car
                )
            );
            console.log('Updated Car:', response.data);
            setMessage('Car updated successfully.');
            setIsEditing(false);
            setEditingCarId(null);
        } else {
            // Add new car
            const response = await axiosInstance.post('/cars/add', newCar);
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
            broker_id: '',
        });
        setIsFormVisible(false); // Hide form
    } catch (error) {
        // Handle server errors
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
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div className={classes.manageCar}>
      <h2>Manage Cars</h2>
      {message && <div className={classes.successMessage}>{message}</div>}

      {!isFormVisible && (
        <>
          <button onClick={() => setIsFormVisible(true)} className={classes.addCarButton}>
            Add Car
          </button>

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
          <input
            type="number"
            name="broker_id"
            placeholder="Broker ID"
            value={newCar.broker_id}
            onChange={handleInputChange}
          />
          <button type="submit">{isEditing ? 'Update Car' : 'Add Car'}</button>
        </form>
      )}
    </div>
  );
};

export default ManageCar;

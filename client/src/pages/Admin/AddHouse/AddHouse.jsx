import { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import classes from './AddHouse.module.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ManageHouse = () => {
  const [houses, setHouses] = useState([]);
  const [newHouse, setNewHouse] = useState({
    title: '',
    description: '',
    price: '',
    num_bedrooms: '',
    num_bathrooms: '',
    area_sqft: '',
    location: '',
    image_url: '',
    broker_id: '',
  });
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingHouseId, setEditingHouseId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Fetch houses from the API
    const fetchHouses = async () => {
      try {
        const response = await axiosInstance.get('/houses');
        setHouses(response.data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    fetchHouses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHouse({
      ...newHouse,
      [name]: value,
    });
  };

  const handleAddHouse = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!newHouse.title) {
      setMessage('Error: House title is required.');
      return;
    }
    if (!newHouse.price || isNaN(newHouse.price) || newHouse.price <= 0) {
      setMessage('Error: A valid price is required.');
      return;
    }
    if (!newHouse.num_bedrooms || isNaN(newHouse.num_bedrooms) || newHouse.num_bedrooms <= 0) {
      setMessage('Error: Number of bedrooms is required and must be a positive number.');
      return;
    }
    if (!newHouse.num_bathrooms || isNaN(newHouse.num_bathrooms) || newHouse.num_bathrooms <= 0) {
      setMessage('Error: Number of bathrooms is required and must be a positive number.');
      return;
    }

    try {
      if (isEditing) {
        // Update existing house
        await axiosInstance.put(`/houses/update/${editingHouseId}`, newHouse);
        setHouses((prevHouses) =>
          prevHouses.map((house) =>
            house.house_id === editingHouseId ? { ...house, ...newHouse } : house
          )
        );
        setMessage('House updated successfully.');
        setIsEditing(false);
        setEditingHouseId(null);
      } else {
        // Add new house
        const response = await axiosInstance.post('/houses/', newHouse);
        console.log(response.data);
        setHouses((prevHouses) => [...prevHouses, response.data]);
        setMessage('House added successfully.');
      }

      // Reset form
      setNewHouse({
        title: '',
        description: '',
        price: '',
        num_bedrooms: '',
        num_bathrooms: '',
        area_sqft: '',
        location: '',
        image_url: '',
        broker_id: '',
      });
      setIsFormVisible(false);
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;

        if (status === 400) {
          setMessage(data.message || 'Invalid input. Please check all fields.');
        } else if (status === 500) {
          setMessage('Server error. Please try again later.');
        } else {
          setMessage('Failed to add/update house. Unexpected error occurred.');
        }
      } else {
        console.error('Unexpected error:', error);
        setMessage('Failed to add/update house due to an unknown error.');
      }
    }
  };

  const handleEditHouse = (houseId) => {
    const houseToEdit = houses.find((house) => house.house_id === houseId);
    setNewHouse(houseToEdit);
    setIsEditing(true);
    setEditingHouseId(houseId);
    setIsFormVisible(true);
  };

  const handleDeleteHouse = async (houseId) => {
    try {
      await axiosInstance.delete(`/houses/delete/${houseId}`);
      setHouses(houses.filter((house) => house.house_id !== houseId));
      setMessage('House deleted successfully.');
    } catch (error) {
      console.error('Error deleting house:', error);
      setMessage('Failed to delete house.');
    }
  };

  return (
    <div className={classes.manageHouse}>
      <h2>Manage Houses</h2>
      {message && <div className={classes.message}>{message}</div>}

      {!isFormVisible && (
        <>
          <button onClick={() => setIsFormVisible(true)} className={classes.addButton}>Add House</button>

          <table className={classes.houseTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Area (sqft)</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {houses.map((house) => (
                <tr key={house.house_id}>
                  <td>{house.title}</td>
                  <td>{house.description}</td>
                  <td>{house.price}</td>
                  <td>{house.num_bedrooms}</td>
                  <td>{house.num_bathrooms}</td>
                  <td>{house.area_sqft}</td>
                  <td>{house.location}</td>
                  <td>
                    <button
                      className={classes.editButton}
                      onClick={() => handleEditHouse(house.house_id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={classes.deleteButton}
                      onClick={() => handleDeleteHouse(house.house_id)}
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
        <form className={classes.houseForm} onSubmit={handleAddHouse}>
          <h3>{isEditing ? 'Edit House' : 'Add House'}</h3>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newHouse.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newHouse.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newHouse.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="num_bedrooms"
            placeholder="Number of Bedrooms"
            value={newHouse.num_bedrooms}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="num_bathrooms"
            placeholder="Number of Bathrooms"
            value={newHouse.num_bathrooms}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="area_sqft"
            placeholder="Area (sqft)"
            value={newHouse.area_sqft}
            onChange={handleInputChange}
          />
          <textarea
            name="location"
            placeholder="Location"
            value={newHouse.location}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={newHouse.image_url}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="broker_id"
            placeholder="Broker ID"
            value={newHouse.broker_id}
            onChange={handleInputChange}
          />
          <button type="submit">{isEditing ? 'Update House' : 'Add House'}</button>
        </form>
      )}
    </div>
  );
};

export default ManageHouse;

import { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import classes from './AddBroker.module.css'; 
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Layout from '../../../components/Layout/Layout';

const ManageBroker = () => {
  const [brokers, setBrokers] = useState([]);
  const [newBroker, setNewBroker] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'available',  
  });
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingBrokerId, setEditingBrokerId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); 

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const response = await axiosInstance.get('/brokers');
        setBrokers(response.data);
      } catch (error) {
        console.error('Error fetching brokers:', error);
      }
    };

    fetchBrokers();
  }, []);
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBroker({
      ...newBroker,
      [name]: value,
    });
  };

  const handleAddBroker = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axiosInstance.put(`/brokers/${editingBrokerId}`, newBroker);
        setBrokers((prevBrokers) =>
          prevBrokers.map((broker) =>
            broker.broker_id === editingBrokerId ? { ...broker, ...newBroker } : broker
          )
        );
        setMessage('Broker updated successfully');
        setIsEditing(false);
        setEditingBrokerId(null);
      } else {
        const response = await axiosInstance.post('/brokers', newBroker);
        console.log('New Broker Added:', response.data); 
  
        setBrokers((prevBrokers) => [...prevBrokers, response.data]);
        setMessage('Broker added successfully');
      }

      setNewBroker({ name: '', email: '', phone: '', address: '', status: 'available' });
      setIsFormVisible(false); 
    } catch (error) {
      console.error('Error adding or updating broker:', error);
      setMessage('Failed to add/update broker');
    }
  };

  const handleEditBroker = (brokerId) => {
    const brokerToEdit = brokers.find((broker) => broker.broker_id === brokerId);
    setNewBroker(brokerToEdit);
    setIsEditing(true);
    setEditingBrokerId(brokerId);
    setIsFormVisible(true); 
  };

  const handleDeleteBroker = async (brokerId) => {
    try {
      await axiosInstance.delete(`/brokers/${brokerId}`);
      setBrokers(brokers.filter((broker) => broker.broker_id !== brokerId));
      setMessage('broker deleted successfully.');
    } catch (error) {
      console.error('Error deleting broker:', error);
      setMessage('Failed to delete broker.');
    }
  };

  return (
    <Layout>
    <div className={classes.manageBroker}>
      {message && <div className={classes.successMessage}>{message}</div>}

      {!isFormVisible && (
        <>
        <div className={classes.buttonBox}>
          <button onClick={() => setIsFormVisible(true)} className={classes.addBrokerButton}>Add Broker</button>
          </div>
          <table className={classes.brokerTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {brokers?.map((broker) => (
                <tr key={broker?.broker_id}>
                  <td>{broker?.name}</td>
                  <td>{broker?.email}</td>
                  <td>{broker?.phone}</td>
                  <td>{broker?.address}</td>
                  <td>{broker?.status}</td>
                  <td>
                    <button
                      className={classes.editButton}
                      onClick={() => handleEditBroker(broker?.broker_id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={classes.deleteButton}
                      onClick={() => handleDeleteBroker(broker?.broker_id)}
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
        <form className={classes.brokerForm} onSubmit={handleAddBroker}>
          <h3>{isEditing ? 'Edit Broker' : 'Add Broker'}</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newBroker.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newBroker.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newBroker.phone}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={newBroker.address}
            onChange={handleInputChange}
          />
          <select
            name="status"
            value={newBroker.status}
            onChange={handleInputChange}
          >
            <option value="available">Available</option>
            <option value="busy">Busy</option>
          </select>
          <button type="submit">{isEditing ? 'Update Broker' : 'Add Broker'}</button>
        </form>
      )}
    </div>
    </Layout>
  );
};

export default ManageBroker;

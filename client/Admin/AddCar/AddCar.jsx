import "./AddCar.module.css";
const AddCar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save car data to the database
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" name="title" required />

      <label>Description:</label>
      <textarea name="description" required />

      <label>Price:</label>
      <input type="number" name="price" required />

      <label>Make:</label>
      <input type="text" name="make" required />

      <label>Model:</label>
      <input type="text" name="model" required />

      <label>Year:</label>
      <input type="number" name="year" required />

      <label>Mileage:</label>
      <input type="number" name="mileage" />

      <label>Color:</label>
      <input type="text" name="color" />

      <label>Image URL:</label>
      <input type="url" name="image_url" />

      <label>Broker ID:</label>
      <input type="number" name="broker_id" />

      <button type="submit">Add Car</button>
    </form>
  );
};

export default AddCar;

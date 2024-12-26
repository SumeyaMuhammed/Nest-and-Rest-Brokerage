import "./AddHouse.module.css";
const AddHouse = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save house data to the database
  };

  return (
    <section id="add-house" className="adminSection">
      <h2>Add House</h2>
      <form id="house-form" onSubmit={handleSubmit}>
        <label htmlFor="house-title">Title:</label>
        <input type="text" id="house-title" name="title" required />

        <label htmlFor="house-description">Description:</label>
        <textarea id="house-description" name="description" required></textarea>

        <label htmlFor="house-price">Price:</label>
        <input
          type="number"
          id="house-price"
          name="price"
          step="0.01"
          required
        />

        <label htmlFor="num-bedrooms">Bedrooms:</label>
        <input
          type="number"
          id="num-bedrooms"
          name="num_bedrooms"
          required
        />

        <label htmlFor="num-bathrooms">Bathrooms:</label>
        <input
          type="number"
          id="num-bathrooms"
          name="num_bathrooms"
          required
        />

        <label htmlFor="area-sqft">Area (sqft):</label>
        <input type="number" id="area-sqft" name="area_sqft" />

        <label htmlFor="location">Location:</label>
        <textarea id="location" name="location" required></textarea>

        <label htmlFor="house-image">Image URL:</label>
        <input type="url" id="house-image" name="image_url" />

        <label htmlFor="house-broker">Broker ID:</label>
        <input type="number" id="house-broker" name="broker_id" />

        <button type="submit">Add House</button>
      </form>
    </section>
  );
};

export default AddHouse;

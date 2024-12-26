// import classes from './Admin.module.css'; // Assuming you have a CSS file for styling

// const Admin = () => {
//   return (
//     <section className={classes.adminSection}>
//       <header>
//         <h1>Admin Dashboard</h1>
//       </header>

//       <main>
//         <section id="add-house">
//           <h2>Add House</h2>
//           <form id="house-form">
//             <label htmlFor="house-title">Title:</label>
//             <input type="text" id="house-title" name="title" required />

//             <label htmlFor="house-description">Description:</label>
//             <textarea id="house-description" name="description" required></textarea>

//             <label htmlFor="house-price">Price:</label>
//             <input type="number" id="house-price" name="price" step="0.01" required />

//             <label htmlFor="num-bedrooms">Bedrooms:</label>
//             <input type="number" id="num-bedrooms" name="num_bedrooms" required />

//             <label htmlFor="num-bathrooms">Bathrooms:</label>
//             <input type="number" id="num-bathrooms" name="num_bathrooms" required />

//             <label htmlFor="area-sqft">Area (sqft):</label>
//             <input type="number" id="area-sqft" name="area_sqft" />

//             <label htmlFor="location">Location:</label>
//             <textarea id="location" name="location" required></textarea>

//             <label htmlFor="house-image">Image URL:</label>
//             <input type="url" id="house-image" name="image_url" />

//             <label htmlFor="house-broker">Broker ID:</label>
//             <input type="number" id="house-broker" name="broker_id" />

//             <button type="submit">Add House</button>
//           </form>
//         </section>

//         <section id="add-car">
//           <h2>Add Car</h2>
//           <form id="car-form">
//             <label htmlFor="car-title">Title:</label>
//             <input type="text" id="car-title" name="title" required />

//             <label htmlFor="car-description">Description:</label>
//             <textarea id="car-description" name="description" required></textarea>

//             <label htmlFor="car-price">Price:</label>
//             <input type="number" id="car-price" name="price" step="0.01" required />

//             <label htmlFor="make">Make:</label>
//             <input type="text" id="make" name="make" required />

//             <label htmlFor="model">Model:</label>
//             <input type="text" id="model" name="model" required />

//             <label htmlFor="year">Year:</label>
//             <input type="number" id="year" name="year" required />

//             <label htmlFor="mileage">Mileage:</label>
//             <input type="number" id="mileage" name="mileage" />

//             <label htmlFor="color">Color:</label>
//             <input type="text" id="color" name="color" />

//             <label htmlFor="car-image">Image URL:</label>
//             <input type="url" id="car-image" name="image_url" />

//             <label htmlFor="car-broker">Broker ID:</label>
//             <input type="number" id="car-broker" name="broker_id" />

//             <button type="submit">Add Car</button>
//           </form>
//         </section>
//       </main>
//     </section>
//   );
// };

// export default Admin;
import AddCar from "../AddCar/AddCar";
import AddHouse from "../AddHouse/AddHouse";
// import AddBroker from "../";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <section>
        <AddCar />
        <AddHouse />
        {/* <AddBroker /> */}
      </section>
    </div>
  );
};

export default AdminDashboard;

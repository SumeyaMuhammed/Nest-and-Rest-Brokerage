// import classes from './Admin.module.css'; 
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


// const AdminDashboard = () => {
  //   return (
    //     <div className={classes.adminDashboard}>
    //       <h1>Admin Dashboard</h1>
    //       <section>
    //         <AddCar />
    //         <AddHouse />
    //       </section>
    //     </div>
    //   );
    // };
    
    
    
// import AddCar from "../AddCar/AddCar";
// import AddHouse from "../AddHouse/AddHouse";
import Layout from '../../../components/Layout/Layout';
import classes from './Admin.module.css'; 
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "House", path: "/admin-dashboard/addhouse", icon: "🏠", description: "Add houses to the dashboard and manage them" },
    { title: "Car", path: "/admin-dashboard/addcar", icon: "🚗", description: "Add cars to the dashboard and manage them." },
    { title: "Broker", path: "/admin-dashboard/addbroker", icon: "👨‍💼", description: "Register brokers easily." },
  ];

  return (
    <Layout>
      <div className={classes.admin}>
        <h1 className={classes.dashboardHeading}>Admin Dashboard</h1>
        <p className={classes.dashboardSubheading}>
          Easily manage all aspects with quick access to tools and features.
        </p>
        <div className={classes.gridContainer}>
          {cards.map((card, index) => (
            <div
              key={index}
              className={classes.card}
              onClick={() => {
                  console.log(`Navigating to ${card.path}`);
                  navigate(card.path)
                }}
            >
              <div className={classes.iconWrapper}>{card.icon}</div>
              <h2 className={classes.cardTitle}>{card.title}</h2>
              <p className={classes.cardDescription}>{card.description}</p>
              <button className={classes.cardButton}>Open</button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;


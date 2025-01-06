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


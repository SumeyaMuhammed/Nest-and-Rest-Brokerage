import { Route } from "react-router-dom";
import AddHouse from "../pages/Admin/AddHouse/AddHouse";
import AddCar from "../pages/Admin/AddCar/AddCar";
import AddBroker from "../pages/Admin/AddBroker/AddBroker";
import AdminDashboard from "../pages/Admin/Admin dashboard/AdminDashboard";
import AdminRoute from "../utils/AdminRoute";

export const AdminRoutes = () => {
  return (
    <>
      <Route
        path="/admin-dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin-dashboard/addhouse"
        element={
          <AdminRoute>
            <AddHouse />
          </AdminRoute>
        }
      />
      <Route
        path="/admin-dashboard/addcar"
        element={
          <AdminRoute>
            <AddCar />
          </AdminRoute>
        }
      />
      <Route
        path="/admin-dashboard/addbroker"
        element={
          <AdminRoute>
            <AddBroker />
          </AdminRoute>
        }
      />
    </>
  );
};

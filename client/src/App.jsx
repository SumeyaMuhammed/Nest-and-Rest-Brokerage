import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Register from "./pages/Register/Register";
import Login from "./pages/LogIn/Login";
import DashBoard from "./pages/Dashboard/DashBoard";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import { AuthProvider } from "./context/AuthContext";
// import AddHouse from "./pages/Admin/AddHouse/AddHouse";
// import AddCar from "./pages/Admin/AddCar/AddCar";
// import AddBroker from "./pages/Admin/AddBroker/AddBroker";
import { AdminRoutes } from "./utils/AdminRoutes";
import ProtectedRoute from "./utils/ProtectedRoute"; 
import GetInTouch from "./pages/GetInTouch/GetInTouch";
import Services from "./pages/Services/Services";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/GetInTouch" element={<GetInTouch />} />
        <Route path="/Services" element={<Services />} />
        {/* <Route> */}
          {AdminRoutes()}
        {/* </Route> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <AddBroker/>
      <AddHouse/>
      <AddCar/> */}
    </AuthProvider>
  );
}

export default App;

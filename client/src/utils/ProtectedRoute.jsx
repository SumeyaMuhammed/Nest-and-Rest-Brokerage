import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login page if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the protected content if the user is authenticated
  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

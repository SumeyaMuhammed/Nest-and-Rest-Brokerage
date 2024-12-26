import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import PropTypes from 'prop-types'; 
const Layout = ({ children }) => {
  return (
    <>
      <Header /> 
      {children}
      <Footer />
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired, // 'children' is required and should be any renderable React node
};
export default Layout;

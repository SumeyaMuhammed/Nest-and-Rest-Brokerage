import { useNavigate } from 'react-router-dom';
import classes from './NotFound.module.css';  
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={classes.notFound}>
        <h1 className={classes.heading}>404 - Page Not Found</h1>
        <p className={classes.subHeading}>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <button className={classes.goBackButton} onClick={() => navigate('/')}>
          Go Back to Dashboard
        </button>
      </div>
    </>
  );
};

export default NotFound;

import { Navigate, Outlet } from 'react-router-dom';
import { useTimer } from '../../contexts/PomodoroContext';

const Protected = ({ children }) => {
  const { isLoggedIn } = useTimer();
  if (!isLoggedIn) {
    return (
      <>
        <Navigate to="/login" replace />
      </>
    );
  }
  return children;
};
export default Protected;

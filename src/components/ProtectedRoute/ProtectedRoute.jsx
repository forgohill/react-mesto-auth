import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {


  console.log(Component);
  console.log(props);
  const { isLoggedIn } = props;

  return (
    // if (isLoggedIn) {

    // debugger;
    // return (<Component {...props} />);
    // } else {
    // return (<Navigate to='sign-in' replace />);
    // }

    isLoggedIn
      ? <Component {...props} />
      : <Navigate to='sign-in' replace />
  );
}

export default ProtectedRoute;

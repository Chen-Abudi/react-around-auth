import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Redirect to="./signin" />
      }
    </Route>
  );
};

export default ProtectedRoute;

// import React from "react";
// import { Route, Redirect } from "react-router-dom";

// function ProtectedRoute({ loggedIn, children }) {
//   return <Route>{loggedIn ? children : <Redirect to="/signin" />}</Route>;
// }

// export default ProtectedRoute;

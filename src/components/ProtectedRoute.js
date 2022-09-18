import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const value = useContext(AccountContext);

  // return (
  //   <Route>
  //     {() =>
  //       props.loggedIn ? <Component {...props} /> : <Redirect to="./signin" />
  //     }
  //   </Route>
  // );

  return (
    <Route>
      {() =>
        value.loggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
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

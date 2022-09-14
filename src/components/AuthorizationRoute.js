import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthorizationRoute({ loggedIn, children }) {
  // If the user is logged in, then redirect to main page until logged out
  return <Route>{!loggedIn ? children : <Redirect to="/" />}</Route>;
}

export default AuthorizationRoute;

import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ loggedIn, children }) {
  return <Route>{loggedIn ? children : <Redirect to="/signin" />}</Route>;
}

export default ProtectedRoute;

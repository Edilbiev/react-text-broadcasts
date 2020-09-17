import React from "react";
import { Route, Redirect } from "react-router-dom";
import AdminPage from "../AdminPage";
import { useSelector } from "react-redux";
import AdminPosts from "../AdminPosts";

function ProtectedRoute({ path }) {
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  if(!isAdmin) {
    return <Redirect to="/auth" />
  }

  return (
    <>
      <Route exact path={path}>
        <AdminPage />
      </Route>
      <Route exact path={`${path}/:id`}>
        <AdminPosts />
      </Route>
    </>
  );
}

export default ProtectedRoute;

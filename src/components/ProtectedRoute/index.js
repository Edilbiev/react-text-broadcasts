import React from "react";
import { Route, Redirect } from "react-router-dom";
import AdminPage from "../AdminPage";
import AdminPosts from "../AdminPosts";
import useLogin from "../../hooks/useLogin";

function ProtectedRoute({ path }) {
  const [isAdmin, fetching] = useLogin();

  if (fetching) {
    return null;
  }

  if (!isAdmin) {
    return <Redirect to="/auth" />;
  }

  return (
    <>
      <Route exact path={path}>
        <AdminPage isAdmin={isAdmin} />
      </Route>
      <Route exact path={`${path}/:id`}>
        <AdminPosts isAdmin={isAdmin} />
      </Route>
    </>
  );
}

export default ProtectedRoute;

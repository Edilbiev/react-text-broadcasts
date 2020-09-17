import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onlinesLoaded } from "../../redux/actions";
import OnlinesPage from "../OnlinesPage";
import PostsPage from "../PostsPage";
import AuthPage from "../AuthPage";
import ProtectedRoute from "../ProtectedRoute";

function Pages() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onlinesLoaded());
  }, [dispatch]);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <OnlinesPage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <ProtectedRoute path="/admin"/>
        <Route path="/:id">
          <PostsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default Pages;

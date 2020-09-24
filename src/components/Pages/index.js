import React from "react";
import { Route, Switch } from "react-router-dom";
import OnlinesPage from "../OnlinesPage";
import PostsPage from "../PostsPage";
import AuthPage from "../AuthPage";
import ProtectedRoute from "../ProtectedRoute";

function Pages() {
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

import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";

import { ListOfUsers } from "./ListOfUsers";
import { AddNewUser } from "./AddNewUser";
import { UserView } from "./UserView.jsx";
import { Header } from "./common/Header";
import { Editing } from "./Editing.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route
          path="/"
          exact
          render={() => <Redirect to="/registration?tab=account" />}
        />
        <Route path="/registration" exact component={AddNewUser} />
        <Route path="/users" exact component={ListOfUsers} />
        <Route path="/users/edit/:id" exact component={Editing} />
        <Route path="/users/view/:id" exact component={UserView} />
      </Switch>
    </Router>
  );
}

export default App;

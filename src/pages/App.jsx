import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";

import { ListOfUsers } from "./ListOfUsers";
import { AddNewUser } from "./AddNewUser";
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
          render={() => <Redirect to="/registration?step=0" />}
        />
        <Route path="/registration" exact component={AddNewUser} />
        <Route path="/users" exact component={ListOfUsers} />
        <Route path="/users/edit/:id" exact component={Editing} />
      </Switch>
    </Router>
  );
}

export default App;

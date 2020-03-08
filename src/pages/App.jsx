import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";

// header and 404 page
import PageNotFound from "./PageNotFound.jsx";
import Header from "./common/Header.jsx";

// components
import ListOfUsers from "./ListOfUsers.jsx";
import AddNewUser from "./AddNewUser.jsx";
import UserView from "./UserView.jsx";
import Editing from "./Editing.jsx";

const App = () => {
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
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default App;

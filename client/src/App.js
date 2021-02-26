import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import Login from "./components/Auth section/Login";
import SignUp from "./components/Auth section/SignUp";
import Home from "./components/Auth section/Home";
import ForgetPassword from "./components/Auth section/ForgetPassword";
import PrivateRoute from "./auth/PrivateRoute";
import Email from "./components/Email";
import ViewEmails from "./components/ViewEmails";
import UpdateEmails from "./components/UpdateEmails";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/forgot-password" component={ForgetPassword} />
        <PrivateRoute exact path="/" component={CreateRoom} />
        <Route exact path="/room/:roomID" component={Room} />
        <PrivateRoute exact path="/email" component={Email} />
        <PrivateRoute exact path="/myemails" component={ViewEmails} />
        <PrivateRoute exact path="/update-emails" component={UpdateEmails} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

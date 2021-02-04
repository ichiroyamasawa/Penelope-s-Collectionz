import "./default.css";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";

//hoc
import WithAuth from "./hoc/withAuth";
import { WithClientAuth, WithAdminAuth } from "./hoc/withManageAuth";

//imports
import { Switch, Route } from "react-router-dom";
import { checkUserSession } from "./Redux/User/user.actions";
import { useDispatch } from "react-redux";

//layouts
import MainLayout from "./Layouts/MainLayout";
import HomepageLayout from "./Layouts/HomepageLayout";
import AdminClientLayout from "./Layouts/AdminClientLayout";

//pages
import Homepage from "./Pages/Homepage";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Recovery from "./Pages/Recovery";
import Dashboard from "./Pages/Dashboard";
import Client from "./Pages/Client";
import Admin from "./Pages/Admin";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";

//Components
import { ClientToolbar, AdminToolbar } from "./Components/Toolbar";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <AdminToolbar />
      <ClientToolbar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          path="/aboutUs"
          render={() => (
            <MainLayout>
              <AboutUs />
            </MainLayout>
          )}
        />
        <Route
          path="/contactUs"
          render={() => (
            <MainLayout>
              <ContactUs />
            </MainLayout>
          )}
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/client"
          render={() => (
            <WithClientAuth>
              <AdminClientLayout>
                <Client />
              </AdminClientLayout>
            </WithClientAuth>
          )}
        />
        <Route
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <AdminClientLayout>
                <Admin />
              </AdminClientLayout>
            </WithAdminAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;

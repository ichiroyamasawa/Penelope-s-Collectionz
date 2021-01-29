import "./default.css";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";

//hoc
import WithAuth from "./hoc/withAuth";

//imports
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, handleUserProfile } from "./Firebase/utils";
import { setCurrentUser } from "./Redux/User/user.actions";
import { useSelector, useDispatch } from "react-redux";

//layouts
import MainLayout from "./Layouts/MainLayout";
import HomepageLayout from "./Layouts/HomepageLayout";

//pages
import Homepage from "./Pages/Homepage";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Recovery from "./Pages/Recovery";
import Dashboard from "./Pages/Dashboard";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            })
          );
        });
      }

      dispatch(setCurrentUser(userAuth));
    });

    return () => {
      authListener();
    };
  }, []);

  return (
    <div className="App">
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
      </Switch>
    </div>
  );
};

export default App;

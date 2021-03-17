import "./default.css";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";

//hoc
import WithAuth from "./hoc/withAuth";
import {
  WithClientAuth,
  WithAdminAuth,
  WithAdminRestriction,
  WithClientRestriction,
  WithAdminClientAuth,
} from "./hoc/withManageAuth";

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
import ProductOrder from "./Pages/ProductOrder";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import ClientOrders from "./Pages/ClientOrders";
import ClientOrderDetails from "./Pages/ClientOrderDetails";
import CustomerOrderDetails from "./Pages/CustomerOrderDetails";
import ClientEditContent from "./Pages/ClientEditContent";
import ChatScreen from "./Pages/ChatScreen";

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
          path="/products_:filterType"
          render={() => (
            <WithClientRestriction>
              <WithAdminRestriction>
                <HomepageLayout>
                  <Homepage />
                </HomepageLayout>
              </WithAdminRestriction>
            </WithClientRestriction>
          )}
        />
        <Route
          path="/product/:Prod_Code"
          render={() => (
            <WithClientRestriction>
              <WithAdminRestriction>
                <HomepageLayout>
                  <ProductOrder />
                </HomepageLayout>
              </WithAdminRestriction>
            </WithClientRestriction>
          )}
        />
        <Route
          path="/cart"
          exact
          render={() => (
            <WithClientRestriction>
              <WithAdminRestriction>
                <WithAuth>
                  <MainLayout>
                    <Cart />
                  </MainLayout>
                </WithAuth>
              </WithAdminRestriction>
            </WithClientRestriction>
          )}
        />
        <Route
          path="/chat"
          exact
          render={() => (
            <WithAdminRestriction>
              <WithAuth>
                <MainLayout>
                  <ChatScreen />
                </MainLayout>
              </WithAuth>
            </WithAdminRestriction>
          )}
        />
        <Route
          path="/checkout"
          exact
          render={() => (
            <WithClientRestriction>
              <WithAdminRestriction>
                <WithAuth>
                  <MainLayout>
                    <Checkout />
                  </MainLayout>
                </WithAuth>
              </WithAdminRestriction>
            </WithClientRestriction>
          )}
        />
        <Route
          exact
          path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/aboutUs"
          render={() => (
            <WithClientRestriction>
              <WithAdminRestriction>
                <MainLayout>
                  <AboutUs />
                </MainLayout>
              </WithAdminRestriction>
            </WithClientRestriction>
          )}
        />
        <Route
          exact
          path="/contactUs"
          render={() => (
            <WithClientRestriction>
              <WithAdminRestriction>
                <MainLayout>
                  <ContactUs />
                </MainLayout>
              </WithAdminRestriction>
            </WithClientRestriction>
          )}
        />
        <Route
          exact
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          exact
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
          exact
          path="/dashboard/orders/:orderID"
          render={() => (
            <WithAuth>
              <MainLayout>
                <CustomerOrderDetails />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route
          exact
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
          exact
          path="/client/editContent"
          render={() => (
            <WithClientAuth>
              <AdminClientLayout>
                <ClientEditContent />
              </AdminClientLayout>
            </WithClientAuth>
          )}
        />
        <Route
          exact
          path="/manageOrders"
          render={() => (
            <WithAdminClientAuth>
              <AdminClientLayout>
                <ClientOrders />
              </AdminClientLayout>
            </WithAdminClientAuth>
          )}
        />
        <Route
          exact
          path="/manageOrders/:orderID"
          render={() => (
            <WithAdminClientAuth>
              <AdminClientLayout>
                <ClientOrderDetails />
              </AdminClientLayout>
            </WithAdminClientAuth>
          )}
        />
        <Route
          exact
          path="/client/:filterType"
          render={() => (
            <WithClientAuth>
              <AdminClientLayout>
                <Client />
              </AdminClientLayout>
            </WithClientAuth>
          )}
        />
        <Route
          exact
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

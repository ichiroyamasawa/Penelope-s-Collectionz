import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import UserManager from "./../../Components/UserManager";
import {
  fetchUsersStart,
  deleteUserStart,
} from "./../../Redux/User/user.actions";

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Container } from "react-bootstrap";

const mapState = ({ user }) => ({
  users: user.users,
});

const Admin = (props) => {
  const { users } = useSelector(mapState);
  const dispatch = useDispatch();

  const { data, queryDoc, isLastPage } = users;

  useEffect(() => {
    dispatch(fetchUsersStart());
  }, []);

  const delUser = (event) => {
    console.log("user deleted");
  };

  if (!Array.isArray(users)) return null;

  if (users.length < 1) {
    return (
      <div>
        <h1>Unable to fetch users</h1>
      </div>
    );
  }

  return (
    <div className="manageUsers">
      <h1 className="manageUsers-sectionTitle">Manage Users</h1>
      {users.map((users, index) => {
        const { UserID, fName, lName, email, contactNo, userRoles } = users;

        return (
          <UserManager
            key={index}
            UserUID={UserID}
            firstName={fName}
            lastName={lName}
            contactNum={contactNo}
            email={email}
            // userRoles={userRoles}
            handleClick={() => {
              dispatch(deleteUserStart(UserID));
            }}
          />
        );
      })}
      ;
    </div>
  );
};

export default Admin;

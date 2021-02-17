import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import UserManager from "./../../Components/UserManager";
import { fetchUsers } from "./../../Redux/User/user.actions";

// const mapState = ({ user }) => ({
//   users: user.users,
// });

const Admin = (props) => {
  //const { users } = useSelector(mapState);
  const dispatch = useDispatch();

  //const { data, queryDoc, isLastPage } = users;

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // const handleLoadMore = () => {
  //   dispatch(
  //     fetchUsers({
  //       startAfterDoc: queryDoc,
  //       persistUsers: data,
  //     })
  //   );
  // };

  // const configLoadMore = {
  //   onLoadMoreEvt: handleLoadMore,
  // };

  return (
    <div className="manageUsers">
      <h1 className="manageUsers-sectionTitle">Manage Users</h1>
      <UserManager
        UserUID="123"
        firstName="ako"
        lastName="to"
        contactNum="123123"
        email="emailexample@hello.com"
      />
    </div>
  );
};

export default Admin;

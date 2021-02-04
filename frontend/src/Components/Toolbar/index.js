import React from "react";
import { useSelector } from "react-redux";
import { checkUserIsClient, checkUserIsAdmin } from "./../../Utils";
import { Link } from "react-router-dom";
import "./styles.css";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export const ClientToolbar = (props) => {
  const { currentUser } = useSelector(mapState);

  const isClient = checkUserIsClient(currentUser);
  if (!isClient) return null;

  return (
    <div className="toolbar clientToolbar">
      <ul>
        <li>
          <Link to="/client">Manage Store</Link>
        </li>
      </ul>
    </div>
  );
};

export const AdminToolbar = (props) => {
  const { currentUser } = useSelector(mapState);

  const isAdmin = checkUserIsAdmin(currentUser);
  if (!isAdmin) return null;

  return (
    <div className="toolbar adminToolbar">
      <ul>
        <li>
          <Link to="/admin">Manage Users</Link>
        </li>
      </ul>
    </div>
  );
};

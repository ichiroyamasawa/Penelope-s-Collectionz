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
          <Link to="/client">
            <i class="fa fa-pencil" aria-hidden="true"></i> Manage Promos & Hot
            Deals
          </Link>
        </li>
        <li>
          <Link to="/client">
            <i class="fa fa-tags" aria-hidden="true"></i> Manage Products
          </Link>
        </li>
        <li>
          <Link to="/client/orders">
            <i class="fas fa-receipt    "></i> Manage Orders
          </Link>
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
          <Link to="/admin">
            <i class="fas fa-users-cog    "></i> Manage Users
          </Link>
        </li>
        <li>
          <Link to="/admin">
            <i class="fas fa-receipt    "></i> Manage Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

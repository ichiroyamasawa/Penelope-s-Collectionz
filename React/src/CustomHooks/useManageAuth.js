import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkUserIsClient, checkUserIsAdmin } from "../Utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export const useClientAuth = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  useEffect(() => {
    if (!checkUserIsClient(currentUser)) {
      history.push("/login");
    }
  }, [currentUser]);

  return currentUser;
};

export const useAdminAuth = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) {
      history.push("/login");
    }
  }, [currentUser]);

  return currentUser;
};

export const useAdminClientAuth = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  useEffect(() => {
    if (!checkUserIsAdmin(currentUser) && !checkUserIsClient(currentUser)) {
      history.push("/login");
    }
  }, [currentUser]);

  return currentUser;
};

export const useAdminRestriction = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  useEffect(() => {
    if (checkUserIsAdmin(currentUser)) {
      history.push("/admin");
    }
  }, [currentUser]);

  return currentUser;
};

export const useClientRestriction = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  useEffect(() => {
    if (checkUserIsClient(currentUser)) {
      history.push("/client");
    }
  }, [currentUser]);

  return currentUser;
};

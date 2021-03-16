import {
  useAdminAuth,
  useClientAuth,
  useAdminRestriction,
  useAdminClientAuth,
  useClientRestriction,
} from "../CustomHooks";

export const WithAdminAuth = (props) => useAdminAuth(props) && props.children;

export const WithClientAuth = (props) => useClientAuth(props) && props.children;

export const WithAdminRestriction = (props) =>
  useAdminRestriction(props) && props.children;

export const WithClientRestriction = (props) =>
  useClientRestriction(props) && props.children;

export const WithAdminClientAuth = (props) =>
  useAdminClientAuth(props) && props.children;

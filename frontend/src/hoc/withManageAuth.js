import { useAdminAuth, useClientAuth } from "../CustomHooks";

export const WithAdminAuth = (props) => useAdminAuth(props) && props.children;

export const WithClientAuth = (props) => useClientAuth(props) && props.children;

import userTypes from "./user.types";

export const emailSignInStart = (userCredentials) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START,
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
});

export const signUpUserStart = (userCredentials) => ({
  type: userTypes.SIGN_UP_USER_START,
  payload: userCredentials,
});

export const userError = (err) => ({
  type: userTypes.USER_ERROR,
  payload: err,
});

export const resetPasswordStart = (userCredentials) => ({
  type: userTypes.RESET_PASSWORD_START,
  payload: userCredentials,
});

export const resetPasswordSuccess = () => ({
  type: userTypes.RESET_PASSWORD_SUCCESS,
  payload: true,
});

export const emailVerificationStart = () => ({
  type: userTypes.EMAIL_VERIFICATION_START,
});

export const emailVerificationSuccess = () => ({
  type: userTypes.EMAIL_VERIFICATION_SUCCESS,
  payload: true,
});

export const resetUserState = () => ({
  type: userTypes.RESET_USER_STATE,
});

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START,
});

export const fetchUsersStart = () => ({
  type: userTypes.FETCH_USERS_START,
});

export const setUsers = (users) => ({
  type: userTypes.SET_USERS,
  payload: users,
});

export const editUserStart = (UserID) => ({
  type: userTypes.EDIT_USER_START,
  payload: UserID,
});

export const changeUserEmail = (userCredentials) => ({
  type: userTypes.CHANGE_USER_EMAIL,
  payload: userCredentials,
});

export const changeUserPassword = (userCredentials) => ({
  type: userTypes.CHANGE_USER_PASSWORD,
  payload: userCredentials,
});

export const deleteUserStart = (userCredentials) => ({
  type: userTypes.DELETE_USER_START,
  payload: userCredentials,
});

export const changeUserContact = (userCredentials) => ({
  type: userTypes.CHANGE_USER_CONTACT,
  payload: userCredentials,
});

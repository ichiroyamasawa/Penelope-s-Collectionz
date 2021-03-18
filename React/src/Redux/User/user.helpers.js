import { auth, admin, authProvider } from "./../../Firebase/utils";
import { firestore } from "./../../Firebase/utils";

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: "http://localhost:3000/login",
  };

  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ["Email not found. Please try again."];
        reject(err);
      });
  });
};

export const handleUserEmailReset = (email) => {
  var user = auth.currentUser;
  var cred = authProvider.credential(user.email, email.changes.currentPassword);

  return new Promise((resolve, reject) => {
    auth.currentUser
      .reauthenticateWithCredential(cred)
      .then(() => {
        var user = auth.currentUser;
        user
          .updateEmail(email.changes.email)
          .then(() => {
            console.log("Email updated!");
            handleEditUser({ email: email.changes.email, userID: user.uid });
            user.reload();
            window.location.reload();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const handleUserPasswordReset = (password) => {
  var user = auth.currentUser;
  var cred = authProvider.credential(
    user.email,
    password.changes.currentPassword
  );

  return new Promise((resolve, reject) => {
    console.log(user);
    console.log(cred);
    console.log(password.changes.email);
    auth.currentUser
      .reauthenticateWithCredential(cred)
      .then(() => {
        var user = auth.currentUser;
        user
          .updatePassword(password.changes.newPassword)
          .then(() => {
            console.log("Password updated!");
            user.reload();
            window.location.reload();
            resolve();
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const handleUserContactReset = (contact) => {
  var user = auth.currentUser;
  var cred = authProvider.credential(
    user.email,
    contact.changes.currentPassword
  );
  return new Promise((resolve, reject) => {
    console.log(user);
    console.log(cred);
    console.log(contact.changes.contactNo);
    auth.currentUser
      .reauthenticateWithCredential(cred)
      .then(() => {
        firestore
          .collection("users")
          .doc(user.uid)
          .update({ contactNo: contact.changes.contactNo })
          .then(() => {
            user.reload();
            window.location.reload();
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const handleFetchUsers = () =>
  //   {
  //   // startAfterDoc,
  //   persistUsers = [], //infinite Scroll
  //   //startBeforeDoc,
  // }
  {
    return new Promise((resolve, reject) => {
      // const pageSize = 5;
      console.log("helloooo", 7);
      // let ref =
      firestore
        .collection("users")
        .get()
        .then((snapshot) => {
          const usersArray = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              UserID: doc.id,
            };
          });
          resolve(usersArray);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

export const handleEditUser = (user) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .doc(user.userID)
      .update(user)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteUser = (UserID) => {
  console.log(UserID, 1);
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .doc(UserID)
      .delete()
      .then(() => {
        console.log(UserID, 2);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteUserAdmin = (UserID) => {
  return new Promise((resolve, reject) => {
    admin
      .auth()
      .deleteUser(UserID)
      .then(() => {
        resolve();
        console.log("Successfully deleted user");
      })
      .catch((error) => {
        reject(error);
        console.log("Error deleting user:", error);
      });
  });
};

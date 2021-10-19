import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import initFirebase from '../../firebase/initFirebase'

initFirebase()

export const AuthService = {

  loginWithGoogle: async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const userCred = await firebase.auth().signInWithPopup(provider);
      return { 
        user: userCred.user,
      };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  },
  loginWithFacebook: async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    try{
      const userCred = await firebase.auth().signInWithPopup(provider);
      return {user: userCred.user};
    }catch (err) {
      // if (error.code === 'auth/account-exists-with-different-credential') {
      //   // Step 2.
      //   // User's email already exists.
      //   // The pending Google credential.
      //   const pendingCred = error.credential;
      //   // The provider account's email address.
      //   const email = error.email;
      //   // Get sign-in methods for this email.
      //   auth.fetchSignInMethodsForEmail(email).then(function(methods) {
      //     // Step 3.
      //     // If the user has several sign-in methods,
      //     // the first method in the list will be the "recommended" method to use.
      //     if (methods[0] === 'password') {
      //       // Asks the user their password.
      //       // In real scenario, you should handle this asynchronously.
      //       const password = promptUserForPassword(); // TODO: implement promptUserForPassword.
      //       auth.signInWithEmailAndPassword(email, password).then(function(result) {
      //         // Step 4a.
      //         return result.user.linkWithCredential(pendingCred);
      //       }).then(function() {
      //         // Google account successfully linked to the existing Firebase user.
      //         goToApp();
      //       });
      //       return;
      //     }
      //     // All the other cases are external providers.
      //     // Construct provider object for that provider.
      //     // TODO: implement getProviderForProviderId.
      //     var provider = getProviderForProviderId(methods[0]);
      //     // At this point, you should let the user know that they already has an account
      //     // but with a different provider, and let them validate the fact they want to
      //     // sign in with this provider.
      //     // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
      //     // so in real scenario you should ask the user to click on a "continue" button
      //     // that will trigger the signInWithPopup.
      //     auth.signInWithPopup(provider).then(function(result) {
      //       // Remember that the user may have signed in with an account that has a different email
      //       // address than the first one. This can happen as Firebase doesn't control the provider's
      //       // sign in flow and the user is free to login using whichever account they own.
      //       // Step 4b.
      //       // Link to Google credential.
      //       // As we have access to the pending credential, we can directly call the link method.
      //       result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
      //         // Google account successfully linked to the existing Firebase user.
      //         goToApp();
      //       });
      //     });
      //   });
      // }
      return {
        error: err.message,
      };
    }
  },
  loginWithGitHub: async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    try{
      const userCred = await firebase.auth().signInWithPopup(provider);
      return {user: userCred.user};
    }catch (err) {
      return {
        error: err.message,
      };
    }
  },
  logout: async () => {
    await firebase.auth().signOut();
  },
  createUserWithEmailAndPassword: async (email, password) => {
    try {
      const userCred = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await userCred.user.sendEmailVerification({
        url: 'http://localhost:3000/profile',
      });
      return {
        user: userCred.user,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
  signInUserWithEmailAndPassword: async (email, password) => {
    try {
      const userCred = await firebase
        .auth()
        .signInUserWithEmailAndPassword(email, password);
      return {
        user: userCred.user,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
  resetPassword: async (email) => {
    try {
      await firebase
        .auth()
        .sendPasswordResetEmail(email, { url: 'http://localhost:3000' });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
  deleteAccount: async () => {
    try {
      await firebase.auth().currenetUser.delete();
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
  updatePassword: async (newPassword) => {
    try {
      await firebase.auth().currenetUser.updatePassword(newPassword);
      return 'Password has been updated.';
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
};

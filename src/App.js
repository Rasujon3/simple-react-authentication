import "./App.css";
import app from "./firebase.init";
import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("token", token);
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.error(errorCode, errorMessage, email, credential);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFacebokSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser({});
      })
      .catch((error) => {
        // An error happened.
        setUser({});
      });
  };

  return (
    <div className="App">
      <h1>Milestone-10-React-Authentication</h1>
      {user.uid ? (
        <button onClick={() => handleGoogleSignOut()}>Google Sign out</button>
      ) : (
        <>
          <button onClick={() => handleGoogleSignIn()}>Google Sign In</button>
          <button onClick={() => handleFacebokSignIn()}>
            Facebook Sign In
          </button>
          <button onClick={() => handleGithubSignIn()}>Github Sign In</button>
        </>
      )}
      <h2>Name: {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;

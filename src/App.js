import "./App.css";
import { useEffect, useState, useCallback } from "react";

function App() {
  const [auth, setAuth] = useState({
    name: "",
    googleAuth: "",
  });
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const CLIENT_KEY = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;
  const SCOPES = "https://www.googleapis.com/auth/drive";
  const DISCOVERY_DOCS =
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";

  const initClient = useCallback(() => {
    let googleAuth;

    const updateSignInStatus = (isSignedIn) => {
      //It will wait for the promises of both requests
      const getCurrentUser = async () => {
        const user = await googleAuth.currentUser.get();
        return user;
      };

      if (isSignedIn) {
        //It won't call setState until the operation is resolved
        getCurrentUser().then((data) => {
          setCurrentUser(data);
          setIsUserLogged(true);
        });
      } else {
        setIsUserLogged(false);
      }
    };

    try {
      window.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_KEY,
          scope: SCOPES,
          discoveryDocs: [DISCOVERY_DOCS],
        })
        .then(() => {
          googleAuth = window.gapi.auth2.getAuthInstance();
          setAuth((prevState) => ({
            ...prevState,
            googleAuth,
          }));

          //Check if there is some user logged.
          updateSignInStatus(googleAuth.isSignedIn.get());
          // Listen for sign-in state changes.
          googleAuth.isSignedIn.listen(updateSignInStatus);
        });
    } catch (e) {
      console.log("Catched error from initCLient", e);
    }
  }, [API_KEY, CLIENT_KEY, DISCOVERY_DOCS]);

  const signOut = async () => {
    try {
      await auth.googleAuth.signOut();
      setIsUserLogged(false);
    } catch (e) {
      console.log(e);
    }
  };

  const signIn = async () => {
    try {
      await auth.googleAuth.signIn();
      setIsUserLogged(true);
    } catch (e) {
      console.log(e);
    }
  };

  //One handler to handle both sign-in & sign-out
  const handleAuthButton = () => {
    if (isUserLogged) {
      signOut();
    } else {
      signIn();
    }
  };

  //It will revoke users consents
  const revokeAccess = () => {
    auth.googleAuth.disconnect();
  };

  const makeRequest = () => {
    console.log("Permissions", currentUser.hasGrantedScopes(SCOPES));
    if (isUserLogged) {
      if (currentUser.hasGrantedScopes(SCOPES)) {
        console.log("The request can be made");
        console.log(currentUser);
      } else {
        console.log("More permissions are needed");
        currentUser.grant({ scope: SCOPES });
      }
    } else signIn();
  };

  console.log("USER LOGGED", currentUser);
  console.log("Is user logged", isUserLogged);

  useEffect(() => {
    const handleClientLoad = () => {
      window.gapi.load("client:auth2", initClient);
    };
    const script = document.createElement("script");
    script.onload = handleClientLoad;
    script.src = "https://apis.google.com/js/api.js";
    document.body.appendChild(script);
  }, [initClient]);
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "30%",
          background: "#bdd3ffa3",
          marginBottom: "100px",
          padding: "50px",
        }}
      >
        <button className="button" onClick={handleAuthButton}>
          {isUserLogged ? "Log Out" : "Log In"}
        </button>
        <button className="button" onClick={revokeAccess}>
          Revoke Access
        </button>
        <button className="button" onClick={makeRequest}>
          Make a Request
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "30%",
          background: "#bdd3ffa3",
          marginBottom: "100px",
          padding: "50px",
        }}
      >
        {isUserLogged ? (
          <p className="text">{`Usuario actual: ${currentUser.Au.jf}`}</p>
        ) : null}
      </div>
    </div>
  );
}

export default App;

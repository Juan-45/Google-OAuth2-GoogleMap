import { useEffect, useState, useCallback } from "react";

const useOAuth2 = ({ CLIENT_KEY, API_KEY, SCOPES, DISCOVERY_DOCS }) => {
  const [googleAuth, setGoogleAuth] = useState({});
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [googleUser, setGoogleUser] = useState({});

  const initClient = useCallback(() => {
    let googleAuth;

    const updateSignInStatus = (isSignedIn) => {
      //It dosen't have a then method, so I specified that it is an asyncrhonous function
      const getGoogleUser = async () => {
        try {
          const user = googleAuth.googleUser.get();
          return user;
        } catch (e) {
          console.log("Error on Getting GoogleUser", e);
        }
      };

      const updateStateOnSuccess = (res) => {
        setGoogleUser(res);
        setIsUserLogged(true);
      };

      if (isSignedIn) {
        getGoogleUser().then((res) => {
          updateStateOnSuccess(res);
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
          googleAuth.then((res) => setGoogleAuth(res));

          //Check if there is some user logged.
          updateSignInStatus(googleAuth.isSignedIn.get());
          // Add listener for sign-in state changes.
          googleAuth.isSignedIn.listen(updateSignInStatus);
        });
    } catch (e) {
      console.log("Error on Initializing Client", e);
    }
  }, [API_KEY, CLIENT_KEY, DISCOVERY_DOCS, SCOPES]);

  const signOut = () => googleAuth.signOut();

  const signIn = async () => {
    try {
      await googleAuth.signIn();
    } catch (e) {
      console.log("Error on Singing In", e);
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
  const revokeAccess = async () => {
    try {
      await googleAuth.disconnect();
    } catch (e) {
      console.log("Error on Revoking Access", e);
    }
  };

  const manageRequest = (makeRequest) => {
    const grantAccessTo = async (scope) => {
      try {
        await googleUser.grant({ scope });
      } catch (e) {
        console.log(e);
      }
    };
    if (isUserLogged) {
      if (googleUser.hasGrantedScopes(SCOPES)) {
        makeRequest(window.gapi.client);
      } else {
        grantAccessTo(SCOPES);
      }
    } else signIn();
  };

  console.log("Current User Logged", googleUser);
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

  return {
    handleAuthButton,
    revokeAccess,
    manageRequest,
    googleAuth,
    googleUser,
    isUserLogged,
  };
};

export default useOAuth2;

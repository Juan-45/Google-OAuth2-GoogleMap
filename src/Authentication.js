import useOAuth2 from "authentication/useOAuth2";
import "App.css";

const Authentication = () => {
  const {
    manageRequest,
    handleAuthButton,
    revokeAccess,
    isUserLogged,
    currentUser,
  } = useOAuth2({
    CLIENT_KEY: process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID,
    API_KEY: process.env.REACT_APP_GOOGLE_DRIVE_API_KEY,
    SCOPES:
      "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.readonly",
    DISCOVERY_DOCS:
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  });
  console.log(isUserLogged);
  return (
    <>
      <div className="container">
        <button className="button" onClick={handleAuthButton}>
          {isUserLogged ? "Log Out" : "Log In"}
        </button>
        <button className="button" onClick={revokeAccess}>
          Revoke Access
        </button>
        <button className="button" onClick={manageRequest}>
          Make a Request
        </button>
      </div>
      <div className="container">
        {isUserLogged ? (
          <p className="text">{`Usuario actual: ${currentUser.Au.jf}`}</p>
        ) : null}
      </div>
    </>
  );
};

export default Authentication;

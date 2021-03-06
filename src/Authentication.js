import "App.css";

const Authentication = ({ authSettings }) => {
  const {
    handleAuthButton,
    isUserLogged,
    revokeAccess,
    manageRequest,
    basicProfile,
  } = authSettings;

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
          <p className="text">{`Usuario actual: ${basicProfile.getName()}`}</p>
        ) : null}
      </div>
    </>
  );
};

export default Authentication;

import "App.css";
import Authentication from "Authentication";
import useOAuth2 from "hooks/useOAuth2";
import Map from "MapContainer";

function App() {
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

  const markersCoordinates = [
    { lat: -33.91721, lng: 151.2263 },
    { lat: -33.91539, lng: 151.2282 },
    { lat: -33.91747, lng: 151.22912 },
    { lat: -33.91727341958453, lng: 151.23348314155578 },
  ];

  return (
    <div className="App">
      <Authentication
        manageAuth={{
          handleAuthButton,
          isUserLogged,
          revokeAccess,
          manageRequest,
          currentUser,
        }}
      />

      {isUserLogged ? (
        <Map
          manageMap={{
            apiKey: process.env.REACT_APP_GOOGLE_DRIVE_API_KEY,
            markersCoordinates,
            center: { lat: -33.91721, lng: 151.2263 },
            zoom: 15,
          }}
        />
      ) : null}
    </div>
  );
}

export default App;

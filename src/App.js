import "App.css";
import Authentication from "Authentication";
import useOAuth2 from "hooks/useOAuth2";
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "Map";

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

      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_DRIVE_API_KEY}>
        <Map center={{ lat: -33.91721, lng: 151.2263 }} zoom={15} />
      </Wrapper>
    </div>
  );
}

export default App;

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
    basicProfile,
  } = useOAuth2({
    CLIENT_KEY: process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID,
    API_KEY: process.env.REACT_APP_GOOGLE_DRIVE_API_KEY,
    SCOPES:
      "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.readonly",
    DISCOVERY_DOCS:
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  });

  const markersSettings = [
    {
      position: { lat: -32.950849, lng: -60.676095 },
      adress: "Av. Pellegrini 3676",
      title: "Rosario 1",
      contact: "+54-9-341-5645782",
    },
    {
      position: { lat: -32.948202, lng: -60.654138 },
      adress: "Bv. Oroño 1157",
      title: "Rosario 2",
      contact: "+54-9-341-1457412",
    },
    {
      position: { lat: -32.966602, lng: -60.647773 },
      adress: "Blvd. 27 de Febrero 1400",
      title: "Rosario 3",
      contact: "+54-9-341-4678275",
    },
    {
      position: { lat: -32.96949, lng: -60.667983 },
      adress: "Av. Ovidio Lagos 3126",
      title: "Rosario 4",
      contact: "+54-9-341-8655982",
    },
  ];

  return (
    <div className="App">
      <Authentication
        authSettings={{
          handleAuthButton,
          isUserLogged,
          revokeAccess,
          manageRequest,
          basicProfile,
        }}
      />
      {isUserLogged ? (
        <Map
          mapSettings={{
            apiKey: process.env.REACT_APP_GOOGLE_DRIVE_API_KEY,
            markersSettings,
            center: { lat: -32.959256, lng: -60.660423 },
            zoom: 14,
            iconSetting: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: { height: 45, width: 45 },
            },
          }}
        />
      ) : null}
    </div>
  );
}

export default App;

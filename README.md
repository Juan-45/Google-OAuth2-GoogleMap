## Created using React.js & Google APIs client library for JavaScript (Gapi) & Google Maps JavaScript API React Wrapper. 

### Google OAuth2

The *useOAuth2* hook recieves the following arguments:

- API_KEY: Register your App in Google CLoud Plataform enable the APIs you want to use and get your API_Key 
- CLIENT_KEY: Create it in Google CLoud Plataform
- SCOPE: Scopes enable your application to only request access to the resources that it needs while also enabling users to control the amount of access that they            grant to your application. 
- DISCOVERY_DOCS: Each API's Discovery Document describes the surface of the API.

As the main things at least, **the hook will initialice a googleAuth instance** and will return a handler for LogIn/LogOut and another for revoking access. 

#### Remember

- Add an *.env* file in your app's root folder with the *Client_key & API_key* to be able to work with OAuth authorization.
  Obtain these from Google Cloud Platform.
- To do requests to Google APIs, just remember to modify the SCOPES & DISCOVERY_DOCS values with the appropriate ones.

### Google Maps

We need to install the React Wrapper library in order to be able to work with the "useGoogleMaps" hook, the library will provide a Wrapper component which will initialice a googleMap instance, it needs a API_Key for doing so.
*Add: "@googlemaps/react-wrapper": "^1.1.17", to package.JSON's dependencies and run npm install*

The hook can initialice a simple map, add markers to it, make them clickeable to show infoWindow. Also can initialice streetView, just remember to pass the returned ref by the hook to the DOM element where the map or panorama (StreetView) will be embedded.

### Main Files

For using this features in other projects extract the following files:

  - MapContainer.js
  - Map.js
  - Map.css
  - useGoogleMaps.js
  - useOAuth2.js

### References
- [Google Doc to set up OAuth 2.0 with gapi](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)
- [Google Maps JavaScript API V3 Reference](https://developers.google.com/maps/documentation/javascript/reference)

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "mapContainer/Map";

const MapContainer = ({ mapInitialSettings }) => {
  const { apiKey, ...mapSettings } = mapInitialSettings;

  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return <p>...Loading</p>;
      case Status.FAILURE:
        return <p>Some error occurs</p>;
      case Status.SUCCESS:
        return <Map mapSettings={mapSettings} />;
      default:
        return <p></p>;
    }
  };

  return <Wrapper apiKey={apiKey} render={render} />;
};

export default MapContainer;

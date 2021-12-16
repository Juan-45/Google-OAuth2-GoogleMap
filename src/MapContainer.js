import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "mapContainer/Map";

const MapContainer = ({ mapSettings }) => {
  const { apiKey } = mapSettings;

  return (
    <Wrapper apiKey={apiKey}>
      <Map mapSettings={mapSettings} />
    </Wrapper>
  );
};

export default MapContainer;

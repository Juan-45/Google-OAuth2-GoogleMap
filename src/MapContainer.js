import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "mapContainer/Map";

const MapContainer = ({ mapInitialSettings }) => {
  const { apiKey, ...mapSettings } = mapInitialSettings;

  return (
    <Wrapper apiKey={apiKey}>
      <Map mapSettings={mapSettings} />
    </Wrapper>
  );
};

export default MapContainer;

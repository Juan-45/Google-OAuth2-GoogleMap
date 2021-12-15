import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "mapContainer/Map";

const MapContainer = ({ manageMap }) => {
  const { apiKey } = manageMap;

  return (
    <Wrapper apiKey={apiKey}>
      <Map manageMap={manageMap} />
    </Wrapper>
  );
};

export default MapContainer;

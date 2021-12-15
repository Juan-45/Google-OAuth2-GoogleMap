import { Wrapper } from "@googlemaps/react-wrapper";

const MapContainer = ({ manageMap }) => {
  const { apiKey } = manageMap;

  return <Wrapper apiKey={apiKey}></Wrapper>;
};

export default MapContainer;

import useGoogleMaps from "hooks/useGoogleMaps";

const Map = ({ mapSettings }) => {
  const { ref } = useGoogleMaps({ mapSettings });

  return (
    <div id="mapContainer">
      <div ref={ref} id="map" />
    </div>
  );
};

export default Map;

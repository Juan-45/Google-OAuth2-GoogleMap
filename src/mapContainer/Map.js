import useGoogleMaps from "hooks/useGoogleMaps";

const Map = ({ manageMap }) => {
  const { ref } = useGoogleMaps({ manageMap });

  return (
    <div id="mapContainer">
      <div ref={ref} id="map" />
    </div>
  );
};

export default Map;

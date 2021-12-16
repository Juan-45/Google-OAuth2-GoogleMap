import useGoogleMaps from "hooks/useGoogleMaps";
import ManageInfoWindowHTML from "./map/ManageInfoWindowHTML";

const Map = ({ mapSettings }) => {
  const { markersSettings } = mapSettings;

  const infoWindowSettings = ManageInfoWindowHTML({
    markersSettings,
  });

  const { ref } = useGoogleMaps({ ...mapSettings, infoWindowSettings });

  return (
    <div id="mapContainer">
      <div ref={ref} id="map" />
    </div>
  );
};

export default Map;

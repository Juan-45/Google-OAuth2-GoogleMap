import { useRef, useEffect, useState } from "react";

const Map = ({ manageMap }) => {
  const { markersCoordinates, iconURL, center, zoom } = manageMap;
  const [mapInstance, setMapInstance] = useState();
  const ref = useRef();

  useEffect(() => {
    const initialiceMap = async () => {
      const map = await new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
      return map;
    };

    if (ref.current && !mapInstance) {
      initialiceMap().then((map) => setMapInstance(map));
    }
  }, [center, zoom, mapInstance]);

  useEffect(() => {
    if (ref.current && mapInstance && markersCoordinates) {
      const iconBaseURL = "http://maps.google.com/mapfiles/ms/icons/";

      const icons = {
        blueBubble: iconBaseURL + "blue-dot.png",
      };

      const markerConfig = markersCoordinates.map((item) => ({
        position: { ...item },
        icon: iconURL ? iconURL : icons.blueBubble,
        map: mapInstance,
      }));

      for (let i = 0; i < markerConfig.length; i++) {
        new window.google.maps.Marker(markerConfig[i]);
      }
    }
  }, [mapInstance, iconURL, markersCoordinates]);

  return (
    <div id="mapContainer">
      <div ref={ref} id="map" />
    </div>
  );
};

export default Map;

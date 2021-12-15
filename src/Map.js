import { useRef, useEffect, useState } from "react";

const Map = ({ center, zoom }) => {
  const [mapInstance, setMapInstance] = useState();
  const ref = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
    if (ref.current && !mapInstance) {
      setMapInstance(map);
    }

    const markersCoordinates = [
      { lat: -33.91721, lng: 151.2263 },
      { lat: -33.91539, lng: 151.2282 },
      { lat: -33.91747, lng: 151.22912 },
      { lat: -33.91727341958453, lng: 151.23348314155578 },
    ];

    const iconBaseURL = "http://maps.google.com/mapfiles/ms/icons/";

    const icons = {
      blueBubble: iconBaseURL + "blue-dot.png",
    };

    const markerConfig = markersCoordinates.map((item) => ({
      position: { ...item },
      icon: icons.blueBubble,
      map,
    }));

    for (let i = 0; i < markerConfig.length; i++) {
      console.log(markerConfig[i]);
      new window.google.maps.Marker(markerConfig[i]);
    }
  }, [center, zoom, mapInstance]);

  return (
    <div id="mapContainer">
      <div ref={ref} id="map" />
    </div>
  );
};

export default Map;

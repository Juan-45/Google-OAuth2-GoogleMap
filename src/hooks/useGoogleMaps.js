import { useRef, useEffect, useState } from "react";

const useGoogleMaps = ({ ...mapSettings }) => {
  //The infoWindowHtml parameter should be html code as a string
  const { markersSettings, iconSetting, infoWindowSettings, center, zoom } =
    mapSettings;

  const { infoWindowHtml, addHandlers } = infoWindowSettings;
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
    if (ref.current && mapInstance && markersSettings) {
      const iconBaseURL = "http://maps.google.com/mapfiles/ms/icons/";

      const icons = {
        blueBubble: iconBaseURL + "blue-dot.png",
      };
      const markerConfig = markersSettings.map((item) => ({
        position: item.position,
        icon: iconSetting ? iconSetting : icons.blueBubble,
        map: mapInstance,
      }));

      const infoWindow = new window.google.maps.InfoWindow();

      for (let i = 0; i < markerConfig.length; i++) {
        const marker = new window.google.maps.Marker(markerConfig[i]);

        if (infoWindowHtml) {
          marker.addListener("click", () => {
            infoWindow.setContent(infoWindowHtml[i]);
            infoWindow.open(mapInstance, marker);
            infoWindow.addListener("domready", () => {
              addHandlers();
            });
          });
        }
      }
    }
  }, [mapInstance, iconSetting, markersSettings, infoWindowHtml, addHandlers]);

  return {
    mapInstance,
    ref,
  };
};

export default useGoogleMaps;

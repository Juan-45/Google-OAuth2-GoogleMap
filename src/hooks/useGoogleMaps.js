import { useRef, useEffect, useState, useMemo, useCallback } from "react";

const useGoogleMaps = (mapSettings) => {
  //The infoWindowHtml parameter should be html code as a string
  const {
    locationSettings,
    iconSetting,
    center,
    zoom,
    withGps,
    withStreetView,
    withInfoWindow,
  } = mapSettings;

  const [mapInstance, setMapInstance] = useState();
  const [panorameInstance, setPanorameInstance] = useState();
  const [streetViewSettings, setStreetViewSettings] = useState({
    shouldDisplay: false,
    position: {},
    pov: {},
    zoom: 1,
  });
  const ref = useRef();

  const infoWindowHtml = useMemo(() => {
    const gpsButtonHtml = withGps
      ? '<button class="gpsButton" id="gpsButton">GPS</button>'
      : "";
    const streetViewButton = withStreetView
      ? '<button class="streetButton" id="streetButton">Vista en calle</button>'
      : "";

    const htmlString = locationSettings.map((item) => {
      return (
        '<div class="infoWindowContainer">' +
        `<span class="infoWindowText infoWindowTitle">${item.title}</span>` +
        `<span class="infoWindowText infoWindowP">${item.adress}</span>` +
        `<span class="infoWindowText infoWindowP">${item.contact}</span>` +
        '<div class="infoWindowsButtonContainer">' +
        gpsButtonHtml +
        streetViewButton +
        "</div></div>"
      );
    });
    return htmlString;
  }, [withGps, withStreetView, locationSettings]);

  const gpsButtonHanlder = useCallback(() => console.log("GPS clicked"), []);

  const streetButtonHandler = useCallback((currentMarker) => {
    const getPosition = currentMarker.getPosition();
    setStreetViewSettings({
      shouldDisplay: true,
      position: {
        lng: getPosition.lng(),
        lat: getPosition.lat(),
      },
      pov: currentMarker.pov,
      zoom: currentMarker.zoom,
    });
  }, []);

  const addHandlers = useCallback(
    (currentMarker) => {
      if (withGps) {
        document
          .getElementById("gpsButton")
          .addEventListener("click", gpsButtonHanlder);
      }
      if (withStreetView) {
        document
          .getElementById("streetButton")
          .addEventListener("click", () => streetButtonHandler(currentMarker));
      }
    },
    [gpsButtonHanlder, streetButtonHandler, withGps, withStreetView]
  );

  useEffect(() => {
    const initialiceMap = async () => {
      try {
        const map = new window.google.maps.Map(ref.current, {
          center,
          zoom,
        });
        return map;
      } catch (e) {
        console.log("Error on getting map", e);
      }
    };

    if (ref.current && !mapInstance && !streetViewSettings.shouldDisplay) {
      initialiceMap().then((map) => {
        setMapInstance(map);
      });
    }
  }, [center, zoom, mapInstance, streetViewSettings]);

  useEffect(() => {
    if (ref.current && mapInstance && locationSettings) {
      const iconBaseURL = "http://maps.google.com/mapfiles/ms/icons/";

      const icons = {
        blueBubble: iconBaseURL + "blue-dot.png",
      };
      const markerConfig = locationSettings.map((item) => ({
        position: item.position,
        icon: iconSetting ? iconSetting : icons.blueBubble,
        map: mapInstance,
        pov: item.pov,
        zoom: item.zoom,
      }));

      const infoWindow = new window.google.maps.InfoWindow();

      for (let i = 0; i < markerConfig.length; i++) {
        const marker = new window.google.maps.Marker(markerConfig[i]);

        if (withInfoWindow) {
          marker.addListener("click", () => {
            infoWindow.setContent(infoWindowHtml[i]);
            infoWindow.open(mapInstance, marker);
            infoWindow.addListener("domready", () => {
              addHandlers(marker);
            });
          });
        }
      }
    }
  }, [
    mapInstance,
    iconSetting,
    locationSettings,
    infoWindowHtml,
    addHandlers,
    withInfoWindow,
  ]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const panorama = new window.google.maps.StreetViewPanorama(
          ref.current,
          {
            enableCloseButton: true,
          }
        );
        return panorama;
      } catch (e) {
        console.log("Error on getting panorama", e);
      }
    };
    const { shouldDisplay, ...streetViewPanoramaOptions } = streetViewSettings;
    if (
      ref.current &&
      mapInstance &&
      withStreetView &&
      shouldDisplay &&
      !panorameInstance
    ) {
      initialize().then((res) => {
        setPanorameInstance(res);
        res.setVisible(false);
      });
    }

    if (shouldDisplay && panorameInstance) {
      panorameInstance.setVisible(true);
      panorameInstance.addListener("closeclick", () => {
        setStreetViewSettings({ shouldDisplay: false, position: {} });
        panorameInstance.setVisible(false);
      });
      panorameInstance.setOptions(streetViewPanoramaOptions);
    }
  }, [mapInstance, streetViewSettings, withStreetView, panorameInstance]);

  return {
    mapInstance,
    panorameInstance,
    ref,
  };
};

export default useGoogleMaps;

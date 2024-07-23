import { useState, useEffect } from "react";
import { Map as MapLibreMap, NavigationControl } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
/**
 * Central map component
 */

let lat, long;
const App = () => {
  const [mapReady, setMapReady] = useState(false);
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);
  const coordinates = navigator.geolocation.getCurrentPosition((p) => {
    setlat(p.coords.latitude);
    setlong(p.coords.longitude);
    console.log(lat, long);
  });

  useEffect(() => {
    if (!mapReady) return;

    const map = new MapLibreMap({
      container: "central-map",
      center: [long, lat],
      zoom: 17,
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      transformRequest: (url, resourceType) => {
        if (!url.includes("?")) {
          url = url + "?api_key=VTpwtiO1cCiCX0hle9VTmQiTFKGkSNoKUy52rfi4";
        } else {
          url = url + "&api_key=VTpwtiO1cCiCX0hle9VTmQiTFKGkSNoKUy52rfi4";
        }

        return { url, resourceType };
      },
    });

    const nav = new NavigationControl({
      visualizePitch: true,
    });
    map.addControl(nav, "top-left");
  }, [mapReady, lat, long]);

  return (
    <div
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      ref={() => setMapReady(true)}
      id="central-map"
    />
  );
};

export default App;

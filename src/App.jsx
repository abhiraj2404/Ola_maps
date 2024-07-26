import { useState, useEffect } from "react";
import { Map as MapLibreMap, NavigationControl } from "maplibre-gl";
import maplibregl from "maplibre-gl";
import { Analytics } from "@vercel/analytics/react";

import "maplibre-gl/dist/maplibre-gl.css";
/**
 * Central map component
 */
const API_KEY = import.meta.env.VITE_API_KEY;
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
      zoom: 16,
      bearing: 45, // rotation angle in degrees
      pitch: 60,
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      transformRequest: (url, resourceType) => {
        if (!url.includes("?")) {
          url = url + `?api_key=${API_KEY}`;
        } else {
          url = url + `&api_key=${API_KEY}`;
        }

        return { url, resourceType };
      },
    });

    const markerCoordinates = [long, lat];
    try {
      // Create a new marker
      const marker = new maplibregl.Marker()
        .setLngLat(markerCoordinates) // Set marker position [lng, lat]
        .addTo(map); // Add marker to the map
    } catch (error) {
      console.log("error adding coordinates", error);
    }

    const nav = new NavigationControl({
      visualizePitch: true,
    });
    map.addControl(nav, "top-left");
  }, [mapReady, lat, long]);

  return (
    <>
      <div
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
        ref={() => setMapReady(true)}
        id="central-map"
      />
      <Analytics />
    </>
  );
};

export default App;

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LiveMapTable } from "./LiveMapTable";
import { LiveMapMarkers } from "./LiveMapMarkers";
import { mapboxAccessToken } from "../../../secret";
import { API_FIRES } from "../../config";
import "./style.css";
export const LiveMapChart = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [position] = useState({ lat: -33.82681, lng: -70.3147 });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [retryCount, setRetryCount] = useState(0);
  const mapRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(API_FIRES);
      if (response.status === 429) {
        if (retryCount < 3) {
          setRetryCount(retryCount + 1);
          console.warn("Rate limit exceeded. Retrying...");
          return;
        } else {
          console.error("Max retry attempts reached. Unable to fetch data.");
          return;
        }
      }

      const jsonData = await response.json();
      const sortedData = jsonData.slice().sort((a, b) => b.frp - a.frp);

      if (!isInitialMount.current) {
        setNewData(sortedData); // Set new data for subsequent fetches
      } else {
        isInitialMount.current = false;
        setData(sortedData); // Set initial data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [retryCount]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const getMapSize = () => {
    var size = { height: 600, width: "100%" };
    if (screenWidth < 850) size.height = screenWidth;
    if (screenHeight < 700) size.height = screenHeight * 0.7;
    return size;
  };

  const addNewFire = () => {
    const newFire = {
      acq_date: "2023-12-31",
      acq_time: 453,
      confidence: "n",
      daynight: "N",
      frp: 2.42,
      hour: 4,
      latitude: -34.10789 + (Math.random() * (0.5 - 0.01) + 0.01),
      longitude: -70.45547 + (Math.random() * (0.5 - 0.01) + 0.01),
      scan: 0.42,
      track: 0.61,
    };
    setNewData((currentData) => [...currentData, newFire]);
  };

  const mergeFires = () => {
    setData([...data, ...newData]);
    setNewData([]);
  };

  return (
    <div>
      <h1 className="mt-5 mb-3 text-2xl font-bold text-center text-white md:mt-10 md:mb-2 md:text-5xl">
        Dashboard Incendios en Chile
      </h1>

      {newData.length > 0 && (
        <div className="mb-4 text-center">
          <button
            className="px-4 py-2 ml-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
            onClick={mergeFires}
          >
            Update Fires
          </button>
        </div>
      )}

      <div className="mb-4 text-center">
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => setData([])}
        >
          Reset
        </button>
        <button
          className="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={addNewFire}
        >
          New Fire
        </button>
      </div>

      <div style={{ position: "relative" }}>
        <MapContainer center={position} zoom={5} style={getMapSize()}>
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/sebastiantare/clqk4x12t00fo01qu0wdw0860/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
            attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a> contributors'
          />
          <LiveMapMarkers data={data} mapRef={mapRef} />
        </MapContainer>
      </div>

      {newData.length > 0 && (
        <div className="flex flex-col items-center w-full mt-10">
          <h2 className="inline-block p-2 mx-auto mb-4 text-lg font-semibold text-white bg-red-500 rounded">
            New Fires: {newData.length}
          </h2>
          <div className="w-full glow-effect">
            <LiveMapTable
              data={newData}
              mapRef={mapRef}
              width={getMapSize().width}
            />
          </div>
        </div>
      )}

      <LiveMapTable data={data} mapRef={mapRef} width={getMapSize().width} />

      <div className="my-4">
        <a className="text-blue-200" href="https://github.com/sebastiantare">
          por Sebastán Tare B.
        </a>
        <p className="text-white">
          Datos extraídos de la API de la NASA "FIRMS".
        </p>
      </div>
    </div>
  );
};

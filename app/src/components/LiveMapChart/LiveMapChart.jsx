import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { LiveMapTable } from './LiveMapTable';
import { LiveMapMarkers } from './LiveMapMarkers';
import { mapboxAccessToken } from '../../../secret';
import { API_FIRES } from '../../config';

export const LiveMapChart = () => {
    const [data, setData] = useState([]);
    //Default position
    const [position, setPosition] = useState({ 'lat': -33.82681, 'lng': -70.3147 });
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [retryCount, setRetryCount] = useState(0);

    const mapRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_FIRES);

                if (response.status === 429) {
                    if (retryCount < 3) {
                        setRetryCount(retryCount + 1);
                        console.warn('Rate limit exceeded. Retrying...');
                        alert("Muchas peticiones x Minuto. Espere un poco...");
                        return;
                    } else {
                        console.error('Max retry attempts reached. Unable to fetch data.');
                        return;
                    }
                }

                const jsonData = await response.json();
                console.log(jsonData);
                const sortedData = jsonData.slice().sort((a, b) => b.frp - a.frp);
                setTimeout(() => fetchData(), 60 * 1000);
                setData(sortedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [retryCount]);

    const getMapSize = () => {
      var size = { height: 600, width: "100%" };
      if (screenWidth < 850) size.height = screenWidth;
      if (screenHeight < 700) size.height = screenHeight * 0.7;
      return size;
    };

    const getTableSize = () => {
      var size = { height: 600, width: "100%" };
      if (screenWidth < 850) size.width = screenWidth;
      if (screenHeight < 700) size.height = screenHeight * 0.7;
      return size;
    };

    return (
      <div>
        <h1 className="mt-5 mb-3 text-2xl font-bold text-center text-white md:mt-10 md:mb-2 md:text-5xl">
          Dashboard Incendios en Chile
        </h1>
        <MapContainer center={position} zoom={5} style={getMapSize()}>
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/sebastiantare/clqk4x12t00fo01qu0wdw0860/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
            attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a> contributors'
          />

          <LiveMapMarkers data={data} mapRef={mapRef} />
        </MapContainer>

        <LiveMapTable
          data={data}
          mapRef={mapRef}
          width={getTableSize().width}
        />
      </div>
    );
};

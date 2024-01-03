import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export const LiveMapTable = ({ data, mapRef }) => {

  const handleTableRowClick = (index) => {
    const selectedFire = data[index];
    if (selectedFire) {
      const map = mapRef.current;
      map.flyTo(
        { lat: selectedFire.latitude, lng: selectedFire.longitude },
        14
      );
    }
  };

  const getConfidence = (con) => {
    switch (con) {
      case "n":
        return "Normal";
      case "h":
        return "Alta";
      default:
        return "";
    }
  };

  return (
    <div className="relative mx-4 overflow-x-auto shadow-md sm:rounded-lg md:mx-0">
      <h2 className="mt-4 mb-2 text-2xl font-bold text-center text-white lg:text-left">
        Fecha Incendios {data && data.length > 0 && data[0]["acq_date"]}
      </h2>
      <div className="min-w-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-xl">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Poder Radiativo{" "}
                <span className="invisible md:visible">del Fuego</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Hora Medición
              </th>
              <th scope="col" className="px-6 py-3">
                Confianza
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ frp, hour, confidence }, index) => (
              <tr
                key={index}
                onClick={() => handleTableRowClick(index)}
                className={` bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
              >
                <td className="px-6 py-1 font-medium text-gray-900 md:py-4 whitespace-nowrap dark:text-white">
                  {frp}
                </td>
                <td className="px-6 py-1 md:py-4">{hour}:00</td>
                <td className="px-6 py-4">{getConfidence(confidence)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

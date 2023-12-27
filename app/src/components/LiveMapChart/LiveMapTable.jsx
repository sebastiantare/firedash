import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';

export const LiveMapTable = ({ data, mapRef, width }) => {


    const handleTableRowClick = (index) => {
        const selectedFire = data[index];

        if (selectedFire) {
            const map = mapRef.current;
            console.log('Selected Fire' + index);
            map.flyTo({ lat: selectedFire.latitude, lng: selectedFire.longitude }, 14)
        }
    };

    const getConfidence = (con) => {
        switch (con) {
            case 'n':
                return 'Normal';
            case 'h':
                return 'Alta';
        }
    }

    return (
        <div style={{ width: width, margin: 'auto' }}>
            <h2 className="mt-4 text-white">Fecha Incendios {data && data.length > 0 && data[0]['acq_date']}</h2>
            <table className="table table-dark table-striped mt-3">
                <thead>
                    <tr>
                        <th scope="col">Poder Radiativo del Fuego</th>
                        <th scope="col">Hora Medición</th>
                        <th scope="col">Confianza</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ frp, hour, confidence }, index) => (
                        <tr
                            key={index}
                            onClick={() => handleTableRowClick(index)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{frp}</td>
                            <td>{hour}:00</td>
                            <td>{getConfidence(confidence)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4">
                <a className="text-white" href='https://github.com/sebastiantare'>por Sebastán Tare B.</a>
                <p className="text-white">Datos extraídos de la API de la NASA "FIRMS".</p>
            </div>
        </div>
    );
}
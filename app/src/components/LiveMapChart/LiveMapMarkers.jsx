import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export const LiveMapMarkers = ({ data, mapRef }) => {
    const map = useMap();

    useEffect(() => {
        if (mapRef.current !== map) {
          mapRef.current = map;
        }
      }, [map, mapRef]);

    const getIcon = (frp) => {
        var multiplier = 1;
        if (frp < 30) multiplier = 0.5;
        if (frp >= 30 && frp <= 400) multiplier = 1;
        if (frp > 400) multiplier = 2;

        const svgIcon = new L.Icon({
            iconUrl: '/img/fire.svg',
            iconSize: [32 * multiplier, 32 * multiplier],
            iconAnchor: [16 * multiplier, 32 * multiplier],
        });

        return svgIcon
    }

    const getConfidence = (con) => {
        switch (con) {
            case 'n':
                return 'Normal';
            case 'h':
                return 'Alta';
        }
    }

    return (
        data.sort().map(({ latitude, longitude, frp, acq_date, hour, confidence}, index) => (
            <Marker
                icon={getIcon(frp)}
                key={index}
                position={{ lat: latitude, lng: longitude }}>
                <Popup>
                    <p>Poder Radiativo del Fuego: {frp}</p>
                    <p>Hora Captura: ~{hour}:00</p>
                    <p>Confianza: {getConfidence(confidence)}</p>
                    <a target="_blank" href={`https://www.google.com/maps/place/${latitude},${longitude}/@${latitude},${longitude},15z`}>Ver en google maps</a>
                </Popup>
            </Marker>
        ))
    );
}
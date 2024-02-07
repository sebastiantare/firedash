import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getConfidence, formatHour } from '../../common';

type TableProps = {
    data: any;
    mapRef: any;
};

type Fire = {
    latitude: number;
    longitude: number;
    brightness: number;
    scan: number;
    track: number;
    acq_date: string;
    acq_time: number;
    satellite: string;
    instrument: string;
    confidence: number;
    version: string;
    bright_t31: number;
    frp: number;
    daynight: string;
    ftype: number;
    comuna: string;
};

export const FireMarker = ({ data, mapRef }: TableProps) => {
    const map = useMap();

    useEffect(() => {
        if (mapRef.current !== map) {
            mapRef.current = map;
        }
    }, [map, mapRef]);

    const getIcon = (frp: number) => {
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

    return (
        data.sort().map(({ frp, latitude, longitude, acq_time, confidence }: Fire, index: number) => (
            <Marker
                icon={getIcon(frp)}
                key={index}
                position={{ lat: latitude, lng: longitude }}>
                <Popup>
                    <p>Poder Radiativo del Fuego: {frp}</p>
                    <p>Hora Captura: {formatHour(acq_time)}</p>
                    <p>Confianza: {getConfidence(confidence)}</p>
                    <a target="_blank" href={`https://www.google.com/maps/place/${latitude},${longitude}/@${latitude},${longitude},15z`}>Ver en google maps</a>
                </Popup>
            </Marker>
        ))
    );
}
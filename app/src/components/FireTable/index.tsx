import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { formatHour, getConfidence, comunas } from '../../common';
import Select from 'react-select';
import { FiresChart } from '../FiresChart';

type TableProps = {
    data: any;
    mapRef: any;
};

type TableRowProps = {
    frp: number;
    acq_time: number;
    confidence: number;
    comuna: string;
    latitude: number;
    longitude: number;
};

type TableState = {
    sortField: string;
    sortDirection: string;
    selectedComuna: string;
};

type comunasType = {
    value: string;
    label: string;
    count: number;
};

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

export const FireTable = (props:TableProps) => {
    const { data, mapRef } = props;

    const [sortField, setSortField] = useState('frp');
    const [sortDirection, setSortDirection] = useState('desc');
    const [selectedComuna, setSelectedComuna] = useState<comunasType | null>(null);

    const comunasOptions:comunasType[] = comunas.map((comuna) => {
        const count = data.filter((fire:TableRowProps) => fire.comuna === comuna).length;
        return { value: comuna, label: `${comuna} (${count})`, count: count };
    });

    /** @param {number} index **/
    const handleTableRowClick = (index:number) => {
        const selectedFire = sortedData[index];
        console.log(comunas)
        // Scroll to top
        window.scrollTo(0, 0);

        if (selectedFire) {
            const map = mapRef.current;
            map.flyTo(
                { lat: selectedFire.latitude, lng: selectedFire.longitude },
                14
            );
        }
    };

    /** @param {string} field **/
    const handleSort = (field:string) => {
        let direction = 'asc';
        if (sortField === field && sortDirection === 'asc') {
            direction = 'desc';
        }
        setSortField(field);
        setSortDirection(direction);
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortField === null) return 0;
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    useEffect(() => {
        console.log('selectedComuna', selectedComuna);
    }, [selectedComuna]);

    const handleSelectChange = (option:comunasType | null) => {
        setSelectedComuna(option);
    };

    return (
        <div className="relative mx-4 overflow-x-auto shadow-md sm:rounded-lg md:mx-0">

            <h2 className="mt-4 mb-2 text-2xl font-bold text-center text-white lg:text-left">
                Fecha Incendios {data && data.length > 0 && data[0]["acq_date"]}
            </h2>

            <h4 className="mb-2 text-xl font-bold text-center text-white lg:text-left">
                Incendios Activos: {data && data.length}
            </h4>

            <div className="flex justify-center mb-4">
                <FiresChart data={data} />
            </div>

            <div className="flex justify-end mb-4 flex-grow-0 sm:flex-grow md:flex-grow-0 lg:flex-grow xl:flex-grow-0">
                <Select
                    className="w-64"
                    placeholder="Filtrar por comuna"
                    options={comunasOptions.sort((a, b) => a.count < b.count ? 1 : -1)}
                    value={selectedComuna}
                    isSearchable
                    onChange={handleSelectChange}
                />
            </div>

            <div className="min-w-full mx-auto m-8">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-xl">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className={`px-6 py-3 ${sortField === 'frp' ? 'text-blue-500' : ''}`} onClick={() => handleSort('frp')}>
                                Poder Radiativo{" "}
                                <span className="invisible md:visible">del Fuego</span>
                                {sortField === 'frp' && sortDirection === 'asc' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.5l2.97-2.97a.75.75 0 0 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 1.06-1.06L9.25 14.25V3.75A.75.75 0 0 1 10 3z" />
                                    </svg>
                                )}
                                {sortField === 'frp' && sortDirection === 'desc' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.75l-2.97 2.97a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L10.75 5.25v10.5A.75.75 0 0 1 10 17z" />
                                    </svg>
                                )}
                            </th>
                            <th scope="col" className={`px-6 py-3 ${sortField === 'acq_time' ? 'text-blue-500' : ''}`} onClick={() => handleSort('acq_time')}>
                                Hora Medición (GMT)
                                {sortField === 'acq_time' && sortDirection === 'asc' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.5l2.97-2.97a.75.75 0 0 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 1.06-1.06L9.25 14.25V3.75A.75.75 0 0 1 10 3z" />
                                    </svg>
                                )}
                                {sortField === 'acq_time' && sortDirection === 'desc' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.75l-2.97 2.97a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L10.75 5.25v10.5A.75.75 0 0 1 10 17z" />
                                    </svg>
                                )}
                            </th>
                            <th scope="col" className={`px-6 py-3 ${sortField === 'confidence' ? 'text-blue-500' : ''}`} onClick={() => handleSort('confidence')}>
                                Confianza
                                {sortField === 'confidence' && sortDirection === 'asc' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.5l2.97-2.97a.75.75 0 0 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 1.06-1.06L9.25 14.25V3.75A.75.75 0 0 1 10 3z" />
                                    </svg>
                                )}
                                {sortField === 'confidence' && sortDirection === 'desc' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.75l-2.97 2.97a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L10.75 5.25v10.5A.75.75 0 0 1 10 17z" />
                                    </svg>
                                )}
                            </th>
                            <th scope="col" className={`px-6 py-3 ${sortField === 'comuna' ? 'text-blue-500' : ''}`} onClick={() => handleSort('comuna')}>
                                Comuna
                                {sortField === 'comuna' && sortDirection === 'asc' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.5l2.97-2.97a.75.75 0 0 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 1.06-1.06L9.25 14.25V3.75A.75.75 0 0 1 10 3z" />
                                    </svg>
                                )}
                                {sortField === 'comuna' && sortDirection === 'desc' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.75l-2.97 2.97a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L10.75 5.25v10.5A.75.75 0 0 1 10 17z" />
                                    </svg>
                                )}
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedData.filter((fire) => selectedComuna === null || fire.comuna === selectedComuna.value)
                            .map(({ frp, acq_time, confidence, comuna, latitude, longitude }, index) => (
                                <tr
                                    key={index}
                                    onClick={() => handleTableRowClick(index)}
                                    className={` bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                                >
                                    <td className="px-6 py-1 font-medium text-gray-900 md:py-4 whitespace-nowrap dark:text-white">
                                        {frp}
                                    </td>
                                    <td className="px-6 py-1 md:py-4">{formatHour(acq_time)}</td>
                                    <td className="px-6 py-4">{getConfidence(confidence)}</td>
                                    <td className="px-6 py-4">{comuna}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

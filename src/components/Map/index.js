import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';

function Map({ medicals }) {
    const center = { lat: 16.0760844, lng: 108.244182 };
    const ZOOM_LEVEL = 15;
    const mapRef = useRef();
    const markerIcon = new L.Icon({
        iconUrl: '/images/marker.png',
        iconSize: [40, 40],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
    });
    return (
        <>
            <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} style={{ height: 350, marginBottom: 45 }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {medicals.map((medical) => (
                    <Marker
                        position={[medical.latitude, medical.longitude]}
                        icon={markerIcon}
                        key={medical.medicalShopId}
                    >
                        <Popup>
                            <b>
                                <Link to={`/medical-shop/${medical.medicalShopId}`}>{medical.medicalShopName}</Link>
                            </b>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </>
    );
}

export default Map;

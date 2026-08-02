'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons not showing up with Next.js/webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type Field = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export default function FieldsMap({ fields }: { fields: Field[] }) {
  return (
    <MapContainer
      center={[43.7, -79.4]} // roughly Toronto
      zoom={10}
      style={{ height: '400px', width: '100%', borderRadius: '8px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {fields.map((field) => (
        <Marker key={field.id} position={[field.latitude, field.longitude]}>
          <Popup>
            <strong>{field.name}</strong>
            <br />
            {field.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
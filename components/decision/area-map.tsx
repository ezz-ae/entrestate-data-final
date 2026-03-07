"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { areaCoordinates } from "@/lib/area-coordinates";
import { DecisionRecord } from "@/lib/decision-infrastructure";
import L from "leaflet";

// Hack to fix leaflet's default icon path
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


type AreaMapProps = {
  areas: Array<DecisionRecord & { slug: string }>;
};

export function AreaMap({ areas }: AreaMapProps) {
  const center: [number, number] = [25.118, 55.139]; // Default to Palm Jumeirah

  return (
    <MapContainer center={center} zoom={11} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {areas.map((area) => {
        const areaName = String(area.area ?? "").toLowerCase();
        const coords = areaCoordinates[areaName];

        if (!coords) {
          return null;
        }

        return (
          <Marker key={area.slug} position={[coords.lat, coords.lng]}>
            <Popup>
              <b>{area.area}</b>
              <br />
              Projects: {area.projects}
              <br />
              Avg. Price: {area.avg_price}
              <br />
              Avg. Yield: {area.avg_yield}%
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

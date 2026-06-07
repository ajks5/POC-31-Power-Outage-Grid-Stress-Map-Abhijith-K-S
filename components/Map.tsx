"use client";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Outage {
  id: number;
  region: string;
  severity: "high" | "medium" | "low";
  customers: number;
  lat: number;
  lng: number;
}

export default function Map({ outages }: { outages: Outage[] }) {
  const center: [number, number] = [39.5, -98.35];

  const getMarkerColor = (severity: string) => {
    if (severity === "high") return "#ef4444";
    if (severity === "medium") return "#f97316";
    return "#eab308";
  };

  const valid = outages.filter(
    (o) => typeof o.lat === "number" && typeof o.lng === "number"
  );

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={4.5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; CARTO"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {valid.map((outage) => (
          <CircleMarker
            key={outage.id}
            center={[outage.lat, outage.lng]}
            radius={outage.severity === "high" ? 16 : 10}
            pathOptions={{
              fillColor: getMarkerColor(outage.severity),
              fillOpacity: 0.6,
              color: getMarkerColor(outage.severity),
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-gray-900 text-sm">
                <strong>{outage.region} </strong>
                <br />
                Severity: {outage.severity}
                <br />
                Affected: {outage.customers.toLocaleString()} customers
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
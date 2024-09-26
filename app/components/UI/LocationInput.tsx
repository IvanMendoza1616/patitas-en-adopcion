"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import SearchField from "./SearchField";
import { useState } from "react";

type Props = {
  defaultAddress: string;
  defaultCoordinates: [number, number];
};

export default function LocationInput({
  defaultAddress,
  defaultCoordinates,
}: Props) {
  const [longitude, setLongitude] = useState(defaultCoordinates[0]);
  const [latitude, setLatitude] = useState(defaultCoordinates[1]);
  const [address, setAddress] = useState(defaultAddress);

  return (
    <div className="flex flex-col gap-4">
      <p className="">{address}</p>
      <MapContainer
        center={[latitude, longitude]}
        zoom={18}
        scrollWheelZoom={false}
        style={{ height: "500px" }}
      >
        <SearchField
          setLongitude={setLongitude}
          setLatitude={setLatitude}
          setAddress={setAddress}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
      <input
        name="longitude"
        id="longitude"
        type="text"
        className="hidden"
        value={longitude}
        readOnly
      />
      <input
        name="latitude"
        id="latitude"
        type="text"
        className="hidden"
        value={latitude}
        readOnly
      />
      <input
        name="address"
        id="address"
        type="text"
        className="hidden"
        value={address}
        readOnly
      />
    </div>
  );
}

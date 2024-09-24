"use client";
import { EsriProvider, GeoSearchControl } from "leaflet-geosearch";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";

type Props = {
  setLongitude: Dispatch<SetStateAction<number>>;
  setLatitude: Dispatch<SetStateAction<number>>;
  setAddress: Dispatch<SetStateAction<string>>;
};

const provider = new EsriProvider();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const searchControl = new GeoSearchControl({
  provider: provider,
  style: "bar",
});

export default function SearchField({
  setLongitude,
  setLatitude,
  setAddress,
}: Props) {
  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    map.on("geosearch/showlocation", (event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = event as any;
      setLongitude(result.location.x);
      setLatitude(result.location.y);
      setAddress(result.location.label);
    });
    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation"); // Clean up event listener
    };
  }, [map, setAddress, setLatitude, setLongitude]);

  return null;
}

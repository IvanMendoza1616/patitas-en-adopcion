import { QueryParams } from "@/app/types/types";
import axios from "axios";
import { useState } from "react";

type Props = {
  queryParams: QueryParams;
  setQueryParams: (newParams: Record<string, string>) => void;
};

export default function DistanceInput({ queryParams, setQueryParams }: Props) {
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitPostalCode = async () => {
    setLoading(true);
    //Get data from Postal Code
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&format=json&country=mexico`,
    );
    const data = response.data;
    if (data.length === 0 || !postalCode) setError("*Invalid Postal Code");
    else
      setQueryParams({
        postalCode,
        lat: data[0].lat,
        lon: data[0].lon,
        distance: "20",
        page: "1",
      });
    setLoading(false);
  };

  if (!queryParams.postalCode)
    return (
      <div className="flex flex-col gap-1">
        {error && <p className="text-xs">{error}</p>}

        <label htmlFor="postalCode">Postal Code</label>
        <div className="flex gap-2">
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            className="max-w-[60px] px-2"
            onChange={(e) => {
              e.stopPropagation();
              setError("");
              setPostalCode(e.target.value);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                const inputElement = e.target as HTMLInputElement;
                inputElement.blur();
                await handleSubmitPostalCode();
              }
            }}
          />
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmitPostalCode}
            className="self-start bg-gray-300 px-4"
          >
            {loading ? "Loading" : "Search"}
          </button>
        </div>
      </div>
    );

  return (
    <>
      <div className="flex flex-col gap-1">
        <p>Postal Code</p>
        <div className="flex gap-2">
          <p>{queryParams.postalCode}</p>
          <button
            className="bg-gray-300 px-4"
            type="button"
            onClick={() => {
              // Check if sort is distance related and if so, reset it
              const sort =
                queryParams.sort === "nearest" ||
                queryParams.sort === "farthest"
                  ? ""
                  : queryParams.sort?.toString() || "";
              setPostalCode("");
              setQueryParams({
                postalCode: "",
                lat: "",
                lon: "",
                distance: "",
                sort,
                page: "1",
              });
            }}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="distance">Distance</label>
        <select
          name="distance"
          id="distance"
          defaultValue={queryParams.distance?.toString()}
          onChange={(e) => {
            setQueryParams({ distance: e.target.value, page: "1" });
          }}
        >
          <option value="20">20 km or less</option>
          <option value="50">50 km or less</option>
          <option value="100">100 km or less</option>
          <option value="200">200 km or less</option>
          <option value="20038">Any distance</option>
        </select>
      </div>
    </>
  );
}

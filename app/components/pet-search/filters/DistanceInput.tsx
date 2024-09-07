import { ReadonlyURLSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  queryParams: ReadonlyURLSearchParams;
  setQueryParams: (newParams: Record<string, string>) => void;
};

export default function DistanceInput({ queryParams, setQueryParams }: Props) {
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitPostalCode = async () => {
    setLoading(true);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&format=json&country=mexico`,
    );
    const data = await response.json();
    if (data.length === 0) setError("*Invalid Postal Code");
    else
      setQueryParams({
        postalCode,
        lat: data[0].lat,
        lon: data[0].lon,
        distance: "20",
      });
    setLoading(false);
  };

  if (!queryParams.get("postalCode"))
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
            {loading ? "Loading" : "Save"}
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <p>Postal Code</p>
        <div className="flex gap-2">
          <p>{queryParams.get("postalCode")}</p>
          <button
            className="bg-gray-300 px-4"
            type="button"
            onClick={() => {
              setQueryParams({
                postalCode: "",
                lat: "",
                lon: "",
                distance: "",
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
          defaultValue={queryParams.get("distance")?.toString()}
          onChange={(e) => {
            setQueryParams({ distance: e.target.value });
          }}
        >
          <option value="20">20 km or less</option>
          <option value="50">50 km or less</option>
          <option value="100">100 km or less</option>
          <option value="200">200 km or less</option>
          <option value="">Any distance</option>
        </select>
      </div>
    </div>
  );
}

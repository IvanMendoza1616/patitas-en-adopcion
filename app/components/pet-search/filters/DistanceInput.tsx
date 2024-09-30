import { QueryParams } from "@/app/types/types";
//import axios from "axios";
import { useEffect, useState } from "react";
import { EsriProvider } from "leaflet-geosearch";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import SelectInput from "../../UI/inputs/SelectInput";
import Button from "../../UI/Button";

type Props = {
  queryParams: QueryParams;
  setQueryParams: (newParams: Record<string, string>) => void;
  className?: string;
};

const provider = new EsriProvider();

export default function DistanceInput({
  queryParams,
  setQueryParams,
  className,
}: Props) {
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAddress = async () => {
      if (queryParams.postalCode && queryParams.postalCode.length === 5) {
        const data = await provider.search({
          query: `${queryParams.postalCode}, México`,
        });

        if (data.length !== 0) setAddress(data[0].label);
      }
    };

    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitPostalCode = async () => {
    setLoading(true);
    const data = await provider.search({
      query: `${postalCode}, México`,
    });

    if (postalCode.length !== 5 || data.length === 0)
      setError("*Invalid Postal Code");
    else {
      setAddress(data[0].label);
      setQueryParams({
        postalCode,
        lat: data[0].y.toString(),
        lon: data[0].x.toString(),
        distance: "20",
        page: "1",
      });
    }
    setLoading(false);
  };

  if (!queryParams.postalCode)
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <label className="text-lg font-semibold" htmlFor="postalCode">
          Location
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Enter postal code"
            name="postalCode"
            id="postalCode"
            className="w-full rounded-md border px-3 py-2 focus:outline-primary"
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
            className="self-stretch rounded-md border p-2 transition ease-in-out hover:border-primary-light hover:bg-primary-light"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
        {error && <p className="text-xs">{error}</p>}
      </div>
    );

  return (
    <>
      <div className={`flex flex-col gap-2 ${className}`}>
        <p className="text-lg font-semibold">Location</p>
        <div className="flex flex-col items-start gap-2">
          <p>{address || `Postal code: ${queryParams.postalCode}`}</p>
          <Button
            type="button"
            variant="secondary"
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
            Change
          </Button>
        </div>
      </div>
      <div className={`flex flex-col gap-1 ${className}`}>
        <label className="text-lg font-semibold" htmlFor="distance">
          Distance
        </label>
        <SelectInput
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
        </SelectInput>
      </div>
    </>
  );
}

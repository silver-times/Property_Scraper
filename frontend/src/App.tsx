import { useEffect, useState } from "react";
import Property from "./component/Property";
import * as api from "./api/api";
import type { PropertyType } from "./types/types";

export const App = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [pageNumber, setPageNumber] = useState(0);

  const handleNextPage = async () => {
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
    const receivedProperties = await api.fetchProperties(nextPage);
    setProperties(receivedProperties);
  };

  const handlePreviousPage = async () => {
    const nextPage = pageNumber - 1;
    setPageNumber(nextPage);
    const receivedProperties = await api.fetchProperties(nextPage);
    setProperties(receivedProperties);
  };

  useEffect(() => {
    const fetchProperties = async (pageNumber: number) => {
      const receivedProperties = await api.fetchProperties(pageNumber);
      setProperties(receivedProperties);
    };
    fetchProperties(pageNumber);
  }, [pageNumber]);

  return (
    <>
      <div className="container mx-auto py-24 gap-20 h-full w-full">
        <h1 className="text-4xl sm:text-8xl text-center font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-red-500">
          BuyProperties.cz
        </h1>
      </div>
      <div className="container pb-24 px-4 mx-auto flex flex-wrap items-center justify-center gap-10">
        {properties.length > 0 ? (
          properties.map((property: PropertyType) => (
            <div key={property.id}>
              <Property {...property} />
            </div>
          ))
        ) : (
          <p>No properties available for this page.</p>
        )}
        <div className="container mx-atuo py-24 join flex items-center justify-center">
          <button
            onClick={handlePreviousPage}
            disabled={pageNumber === 0}
            className="join-item btn btn-lg bg-primary"
          >
            «
          </button>
          <button className="join-item btn btn-lg bg-primary">
            Page {pageNumber} / 43
          </button>
          <button
            onClick={handleNextPage}
            disabled={pageNumber > 42}
            className="join-item btn btn-lg bg-primary"
          >
            »
          </button>
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-400">
          Crafted with ❤️ by Rajat for Luxonis
        </h1>
      </div>
    </>
  );
};

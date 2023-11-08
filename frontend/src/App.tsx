import { useEffect, useState } from "react";
import Property from "./component/Property";
import * as api from "./api/api";
import type { PropertyType } from "./types/propertyType";

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
      <div className="container mx-auto flex items-center justify-center pt-20 gap-20">
        <h1 className="text-4xl text-center ">Properties</h1>
        <div className="join flex items-center justify-center">
          <button
            onClick={handlePreviousPage}
            disabled={pageNumber === 0}
            className="join-item btn btn-lg bg-primary"
          >
            «
          </button>
          <button className="join-item btn btn-lg bg-primary">
            Page {pageNumber}
          </button>
          <button
            onClick={handleNextPage}
            disabled={pageNumber > 42}
            className="join-item btn btn-lg bg-primary"
          >
            »
          </button>
        </div>
      </div>

      <div className="p-4 mx-auto flex flex-wrap items-center justify-center gap-20">
        {properties.length > 0 ? (
          properties.map((property: PropertyType) => (
            <div key={property.id}>
              <h1 className="text-2xl">{JSON.stringify(property.id)}</h1>
              <Property {...property} />
            </div>
          ))
        ) : (
          <p>No properties available for this page.</p>
        )}
      </div>
    </>
  );
};

import { useEffect, useState } from "react";
import Property from "./component/Property";
import type { PropertyType } from "./types/propertyType";

export const App = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch("http://localhost:5000/api/property");
      const data = await response.json();
      setProperties(data as PropertyType[]);
    };
    fetchProperties();
  }, []);

  return (
    <>
      <h1 className="text-4xl text-center p-20">Properties</h1>;
      <div className="p-4 mx-auto flex flex-wrap items-center justify-center gap-20">
        {properties.map((property: PropertyType) => (
          <div key={property.id}>
            <Property {...property} />
          </div>
        ))}
      </div>
    </>
  );
};

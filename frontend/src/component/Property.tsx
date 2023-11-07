import React from "react";
import type { PropertyType } from "../types/propertyType";

const Property: React.FC<PropertyType> = ({
  title,
  price,
  locality,
  images,
}) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={images[0]} alt={`Image ${title}`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{locality}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">{price}</button>
        </div>
      </div>
    </div>
  );
};

export default Property;

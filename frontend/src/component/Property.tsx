import React, { useState } from "react";
import type { PropertyType } from "../types/types";
import Modal from "./Modal";

const Property: React.FC<PropertyType> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-96 h-fit group">
      <div className="indicator">
        <div className="relative overflow-hidden">
          <span className="indicator-item indicator-bottom indicator-end badge badge-primary p-4 my-8 mr-24 font-extrabold text-md">
            {props.price}
          </span>

          <img
            className="w-96 object-cover"
            src={props.images[0]}
            alt={`Image ${props.title}`}
          />

          <div className="absolute h-full w-full bg-black/60 text-white text-center flex flex-col items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
            <h2 className="mt-3 text-2xl capitalize">{props.title}</h2>
            <p className="text-sm mt-2 ml-1 mb-5 inline-block">
              {props.locality}
            </p>
            <button className="bg-primary py-2 px-5" onClick={openModal}>
              View more
            </button>
          </div>
        </div>
      </div>
      <Modal
        title={props.title}
        locality={props.locality}
        isOpen={isModalOpen}
        closeModal={closeModal}
        images={props.images}
      />
    </div>
  );
};

export default Property;

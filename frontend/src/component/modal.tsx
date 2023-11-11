import type { ModalViewType } from "../types/types";

export const ModalView: React.FC<ModalViewType> = ({
  title,
  locality,
  isOpen,
  closeModal,
  images,
}: ModalViewType) => {
  return (
    <dialog
      open={isOpen}
      onClick={closeModal}
      className="modal h-full fixed z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="modal-box m-32 w">
        <h1 className="text-xl text-center">{title}</h1>
        <p className="text-4xl text-center">{locality}</p>
        {images.map((image, index) => (
          <img key={index} src={image} alt={locality} className="w-full my-5" />
        ))}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>Close</button>
      </form>
    </dialog>
  );
};

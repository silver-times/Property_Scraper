export type PropertyType = {
  id: number;
  title: string;
  price: string;
  locality: string;
  images: string[];
};

export type ModalViewType = {
  title: string;
  locality: string;
  isOpen: boolean;
  images: string[];
  closeModal: () => void;
};

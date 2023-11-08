export type PropertyType = {
  id: number;
  title: string;
  price: string;
  locality: string;
  images: string[];
};

export type ModalType = {
  title: string;
  locality: string;
  isOpen: boolean;
  images: string[];
  closeModal: () => void;
};

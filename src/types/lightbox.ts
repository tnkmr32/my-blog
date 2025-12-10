export interface LightboxImage {
  src: string;
  alt: string;
}

export interface LightboxState {
  isOpen: boolean;
  currentImage: LightboxImage | null;
  images: LightboxImage[];
  currentIndex: number;
}

import type {LightboxImage} from '@/types/lightbox';

interface PostImageProps {
  src: string;
  alt: string;
  index: number;
  onImageClick: (image: LightboxImage, index: number) => void;
}

export const PostImage = (props: PostImageProps) => {
  const handleClick = () => {
    props.onImageClick({src: props.src, alt: props.alt}, props.index);
  };

  return (
    <img
      src={props.src}
      alt={props.alt}
      onClick={handleClick}
      className="cursor-pointer transition-opacity hover:opacity-80"
    />
  );
};

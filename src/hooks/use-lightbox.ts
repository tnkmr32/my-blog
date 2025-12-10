import {useCallback, useEffect, useState} from 'react';
import type {LightboxImage, LightboxState} from '@/types/lightbox';

export const useLightbox = () => {
  const [state, setState] = useState<LightboxState>({
    isOpen: false,
    currentImage: null,
    images: [],
    currentIndex: 0,
  });

  const openLightbox = useCallback(
    (image: LightboxImage, index: number, allImages: LightboxImage[]) => {
      setState({
        isOpen: true,
        currentImage: image,
        images: allImages,
        currentIndex: index,
      });
    },
    [],
  );

  const closeLightbox = useCallback(() => {
    setState({
      isOpen: false,
      currentImage: null,
      images: [],
      currentIndex: 0,
    });
  }, []);

  const goToNext = useCallback(() => {
    setState(prev => {
      if (prev.images.length === 0) return prev;
      const nextIndex = (prev.currentIndex + 1) % prev.images.length;
      return {
        ...prev,
        currentIndex: nextIndex,
        currentImage: prev.images[nextIndex],
      };
    });
  }, []);

  const goToPrevious = useCallback(() => {
    setState(prev => {
      if (prev.images.length === 0) return prev;
      const prevIndex =
        (prev.currentIndex - 1 + prev.images.length) % prev.images.length;
      return {
        ...prev,
        currentIndex: prevIndex,
        currentImage: prev.images[prevIndex],
      };
    });
  }, []);

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!state.isOpen) return;

      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === 'ArrowLeft') {
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen, closeLightbox, goToNext, goToPrevious]);

  // モーダル表示中はスクロールを防止
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [state.isOpen]);

  return {state, openLightbox, closeLightbox, goToNext, goToPrevious};
};

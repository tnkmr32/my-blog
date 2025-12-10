'use client';

import {useEffect, useMemo, useState} from 'react';
import {ImageLightbox} from './image-lightbox';
import markdownStyles from './markdown-styles.module.css';
import {useLightbox} from '@/hooks/use-lightbox';
import {parseHtmlContent} from '@/lib/parse-html-content';
import type {LightboxImage} from '@/types/lightbox';

type Props = {
  content: string;
};

export function PostBody(props: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const {state, openLightbox, closeLightbox, goToNext, goToPrevious} =
    useLightbox();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageClick = (image: LightboxImage, index: number) => {
    openLightbox(image, index, parsedData.images);
  };

  const parsedData = useMemo(
    () => parseHtmlContent(props.content, handleImageClick),
    [props.content, isMounted],
  );

  // ハイドレーションエラーを防ぐため、初回レンダリング時は元のHTMLを表示
  if (!isMounted || parsedData.elements.length === 0) {
    return (
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{__html: props.content}}
      />
    );
  }

  return (
    <>
      <div className={markdownStyles['markdown']}>{parsedData.elements}</div>
      <ImageLightbox
        isOpen={state.isOpen}
        image={state.currentImage}
        currentIndex={state.currentIndex}
        totalImages={state.images.length}
        onClose={closeLightbox}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </>
  );
}

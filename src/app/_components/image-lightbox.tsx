'use client';

import {useEffect, useRef} from 'react';
import type {LightboxImage} from '@/types/lightbox';

interface ImageLightboxProps {
  isOpen: boolean;
  image: LightboxImage | null;
  currentIndex: number;
  totalImages: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const ImageLightbox = (props: ImageLightboxProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [props.isOpen]);

  if (!props.isOpen || !props.image) {
    return null;
  }

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };

  const showNavigation = props.totalImages > 1;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="画像拡大表示"
      tabIndex={-1}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/90 transition-opacity duration-300 ease-in-out">
      {/* 画像とコントロールのグループ */}
      <div className="flex flex-col items-center gap-6">
        {/* 閉じるボタン */}
        <div className="flex w-full justify-end">
          <button
            onClick={props.onClose}
            aria-label="閉じる"
            className="rounded-full bg-black/10 p-2 text-black transition-colors hover:bg-black/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 画像と前後ボタン */}
        <div className="flex items-center gap-4">
          {/* 前へボタン */}
          {showNavigation && (
            <button
              onClick={e => {
                e.stopPropagation();
                props.onPrevious();
              }}
              aria-label="前の画像"
              className="rounded-full bg-black/10 p-2 text-black transition-colors hover:bg-black/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )}

          {/* 画像 */}
          <img
            src={props.image.src}
            alt={props.image.alt}
            className="max-h-[70vh] max-w-[70vw] object-contain transition-opacity duration-300 ease-in-out"
          />

          {/* 次へボタン */}
          {showNavigation && (
            <button
              onClick={e => {
                e.stopPropagation();
                props.onNext();
              }}
              aria-label="次の画像"
              className="rounded-full bg-black/10 p-2 text-black transition-colors hover:bg-black/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}
        </div>

        {/* 画像カウンター */}
        {showNavigation && (
          <div className="rounded-full bg-black/10 px-4 py-2 text-sm text-black">
            {props.currentIndex + 1} / {props.totalImages}
          </div>
        )}
      </div>
    </div>
  );
};

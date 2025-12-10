import type {ReactNode} from 'react';
import {createElement} from 'react';
import {PostImage} from '@/app/_components/post-image';
import type {LightboxImage} from '@/types/lightbox';

interface ParsedContent {
  elements: ReactNode[];
  images: LightboxImage[];
}

export const parseHtmlContent = (
  html: string,
  onImageClick: (image: LightboxImage, index: number) => void,
): ParsedContent => {
  const images: LightboxImage[] = [];
  const elements: ReactNode[] = [];

  // HTMLを一時的なDOMに変換
  if (typeof window === 'undefined') {
    // サーバーサイドでは元のHTMLをそのまま返す
    return {elements: [], images: []};
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const body = doc.body;

  let imageIndex = 0;

  const processNode = (node: ChildNode, key: number): ReactNode => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      // 画像要素の場合
      if (tagName === 'img') {
        const src = element.getAttribute('src') || '';
        const alt = element.getAttribute('alt') || '';

        const image: LightboxImage = {src, alt};
        images.push(image);

        const currentIndex = imageIndex;
        imageIndex++;

        return (
          <PostImage
            key={`img-${key}`}
            src={src}
            alt={alt}
            index={currentIndex}
            onImageClick={onImageClick}
          />
        );
      }

      // その他のHTML要素
      const children = Array.from(element.childNodes).map((child, index) =>
        processNode(child, index),
      );

      const props: {[key: string]: unknown} = {
        key: `${tagName}-${key}`,
      };

      // 属性をコピー
      Array.from(element.attributes).forEach(attr => {
        if (attr.name === 'class') {
          props.className = attr.value;
        } else if (attr.name === 'style') {
          // スタイル属性は文字列として処理
          props.style = attr.value;
        } else {
          props[attr.name] = attr.value;
        }
      });

      // React.createElement を使用して要素を作成
      return createElement(tagName, props, ...children);
    }

    return null;
  };

  Array.from(body.childNodes).forEach((node, index) => {
    const element = processNode(node, index);
    if (element !== null) {
      elements.push(element);
    }
  });

  return {elements, images};
};

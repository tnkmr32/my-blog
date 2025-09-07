export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: {
    url: string;
  };
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
};

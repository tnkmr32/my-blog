import Link from "next/link";

type Props = {
  title: string;
  slug: string;
  coverImage: { url: string };
};

const PostItem = ({ title, slug, coverImage }: Props) => {
  return (
    <div className="text-base pb-5">
      <div className="w-fit">
        <Link href={`/posts/${slug}`}>
          <div className="overflow-hidden">
            <div className="max-w-full h-auto transition-transform duration-300 ease-linear hover:scale-102">
              <img
                src={coverImage.url}
                alt={title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </Link>
        <div className="w-auto flex flex-row justify-end">
          <Link href={`/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

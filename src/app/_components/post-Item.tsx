import Link from "next/link";

type Props = {
  title: string;
  slug: string;
  coverImage: { url: string };
};

const PostItem = ({ title, slug, coverImage }: Props) => {
  return (
    <div className="pb-5">
      <div className="w-fit mx-auto">
        <Link href={`/posts/${slug}`}>
          <div className="overflow-hidden">
            <div className="transition-transform duration-300 ease-linear hover:scale-102">
              <img
                src={coverImage.url}
                alt={title}
                className="object-contain max-h-[660px]"
              />
            </div>
          </div>
        </Link>
        <div className="w-auto flex flex-row justify-end">
          <Link href={`/posts/${slug}`} className="text-base hover:underline">
            {title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

import { getAllPosts } from "@/lib/api";
import PostItem from "./_components/post-Item";

export default function Index() {
  const allPosts = getAllPosts();
  

  return (
    <main>
      <div className="container px-4 mx-auto">
        <div className="py-2">
          <h2 className="text-xl md:text-2xl">
            Works
          </h2>
          <div>
            {allPosts.map((item, index) => (
              <PostItem key={index} title={item.title} slug={item.slug} coverImage={item.coverImage} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

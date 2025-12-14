import PostItem from './_components/post-Item';
import {getAllPosts} from '@/lib/api';

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main>
      <div className="container px-4 mx-auto">
        <div className="py-2">
          <div>
            {allPosts.map((item, index) => (
              <PostItem
                key={index}
                title={item.title}
                slug={item.slug}
                coverImage={item.coverImage}
              />
              
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  // Reverse the order of liked posts
  const reversedLikedPosts = [...currentUser.liked].reverse();

  return (
    <>
      {reversedLikedPosts.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={reversedLikedPosts} showStats={false} />
    </>
  );
};

export default LikedPosts;

import {
  useGetSavedPosts,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutations";
import { GridPostList, Loader } from "@/components/shared";

const Saved = () => {
  const { data: currentUser, isLoading: userLoading } = useGetCurrentUser();
  const userId = currentUser?.$id || ""; // Handle possible undefined

  const {
    data: savedPosts,
    isLoading: postsLoading,
    error,
  } = useGetSavedPosts(userId);

  if (userLoading || postsLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-light-4">Error loading saved posts</p>;
  }

  // Map saved posts to format them correctly
  const formattedPosts = savedPosts
    ?.map((savePost) => ({
      ...savePost.post,
      creator: {
        ...savePost.post.creator, // Ensure to include the original creator's details
        imageUrl: savePost.post.creator?.imageUrl || "", // Use original creator's imageUrl
      },
    }))
    .reverse();

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!formattedPosts || formattedPosts.length === 0 ? (
        <p className="text-light-4">No available posts</p>
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          <GridPostList posts={formattedPosts} showStats={false} />
        </ul>
      )}
    </div>
  );
};

export default Saved;

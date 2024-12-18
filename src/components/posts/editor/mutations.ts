import { useToast } from "@/hooks/use-toast";
import { PostsPage } from "@/types/post.type";
import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitPost } from "./actions";

export function useSubmitPostMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryKey: QueryKey = ["post-feed", "for-you"];

      await queryClient.cancelQueries({
        queryKey,
      });

      queryClient.setQueryData<InfiniteData<PostsPage, string | null>>(
        queryKey,
        (oldData) => {
          if (oldData) {
            const firstPage = oldData.pages[0];

            return {
              ...oldData,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
          return oldData;
        },
      );

      queryClient.invalidateQueries({
        queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast({
        description: "Post created",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to post. Please try again.",
      });
    },
  });

  return mutation;
}

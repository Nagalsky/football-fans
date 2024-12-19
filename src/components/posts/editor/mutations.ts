import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/providers/session-provider";
import { PostsPage } from "@/types/post.type";
import {
  InfiniteData,
  Query,
  QueryFilters,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitPost } from "./actions";

export function useSubmitPostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { user } = useSession();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters<InfiniteData<PostsPage, string | null>> =
        {
          queryKey: ["post-feed"],
          predicate: (query: Query<InfiniteData<PostsPage, string | null>>) => {
            const queryKey = query.queryKey;
            return (
              queryKey.includes("for-you") ||
              (queryKey.includes("user-posts") && queryKey.includes(user.id))
            );
          },
        };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
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
        ...queryFilter,
        predicate: (query) => {
          if (!query.queryKey.includes("post-feed")) return false;

          const typedQuery = query as Query<
            InfiniteData<PostsPage, string | null>,
            Error,
            InfiniteData<PostsPage, string | null>,
            QueryKey
          >;

          const filterPredicate = queryFilter.predicate;
          return (
            (filterPredicate ? filterPredicate(typedQuery) : true) &&
            !query.state.data
          );
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

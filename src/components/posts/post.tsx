"use client";

import { formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/providers/session-provider";
import { PostData } from "@/types/post.type";
import Link from "next/link";
import Linkify from "../common/linkify";
import UserAvatar from "../common/user-avatar";
import UserTooltip from "../common/user-tooltip";
import PostDropdownMenu from "./post-dropdown-menu";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { user } = useSession();
  return (
    <article className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`}>
              <UserAvatar
                avatarUrl={post.user.avatarUrl}
                username={post.user.username}
                className="size-[40px]"
              />
            </Link>
          </UserTooltip>
          <div>
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user.username}`}
                className="block font-medium hover:underline"
              >
                {post.user.displayName}
              </Link>
            </UserTooltip>
            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user.id && <PostDropdownMenu post={post} />}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
    </article>
  );
}

"use client";

import { useSession } from "@/providers/session-provider";
import { FollowerInfo } from "@/types/follower.type";
import { UserData } from "@/types/post.type";
import Link from "next/link";
import { PropsWithChildren } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import FollowButton from "./follow-button";
import FollowerCount from "./follower-count";
import Linkify from "./linkify";
import UserAvatar from "./user-avatar";

interface UserTooltipProps extends PropsWithChildren {
  user: UserData;
}

export default function UserTooltip({ children, user }: UserTooltipProps) {
  const { user: loggedInUser } = useSession();

  const followerState: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: !!user.followers.some(
      ({ followerId }) => followerId === loggedInUser.id,
    ),
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent>
        <div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
          <div className="flex items-center justify-between gap-2">
            <Link href={`/users/${user.username}`}>
              <UserAvatar
                avatarUrl={user.avatarUrl}
                username={user.username}
                className="size-[70px]"
              />
            </Link>
            {loggedInUser.id !== user.id && (
              <FollowButton userId={user.id} initialState={followerState} />
            )}
          </div>
          <div>
            <Link href={`/users/${user.username}`}>
              <div className="text-lg font-semibold hover:underline">
                {user.displayName}
              </div>
              <div className="text-muted-foreground">@{user.username}</div>
            </Link>
          </div>
          {user.bio && (
            <Linkify>
              <div className="line-clamp-4 whitespace-pre-line">{user.bio}</div>
            </Linkify>
          )}
          <FollowerCount userId={user.id} initialState={followerState} />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

import { formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/providers/session-provider";
import { CommentData } from "@/types/comment.type";
import Link from "next/link";
import Linkify from "../common/linkify";
import UserAvatar from "../common/user-avatar";
import UserTooltip from "../common/user-tooltip";
import CommentDropdownMenu from "./comment-dropdown-menu";

interface CommentProps {
  comment: CommentData;
}

export default function Comment({ comment }: CommentProps) {
  const { user } = useSession();

  return (
    <div className="group/comment flex gap-3 py-3">
      <span className="hidden sm:inline">
        <UserTooltip user={comment.user}>
          <Link href={`/users/${comment.user.username}`}>
            <UserAvatar
              avatarUrl={comment.user.avatarUrl}
              className="size-[40px]"
              username={comment.user.username}
            />
          </Link>
        </UserTooltip>
      </span>
      <div>
        <div className="flex items-center gap-1 text-sm">
          <UserTooltip user={comment.user}>
            <Link
              href={`/users/${comment.user.username}`}
              className="font-medium hover:underline"
            >
              {comment.user.displayName}
            </Link>
          </UserTooltip>
          <span className="text-muted-foreground">
            {formatRelativeDate(comment.createdAt)}
          </span>
        </div>
        <Linkify>
          <div>{comment.content}</div>
        </Linkify>
      </div>
      {comment.user.id === user.id && (
        <CommentDropdownMenu
          comment={comment}
          className="ms-auto opacity-0 transition-opacity group-hover/comment:opacity-100"
        />
      )}
    </div>
  );
}

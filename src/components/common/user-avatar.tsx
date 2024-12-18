import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  username: string;
  className?: string;
}

export default function UserAvatar({
  avatarUrl,
  username,
  className,
}: UserAvatarProps) {
  const avatar = avatarUrl || undefined;
  const fallbackText = username ? username.slice(0, 2).toUpperCase() : "??";

  return (
    <Avatar>
      <AvatarImage
        src={avatar}
        alt={username}
        className={cn(
          "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
          className,
        )}
      />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
}

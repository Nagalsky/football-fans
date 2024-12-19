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
    <Avatar
      className={cn(
        "aspect-square size-10 h-fit flex-none rounded-full bg-secondary object-cover",
        className,
      )}
    >
      <AvatarImage
        src={avatar}
        alt={username}
        className="aspect-square h-fit flex-none rounded-full bg-secondary object-cover"
      />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
}

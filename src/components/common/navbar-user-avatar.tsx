import { User } from "lucia"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface NavbarUserAvatarProps {
  data: User
}

export default function NavbarUserAvatar({
  data,
}: NavbarUserAvatarProps) {
  const avatarUrl = data.avatarUrl || undefined;
  const fallbackText = data.displayName
    ? data.displayName.slice(0, 2).toUpperCase()
    : '??'; 

  return (
    <Avatar>
      <AvatarImage src={avatarUrl} alt={data.displayName} className='size-40' />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
}
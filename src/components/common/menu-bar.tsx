"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bell, Bookmark, Home, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const menuItems = [
    {
      href: "/",
      icon: Home,
      label: "Home",
    },
    {
      href: "/notifications",
      icon: Bell,
      label: "Notifications",
    },
    {
      href: "/messages",
      icon: Mail,
      label: "Messages",
    },
    {
      href: "/bookmarks",
      icon: Bookmark,
      label: "Bookmarks",
    },
  ];
  return (
    <div className={className}>
      {menuItems.map(({ href, icon: Icon, label }) => (
        <Button
          key={href}
          variant={isActive(href) ? "secondary" : "ghost"}
          className={cn(
            "flex items-center justify-start gap-3",
            isActive(href) && "font-semibold",
          )}
          title={label}
          asChild
        >
          <Link href={href}>
            <Icon />
            <span className="hidden lg:inline">{label}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
}

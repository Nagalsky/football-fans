import Link from "next/link";
import UserDropdown from "./navbar-user-dropdown";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card py-3 shadow-sm">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          FootballFans
        </Link>
        <UserDropdown />
      </div>
    </header>
  );
}

import Link from "next/link"
import NavbarSearch from './navbar-search'
import UserDropdown from './navbar-user-dropdown'

export default function Navbar() {
	return (
		<header className="sticky top-0 z-10 bg-card shadow-sm py-3">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          FootballFans
        </Link>
        <NavbarSearch />
        <UserDropdown />
      </div>
    </header>
	)
}
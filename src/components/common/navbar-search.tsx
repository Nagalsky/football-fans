"use client";

import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function NavbarSearch() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="hidden sm:block">
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <Input name="q" placeholder="Search" className="pe-10" />
        <Button className='absolute right-0 top-1/2 -translate-y-1/2' variant={"link"}>
        <SearchIcon className="text-muted-foreground" />
        </Button>
      </div>
    </form>
    </div>
  );
}
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAuthModal } from "@/lib/authModalContext.jsx";

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function Header() {
  const scrolled = useScrolled();
  const { pathname } = useLocation();
  const { openModal } = useAuthModal();
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all",
        scrolled ? "backdrop-blur bg-background/70 border-b" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative grid place-items-center">
            <span className="size-8 rounded-md bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-sky-500" />
            <svg className="absolute size-8 text-white/80" viewBox="0 0 24 24">
              <path d="M6 12a6 6 0 1112 0 6 6 0 01-12 0Zm6-4.5v9M7.5 12H16.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-sky-600">
            Meet Summarizer
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={({isActive})=>cn("text-muted-foreground hover:text-foreground", isActive && pathname==="/" && "text-foreground")}>Home</NavLink>
          <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
          <a href="#how" className="text-muted-foreground hover:text-foreground">How it works</a>
          <Link to="/app" className="text-muted-foreground hover:text-foreground">App</Link>
        </nav>
        <div className="flex items-center gap-2">
          
            <Button className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-sky-600 hover:opacity-90" onClick={()=>openModal('signup')}>
              Get started
            </Button>
          
        </div>
      </div>
    </header>
  );
}

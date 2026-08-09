import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/lib/constants";
import { posthog } from "@/lib/posthog";
import { cn } from "@/lib/utils";

const serviceItem = NAV_ITEMS[0];
const linkItems = NAV_ITEMS.slice(1);

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => setMounted(true), []);

  const ThemeIcon = mounted ? (theme === "dark" ? Sun : Moon) : Sun;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClass = (href: string) =>
    cn(
      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
      isActive(href)
        ? "text-accent"
        : "text-foreground/80 hover:text-foreground",
    );

  const handleCtaClick = () => {
    posthog.capture("cta_clicked", {
      cta_location: "nav",
      cta_label: "Start a Project",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="relative h-18 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-baseline gap-1 text-primary no-underline"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <span className="text-xl font-bold tracking-tight">Gabeyre Global Inc</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* Services dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className={linkClass("/services")}>
                {serviceItem.label}
                <ChevronDown className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
              {serviceItem.children.map((child) => (
                <DropdownMenuItem key={child.href} asChild>
                  <Link to={child.href} className="cursor-pointer">
                    {child.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Plain nav links */}
          {linkItems.map((item) => (
            <Link key={item.href} to={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <ThemeIcon className="size-4" />
            </Button>
          )}
          <Button variant="default" size="sm" onClick={handleCtaClick} asChild>
            <Link to="/contact">Start a Project</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-full flex-col px-6 sm:max-w-sm">
            {/* Mobile header */}
            <div className="flex items-center border-b pb-5">
              <Link
                to="/"
                className="text-primary no-underline"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-xl font-bold tracking-tight">Gabeyre Global Inc</span>
              </Link>
            </div>

            {/* Mobile links */}
            <nav className="flex flex-col gap-5 py-8">
              <div className="flex flex-col gap-2">
                <span
                  className={cn(
                    "text-sm font-semibold",
                    isActive("/services") ? "text-accent" : "text-foreground",
                  )}
                >
                  {serviceItem.label}
                </span>
                {serviceItem.children.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    className={cn(
                      "pl-4 text-sm transition-colors",
                      isActive(child.href)
                        ? "text-accent font-medium"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>

              {linkItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "text-accent"
                      : "text-foreground/80 hover:text-foreground",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="mt-auto border-t pt-6">
              <div className="flex items-center gap-3">
                {mounted && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                  >
                    <ThemeIcon className="size-4" />
                  </Button>
                )}
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    handleCtaClick();
                    setMobileOpen(false);
                  }}
                  asChild
                >
                  <Link to="/contact">Start a Project</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

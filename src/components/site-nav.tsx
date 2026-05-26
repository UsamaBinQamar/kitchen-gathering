import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Leaf, Menu, X, LogOut, Shield } from "lucide-react";
import { useState } from "react";

export function SiteNav() {
  const { user, signOut } = useAuth();
  const { isAdmin } = useIsAdmin();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const links = [
    { to: "/browse", label: "Browse" },
    ...(user ? [{ to: "/my-recipes", label: "My Recipes" }, { to: "/import", label: "Import" }] : []),
  ];


  async function handleSignOut() {
    await signOut();
    navigate({ to: "/" });
  }

  const initial = (user?.email ?? "?").charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">Saged</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm transition-colors ${path === l.to ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="Profile menu"
                  className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Avatar className="h-9 w-9 cursor-pointer border border-border/70">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                      {initial}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-xs text-muted-foreground">Signed in as</p>
                  <p className="truncate text-sm">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin ? (
                  <DropdownMenuItem
                    onSelect={() => navigate({ to: "/admin" })}
                    className="cursor-pointer"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin
                  </DropdownMenuItem>
                ) : null}

                <DropdownMenuItem onSelect={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>


              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
              <Button size="sm" onClick={() => navigate({ to: "/signup" })}>Sign up</Button>
            </>
          )}
        </nav>

        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm hover:bg-muted">
                {l.label}
              </Link>
            ))}
            {user ? (
              <>
                <div className="mt-2 border-t border-border/60 px-2 pt-3">
                  <p className="text-xs text-muted-foreground">Signed in as</p>
                  <p className="truncate text-sm">{user.email}</p>
                </div>
                {isAdmin ? (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                ) : null}


                <button
                  onClick={async () => { setOpen(false); await handleSignOut(); }}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>

              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm hover:bg-muted">Sign in</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm hover:bg-muted">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

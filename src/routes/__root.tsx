import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "@/components/site-nav";
import { supabase } from "@/integrations/supabase/client";
import { logActivity } from "@/lib/activity-log";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-2 text-muted-foreground">This recipe doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:opacity-90">
          Back home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Something burned in the oven</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Saged — calm recipes you'll actually cook" },
      { name: "description", content: "Save, import, and cook recipes with a hands-free Cook Now mode. Public recipe community with AI-powered import." },
      { property: "og:title", content: "Saged — calm recipes you'll actually cook" },
      { name: "twitter:title", content: "Saged — calm recipes you'll actually cook" },
      { property: "og:description", content: "Save, import, and cook recipes with a hands-free Cook Now mode. Public recipe community with AI-powered import." },
      { name: "twitter:description", content: "Save, import, and cook recipes with a hands-free Cook Now mode. Public recipe community with AI-powered import." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1a24fd86-c763-4408-8d71-1ea871340d25/id-preview-3c58eca8--d3aacf8d-9d34-44ae-b56c-61c367b4c998.lovable.app-1779435269506.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1a24fd86-c763-4408-8d71-1ea871340d25/id-preview-3c58eca8--d3aacf8d-9d34-44ae-b56c-61c367b4c998.lovable.app-1779435269506.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      window.setTimeout(() => {
        if (event === "SIGNED_IN" && session?.user?.app_metadata?.provider === "google") {
          const createdAt = session.user.created_at;
          const isNewUser = createdAt && (Date.now() - new Date(createdAt).getTime()) < 30000;
          void logActivity(isNewUser ? "signup" : "login", { metadata: { method: "Google" } });
        }
        router.invalidate();
        if (event === "SIGNED_OUT") {
          queryClient.clear();
          return;
        }
        queryClient.invalidateQueries();
      }, 0);
    });
    return () => subscription.unsubscribe();
  }, [router, queryClient]);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <SiteNav />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
          <p>Saged · Cook with Love, Share from the Heart!</p>
        </footer>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Eye, EyeOff, Clock } from "lucide-react";
import type { Recipe } from "@/lib/recipe-types";

export const Route = createFileRoute("/my-recipes")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/login" });
  },
  component: MyRecipes,
});

function MyRecipes() {
  const { data: recipes, isLoading } = useQuery({
    queryKey: ["my-recipes"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return [];
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", u.user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as Recipe[];
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">My Recipes</h1>
          <p className="mt-1 text-muted-foreground">Your personal collection</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="rounded-full"><Link to="/import">Import</Link></Button>
          <Button asChild className="rounded-full"><Link to="/recipes/new"><Plus className="mr-1 h-4 w-4" />New recipe</Link></Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-60 animate-pulse rounded-2xl bg-muted" />)}
        </div>
      ) : recipes && recipes.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((r) => (
            <Link key={r.id} to="/recipes/$recipeId" params={{ recipeId: r.id }}
              className="group block overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="aspect-[4/3] bg-secondary/40">
                {r.image_url ? <img src={r.image_url} alt={r.title} loading="lazy" className="h-full w-full object-cover" />
                  : <div className="grid h-full place-items-center"><span className="font-display text-4xl opacity-40">{r.title.charAt(0)}</span></div>}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl leading-snug">{r.title}</h3>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                    {r.visibility === "public" ? <><Eye className="h-3 w-3" />Public</> : <><EyeOff className="h-3 w-3" />Private</>}
                  </span>
                </div>
                {r.cook_time && <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{r.cook_time}</p>}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed py-16 text-center">
          <p className="text-muted-foreground">No recipes yet. Import one or create from scratch.</p>
          <div className="mt-4 flex justify-center gap-2">
            <Button asChild variant="outline" className="rounded-full"><Link to="/import">Import</Link></Button>
            <Button asChild className="rounded-full"><Link to="/recipes/new">New recipe</Link></Button>
          </div>
        </div>
      )}
    </div>
  );
}

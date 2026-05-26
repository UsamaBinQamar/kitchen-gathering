import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Search, X } from "lucide-react";
import { CUISINE_OPTIONS, MEAL_TYPE_OPTIONS, type Recipe } from "@/lib/recipe-types";

const ALL = "__all__";

type BrowseSearch = { q: string; cuisine: string; meal: string; tag: string };

export const Route = createFileRoute("/browse")({
  validateSearch: (search: Record<string, unknown>): BrowseSearch => ({
    q: typeof search.q === "string" ? search.q : "",
    cuisine: typeof search.cuisine === "string" ? search.cuisine : "",
    meal: typeof search.meal === "string" ? search.meal : "",
    tag: typeof search.tag === "string" ? search.tag : "",
  }),
  component: BrowsePage,
});

function BrowsePage() {
  const { q, cuisine, meal, tag } = Route.useSearch();
  const navigate = useNavigate({ from: "/browse" });


  const { data: recipes, isLoading } = useQuery({
    queryKey: ["browse-public-recipes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("visibility", "public")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as Recipe[];
    },
  });

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const tagQuery = tag.trim().toLowerCase();
    return (recipes ?? []).filter((r) => {
      if (query && !r.title.toLowerCase().includes(query)) return false;
      if (cuisine && r.cuisine !== cuisine) return false;
      if (meal && r.meal_type !== meal) return false;
      if (tagQuery) {
        const rt = r.tags ?? [];
        if (!rt.some((t) => t.toLowerCase().includes(tagQuery))) return false;
      }
      return true;
    });
  }, [recipes, q, cuisine, meal, tag]);

  const hasFilters = !!q || !!cuisine || !!meal || !!tag;

  function setQ(v: string) {
    navigate({ search: (p: BrowseSearch) => ({ ...p, q: v }) });
  }
  function setCuisine(v: string) {
    navigate({ search: (p: BrowseSearch) => ({ ...p, cuisine: v === ALL ? "" : v }) });
  }
  function setMeal(v: string) {
    navigate({ search: (p: BrowseSearch) => ({ ...p, meal: v === ALL ? "" : v }) });
  }
  function setTag(v: string) {
    navigate({ search: (p: BrowseSearch) => ({ ...p, tag: v }) });
  }

  function clearAll() {
    navigate({ search: () => ({ q: "", cuisine: "", meal: "", tag: "" }) });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl">Browse recipes</h1>
        <p className="mt-1 text-muted-foreground">
          Explore public recipes from the community
        </p>
      </div>

      {/* Filter bar */}
      <div className="mb-8 rounded-2xl border border-border/70 bg-card p-4">
        <div className="mb-3">
          <label className="mb-1 block text-xs text-muted-foreground">Search</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search recipe titles..."
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-[180px] flex-1">
            <label className="mb-1 block text-xs text-muted-foreground">Cuisine</label>
            <Select value={cuisine || ALL} onValueChange={setCuisine}>
              <SelectTrigger>
                <SelectValue placeholder="All cuisines">{cuisine || "All cuisines"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All cuisines</SelectItem>
                {CUISINE_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-[180px] flex-1">
            <label className="mb-1 block text-xs text-muted-foreground">Recipe type</label>
            <Select value={meal || ALL} onValueChange={setMeal}>
              <SelectTrigger>
                <SelectValue placeholder="All recipe types">{meal || "All recipe types"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All recipe types</SelectItem>
                {MEAL_TYPE_OPTIONS.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="self-end">
              <X className="mr-1 h-4 w-4" />Clear filters
            </Button>
          )}
        </div>

        <div className="mt-3">
          <label className="mb-1 block text-xs text-muted-foreground">Tag</label>
          <Input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Filter by tag..."
          />
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-60 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            {filtered.length} recipe{filtered.length === 1 ? "" : "s"}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <Link
                key={r.id}
                to="/recipes/$recipeId"
                params={{ recipeId: r.id }}
                className="group block overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="aspect-[4/3] bg-secondary/40">
                  {r.image_url ? (
                    <img src={r.image_url} alt={r.title} loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full place-items-center">
                      <span className="font-display text-4xl opacity-40">{r.title.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl leading-snug">{r.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    {r.cook_time && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />{r.cook_time}
                      </span>
                    )}
                    {r.cuisine && <span>{r.cuisine}</span>}
                    {r.meal_type && <span>· {r.meal_type}</span>}
                  </div>
                  {r.tags && r.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {r.tags.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed py-16 text-center">
          <p className="text-muted-foreground">
            {hasFilters ? "No recipes match these filters." : "No public recipes yet."}
          </p>
          {hasFilters && (
            <Button variant="outline" className="mt-4 rounded-full" onClick={clearAll}>
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

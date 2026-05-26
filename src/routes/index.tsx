import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-kitchen.jpg";
import type { Recipe } from "@/lib/recipe-types";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const sawSignedOut = useRef(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      sawSignedOut.current = true;
      return;
    }
    if (sawSignedOut.current) {
      sawSignedOut.current = false;
      navigate({ to: "/my-recipes", replace: true });
    }
  }, [user, loading, navigate]);

  const { data: recipes, isLoading } = useQuery({
    queryKey: ["public-recipes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("visibility", "public")
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data as unknown as Recipe[];
    },
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              <Sparkles className="h-3 w-3" /> AI-powered recipe import
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
              Cook calmly.<br />
              <span className="text-primary">Save what you love.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Save and share recipes from anywhere on the web, then cook hands-free with our voice-controlled Cook Now mode.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {user ? (
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/my-recipes">My Recipes</Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/signup">Get started — it's free</Link>
                </Button>
              )}
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href="#browse">Browse recipes</a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-secondary/50 blur-2xl" />
            <img
              src={heroImg}
              alt="Fresh sage, lemons, garlic and olive oil on a wooden table"
              width={1536}
              height={1024}
              className="aspect-[3/2] w-full rounded-3xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border/60 bg-secondary/30">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-3">
          {[
            { t: "Import anything", d: "Paste a URL, raw text, or a photo. AI parses it into a clean recipe." },
            { t: "Public or private", d: "Keep your favorites to yourself or share them with the community." },
            { t: "Cook Now mode", d: "Big text, full screen, voice commands. Your phone never falls asleep." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl bg-card p-6 shadow-sm">
              <h3 className="font-display text-xl">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Browse */}
      <section id="browse" className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl md:text-4xl">From the community</h2>
          <p className="text-sm text-muted-foreground">Public recipes</p>
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : recipes && recipes.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-16 text-center text-muted-foreground">
              <p>No public recipes yet. Be the first to share one!</p>
              <Button asChild className="mt-4 rounded-full">
                {user ? <Link to="/my-recipes">My Recipes</Link> : <Link to="/signup">Get started</Link>}
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link to="/recipes/$recipeId" params={{ recipeId: recipe.id }} className="group block overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        {recipe.image_url ? (
          <img src={recipe.image_url} alt={recipe.title} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
        ) : (
          <div className="grid h-full place-items-center bg-secondary/40 text-secondary-foreground">
            <span className="font-display text-4xl opacity-40">{recipe.title.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl leading-snug">{recipe.title}</h3>
        {recipe.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{recipe.description}</p>}
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
          {recipe.cook_time && <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{recipe.cook_time}</span>}
          {recipe.servings && <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{recipe.servings}</span>}
        </div>
      </div>
    </Link>
  );
}

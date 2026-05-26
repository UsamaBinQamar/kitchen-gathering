import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RecipeEditor } from "./recipes.new";
import type { Recipe } from "@/lib/recipe-types";

export const Route = createFileRoute("/recipes/$recipeId/edit")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/login" });
  },
  component: EditPage,
});

function EditPage() {
  const { recipeId } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-edit", recipeId],
    enabled: typeof window !== "undefined",
    queryFn: async () => {
      const { data, error } = await supabase.from("recipes").select("*").eq("id", recipeId).single();
      if (error) throw error;
      return data as unknown as Recipe;
    },
  });
  if (isLoading) return <div className="px-4 py-10 text-center text-muted-foreground">Loading…</div>;
  if (error || !data) return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-center">
      <p className="text-destructive">Couldn't load recipe: {error?.message ?? "not found"}</p>
    </div>
  );
  return <RecipeEditor mode="edit" existing={data} />;
}

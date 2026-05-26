import { createFileRoute, Link, Outlet, useNavigate, useChildMatches } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Clock, Users, Share2, ChefHat, Mail, MessageSquare, Pencil, Trash2, ExternalLink, BookmarkPlus, Globe, UtensilsCrossed, StickyNote } from "lucide-react";
import type { Recipe } from "@/lib/recipe-types";
import { CookNow } from "@/components/cook-now";
import { useServerFn } from "@tanstack/react-start";
import { shareRecipeByEmail } from "@/lib/share-email.functions";
import { RecipeRatings } from "@/components/recipe-ratings";
import { logActivity } from "@/lib/activity-log";
import { scaleQuantity } from "@/lib/scale-ingredient";



export const Route = createFileRoute("/recipes/$recipeId")({ component: RecipeRoute });

function RecipeRoute() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) return <Outlet />;
  return <RecipeDetail />;
}

function RecipeDetail() {
  const { recipeId } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cookNow, setCookNow] = useState(false);
  const queryClient = useQueryClient();
  const [updatingVisibility, setUpdatingVisibility] = useState(false);
  const [scale, setScale] = useState(1);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: async () => {
      const { data, error } = await supabase.from("recipes").select("*").eq("id", recipeId).single();
      if (error) throw error;
      return data as unknown as Recipe;
    },
  });

  useEffect(() => {
    if (recipe) setNotes(recipe.notes ?? "");
  }, [recipe?.id, recipe?.notes]);


  if (isLoading) return <div className="mx-auto max-w-3xl px-4 py-10"><div className="h-96 animate-pulse rounded-2xl bg-muted" /></div>;
  if (!recipe) return <div className="px-4 py-10 text-center">Recipe not found</div>;

  const isOwner = user?.id === recipe.user_id;

  async function handleDelete() {
    if (!recipe || !confirm("Delete this recipe?")) return;
    const { error } = await supabase.from("recipes").delete().eq("id", recipe.id);
    if (error) return toast.error(error.message);
    void logActivity("recipe.delete", { target_type: "recipe", target_id: recipe.id, metadata: { title: recipe.title } });
    toast.success("Deleted");
    navigate({ to: "/my-recipes" });
  }

  async function toggleVisibility(makePublic: boolean) {
    if (!recipe) return;
    if (makePublic && recipe.visibility === "public") {
      toast.info("Recipe is already public");
      return;
    }
    setUpdatingVisibility(true);
    if (makePublic) {
      const { data: conflict, error: checkError } = await supabase
        .from("recipes")
        .select("id")
        .eq("visibility", "public")
        .ilike("title", recipe.title)
        .neq("id", recipe.id)
        .limit(1)
        .maybeSingle();
      if (checkError) {
        setUpdatingVisibility(false);
        return toast.error(checkError.message);
      }
      if (conflict) {
        setUpdatingVisibility(false);
        return toast.error("Another public recipe with this name already exists");
      }
    }
    const next = makePublic ? "public" : "private";
    const { error } = await supabase.from("recipes").update({ visibility: next }).eq("id", recipe.id);
    setUpdatingVisibility(false);
    if (error) return toast.error(error.message);
    void logActivity(
      makePublic ? "recipe.visibility.public" : "recipe.visibility.private",
      { target_type: "recipe", target_id: recipe.id, metadata: { title: recipe.title } },
    );
    toast.success(makePublic ? "Recipe is now public" : "Recipe is now private");
    queryClient.invalidateQueries({ queryKey: ["recipe", recipe.id] });
    queryClient.invalidateQueries({ queryKey: ["my-recipes"] });
  }


  if (cookNow) return <CookNow recipe={recipe} onExit={() => setCookNow(false)} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {recipe.image_url && (
        <div className="mb-8 overflow-hidden rounded-3xl">
          <img src={recipe.image_url} alt={recipe.title} className="aspect-[16/9] w-full object-cover" />
        </div>
      )}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl">{recipe.title}</h1>
          {recipe.description && <p className="mt-3 max-w-2xl text-muted-foreground">{recipe.description}</p>}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {recipe.cuisine && <span className="inline-flex items-center gap-1"><Globe className="h-4 w-4" />{recipe.cuisine}</span>}
            {recipe.meal_type && <span className="inline-flex items-center gap-1"><UtensilsCrossed className="h-4 w-4" />{recipe.meal_type}</span>}
            {recipe.servings && <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" />{recipe.servings}</span>}
            {recipe.prep_time && <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />Prep {recipe.prep_time}</span>}
            {recipe.cook_time && <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />Cook {recipe.cook_time}</span>}
            {recipe.source_url && <a href={recipe.source_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline"><ExternalLink className="h-3 w-3" />source</a>}
          </div>
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {recipe.tags.map((t) => (
                <span key={t} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">#{t}</span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setCookNow(true)} className="rounded-full" size="lg">
            <ChefHat className="mr-2 h-4 w-4" />Cook Now
          </Button>
          <ShareDialog recipe={recipe} />
          {!isOwner && user && <AddToMyRecipesButton recipe={recipe} />}
          {isOwner && (
            <>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs">
                {recipe.visibility === "public" ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                <span className="text-muted-foreground">{recipe.visibility === "public" ? "Public" : "Private"}</span>
                <Switch
                  checked={recipe.visibility === "public"}
                  disabled={updatingVisibility}
                  onCheckedChange={toggleVisibility}
                  aria-label="Toggle public visibility"
                />
              </div>
              <Button variant="outline" size="icon" asChild><Link to="/recipes/$recipeId/edit" params={{ recipeId: recipe.id }}><Pencil className="h-4 w-4" /></Link></Button>
              <Button variant="outline" size="icon" onClick={handleDelete}><Trash2 className="h-4 w-4" /></Button>
            </>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <h2 className="font-display text-2xl">Ingredients</h2>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">Scale</span>
              <div className="inline-flex overflow-hidden rounded-full border border-border/70">
                {[
                  { label: "½×", value: 0.5 },
                  { label: "1×", value: 1 },
                  { label: "2×", value: 2 },
                  { label: "4×", value: 4 },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setScale(opt.value)}
                    className={
                      "px-3 py-1 text-xs font-medium transition-colors " +
                      (scale === opt.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-accent")
                    }
                    aria-pressed={scale === opt.value}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex gap-2 border-b border-border/40 pb-2 last:border-0">
                  {ing.quantity && <span className="font-medium text-foreground">{scaleQuantity(ing.quantity, scale)}</span>}
                  <span className="text-muted-foreground">{ing.item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <h2 className="font-display text-2xl">Instructions</h2>
          <ol className="mt-4 space-y-5">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-display text-primary-foreground">{i + 1}</div>
                <p className="pt-1 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <h2 className="flex items-center gap-2 font-display text-2xl">
              <StickyNote className="h-5 w-5" />Notes
            </h2>
            {isOwner ? (
              <div className="mt-4 space-y-2">
                <Textarea
                  rows={4}
                  placeholder="Add your personal notes, tweaks, or tips…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    disabled={savingNotes || notes === (recipe.notes ?? "")}
                    onClick={async () => {
                      setSavingNotes(true);
                      const { error } = await supabase
                        .from("recipes")
                        .update({ notes: notes || null })
                        .eq("id", recipe.id);
                      setSavingNotes(false);
                      if (error) return toast.error(error.message);
                      toast.success("Notes saved");
                      queryClient.invalidateQueries({ queryKey: ["recipe", recipe.id] });
                    }}
                  >
                    {savingNotes ? "Saving…" : "Save notes"}
                  </Button>
                </div>
              </div>
            ) : recipe.notes ? (
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{recipe.notes}</p>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">No notes yet.</p>
            )}
          </div>
        </div>
      </div>

      <RecipeRatings recipeId={recipe.id} />
    </div>
  );
}


function ShareDialog({ recipe }: { recipe: Recipe }) {
  const { user } = useAuth();
  const sendEmail = useServerFn(shareRecipeByEmail);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  async function handleEmail() {
    if (!user) return toast.error("Sign in to share by email");
    if (!email) return;
    setSending(true);
    try {
      await sendEmail({ data: { recipientEmail: email, recipeTitle: recipe.title, recipeUrl: url, note: note || undefined, senderName: user.user_metadata?.display_name } });
      toast.success("Email sent");
      setOpen(false); setEmail(""); setNote("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to send");
    } finally { setSending(false); }
  }

  const smsBody = encodeURIComponent(`Check out this recipe: ${recipe.title} — ${url}`);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full"><Share2 className="mr-2 h-4 w-4" />Share</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle className="font-display">Share this recipe</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Link</p>
            <p className="truncate text-sm">{url}</p>
            <Button size="sm" variant="ghost" className="mt-1" onClick={() => { navigator.clipboard.writeText(url); toast.success("Link copied"); }}>Copy link</Button>
          </div>

          <div className="space-y-2">
            <Label className="inline-flex items-center gap-1"><Mail className="h-4 w-4" />Send by email</Label>
            <Input type="email" placeholder="friend@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Textarea rows={2} placeholder="Add a note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
            <Button className="w-full" onClick={handleEmail} disabled={sending || !email}>{sending ? "Sending…" : "Send email"}</Button>
          </div>

          <Button asChild variant="outline" className="w-full">
            <a href={`sms:?&body=${smsBody}`}><MessageSquare className="mr-2 h-4 w-4" />Share via text message</a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AddToMyRecipesButton({ recipe }: { recipe: Recipe }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  async function handleAdd() {
    if (!user) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("recipes")
      .insert({
        user_id: user.id,
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients as never,
        instructions: recipe.instructions as never,
        servings: recipe.servings,
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        image_url: recipe.image_url,
        source_url: recipe.source_url,
        tags: recipe.tags,
        cuisine: recipe.cuisine,
        meal_type: recipe.meal_type,
        visibility: "private",
      })
      .select("id")
      .single();
    setSaving(false);
    if (error || !data) return toast.error(error?.message ?? "Failed to copy");
    void logActivity("recipe.copy", { target_type: "recipe", target_id: data.id, metadata: { title: recipe.title, source_recipe_id: recipe.id } });
    toast.success("Added to My Recipes");
    navigate({ to: "/recipes/$recipeId", params: { recipeId: data.id } });
  }

  return (
    <Button variant="outline" className="rounded-full" onClick={handleAdd} disabled={saving}>
      <BookmarkPlus className="mr-2 h-4 w-4" />{saving ? "Adding…" : "Add To My Recipes"}
    </Button>
  );
}

import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Upload, X, Loader2 } from "lucide-react";
import type { Recipe, Ingredient } from "@/lib/recipe-types";
import { CUISINE_OPTIONS, MEAL_TYPE_OPTIONS } from "@/lib/recipe-types";
import { logActivity } from "@/lib/activity-log";


const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const Route = createFileRoute("/recipes/new")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/login" });
  },
  component: () => <RecipeEditor mode="new" />,
});

export function RecipeEditor({ mode, existing }: { mode: "new" | "edit"; existing?: Recipe }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(existing?.title ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [servings, setServings] = useState(existing?.servings ?? "");
  const [prepTime, setPrepTime] = useState(existing?.prep_time ?? "");
  const [cookTime, setCookTime] = useState(existing?.cook_time ?? "");
  const [imageUrl, setImageUrl] = useState(existing?.image_url ?? "");
  const [isPublic, setIsPublic] = useState(existing?.visibility === "public");
  const [ingredients, setIngredients] = useState<Ingredient[]>(existing?.ingredients ?? [{ item: "" }]);
  const [instructions, setInstructions] = useState<string[]>(existing?.instructions ?? [""]);
  const [tags, setTags] = useState<string[]>(existing?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [cuisine, setCuisine] = useState<string>(existing?.cuisine ?? "");
  const [mealType, setMealType] = useState<string>(existing?.meal_type ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    if (!file.type.startsWith("image/")) return toast.error("Please choose an image file");
    if (file.size > MAX_IMAGE_BYTES) return toast.error("Image must be 5 MB or smaller");
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return toast.error("You must be signed in");
    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${u.user.id}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("recipe-images").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });
    if (error) { setUploading(false); return toast.error(error.message); }
    const { data } = supabase.storage.from("recipe-images").getPublicUrl(path);
    setImageUrl(data.publicUrl);
    setUploading(false);
    toast.success("Image uploaded");
  }

  function addTag(raw: string) {
    const t = raw.trim().replace(/,$/, "").trim();
    if (!t) return;
    if (tags.includes(t)) return;
    setTags([...tags, t]);
    setTagInput("");
  }

  async function handleSave() {
    if (!title.trim()) return toast.error("Title is required");
    setSaving(true);
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const payload = {
      user_id: u.user.id,
      title: title.trim(),
      description: description.trim() || null,
      ingredients: ingredients.filter((i) => i.item.trim()),
      instructions: instructions.filter((s) => s.trim()),
      servings: servings.trim() || null,
      prep_time: prepTime.trim() || null,
      cook_time: cookTime.trim() || null,
      image_url: imageUrl.trim() || null,
      tags,
      cuisine: cuisine.trim() || null,
      meal_type: mealType.trim() || null,
      visibility: (isPublic ? "public" : "private") as "public" | "private",
    };
    let id = existing?.id;
    if (mode === "edit" && existing) {
      const { error } = await supabase.from("recipes").update(payload).eq("id", existing.id);
      if (error) { setSaving(false); return toast.error(error.message); }
      void logActivity("recipe.update", { target_type: "recipe", target_id: existing.id, metadata: { title: payload.title } });
      if (existing.visibility !== payload.visibility) {
        void logActivity(
          payload.visibility === "public" ? "recipe.visibility.public" : "recipe.visibility.private",
          { target_type: "recipe", target_id: existing.id, metadata: { title: payload.title } },
        );
      }
    } else {
      const { data, error } = await supabase.from("recipes").insert(payload).select("id").single();
      if (error) { setSaving(false); return toast.error(error.message); }
      id = data.id;
      void logActivity("recipe.create", { target_type: "recipe", target_id: id, metadata: { title: payload.title, visibility: payload.visibility } });
    }
    setSaving(false);
    toast.success("Saved");
    navigate({ to: "/recipes/$recipeId", params: { recipeId: id! } });
  }


  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl">{mode === "new" ? "New recipe" : "Edit recipe"}</h1>

      <Card className="mt-6">
        <CardContent className="space-y-5 pt-6">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div><Label>Servings</Label><Input value={servings} onChange={(e) => setServings(e.target.value)} placeholder="4" /></div>
            <div><Label>Prep time</Label><Input value={prepTime} onChange={(e) => setPrepTime(e.target.value)} placeholder="15 min" /></div>
            <div><Label>Cook time</Label><Input value={cookTime} onChange={(e) => setCookTime(e.target.value)} placeholder="30 min" /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Cuisine</Label>
              <Select value={cuisine || undefined} onValueChange={(v) => setCuisine(v === "__none" ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="Select cuisine" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none">None</SelectItem>
                  {CUISINE_OPTIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Recipe type</Label>
              <Select value={mealType || undefined} onValueChange={(v) => setMealType(v === "__none" ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="Select recipe type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none">None</SelectItem>
                  {MEAL_TYPE_OPTIONS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Image</Label>
            {imageUrl ? (
              <div className="mt-2 flex items-start gap-3">
                <img src={imageUrl} alt="" className="h-24 w-24 rounded-md object-cover" />
                <Button type="button" variant="ghost" size="sm" onClick={() => setImageUrl("")}>
                  <X className="mr-1 h-3 w-3" />Remove
                </Button>
              </div>
            ) : null}
            <Tabs defaultValue="upload" className="mt-2">
              <TabsList>
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="url">Paste URL</TabsTrigger>
              </TabsList>
              <TabsContent value="upload" className="pt-3">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleUpload(f);
                    e.target.value = "";
                  }}
                />
                <Button type="button" variant="outline" disabled={uploading} onClick={() => fileRef.current?.click()}>
                  {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                  {uploading ? "Uploading…" : "Choose image"}
                </Button>
                <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, or WEBP up to 5 MB.</p>
              </TabsContent>
              <TabsContent value="url" className="pt-3">
                <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://…" />
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Badge key={t} variant="secondary" className="gap-1">
                  {t}
                  <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))} aria-label={`Remove ${t}`}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              className="mt-2"
              placeholder="Add a tag and press Enter"
              value={tagInput}
              onChange={(e) => {
                const v = e.target.value;
                if (v.endsWith(",")) addTag(v);
                else setTagInput(v);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") { e.preventDefault(); addTag(tagInput); }
                else if (e.key === "Backspace" && !tagInput && tags.length) {
                  setTags(tags.slice(0, -1));
                }
              }}
            />
          </div>


          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label>Ingredients</Label>
              <Button type="button" variant="ghost" size="sm" onClick={() => setIngredients([...ingredients, { item: "" }])}>
                <Plus className="mr-1 h-3 w-3" />Add
              </Button>
            </div>
            <div className="space-y-2">
              {ingredients.map((ing, i) => (
                <div key={i} className="flex gap-2">
                  <Input className="w-28" placeholder="2 cups" value={ing.quantity ?? ""} onChange={(e) => {
                    const c = [...ingredients]; c[i] = { ...c[i], quantity: e.target.value }; setIngredients(c);
                  }} />
                  <Input className="flex-1" placeholder="flour" value={ing.item} onChange={(e) => {
                    const c = [...ingredients]; c[i] = { ...c[i], item: e.target.value }; setIngredients(c);
                  }} />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setIngredients(ingredients.filter((_, idx) => idx !== i))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label>Instructions</Label>
              <Button type="button" variant="ghost" size="sm" onClick={() => setInstructions([...instructions, ""])}>
                <Plus className="mr-1 h-3 w-3" />Add step
              </Button>
            </div>
            <div className="space-y-2">
              {instructions.map((step, i) => (
                <div key={i} className="flex gap-2">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold">{i + 1}</div>
                  <Textarea rows={2} className="flex-1" value={step} onChange={(e) => {
                    const c = [...instructions]; c[i] = e.target.value; setInstructions(c);
                  }} />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setInstructions(instructions.filter((_, idx) => idx !== i))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Make public</p>
              <p className="text-sm text-muted-foreground">Anyone can view this recipe</p>
            </div>
            <Switch checked={isPublic} onCheckedChange={setIsPublic} />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              if (mode === "edit" && existing) navigate({ to: "/recipes/$recipeId", params: { recipeId: existing.id } });
              else navigate({ to: "/my-recipes" });
            }}>Never mind</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? "Saving…" : "Save recipe"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

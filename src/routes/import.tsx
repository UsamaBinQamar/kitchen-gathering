import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { parseRecipe } from "@/lib/recipe-ai.functions";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";
import type { ParsedRecipe } from "@/lib/recipe-types";

export const Route = createFileRoute("/import")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/login" });
  },
  component: ImportPage,
});

function ImportPage() {
  const navigate = useNavigate();
  const parse = useServerFn(parseRecipe);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleParse(payload: { kind: "url" | "text" | "image"; url?: string; text?: string; imageBase64?: string }) {
    setLoading(true);
    try {
      const parsed = await parse({ data: payload });
      if (!parsed.title) {
        toast.error("Couldn't find a recipe in that input");
        return;
      }
      await saveAndGo(parsed);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to parse");
    } finally {
      setLoading(false);
    }
  }

  async function saveAndGo(parsed: ParsedRecipe & { source_url?: string }) {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const { data, error } = await supabase.from("recipes").insert({
      user_id: u.user.id,
      title: parsed.title,
      description: parsed.description ?? null,
      ingredients: parsed.ingredients,
      instructions: parsed.instructions,
      servings: parsed.servings ?? null,
      prep_time: parsed.prep_time ?? null,
      cook_time: parsed.cook_time ?? null,
      image_url: parsed.image_url ?? null,
      source_url: parsed.source_url ?? null,
      tags: parsed.tags ?? [],
      visibility: "private",
    }).select("id").single();
    if (error) return toast.error(error.message);
    toast.success("Recipe imported");
    navigate({ to: "/recipes/$recipeId", params: { recipeId: data.id } });
  }

  async function handleImageFile(file: File) {
    if (file.size > 8_000_000) return toast.error("Image too large (max 8MB)");
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = String(reader.result);
      await handleParse({ kind: "image", imageBase64: base64 });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          <Sparkles className="h-3 w-3" /> AI-powered
        </span>
        <h1 className="mt-3 font-display text-4xl">Import a recipe</h1>
        <p className="mt-2 text-muted-foreground">Paste a link, text, or photo — we'll structure it.</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-display">Choose a source</CardTitle></CardHeader>
        <CardContent>
          <Tabs defaultValue="url">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="image">Photo</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-3 pt-4">
              <Label htmlFor="u">Recipe webpage URL</Label>
              <Input id="u" placeholder="https://…" value={url} onChange={(e) => setUrl(e.target.value)} />
              <Button disabled={loading || !url} onClick={() => handleParse({ kind: "url", url })}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Parse with AI
              </Button>
            </TabsContent>

            <TabsContent value="text" className="space-y-3 pt-4">
              <Label htmlFor="t">Paste the recipe text</Label>
              <Textarea id="t" rows={10} value={text} onChange={(e) => setText(e.target.value)} placeholder="Title, ingredients, instructions…" />
              <Button disabled={loading || !text} onClick={() => handleParse({ kind: "text", text })}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Parse with AI
              </Button>
            </TabsContent>

            <TabsContent value="image" className="space-y-3 pt-4">
              <Label htmlFor="img">Upload a photo of a recipe</Label>
              <Input id="img" type="file" accept="image/*" disabled={loading} onChange={(e) => {
                const f = e.target.files?.[0]; if (f) handleImageFile(f);
              }} />
              {loading && <p className="text-sm text-muted-foreground"><Loader2 className="mr-2 inline h-4 w-4 animate-spin" />Reading the photo…</p>}
            </TabsContent>

            <TabsContent value="manual" className="space-y-3 pt-4">
              <p className="text-sm text-muted-foreground">Prefer to type it yourself?</p>
              <Button onClick={() => navigate({ to: "/recipes/new" })}>Open the editor</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

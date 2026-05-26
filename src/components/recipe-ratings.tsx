import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Rating = {
  id: string;
  recipe_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
};

type RatingWithProfile = Rating & {
  profile?: { display_name: string | null; avatar_url: string | null } | null;
};

function StarRow({
  value,
  onChange,
  size = 24,
  readOnly = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  readOnly?: boolean;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;
  return (
    <div
      className="inline-flex items-center"
      onMouseLeave={() => setHover(null)}
      role={readOnly ? undefined : "slider"}
      aria-label="Star rating"
      aria-valuemin={0}
      aria-valuemax={5}
      aria-valuenow={value}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const fillPct = Math.max(0, Math.min(1, display - (i - 1))) * 100;
        return (
          <div
            key={i}
            className={cn("relative", !readOnly && "cursor-pointer")}
            style={{ width: size, height: size }}
            onMouseMove={(e) => {
              if (readOnly) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const half = e.clientX - rect.left < rect.width / 2;
              setHover(i - (half ? 0.5 : 0));
            }}
            onClick={(e) => {
              if (readOnly || !onChange) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const half = e.clientX - rect.left < rect.width / 2;
              onChange(i - (half ? 0.5 : 0));
            }}
          >
            <Star className="absolute inset-0 text-muted-foreground/40" style={{ width: size, height: size }} />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPct}%` }}>
              <Star
                className="text-primary"
                style={{ width: size, height: size, fill: "currentColor" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function RecipeRatings({ recipeId }: { recipeId: string }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [draftRating, setDraftRating] = useState(0);
  const [draftComment, setDraftComment] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: ratings = [] } = useQuery({
    queryKey: ["recipe-ratings", recipeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipe_ratings")
        .select("*")
        .eq("recipe_id", recipeId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      const userIds = Array.from(new Set((data ?? []).map((r) => r.user_id)));
      let profiles: Record<string, { display_name: string | null; avatar_url: string | null }> = {};
      if (userIds.length) {
        const { data: profs } = await supabase
          .from("profiles")
          .select("id, display_name, avatar_url")
          .in("id", userIds);
        profiles = Object.fromEntries((profs ?? []).map((p) => [p.id, p]));
      }
      return (data ?? []).map((r) => ({ ...r, profile: profiles[r.user_id] ?? null })) as RatingWithProfile[];
    },
  });

  const myRating = useMemo(() => ratings.find((r) => r.user_id === user?.id), [ratings, user]);
  const average = useMemo(() => {
    if (!ratings.length) return 0;
    return ratings.reduce((s, r) => s + Number(r.rating), 0) / ratings.length;
  }, [ratings]);

  function startEdit() {
    setDraftRating(myRating ? Number(myRating.rating) : 0);
    setDraftComment(myRating?.comment ?? "");
    setEditing(true);
  }

  async function save() {
    if (!user) return;
    if (draftRating <= 0 && !myRating) {
      toast.error("Pick a star rating");
      return;
    }
    setSaving(true);
    const payload = {
      recipe_id: recipeId,
      user_id: user.id,
      rating: draftRating,
      comment: draftComment.trim() || null,
    };
    const { error } = await supabase
      .from("recipe_ratings")
      .upsert(payload, { onConflict: "recipe_id,user_id" });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Review saved");
    setEditing(false);
    qc.invalidateQueries({ queryKey: ["recipe-ratings", recipeId] });
  }

  async function remove() {
    if (!myRating) return;
    if (!confirm("Delete your review?")) return;
    const { error } = await supabase.from("recipe_ratings").delete().eq("id", myRating.id);
    if (error) return toast.error(error.message);
    toast.success("Review deleted");
    setEditing(false);
    qc.invalidateQueries({ queryKey: ["recipe-ratings", recipeId] });
  }

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl">Reviews</h2>
          <div className="mt-2 flex items-center gap-3">
            <StarRow value={average} readOnly />
            <span className="text-sm text-muted-foreground">
              {ratings.length
                ? `${average.toFixed(1)} · ${ratings.length} review${ratings.length === 1 ? "" : "s"}`
                : "No reviews yet"}
            </span>
          </div>
        </div>
        {user ? (
          !editing && (
            <Button variant="outline" onClick={startEdit} className="rounded-full">
              {myRating ? "Edit your review" : "Write a review"}
            </Button>
          )
        ) : (
          <Button variant="outline" asChild className="rounded-full">
            <Link to="/login">Sign in to rate</Link>
          </Button>
        )}
      </div>

      {editing && (
        <Card className="mt-4">
          <CardContent className="space-y-3 pt-6">
            <div className="flex items-center gap-3">
              <StarRow value={draftRating} onChange={setDraftRating} size={28} />
              <span className="text-sm text-muted-foreground">{draftRating.toFixed(1)} / 5</span>
            </div>
            <Textarea
              rows={3}
              placeholder="Share your thoughts (optional)"
              value={draftComment}
              onChange={(e) => setDraftComment(e.target.value)}
              maxLength={1000}
            />
            <div className="flex flex-wrap gap-2">
              <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save review"}</Button>
              <Button variant="ghost" onClick={() => setEditing(false)} disabled={saving}>Never mind</Button>
              {myRating && (
                <Button variant="outline" onClick={remove} disabled={saving} className="ml-auto">
                  Delete
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <ul className="mt-6 space-y-4">
        {ratings.map((r) => (
          <li key={r.id} className="rounded-xl border border-border/60 bg-card p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-xs">
                  {(r.profile?.display_name ?? "?").slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {r.profile?.display_name ?? "Anonymous"}
                    {r.user_id === user?.id && <span className="ml-2 text-xs text-muted-foreground">(you)</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <StarRow value={Number(r.rating)} readOnly size={16} />
            </div>
            {r.comment && <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{r.comment}</p>}
          </li>
        ))}
        {!ratings.length && (
          <li className="rounded-xl border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
            Be the first to share a review.
          </li>
        )}
      </ul>
    </section>
  );
}

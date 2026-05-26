import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useChildMatches, O as Outlet, d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as Route$3, x as useAuth, c as Button, o as Switch, d as Card, e as CardContent, s as Textarea, L as Label, I as Input$1, v as logActivity, u as cn } from "./router-Cq9dAjtw.mjs";
import { s as supabase } from "./client-CDTVfI8Q.mjs";
import { D as Dialog, d as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Cr-3JCnu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useServerFn, c as createSsrRpc } from "./createSsrRpc-C43wELHC.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CtG7XZTW.mjs";
import { a as createServerFn } from "./server-B1MpUZnh.mjs";
import "../_libs/seroval.mjs";
import { G as Globe, D as UtensilsCrossed, z as Users, h as Clock, E as ExternalLink, b as ChefHat, j as Eye, k as EyeOff, P as Pencil, T as Trash2, y as StickyNote, q as MicOff, p as Mic, X, r as Play, d as ChevronLeft, e as ChevronRight, u as Share2, M as Mail, o as MessageSquare, a as BookmarkPlus, x as Star } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "./client.server-U_pH-Evd.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function CookNow({ recipe, onExit }) {
  const steps = recipe.instructions;
  const [step, setStep] = reactExports.useState(0);
  const [listening, setListening] = reactExports.useState(false);
  const wakeLockRef = reactExports.useRef(null);
  const recognitionRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let cancelled = false;
    async function lock() {
      try {
        const nav = navigator;
        if (nav.wakeLock) {
          const wl = await nav.wakeLock.request("screen");
          if (cancelled) {
            wl.release();
            return;
          }
          wakeLockRef.current = wl;
        }
      } catch {
      }
    }
    lock();
    const onVis = () => {
      if (document.visibilityState === "visible" && !wakeLockRef.current) lock();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVis);
      wakeLockRef.current?.release().catch(() => {
      });
      wakeLockRef.current = null;
    };
  }, []);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onExit();
      else if (e.key === "ArrowRight") setStep((s) => Math.min(s + 1, steps.length - 1));
      else if (e.key === "ArrowLeft") setStep((s) => Math.max(s - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [steps.length, onExit]);
  function toggleVoice() {
    const w = window;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) return toast.error("Voice commands aren't supported in this browser");
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const r = new SR();
    r.continuous = true;
    r.interimResults = false;
    r.lang = "en-US";
    r.onresult = (e) => {
      const last = e.results[e.results.length - 1][0].transcript.toLowerCase().trim();
      if (/(next|forward|continue)/.test(last)) setStep((s) => Math.min(s + 1, steps.length - 1));
      else if (/(back|previous|repeat)/.test(last)) setStep((s) => Math.max(s - 1, 0));
      else if (/(stop|exit|done|finish)/.test(last)) onExit();
      else if (/(read|say) (it|that|again)/.test(last)) speak(steps[step]);
    };
    r.onerror = () => setListening(false);
    r.onend = () => {
      if (listening) try {
        r.start();
      } catch {
      }
    };
    try {
      r.start();
      recognitionRef.current = r;
      setListening(true);
      toast.success("Listening: say 'next', 'back', or 'exit'");
    } catch {
      setListening(false);
    }
  }
  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(u);
  }
  reactExports.useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      speechSynthesis?.cancel();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex flex-col bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Cook Now" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: recipe.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: listening ? "default" : "outline", size: "sm", onClick: toggleVoice, className: "rounded-full", children: listening ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "mr-1 h-4 w-4" }),
          "Listening"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "mr-1 h-4 w-4" }),
          "Voice"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: onExit, "aria-label": "Exit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center justify-center px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-2xl text-primary", children: [
        "Step ",
        step + 1,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          "/ ",
          steps.length
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-4xl text-center font-display text-3xl leading-snug md:text-5xl", children: steps[step] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "mt-8", onClick: () => speak(steps[step]), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "mr-2 h-4 w-4" }),
        "Read this step"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 border-t border-border/60 px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", variant: "outline", disabled: step === 0, onClick: () => setStep(step - 1), className: "rounded-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "mr-1 h-5 w-5" }),
        "Back"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center gap-1 px-4", children: steps.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}` }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", disabled: step === steps.length - 1, onClick: () => setStep(step + 1), className: "rounded-full", children: [
        "Next",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-1 h-5 w-5" })
      ] })
    ] })
  ] });
}
const Input = objectType({
  recipientEmail: stringType().email(),
  recipientName: stringType().max(100).optional(),
  recipeTitle: stringType().max(200),
  recipeUrl: stringType().url(),
  note: stringType().max(500).optional(),
  senderName: stringType().max(100).optional()
});
const shareRecipeByEmail = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => Input.parse(i)).handler(createSsrRpc("610f8f79c147f128ed099a81b5f409f8d4ab5116a165d0859c239a7883009260"));
function StarRow({
  value,
  onChange,
  size = 24,
  readOnly = false
}) {
  const [hover, setHover] = reactExports.useState(null);
  const display = hover ?? value;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "inline-flex items-center",
      onMouseLeave: () => setHover(null),
      role: readOnly ? void 0 : "slider",
      "aria-label": "Star rating",
      "aria-valuemin": 0,
      "aria-valuemax": 5,
      "aria-valuenow": value,
      children: [1, 2, 3, 4, 5].map((i) => {
        const fillPct = Math.max(0, Math.min(1, display - (i - 1))) * 100;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn("relative", !readOnly && "cursor-pointer"),
            style: { width: size, height: size },
            onMouseMove: (e) => {
              if (readOnly) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const half = e.clientX - rect.left < rect.width / 2;
              setHover(i - (half ? 0.5 : 0));
            },
            onClick: (e) => {
              if (readOnly || !onChange) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const half = e.clientX - rect.left < rect.width / 2;
              onChange(i - (half ? 0.5 : 0));
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "absolute inset-0 text-muted-foreground/40", style: { width: size, height: size } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden", style: { width: `${fillPct}%` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: "text-primary",
                  style: { width: size, height: size, fill: "currentColor" }
                }
              ) })
            ]
          },
          i
        );
      })
    }
  );
}
function RecipeRatings({ recipeId }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [editing, setEditing] = reactExports.useState(false);
  const [draftRating, setDraftRating] = reactExports.useState(0);
  const [draftComment, setDraftComment] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const { data: ratings = [] } = useQuery({
    queryKey: ["recipe-ratings", recipeId],
    queryFn: async () => {
      const { data, error } = await supabase.from("recipe_ratings").select("*").eq("recipe_id", recipeId).order("created_at", { ascending: false });
      if (error) throw error;
      const userIds = Array.from(new Set((data ?? []).map((r) => r.user_id)));
      let profiles = {};
      if (userIds.length) {
        const { data: profs } = await supabase.from("profiles").select("id, display_name, avatar_url").in("id", userIds);
        profiles = Object.fromEntries((profs ?? []).map((p) => [p.id, p]));
      }
      return (data ?? []).map((r) => ({ ...r, profile: profiles[r.user_id] ?? null }));
    }
  });
  const myRating = reactExports.useMemo(() => ratings.find((r) => r.user_id === user?.id), [ratings, user]);
  const average = reactExports.useMemo(() => {
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
      comment: draftComment.trim() || null
    };
    const { error } = await supabase.from("recipe_ratings").upsert(payload, { onConflict: "recipe_id,user_id" });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Reviews" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { value: average, readOnly: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: ratings.length ? `${average.toFixed(1)} · ${ratings.length} review${ratings.length === 1 ? "" : "s"}` : "No reviews yet" })
        ] })
      ] }),
      user ? !editing && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: startEdit, className: "rounded-full", children: myRating ? "Edit your review" : "Write a review" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, className: "rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Sign in to rate" }) })
    ] }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { value: draftRating, onChange: setDraftRating, size: 28 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          draftRating.toFixed(1),
          " / 5"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          rows: 3,
          placeholder: "Share your thoughts (optional)",
          value: draftComment,
          onChange: (e) => setDraftComment(e.target.value),
          maxLength: 1e3
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, disabled: saving, children: saving ? "Saving…" : "Save review" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setEditing(false), disabled: saving, children: "Never mind" }),
        myRating && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: remove, disabled: saving, className: "ml-auto", children: "Delete" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-6 space-y-4", children: [
      ratings.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl border border-border/60 bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-full bg-muted text-xs", children: (r.profile?.display_name ?? "?").slice(0, 1).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
                r.profile?.display_name ?? "Anonymous",
                r.user_id === user?.id && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: "(you)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(r.created_at).toLocaleDateString() })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { value: Number(r.rating), readOnly: true, size: 16 })
        ] }),
        r.comment && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed", children: r.comment })
      ] }, r.id)),
      !ratings.length && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "rounded-xl border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground", children: "Be the first to share a review." })
    ] })
  ] });
}
function scaleQuantity(qty, factor) {
  if (!qty) return "";
  if (factor === 1) return qty;
  const trimmed = qty.trim();
  const re = /^(\d+(?:\.\d+)?)(?:\s+(\d+)\/(\d+))?|^(\d+)\/(\d+)/;
  const m = trimmed.match(re);
  if (!m) return qty;
  let value = 0;
  let matched = "";
  if (m[4] && m[5]) {
    value = Number(m[4]) / Number(m[5]);
    matched = m[0];
  } else {
    const whole = Number(m[1]);
    if (m[2] && m[3]) {
      value = whole + Number(m[2]) / Number(m[3]);
    } else {
      value = whole;
    }
    matched = m[0];
  }
  const scaled = value * factor;
  const rest = trimmed.slice(matched.length);
  return formatNumber(scaled) + rest;
}
function formatNumber(n) {
  const whole = Math.floor(n);
  const frac = n - whole;
  const fractions = [
    [0, ""],
    [1 / 8, "1/8"],
    [1 / 4, "1/4"],
    [1 / 3, "1/3"],
    [1 / 2, "1/2"],
    [2 / 3, "2/3"],
    [3 / 4, "3/4"],
    [1, ""]
  ];
  let best = fractions[0];
  let bestDiff = Math.abs(frac - best[0]);
  for (const f of fractions) {
    const d = Math.abs(frac - f[0]);
    if (d < bestDiff) {
      bestDiff = d;
      best = f;
    }
  }
  if (bestDiff < 0.04) {
    const w = best[0] === 1 ? whole + 1 : whole;
    if (best[1] === "") return String(w);
    return w === 0 ? best[1] : `${w} ${best[1]}`;
  }
  return (Math.round(n * 100) / 100).toString();
}
function RecipeRoute() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RecipeDetail, {});
}
function RecipeDetail() {
  const {
    recipeId
  } = Route$3.useParams();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [cookNow, setCookNow] = reactExports.useState(false);
  const queryClient = useQueryClient();
  const [updatingVisibility, setUpdatingVisibility] = reactExports.useState(false);
  const [scale, setScale] = reactExports.useState(1);
  const [notes, setNotes] = reactExports.useState("");
  const [savingNotes, setSavingNotes] = reactExports.useState(false);
  const {
    data: recipe,
    isLoading
  } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("recipes").select("*").eq("id", recipeId).single();
      if (error) throw error;
      return data;
    }
  });
  reactExports.useEffect(() => {
    if (recipe) setNotes(recipe.notes ?? "");
  }, [recipe?.id, recipe?.notes]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-96 animate-pulse rounded-2xl bg-muted" }) });
  if (!recipe) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-10 text-center", children: "Recipe not found" });
  const isOwner = user?.id === recipe.user_id;
  async function handleDelete() {
    if (!recipe || !confirm("Delete this recipe?")) return;
    const {
      error
    } = await supabase.from("recipes").delete().eq("id", recipe.id);
    if (error) return toast.error(error.message);
    void logActivity("recipe.delete", {
      target_type: "recipe",
      target_id: recipe.id,
      metadata: {
        title: recipe.title
      }
    });
    toast.success("Deleted");
    navigate({
      to: "/my-recipes"
    });
  }
  async function toggleVisibility(makePublic) {
    if (!recipe) return;
    if (makePublic && recipe.visibility === "public") {
      toast.info("Recipe is already public");
      return;
    }
    setUpdatingVisibility(true);
    if (makePublic) {
      const {
        data: conflict,
        error: checkError
      } = await supabase.from("recipes").select("id").eq("visibility", "public").ilike("title", recipe.title).neq("id", recipe.id).limit(1).maybeSingle();
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
    const {
      error
    } = await supabase.from("recipes").update({
      visibility: next
    }).eq("id", recipe.id);
    setUpdatingVisibility(false);
    if (error) return toast.error(error.message);
    void logActivity(makePublic ? "recipe.visibility.public" : "recipe.visibility.private", {
      target_type: "recipe",
      target_id: recipe.id,
      metadata: {
        title: recipe.title
      }
    });
    toast.success(makePublic ? "Recipe is now public" : "Recipe is now private");
    queryClient.invalidateQueries({
      queryKey: ["recipe", recipe.id]
    });
    queryClient.invalidateQueries({
      queryKey: ["my-recipes"]
    });
  }
  if (cookNow) return /* @__PURE__ */ jsxRuntimeExports.jsx(CookNow, { recipe, onExit: () => setCookNow(false) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 py-10", children: [
    recipe.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 overflow-hidden rounded-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: recipe.image_url, alt: recipe.title, className: "aspect-[16/9] w-full object-cover" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl", children: recipe.title }),
        recipe.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-muted-foreground", children: recipe.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground", children: [
          recipe.cuisine && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }),
            recipe.cuisine
          ] }),
          recipe.meal_type && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "h-4 w-4" }),
            recipe.meal_type
          ] }),
          recipe.servings && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
            recipe.servings
          ] }),
          recipe.prep_time && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
            "Prep ",
            recipe.prep_time
          ] }),
          recipe.cook_time && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
            "Cook ",
            recipe.cook_time
          ] }),
          recipe.source_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: recipe.source_url, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 underline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" }),
            "source"
          ] })
        ] }),
        recipe.tags && recipe.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: recipe.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border px-3 py-1 text-xs text-muted-foreground", children: [
          "#",
          t
        ] }, t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setCookNow(true), className: "rounded-full", size: "lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "mr-2 h-4 w-4" }),
          "Cook Now"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShareDialog, { recipe }),
        !isOwner && user && /* @__PURE__ */ jsxRuntimeExports.jsx(AddToMyRecipesButton, { recipe }),
        isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs", children: [
            recipe.visibility === "public" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: recipe.visibility === "public" ? "Public" : "Private" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: recipe.visibility === "public", disabled: updatingVisibility, onCheckedChange: toggleVisibility, "aria-label": "Toggle public visibility" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/recipes/$recipeId/edit", params: {
            recipeId: recipe.id
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: handleDelete, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-8 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "md:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Ingredients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Scale" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex overflow-hidden rounded-full border border-border/70", children: [{
            label: "½×",
            value: 0.5
          }, {
            label: "1×",
            value: 1
          }, {
            label: "2×",
            value: 2
          }, {
            label: "4×",
            value: 4
          }].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setScale(opt.value), className: "px-3 py-1 text-xs font-medium transition-colors " + (scale === opt.value ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-accent"), "aria-pressed": scale === opt.value, children: opt.label }, opt.value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm", children: recipe.ingredients.map((ing, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 border-b border-border/40 pb-2 last:border-0", children: [
          ing.quantity && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: scaleQuantity(ing.quantity, scale) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: ing.item })
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Instructions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-4 space-y-5", children: recipe.instructions.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-display text-primary-foreground", children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-1 leading-relaxed", children: step })
        ] }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 font-display text-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "h-5 w-5" }),
            "Notes"
          ] }),
          isOwner ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 4, placeholder: "Add your personal notes, tweaks, or tips…", value: notes, onChange: (e) => setNotes(e.target.value) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", disabled: savingNotes || notes === (recipe.notes ?? ""), onClick: async () => {
              setSavingNotes(true);
              const {
                error
              } = await supabase.from("recipes").update({
                notes: notes || null
              }).eq("id", recipe.id);
              setSavingNotes(false);
              if (error) return toast.error(error.message);
              toast.success("Notes saved");
              queryClient.invalidateQueries({
                queryKey: ["recipe", recipe.id]
              });
            }, children: savingNotes ? "Saving…" : "Save notes" }) })
          ] }) : recipe.notes ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground", children: recipe.notes }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "No notes yet." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RecipeRatings, { recipeId: recipe.id })
  ] });
}
function ShareDialog({
  recipe
}) {
  const {
    user
  } = useAuth();
  const sendEmail = useServerFn(shareRecipeByEmail);
  const [open, setOpen] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [note, setNote] = reactExports.useState("");
  const [sending, setSending] = reactExports.useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  async function handleEmail() {
    if (!user) return toast.error("Sign in to share by email");
    if (!email) return;
    setSending(true);
    try {
      await sendEmail({
        data: {
          recipientEmail: email,
          recipeTitle: recipe.title,
          recipeUrl: url,
          note: note || void 0,
          senderName: user.user_metadata?.display_name
        }
      });
      toast.success("Email sent");
      setOpen(false);
      setEmail("");
      setNote("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to send");
    } finally {
      setSending(false);
    }
  }
  const smsBody = encodeURIComponent(`Check out this recipe: ${recipe.title} — ${url}`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "mr-2 h-4 w-4" }),
      "Share"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Share this recipe" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-muted/30 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm", children: url }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "mt-1", onClick: () => {
            navigator.clipboard.writeText(url);
            toast.success("Link copied");
          }, children: "Copy link" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
            "Send by email"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input$1, { type: "email", placeholder: "friend@example.com", value: email, onChange: (e) => setEmail(e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, placeholder: "Add a note (optional)", value: note, onChange: (e) => setNote(e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", onClick: handleEmail, disabled: sending || !email, children: sending ? "Sending…" : "Send email" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `sms:?&body=${smsBody}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "mr-2 h-4 w-4" }),
          "Share via text message"
        ] }) })
      ] })
    ] })
  ] });
}
function AddToMyRecipesButton({
  recipe
}) {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = reactExports.useState(false);
  async function handleAdd() {
    if (!user) return;
    setSaving(true);
    const {
      data,
      error
    } = await supabase.from("recipes").insert({
      user_id: user.id,
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      servings: recipe.servings,
      prep_time: recipe.prep_time,
      cook_time: recipe.cook_time,
      image_url: recipe.image_url,
      source_url: recipe.source_url,
      tags: recipe.tags,
      cuisine: recipe.cuisine,
      meal_type: recipe.meal_type,
      visibility: "private"
    }).select("id").single();
    setSaving(false);
    if (error || !data) return toast.error(error?.message ?? "Failed to copy");
    void logActivity("recipe.copy", {
      target_type: "recipe",
      target_id: data.id,
      metadata: {
        title: recipe.title,
        source_recipe_id: recipe.id
      }
    });
    toast.success("Added to My Recipes");
    navigate({
      to: "/recipes/$recipeId",
      params: {
        recipeId: data.id
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full", onClick: handleAdd, disabled: saving, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "mr-2 h-4 w-4" }),
    saving ? "Adding…" : "Add To My Recipes"
  ] });
}
export {
  RecipeRoute as component
};

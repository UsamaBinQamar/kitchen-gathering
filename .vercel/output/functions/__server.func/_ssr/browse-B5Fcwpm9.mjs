import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-CDTVfI8Q.mjs";
import { h as Route$7, I as Input, S as Select, m as SelectTrigger, n as SelectValue, k as SelectContent, l as SelectItem, C as CUISINE_OPTIONS, M as MEAL_TYPE_OPTIONS, c as Button } from "./router-Cq9dAjtw.mjs";
import "../_libs/sonner.mjs";
import { t as Search, X, h as Clock } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "./client.server-U_pH-Evd.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
const ALL = "__all__";
function BrowsePage() {
  const {
    q,
    cuisine,
    meal,
    tag
  } = Route$7.useSearch();
  const navigate = useNavigate({
    from: "/browse"
  });
  const {
    data: recipes,
    isLoading
  } = useQuery({
    queryKey: ["browse-public-recipes"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("recipes").select("*").eq("visibility", "public").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  const filtered = reactExports.useMemo(() => {
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
  function setQ(v) {
    navigate({
      search: (p) => ({
        ...p,
        q: v
      })
    });
  }
  function setCuisine(v) {
    navigate({
      search: (p) => ({
        ...p,
        cuisine: v === ALL ? "" : v
      })
    });
  }
  function setMeal(v) {
    navigate({
      search: (p) => ({
        ...p,
        meal: v === ALL ? "" : v
      })
    });
  }
  function setTag(v) {
    navigate({
      search: (p) => ({
        ...p,
        tag: v
      })
    });
  }
  function clearAll() {
    navigate({
      search: () => ({
        q: "",
        cuisine: "",
        meal: "",
        tag: ""
      })
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Browse recipes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "Explore public recipes from the community" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 rounded-2xl border border-border/70 bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs text-muted-foreground", children: "Search" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search recipe titles...", className: "pl-9" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[180px] flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs text-muted-foreground", children: "Cuisine" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: cuisine || ALL, onValueChange: setCuisine, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All cuisines", children: cuisine || "All cuisines" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ALL, children: "All cuisines" }),
              CUISINE_OPTIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[180px] flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs text-muted-foreground", children: "Recipe type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: meal || ALL, onValueChange: setMeal, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All recipe types", children: meal || "All recipe types" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ALL, children: "All recipe types" }),
              MEAL_TYPE_OPTIONS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m, children: m }, m))
            ] })
          ] })
        ] }),
        hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: clearAll, className: "self-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "mr-1 h-4 w-4" }),
          "Clear filters"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs text-muted-foreground", children: "Tag" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: tag, onChange: (e) => setTag(e.target.value), placeholder: "Filter by tag..." })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({
      length: 6
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-60 animate-pulse rounded-2xl bg-muted" }, i)) }) : filtered.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4 text-sm text-muted-foreground", children: [
        filtered.length,
        " recipe",
        filtered.length === 1 ? "" : "s"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/recipes/$recipeId", params: {
        recipeId: r.id
      }, className: "group block overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] bg-secondary/40", children: r.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.image_url, alt: r.title, loading: "lazy", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl opacity-40", children: r.title.charAt(0) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl leading-snug", children: r.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground", children: [
            r.cook_time && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              r.cook_time
            ] }),
            r.cuisine && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.cuisine }),
            r.meal_type && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "· ",
              r.meal_type
            ] })
          ] }),
          r.tags && r.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1", children: r.tags.slice(0, 3).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground", children: t }, t)) })
        ] })
      ] }, r.id)) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: hasFilters ? "No recipes match these filters." : "No public recipes yet." }),
      hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "mt-4 rounded-full", onClick: clearAll, children: "Clear filters" })
    ] })
  ] });
}
export {
  BrowsePage as component
};

import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { d as Card, f as CardHeader, g as CardTitle, e as CardContent, T as Tabs, q as TabsList, r as TabsTrigger, p as TabsContent, L as Label, I as Input, c as Button, s as Textarea } from "./router-Cq9dAjtw.mjs";
import { s as supabase } from "./client-CDTVfI8Q.mjs";
import { u as useServerFn, c as createSsrRpc } from "./createSsrRpc-C43wELHC.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CtG7XZTW.mjs";
import { a as createServerFn } from "./server-B1MpUZnh.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { w as Sparkles, l as LoaderCircle } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
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
import "../_libs/tanstack__react-query.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const InputSchema = objectType({
  kind: enumType(["url", "text", "image"]),
  url: stringType().url().optional(),
  text: stringType().max(5e4).optional(),
  imageBase64: stringType().max(1e7).optional()
});
const parseRecipe = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => InputSchema.parse(input)).handler(createSsrRpc("74741af0ab40d84144fef1f13eb863591ef9a25410c9cf055f4f58b1383e3320"));
function ImportPage() {
  const navigate = useNavigate();
  const parse = useServerFn(parseRecipe);
  const [url, setUrl] = reactExports.useState("");
  const [text, setText] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  async function handleParse(payload) {
    setLoading(true);
    try {
      const parsed = await parse({
        data: payload
      });
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
  async function saveAndGo(parsed) {
    const {
      data: u
    } = await supabase.auth.getUser();
    if (!u.user) return;
    const {
      data,
      error
    } = await supabase.from("recipes").insert({
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
      visibility: "private"
    }).select("id").single();
    if (error) return toast.error(error.message);
    toast.success("Recipe imported");
    navigate({
      to: "/recipes/$recipeId",
      params: {
        recipeId: data.id
      }
    });
  }
  async function handleImageFile(file) {
    if (file.size > 8e6) return toast.error("Image too large (max 8MB)");
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = String(reader.result);
      await handleParse({
        kind: "image",
        imageBase64: base64
      });
    };
    reader.readAsDataURL(file);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
        " AI-powered"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: "Import a recipe" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Paste a link, text, or photo — we'll structure it." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: "Choose a source" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "url", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "url", children: "URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "text", children: "Text" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "image", children: "Photo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "manual", children: "Manual" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "url", className: "space-y-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "u", children: "Recipe webpage URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "u", placeholder: "https://…", value: url, onChange: (e) => setUrl(e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: loading || !url, onClick: () => handleParse({
            kind: "url",
            url
          }), children: [
            loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : null,
            " Parse with AI"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "text", className: "space-y-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "t", children: "Paste the recipe text" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "t", rows: 10, value: text, onChange: (e) => setText(e.target.value), placeholder: "Title, ingredients, instructions…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: loading || !text, onClick: () => handleParse({
            kind: "text",
            text
          }), children: [
            loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : null,
            " Parse with AI"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "image", className: "space-y-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "img", children: "Upload a photo of a recipe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "img", type: "file", accept: "image/*", disabled: loading, onChange: (e) => {
            const f = e.target.files?.[0];
            if (f) handleImageFile(f);
          } }),
          loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 inline h-4 w-4 animate-spin" }),
            "Reading the photo…"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "manual", className: "space-y-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Prefer to type it yourself?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({
            to: "/recipes/new"
          }), children: "Open the editor" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ImportPage as component
};

import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { d as Card, e as CardContent, L as Label, I as Input, s as Textarea, S as Select, m as SelectTrigger, n as SelectValue, k as SelectContent, l as SelectItem, C as CUISINE_OPTIONS, M as MEAL_TYPE_OPTIONS, c as Button, T as Tabs, q as TabsList, r as TabsTrigger, p as TabsContent, B as Badge, o as Switch, v as logActivity } from "./router-Cq9dAjtw.mjs";
import { s as supabase } from "./client-CDTVfI8Q.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { X, l as LoaderCircle, U as Upload, s as Plus, T as Trash2 } from "../_libs/lucide-react.mjs";
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
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
function RecipeEditor({
  mode,
  existing
}) {
  const navigate = useNavigate();
  const [title, setTitle] = reactExports.useState(existing?.title ?? "");
  const [description, setDescription] = reactExports.useState(existing?.description ?? "");
  const [servings, setServings] = reactExports.useState(existing?.servings ?? "");
  const [prepTime, setPrepTime] = reactExports.useState(existing?.prep_time ?? "");
  const [cookTime, setCookTime] = reactExports.useState(existing?.cook_time ?? "");
  const [imageUrl, setImageUrl] = reactExports.useState(existing?.image_url ?? "");
  const [isPublic, setIsPublic] = reactExports.useState(existing?.visibility === "public");
  const [ingredients, setIngredients] = reactExports.useState(existing?.ingredients ?? [{
    item: ""
  }]);
  const [instructions, setInstructions] = reactExports.useState(existing?.instructions ?? [""]);
  const [tags, setTags] = reactExports.useState(existing?.tags ?? []);
  const [tagInput, setTagInput] = reactExports.useState("");
  const [cuisine, setCuisine] = reactExports.useState(existing?.cuisine ?? "");
  const [mealType, setMealType] = reactExports.useState(existing?.meal_type ?? "");
  const [uploading, setUploading] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  async function handleUpload(file) {
    if (!file.type.startsWith("image/")) return toast.error("Please choose an image file");
    if (file.size > MAX_IMAGE_BYTES) return toast.error("Image must be 5 MB or smaller");
    const {
      data: u
    } = await supabase.auth.getUser();
    if (!u.user) return toast.error("You must be signed in");
    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${u.user.id}/${crypto.randomUUID()}.${ext}`;
    const {
      error
    } = await supabase.storage.from("recipe-images").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type
    });
    if (error) {
      setUploading(false);
      return toast.error(error.message);
    }
    const {
      data
    } = supabase.storage.from("recipe-images").getPublicUrl(path);
    setImageUrl(data.publicUrl);
    setUploading(false);
    toast.success("Image uploaded");
  }
  function addTag(raw) {
    const t = raw.trim().replace(/,$/, "").trim();
    if (!t) return;
    if (tags.includes(t)) return;
    setTags([...tags, t]);
    setTagInput("");
  }
  async function handleSave() {
    if (!title.trim()) return toast.error("Title is required");
    setSaving(true);
    const {
      data: u
    } = await supabase.auth.getUser();
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
      visibility: isPublic ? "public" : "private"
    };
    let id = existing?.id;
    if (mode === "edit" && existing) {
      const {
        error
      } = await supabase.from("recipes").update(payload).eq("id", existing.id);
      if (error) {
        setSaving(false);
        return toast.error(error.message);
      }
      void logActivity("recipe.update", {
        target_type: "recipe",
        target_id: existing.id,
        metadata: {
          title: payload.title
        }
      });
      if (existing.visibility !== payload.visibility) {
        void logActivity(payload.visibility === "public" ? "recipe.visibility.public" : "recipe.visibility.private", {
          target_type: "recipe",
          target_id: existing.id,
          metadata: {
            title: payload.title
          }
        });
      }
    } else {
      const {
        data,
        error
      } = await supabase.from("recipes").insert(payload).select("id").single();
      if (error) {
        setSaving(false);
        return toast.error(error.message);
      }
      id = data.id;
      void logActivity("recipe.create", {
        target_type: "recipe",
        target_id: id,
        metadata: {
          title: payload.title,
          visibility: payload.visibility
        }
      });
    }
    setSaving(false);
    toast.success("Saved");
    navigate({
      to: "/recipes/$recipeId",
      params: {
        recipeId: id
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: mode === "new" ? "New recipe" : "Edit recipe" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: description, onChange: (e) => setDescription(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Servings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: servings, onChange: (e) => setServings(e.target.value), placeholder: "4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Prep time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: prepTime, onChange: (e) => setPrepTime(e.target.value), placeholder: "15 min" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cook time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: cookTime, onChange: (e) => setCookTime(e.target.value), placeholder: "30 min" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cuisine" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: cuisine || void 0, onValueChange: (v) => setCuisine(v === "__none" ? "" : v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select cuisine" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__none", children: "None" }),
              CUISINE_OPTIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Recipe type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: mealType || void 0, onValueChange: (v) => setMealType(v === "__none" ? "" : v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select recipe type" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__none", children: "None" }),
              MEAL_TYPE_OPTIONS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m, children: m }, m))
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Image" }),
        imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imageUrl, alt: "", className: "h-24 w-24 rounded-md object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => setImageUrl(""), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "mr-1 h-3 w-3" }),
            "Remove"
          ] })
        ] }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "upload", className: "mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "upload", children: "Upload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "url", children: "Paste URL" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "upload", className: "pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
              const f = e.target.files?.[0];
              if (f) handleUpload(f);
              e.target.value = "";
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", disabled: uploading, onClick: () => fileRef.current?.click(), children: [
              uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mr-2 h-4 w-4" }),
              uploading ? "Uploading…" : "Choose image"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "PNG, JPG, or WEBP up to 5 MB." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "url", className: "pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: imageUrl, onChange: (e) => setImageUrl(e.target.value), placeholder: "https://…" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tags" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1", children: [
          t,
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setTags(tags.filter((x) => x !== t)), "aria-label": `Remove ${t}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
        ] }, t)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-2", placeholder: "Add a tag and press Enter", value: tagInput, onChange: (e) => {
          const v = e.target.value;
          if (v.endsWith(",")) addTag(v);
          else setTagInput(v);
        }, onKeyDown: (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag(tagInput);
          } else if (e.key === "Backspace" && !tagInput && tags.length) {
            setTags(tags.slice(0, -1));
          }
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ingredients" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => setIngredients([...ingredients, {
            item: ""
          }]), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-3 w-3" }),
            "Add"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ingredients.map((ing, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "w-28", placeholder: "2 cups", value: ing.quantity ?? "", onChange: (e) => {
            const c = [...ingredients];
            c[i] = {
              ...c[i],
              quantity: e.target.value
            };
            setIngredients(c);
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "flex-1", placeholder: "flour", value: ing.item, onChange: (e) => {
            const c = [...ingredients];
            c[i] = {
              ...c[i],
              item: e.target.value
            };
            setIngredients(c);
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => setIngredients(ingredients.filter((_, idx) => idx !== i)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Instructions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => setInstructions([...instructions, ""]), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-3 w-3" }),
            "Add step"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: instructions.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold", children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, className: "flex-1", value: step, onChange: (e) => {
            const c = [...instructions];
            c[i] = e.target.value;
            setInstructions(c);
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => setInstructions(instructions.filter((_, idx) => idx !== i)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Make public" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Anyone can view this recipe" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: isPublic, onCheckedChange: setIsPublic })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
          if (mode === "edit" && existing) navigate({
            to: "/recipes/$recipeId",
            params: {
              recipeId: existing.id
            }
          });
          else navigate({
            to: "/my-recipes"
          });
        }, children: "Never mind" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSave, disabled: saving, children: saving ? "Saving…" : "Save recipe" })
      ] })
    ] }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(RecipeEditor, { mode: "new" });
export {
  RecipeEditor,
  SplitComponent as component
};

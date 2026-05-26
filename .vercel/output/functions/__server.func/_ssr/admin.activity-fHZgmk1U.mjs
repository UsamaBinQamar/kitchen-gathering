import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./createSsrRpc-C43wELHC.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-CDTVfI8Q.mjs";
import { l as listActivity, T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./table-DjuuskDv.mjs";
import { a as AdminGuard } from "./admin-gate-c4r14kFR.mjs";
import { c as Button, A as Avatar, b as AvatarImage, a as AvatarFallback, B as Badge } from "./router-Cq9dAjtw.mjs";
import "../_libs/seroval.mjs";
import { S as ScrollText } from "../_libs/lucide-react.mjs";
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
import "./server-B1MpUZnh.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
import "./auth-middleware-CtG7XZTW.mjs";
import "../_libs/zod.mjs";
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
const ACTION_LABELS = {
  login: {
    label: "Signed in",
    tone: "default"
  },
  signup: {
    label: "Signed up",
    tone: "default"
  },
  logout: {
    label: "Signed out",
    tone: "outline"
  },
  "recipe.create": {
    label: "Created recipe",
    tone: "default"
  },
  "recipe.update": {
    label: "Updated recipe",
    tone: "secondary"
  },
  "recipe.delete": {
    label: "Deleted recipe",
    tone: "destructive"
  },
  "recipe.visibility.public": {
    label: "Made recipe public",
    tone: "default"
  },
  "recipe.visibility.private": {
    label: "Made recipe private",
    tone: "secondary"
  },
  "rating.create": {
    label: "Posted rating",
    tone: "default"
  },
  "rating.update": {
    label: "Updated rating",
    tone: "secondary"
  },
  "rating.delete": {
    label: "Removed rating",
    tone: "outline"
  }
};
function AdminActivityPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityTable, {}) });
}
function ActivityTable() {
  const list = useServerFn(listActivity);
  const navigate = useNavigate();
  const [hasSession, setHasSession] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({
      data: data2
    }) => setHasSession(!!data2.session?.access_token));
    const {
      data: sub
    } = supabase.auth.onAuthStateChange((_e, session) => setHasSession(!!session?.access_token));
    return () => sub.subscription.unsubscribe();
  }, []);
  const requireAccessToken = async () => {
    const {
      data: data2
    } = await supabase.auth.getSession();
    if (!data2.session?.access_token) throw new Error("Please sign in again.");
  };
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin", "activity"],
    queryFn: async () => {
      await requireAccessToken();
      return list({
        data: {}
      });
    },
    enabled: hasSession,
    retry: false,
    refetchInterval: 15e3
  });
  reactExports.useEffect(() => {
    if (error) toast.error(error instanceof Error ? error.message : "Access denied");
  }, [error]);
  const logs = data?.logs ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "flex items-center gap-2 font-display text-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: "h-7 w-7" }),
          " User activity"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          logs.length,
          " ",
          logs.length === 1 ? "event" : "events",
          " · auto-refreshes every 15s"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => navigate({
        to: "/admin"
      }), children: "Admin menu" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border/70 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "When" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Action" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Target" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Details" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "py-10 text-center text-muted-foreground", children: "Loading…" }) }) : logs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "py-10 text-center text-muted-foreground", children: "No activity yet." }) }) : logs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityRow, { log }, log.id)) })
    ] }) })
  ] });
}
function ActivityRow({
  log
}) {
  const action = ACTION_LABELS[log.action] ?? {
    label: log.action,
    tone: "outline"
  };
  const initial = (log.profile?.display_name ?? "?").charAt(0).toUpperCase();
  const when = new Date(log.created_at);
  const meta = log.metadata && typeof log.metadata === "object" && Object.keys(log.metadata).length > 0 ? log.metadata : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-nowrap text-sm text-muted-foreground", title: when.toLocaleString(), children: when.toLocaleString() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-7 w-7", children: [
        log.profile?.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: log.profile.avatar_url }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary text-primary-foreground text-xs", children: initial })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: log.profile?.display_name ?? log.user_id.slice(0, 8) + "…" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: action.tone, children: action.label }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: log.target_type ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      log.target_type,
      log.target_id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 font-mono text-xs", children: [
        log.target_id.slice(0, 8),
        "…"
      ] }) : null
    ] }) : "—" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-[24rem] truncate text-xs text-muted-foreground", title: meta ? JSON.stringify(meta) : "", children: meta ? JSON.stringify(meta) : "—" })
  ] });
}
export {
  AdminActivityPage as component
};

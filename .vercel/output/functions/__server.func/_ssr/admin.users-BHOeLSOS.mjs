import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn, c as createSsrRpc } from "./createSsrRpc-C43wELHC.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-CDTVfI8Q.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CtG7XZTW.mjs";
import { a as createServerFn } from "./server-B1MpUZnh.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell, f as listActivityForUser } from "./table-DjuuskDv.mjs";
import { a as AdminGuard } from "./admin-gate-c4r14kFR.mjs";
import { c as Button, A as Avatar, b as AvatarImage, a as AvatarFallback, I as Input, o as Switch, B as Badge, u as cn, t as buttonVariants } from "./router-Cq9dAjtw.mjs";
import { R as Root2, b as Trigger2, P as Portal2, a as Content2, T as Title2, D as Description2, C as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { D as Dialog, d as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Cr-3JCnu.mjs";
import "../_libs/seroval.mjs";
import { C as Check, X, P as Pencil, i as Copy, v as Shield, T as Trash2, B as BookOpen, j as Eye, k as EyeOff, h as Clock, S as ScrollText } from "../_libs/lucide-react.mjs";
import { o as objectType, b as booleanType, s as stringType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
const listProfiles = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("562fd1c2cac9fe74e0cb1aad42ce696884f273ae29979a7807af32a442be9679"));
const setAdminRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid(),
  is_admin: booleanType()
}).parse(input)).handler(createSsrRpc("536051deeb82ee0616975a95d710db802db8d4816879a206a06584714b2edbe3"));
const updateProfile = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid(),
  display_name: stringType().min(1).max(255).optional(),
  avatar_url: stringType().url().max(2048).nullable().optional(),
  enabled: booleanType().optional()
}).parse(input)).handler(createSsrRpc("9d51a7c76989ef9def673fbd012cc1dda2da00e66ac366c4d97961a58d4a1371"));
const toggleProfileEnabled = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid(),
  enabled: booleanType()
}).parse(input)).handler(createSsrRpc("6eda1e013dfbfb132fb43f7606401fcedda0bf08d7b0a8b89814d244b60e503b"));
const deleteProfile = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("82d428b9f7c53225e7b9c9db9e2d6562f3acea716e238a002ac3f6977a64c8d4"));
const listRecipesForUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  user_id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("c8e7da2243ced64ce8bed251a554ece2a86c2440f544918e0ecdeb5bea08b3e8"));
const AlertDialog = Root2;
const AlertDialogTrigger = Trigger2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
const ACTION_LABEL = {
  login: "Signed in",
  signup: "Signed up",
  logout: "Signed out",
  "recipe.create": "Created recipe",
  "recipe.update": "Updated recipe",
  "recipe.delete": "Deleted recipe",
  "recipe.visibility.public": "Made recipe public",
  "recipe.visibility.private": "Made recipe private",
  "rating.create": "Posted rating",
  "rating.update": "Updated rating",
  "rating.delete": "Removed rating"
};
function AdminUsersPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTable, {}) });
}
function AdminTable() {
  const list = useServerFn(listProfiles);
  const update = useServerFn(updateProfile);
  const toggle = useServerFn(toggleProfileEnabled);
  const del = useServerFn(deleteProfile);
  const setRole = useServerFn(setAdminRole);
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [hasSession, setHasSession] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({
      data: data2
    }) => setHasSession(!!data2.session?.access_token));
    const {
      data: sub
    } = supabase.auth.onAuthStateChange((_e, session) => {
      setHasSession(!!session?.access_token);
    });
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
    queryKey: ["admin", "profiles"],
    queryFn: async () => {
      await requireAccessToken();
      return list();
    },
    enabled: hasSession,
    retry: false
  });
  reactExports.useEffect(() => {
    if (error) toast.error(error instanceof Error ? error.message : "Access denied");
  }, [error]);
  const invalidate = () => qc.invalidateQueries({
    queryKey: ["admin", "profiles"]
  });
  const toggleMut = useMutation({
    mutationFn: (vars) => toggle({
      data: vars
    }),
    onSuccess: (_d, vars) => {
      toast.success(vars.enabled ? "User enabled" : "User disabled");
      invalidate();
    },
    onError: (e) => toast.error(e.message)
  });
  const renameMut = useMutation({
    mutationFn: (vars) => update({
      data: vars
    }),
    onSuccess: () => {
      toast.success("Profile updated");
      invalidate();
    },
    onError: (e) => toast.error(e.message)
  });
  const deleteMut = useMutation({
    mutationFn: (id) => del({
      data: {
        id
      }
    }),
    onSuccess: () => {
      toast.success("User deleted");
      invalidate();
    },
    onError: (e) => toast.error(e.message)
  });
  const roleMut = useMutation({
    mutationFn: (vars) => setRole({
      data: vars
    }),
    onSuccess: (_d, vars) => {
      toast.success(vars.is_admin ? "Admin access granted" : "Admin access revoked");
      invalidate();
    },
    onError: (e) => toast.error(e.message)
  });
  const profiles = data?.profiles ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "User management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          profiles.length,
          " ",
          profiles.length === 1 ? "user" : "users"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => navigate({
        to: "/admin"
      }), children: "Admin menu" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border/70 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Joined" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "py-10 text-center text-muted-foreground", children: "Loading…" }) }) : profiles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "py-10 text-center text-muted-foreground", children: "No users yet." }) }) : profiles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserRow, { profile: p, onToggle: (enabled) => toggleMut.mutate({
        id: p.id,
        enabled
      }), onRename: (display_name) => renameMut.mutate({
        id: p.id,
        display_name
      }), onDelete: () => deleteMut.mutate(p.id), onRoleChange: (is_admin) => roleMut.mutate({
        id: p.id,
        is_admin
      }), busy: toggleMut.isPending && toggleMut.variables?.id === p.id || renameMut.isPending && renameMut.variables?.id === p.id || deleteMut.isPending && deleteMut.variables === p.id || roleMut.isPending && roleMut.variables?.id === p.id }, p.id)) })
    ] }) })
  ] });
}
function UserRow({
  profile,
  onToggle,
  onRename,
  onDelete,
  onRoleChange,
  busy
}) {
  const [editing, setEditing] = reactExports.useState(false);
  const [value, setValue] = reactExports.useState(profile.display_name ?? "");
  const initial = (profile.display_name ?? "?").charAt(0).toUpperCase();
  function copyId() {
    navigator.clipboard.writeText(profile.id);
    toast.success("ID copied");
  }
  function save() {
    const trimmed = value.trim();
    if (!trimmed || trimmed === profile.display_name) {
      setEditing(false);
      return;
    }
    onRename(trimmed);
    setEditing(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-9 w-9", children: [
        profile.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: profile.avatar_url }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary text-primary-foreground text-sm", children: initial })
      ] }),
      editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value, onChange: (e) => setValue(e.target.value), className: "h-8 w-48", autoFocus: true, onKeyDown: (e) => {
          if (e.key === "Enter") save();
          if (e.key === "Escape") {
            setValue(profile.display_name ?? "");
            setEditing(false);
          }
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8", onClick: save, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8", onClick: () => {
          setValue(profile.display_name ?? "");
          setEditing(false);
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: profile.display_name ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7 text-muted-foreground", onClick: () => setEditing(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: copyId, className: "inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground", title: profile.id, children: [
      profile.id.slice(0, 8),
      "…",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: new Date(profile.created_at).toLocaleDateString() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: profile.is_admin, disabled: busy, onCheckedChange: onRoleChange, "aria-label": "Toggle admin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: profile.is_admin ? "default" : "outline", className: "gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3 w-3" }),
        profile.is_admin ? "Admin" : "User"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: profile.enabled, disabled: busy, onCheckedChange: onToggle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: profile.enabled ? "default" : "secondary", children: profile.enabled ? "Enabled" : "Disabled" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserRecipesDialog, { profile }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserLogsDialog, { profile }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", disabled: busy, className: "text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete this user?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "This permanently deletes the account, profile, and all recipes owned by",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: profile.display_name ?? profile.id }),
              ". This cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: onDelete, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Delete" })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
function UserLogsDialog({
  profile
}) {
  const [open, setOpen] = reactExports.useState(false);
  const fetchLogs = useServerFn(listActivityForUser);
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
    queryKey: ["admin", "user-activity", profile.id],
    queryFn: async () => {
      await requireAccessToken();
      return fetchLogs({
        data: {
          user_id: profile.id,
          limit: 20
        }
      });
    },
    enabled: open,
    retry: false
  });
  const logs = data?.logs ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "View recent activity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: "h-4 w-4" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display", children: [
        "Recent activity — ",
        profile.display_name ?? profile.id.slice(0, 8)
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[60vh] overflow-y-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "Loading…" }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-destructive", children: error instanceof Error ? error.message : "Failed to load" }) : logs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "No activity yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border/60", children: logs.map((log) => {
        const meta = log.metadata && typeof log.metadata === "object" && Object.keys(log.metadata).length > 0 ? log.metadata : null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start justify-between gap-3 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: ACTION_LABEL[log.action] ?? log.action }),
              log.target_type ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                log.target_type,
                log.target_id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 font-mono", children: [
                  log.target_id.slice(0, 8),
                  "…"
                ] }) : null
              ] }) : null
            ] }),
            meta ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 truncate text-xs text-muted-foreground", title: JSON.stringify(meta), children: JSON.stringify(meta) }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs text-muted-foreground", title: new Date(log.created_at).toLocaleString(), children: new Date(log.created_at).toLocaleString() })
        ] }, log.id);
      }) }) })
    ] })
  ] });
}
function UserRecipesDialog({
  profile
}) {
  const [open, setOpen] = reactExports.useState(false);
  const fetchRecipes = useServerFn(listRecipesForUser);
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
    queryKey: ["admin", "user-recipes", profile.id],
    queryFn: async () => {
      await requireAccessToken();
      return fetchRecipes({
        data: {
          user_id: profile.id
        }
      });
    },
    enabled: open,
    retry: false
  });
  const recipes = data?.recipes ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "View user recipes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display", children: [
        "Recipes — ",
        profile.display_name ?? profile.id.slice(0, 8)
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[60vh] overflow-y-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "Loading…" }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-destructive", children: error instanceof Error ? error.message : "Failed to load" }) : recipes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "No recipes yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: recipes.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/recipes/$recipeId", params: {
        recipeId: r.id
      }, className: "group block overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg", onClick: () => setOpen(false), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] bg-secondary/40", children: r.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.image_url, alt: r.title, loading: "lazy", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl opacity-40", children: r.title.charAt(0) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl leading-snug", children: r.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground", children: r.visibility === "public" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
              "Public"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3 w-3" }),
              "Private"
            ] }) })
          ] }),
          r.cook_time && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            r.cook_time
          ] }),
          (r.cuisine || r.meal_type || r.tags && r.tags.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-1", children: [
            r.cuisine && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium", children: r.cuisine }),
            r.meal_type && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium", children: r.meal_type }),
            r.tags?.slice(0, 2).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground", children: [
              "#",
              t
            ] }, t)),
            (r.tags?.length ?? 0) > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground", children: [
              "+",
              (r.tags?.length ?? 0) - 2
            ] })
          ] })
        ] })
      ] }, r.id)) }) })
    ] })
  ] });
}
export {
  AdminUsersPage as component
};

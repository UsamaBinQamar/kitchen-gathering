import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  listProfiles,
  updateProfile,
  toggleProfileEnabled,
  deleteProfile,
  setAdminRole,
} from "@/lib/admin-profiles.functions";
import { listActivityForUser } from "@/lib/admin-activity.functions";
import { listRecipesForUser } from "@/lib/admin-recipes.functions";
import { AdminGuard } from "@/components/admin-gate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Check, X, Copy, Shield, ScrollText, BookOpen, Eye, EyeOff, Clock } from "lucide-react";

type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  enabled: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
};

const ACTION_LABEL: Record<string, string> = {
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
  "rating.delete": "Removed rating",
};

export const Route = createFileRoute("/admin/users")({
  component: AdminUsersPage,
  head: () => ({
    meta: [{ title: "Admin — Users · Saged" }],
  }),
});

function AdminUsersPage() {
  return (
    <AdminGuard>
      <AdminTable />
    </AdminGuard>
  );
}

function AdminTable() {
  const list = useServerFn(listProfiles);
  const update = useServerFn(updateProfile);
  const toggle = useServerFn(toggleProfileEnabled);
  const del = useServerFn(deleteProfile);
  const setRole = useServerFn(setAdminRole);
  const qc = useQueryClient();
  const navigate = useNavigate();

  const [hasSession, setHasSession] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setHasSession(!!data.session?.access_token));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setHasSession(!!session?.access_token);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const requireAccessToken = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session?.access_token) throw new Error("Please sign in again.");
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "profiles"],
    queryFn: async () => {
      await requireAccessToken();
      return list();
    },
    enabled: hasSession,
    retry: false,
  });

  useEffect(() => {
    if (error) toast.error(error instanceof Error ? error.message : "Access denied");
  }, [error]);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin", "profiles"] });

  const toggleMut = useMutation({
    mutationFn: (vars: { id: string; enabled: boolean }) =>
      toggle({ data: vars }),
    onSuccess: (_d, vars) => {
      toast.success(vars.enabled ? "User enabled" : "User disabled");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const renameMut = useMutation({
    mutationFn: (vars: { id: string; display_name: string }) =>
      update({ data: vars }),
    onSuccess: () => {
      toast.success("Profile updated");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("User deleted");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const roleMut = useMutation({
    mutationFn: (vars: { id: string; is_admin: boolean }) =>
      setRole({ data: vars }),
    onSuccess: (_d, vars) => {
      toast.success(vars.is_admin ? "Admin access granted" : "Admin access revoked");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const profiles: Profile[] = data?.profiles ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">User management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {profiles.length} {profiles.length === 1 ? "user" : "users"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate({ to: "/admin" })}>
            Admin menu
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border/70 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  Loading…
                </TableCell>
              </TableRow>
            ) : profiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  No users yet.
                </TableCell>
              </TableRow>
            ) : (
              profiles.map((p) => (
                <UserRow
                  key={p.id}
                  profile={p}
                  onToggle={(enabled) => toggleMut.mutate({ id: p.id, enabled })}
                  onRename={(display_name) => renameMut.mutate({ id: p.id, display_name })}
                  onDelete={() => deleteMut.mutate(p.id)}
                  onRoleChange={(is_admin) => roleMut.mutate({ id: p.id, is_admin })}
                  busy={
                    (toggleMut.isPending && toggleMut.variables?.id === p.id) ||
                    (renameMut.isPending && renameMut.variables?.id === p.id) ||
                    (deleteMut.isPending && deleteMut.variables === p.id) ||
                    (roleMut.isPending && roleMut.variables?.id === p.id)
                  }
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function UserRow({
  profile,
  onToggle,
  onRename,
  onDelete,
  onRoleChange,
  busy,
}: {
  profile: Profile;
  onToggle: (enabled: boolean) => void;
  onRename: (name: string) => void;
  onDelete: () => void;
  onRoleChange: (is_admin: boolean) => void;
  busy: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(profile.display_name ?? "");

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

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            {profile.avatar_url ? <AvatarImage src={profile.avatar_url} /> : null}
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {initial}
            </AvatarFallback>
          </Avatar>
          {editing ? (
            <div className="flex items-center gap-1">
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="h-8 w-48"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") save();
                  if (e.key === "Escape") {
                    setValue(profile.display_name ?? "");
                    setEditing(false);
                  }
                }}
              />
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={save}>
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => {
                  setValue(profile.display_name ?? "");
                  setEditing(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-medium">{profile.display_name ?? "—"}</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-muted-foreground"
                onClick={() => setEditing(true)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <button
          onClick={copyId}
          className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
          title={profile.id}
        >
          {profile.id.slice(0, 8)}…
          <Copy className="h-3 w-3" />
        </button>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {new Date(profile.created_at).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Switch
            checked={profile.is_admin}
            disabled={busy}
            onCheckedChange={onRoleChange}
            aria-label="Toggle admin"
          />
          <Badge variant={profile.is_admin ? "default" : "outline"} className="gap-1">
            <Shield className="h-3 w-3" />
            {profile.is_admin ? "Admin" : "User"}
          </Badge>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Switch
            checked={profile.enabled}
            disabled={busy}
            onCheckedChange={onToggle}
          />
          <Badge variant={profile.enabled ? "default" : "secondary"}>
            {profile.enabled ? "Enabled" : "Disabled"}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="inline-flex items-center gap-1">
          <UserRecipesDialog profile={profile} />
          <UserLogsDialog profile={profile} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost" disabled={busy} className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this user?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently deletes the account, profile, and all recipes owned by{" "}
                  <strong>{profile.display_name ?? profile.id}</strong>. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
}

function UserLogsDialog({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const fetchLogs = useServerFn(listActivityForUser);

  const requireAccessToken = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session?.access_token) throw new Error("Please sign in again.");
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "user-activity", profile.id],
    queryFn: async () => {
      await requireAccessToken();
      return fetchLogs({ data: { user_id: profile.id, limit: 20 } });
    },
    enabled: open,
    retry: false,
  });

  const logs = (data?.logs ?? []) as Array<{
    id: string;
    action: string;
    target_type: string | null;
    target_id: string | null;
    metadata: unknown;
    created_at: string;
  }>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" title="View recent activity">
          <ScrollText className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display">
            Recent activity — {profile.display_name ?? profile.id.slice(0, 8)}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>
          ) : error ? (
            <p className="py-8 text-center text-sm text-destructive">
              {error instanceof Error ? error.message : "Failed to load"}
            </p>
          ) : logs.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No activity yet.</p>
          ) : (
            <ul className="divide-y divide-border/60">
              {logs.map((log) => {
                const meta =
                  log.metadata && typeof log.metadata === "object" && Object.keys(log.metadata as object).length > 0
                    ? (log.metadata as Record<string, unknown>)
                    : null;
                return (
                  <li key={log.id} className="flex items-start justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{ACTION_LABEL[log.action] ?? log.action}</Badge>
                        {log.target_type ? (
                          <span className="text-xs text-muted-foreground">
                            {log.target_type}
                            {log.target_id ? (
                              <span className="ml-1 font-mono">{log.target_id.slice(0, 8)}…</span>
                            ) : null}
                          </span>
                        ) : null}
                      </div>
                      {meta ? (
                        <p className="mt-1 truncate text-xs text-muted-foreground" title={JSON.stringify(meta)}>
                          {JSON.stringify(meta)}
                        </p>
                      ) : null}
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground" title={new Date(log.created_at).toLocaleString()}>
                      {new Date(log.created_at).toLocaleString()}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function UserRecipesDialog({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const fetchRecipes = useServerFn(listRecipesForUser);

  const requireAccessToken = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session?.access_token) throw new Error("Please sign in again.");
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "user-recipes", profile.id],
    queryFn: async () => {
      await requireAccessToken();
      return fetchRecipes({ data: { user_id: profile.id } });
    },
    enabled: open,
    retry: false,
  });

  const recipes = (data?.recipes ?? []) as Array<{
    id: string;
    title: string;
    description: string | null;
    image_url: string | null;
    visibility: "public" | "private";
    cuisine: string | null;
    meal_type: string | null;
    tags: string[] | null;
    cook_time: string | null;
    created_at: string;
  }>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" title="View user recipes">
          <BookOpen className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-display">
            Recipes — {profile.display_name ?? profile.id.slice(0, 8)}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>
          ) : error ? (
            <p className="py-8 text-center text-sm text-destructive">
              {error instanceof Error ? error.message : "Failed to load"}
            </p>
          ) : recipes.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No recipes yet.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((r) => (
                <Link
                  key={r.id}
                  to="/recipes/$recipeId"
                  params={{ recipeId: r.id }}
                  className="group block overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  onClick={() => setOpen(false)}
                >
                  <div className="aspect-[4/3] bg-secondary/40">
                    {r.image_url ? (
                      <img src={r.image_url} alt={r.title} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full place-items-center">
                        <span className="font-display text-4xl opacity-40">{r.title.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-xl leading-snug">{r.title}</h3>
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                        {r.visibility === "public" ? (
                          <><Eye className="h-3 w-3" />Public</>
                        ) : (
                          <><EyeOff className="h-3 w-3" />Private</>
                        )}
                      </span>
                    </div>
                    {r.cook_time && (
                      <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />{r.cook_time}
                      </p>
                    )}
                    {(r.cuisine || r.meal_type || (r.tags && r.tags.length > 0)) && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {r.cuisine && <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium">{r.cuisine}</span>}
                        {r.meal_type && <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium">{r.meal_type}</span>}
                        {r.tags?.slice(0, 2).map((t) => (
                          <span key={t} className="rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">#{t}</span>
                        ))}
                        {(r.tags?.length ?? 0) > 2 && (
                          <span className="rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">+{(r.tags?.length ?? 0) - 2}</span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

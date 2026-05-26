import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { listActivity } from "@/lib/admin-activity.functions";
import { AdminGuard } from "@/components/admin-gate";
import { Button } from "@/components/ui/button";
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
import { ScrollText } from "lucide-react";

type ActivityLog = {
  id: string;
  user_id: string;
  action: string;
  target_type: string | null;
  target_id: string | null;
  metadata: unknown;
  created_at: string;
  profile: { display_name: string | null; avatar_url: string | null } | null;
};



const ACTION_LABELS: Record<string, { label: string; tone: "default" | "secondary" | "outline" | "destructive" }> = {
  login: { label: "Signed in", tone: "default" },
  signup: { label: "Signed up", tone: "default" },
  logout: { label: "Signed out", tone: "outline" },
  "recipe.create": { label: "Created recipe", tone: "default" },
  "recipe.update": { label: "Updated recipe", tone: "secondary" },
  "recipe.delete": { label: "Deleted recipe", tone: "destructive" },
  "recipe.visibility.public": { label: "Made recipe public", tone: "default" },
  "recipe.visibility.private": { label: "Made recipe private", tone: "secondary" },
  "rating.create": { label: "Posted rating", tone: "default" },
  "rating.update": { label: "Updated rating", tone: "secondary" },
  "rating.delete": { label: "Removed rating", tone: "outline" },
};

export const Route = createFileRoute("/admin/activity")({
  component: AdminActivityPage,
  head: () => ({ meta: [{ title: "Admin — Activity · Saged" }] }),
});

function AdminActivityPage() {
  return (
    <AdminGuard>
      <ActivityTable />
    </AdminGuard>
  );
}


function ActivityTable() {
  const list = useServerFn(listActivity);
  const navigate = useNavigate();

  const [hasSession, setHasSession] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setHasSession(!!data.session?.access_token));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setHasSession(!!session?.access_token));
    return () => sub.subscription.unsubscribe();
  }, []);

  const requireAccessToken = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session?.access_token) throw new Error("Please sign in again.");
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "activity"],
    queryFn: async () => {
      await requireAccessToken();
      return list({ data: {} });
    },
    enabled: hasSession,
    retry: false,
    refetchInterval: 15_000,
  });

  useEffect(() => {
    if (error) toast.error(error instanceof Error ? error.message : "Access denied");
  }, [error]);

  const logs: ActivityLog[] = (data?.logs as ActivityLog[] | undefined) ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 font-display text-3xl">
            <ScrollText className="h-7 w-7" /> User activity
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {logs.length} {logs.length === 1 ? "event" : "events"} · auto-refreshes every 15s
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate({ to: "/admin" })}>Admin menu</Button>
        </div>
      </div>

      <div className="rounded-lg border border-border/70 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>When</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5} className="py-10 text-center text-muted-foreground">Loading…</TableCell></TableRow>
            ) : logs.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="py-10 text-center text-muted-foreground">No activity yet.</TableCell></TableRow>
            ) : (
              logs.map((log) => <ActivityRow key={log.id} log={log} />)
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ActivityRow({ log }: { log: ActivityLog }) {
  const action = ACTION_LABELS[log.action] ?? { label: log.action, tone: "outline" as const };
  const initial = (log.profile?.display_name ?? "?").charAt(0).toUpperCase();
  const when = new Date(log.created_at);
  const meta =
    log.metadata && typeof log.metadata === "object" && Object.keys(log.metadata as object).length > 0
      ? (log.metadata as Record<string, unknown>)
      : null;


  return (
    <TableRow>
      <TableCell className="whitespace-nowrap text-sm text-muted-foreground" title={when.toLocaleString()}>
        {when.toLocaleString()}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            {log.profile?.avatar_url ? <AvatarImage src={log.profile.avatar_url} /> : null}
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">{initial}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{log.profile?.display_name ?? log.user_id.slice(0, 8) + "…"}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={action.tone}>{action.label}</Badge>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {log.target_type ? (
          <span>
            {log.target_type}
            {log.target_id ? <span className="ml-1 font-mono text-xs">{log.target_id.slice(0, 8)}…</span> : null}
          </span>
        ) : (
          "—"
        )}
      </TableCell>
      <TableCell className="max-w-[24rem] truncate text-xs text-muted-foreground" title={meta ? JSON.stringify(meta) : ""}>
        {meta ? JSON.stringify(meta) : "—"}
      </TableCell>
    </TableRow>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AdminGate } from "@/components/admin-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ScrollText, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminIndexPage,
  head: () => ({ meta: [{ title: "Admin · Saged" }] }),
});

function AdminIndexPage() {
  return (
    <AdminGate>
      <AdminMenu />
    </AdminGate>
  );
}

function AdminMenu() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Choose an area to manage</p>
        </div>
        
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/admin/users" className="group">
          <Card className="h-full transition-colors hover:border-primary/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <Shield className="h-5 w-5" /> User administration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Manage profiles, roles, and account status.
              <div className="mt-3 inline-flex items-center gap-1 text-foreground">
                Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/activity" className="group">
          <Card className="h-full transition-colors hover:border-primary/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <ScrollText className="h-5 w-5" /> User activity
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Browse a live log of logins, recipe edits, and visibility changes.
              <div className="mt-3 inline-flex items-center gap-1 text-foreground">
                Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mt-6">
        <Button variant="outline" onClick={() => navigate({ to: "/my-recipes" })}>Back to app</Button>
      </div>
    </div>
  );
}

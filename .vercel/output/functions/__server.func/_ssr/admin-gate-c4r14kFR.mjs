import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { x as useAuth, y as useIsAdmin } from "./router-Cq9dAjtw.mjs";
import { v as Shield } from "../_libs/lucide-react.mjs";
function AdminGate({ children }) {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading } = useIsAdmin();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (loading || authLoading) return;
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    if (!isAdmin) navigate({ to: "/" });
  }, [user, isAdmin, loading, authLoading, navigate]);
  if (loading || authLoading || !user || !isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-[40vh] max-w-md flex-col items-center justify-center px-4 py-10 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "mb-2 h-6 w-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Checking admin access…" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
const AdminGuard = AdminGate;
export {
  AdminGate as A,
  AdminGuard as a
};

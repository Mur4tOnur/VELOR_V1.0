import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardShell } from "@/components/DashboardShell";

export default function DashboardPage() {
  return (
    <RequireAuth>
      <div className="h-[100dvh] min-h-[600px] w-full">
        <DashboardShell />
      </div>
    </RequireAuth>
  );
}

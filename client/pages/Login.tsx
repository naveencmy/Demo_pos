import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { KeyRound, LogIn, ShieldCheck, UserRound } from "lucide-react";
import { useAuth, type Role } from "@/hooks/use-auth";

const roles: Array<{ value: Role; label: string; description: string }> = [
  { value: "cashier", label: "Cashier", description: "Payment and billing focused access" },
  { value: "worker", label: "Worker", description: "Limited operation access" },
  { value: "manager", label: "Manager", description: "Supervised operational access" },
  { value: "owner", label: "Owner", description: "Full system access" },
];

export default function Login() {
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(currentUser?.name ?? "John Owner");
  const [role, setRole] = useState<Role>(currentUser?.role ?? "owner");

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = () => {
    login({ name: name.trim() || "John Owner", role });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/10 bg-[#0c0c0c] p-8 lg:p-10 shadow-2xl">
          <div className="text-sm text-white/50 mb-6">RETAIL_OS_CMD</div>
          <div className="space-y-6">
            <div>
              <div className="text-5xl lg:text-7xl font-black leading-none tracking-tight">
                COMMAND
              </div>
              <div className="text-5xl lg:text-7xl font-black leading-none tracking-tight text-primary">
                POS
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">
                  LAN Status
                </div>
                <div className="text-lg font-semibold text-white">Connected</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">
                  DB Status
                </div>
                <div className="text-lg font-semibold text-white">Optimal</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">
                  Uptime
                </div>
                <div className="text-lg font-semibold text-white">14D 02H</div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600 to-blue-500 p-5 max-w-md">
              <div className="text-xs uppercase tracking-[0.25em] text-white/80 mb-2">
                Quick Start
              </div>
              <div className="text-2xl font-bold">Enter the system</div>
              <p className="mt-2 text-sm text-white/80">
                Choose a role and sign in to access sales, purchase, and the command center.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-8 lg:p-10 shadow-2xl flex items-center justify-center">
          <div className="w-full max-w-sm space-y-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold tracking-[0.4em] text-white">
                RETAIL_OS_CMD
              </div>
              <p className="text-xs text-white/40 uppercase tracking-[0.35em]">
                System Login
              </p>
            </div>

            <div className="rounded-2xl border border-red-500/30 bg-[#171717] p-4 space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/45 mb-2">
                  User Name
                </label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/40 pl-10 pr-3 py-3 text-sm text-white outline-none focus:border-blue-500"
                    placeholder="John Owner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/45 mb-2">
                  Access Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setRole(item.value)}
                      className={`rounded-lg border px-3 py-3 text-left transition ${
                        role === item.value
                          ? "border-blue-400 bg-blue-500/15 text-white"
                          : "border-white/10 bg-black/30 text-white/70 hover:border-white/20"
                      }`}
                    >
                      <div className="text-sm font-semibold capitalize">{item.label}</div>
                      <div className="mt-1 text-[10px] leading-4 text-white/40">
                        {item.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 py-3 font-semibold text-white flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                System Access
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-white/40">
              <ShieldCheck className="w-4 h-4" />
              Role-based access enabled
              <KeyRound className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type SessionUser = { email: string; name: string };

export type RegisteredUser = {
  email: string;
  password: string;
  name: string;
};

const SESSION_KEY = "velor_session";
const USERS_KEY = "velor_users";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function readSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  return safeParse<SessionUser | null>(localStorage.getItem(SESSION_KEY), null);
}

export function writeSession(user: SessionUser | null) {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_KEY);
}

export function readUsers(): RegisteredUser[] {
  if (typeof window === "undefined") return [];
  const list = safeParse<unknown>(localStorage.getItem(USERS_KEY), []);
  return Array.isArray(list) ? (list as RegisteredUser[]) : [];
}

export function writeUsers(users: RegisteredUser[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(
  user: RegisteredUser,
): { ok: true } | { ok: false; error: string } {
  const users = readUsers();
  const email = user.email.trim().toLowerCase();
  if (users.some((u) => u.email.toLowerCase() === email)) {
    return { ok: false, error: "An account with this email already exists." };
  }
  users.push({ ...user, email, name: user.name.trim() || email.split("@")[0] || "User" });
  writeUsers(users);
  return { ok: true };
}

export function authenticate(
  email: string,
  password: string,
): { ok: true; user: SessionUser } | { ok: false; error: string } {
  const users = readUsers();
  const e = email.trim().toLowerCase();
  const found = users.find((u) => u.email.toLowerCase() === e);
  if (!found) return { ok: false, error: "No account found for this email." };
  if (found.password !== password) return { ok: false, error: "Incorrect password." };
  return {
    ok: true,
    user: { email: found.email, name: found.name },
  };
}

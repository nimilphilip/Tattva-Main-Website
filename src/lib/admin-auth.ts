// Admin Authentication Helper for Tattva Fincorp Portal

const SESSION_KEY = "tattva_admin_session";
const DEMO_USER = "admin";
const DEMO_PASS = "tattva@2026";

export type AdminUser = {
  username: string;
  loginTime: number;
};

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    return Boolean(session?.username);
  } catch {
    return false;
  }
}

export function getAdminUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function login(
  usernameInput: string,
  passwordInput: string,
  rememberMe: boolean = false
): { success: boolean; error?: string } {
  const username = usernameInput.trim();
  const password = passwordInput.trim();

  if (!username || !password) {
    return { success: false, error: "Please provide both username and password." };
  }

  // Check demo credentials
  if (username.toLowerCase() === DEMO_USER && password === DEMO_PASS) {
    const user: AdminUser = {
      username: "Administrator",
      loginTime: Date.now(),
    };
    const serialized = JSON.stringify(user);
    if (rememberMe) {
      localStorage.setItem(SESSION_KEY, serialized);
    } else {
      sessionStorage.setItem(SESSION_KEY, serialized);
    }
    window.dispatchEvent(new Event("tattva-auth-change"));
    return { success: true };
  }

  return {
    success: false,
    error: "Invalid username or password. Default demo credentials: admin / tattva@2026",
  };
}

export function logout(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("tattva-auth-change"));
}

export function subscribeAuth(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener("tattva-auth-change", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("tattva-auth-change", handler);
    window.removeEventListener("storage", handler);
  };
}

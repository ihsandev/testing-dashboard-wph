export type AuthUser = { id: string; name: string } | null;
export type SetAuthUser = (user: AuthState["user"]) => void;

export interface AuthState {
  user: AuthUser;
  isAuthenticated: boolean;
  setUser: SetAuthUser;
  logout: () => void;
}

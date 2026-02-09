"use client";

import { useEffect, useState } from "react";

type AuthState = {
  user: any | null;
  loading: boolean;
};

let cachedUser: any | null = null;
let cachedLoading = true;
let inFlight: Promise<any | null> | null = null;
const listeners = new Set<(state: AuthState) => void>();

const notify = () => {
  const state = { user: cachedUser, loading: cachedLoading };
  listeners.forEach((listener) => listener(state));
};

const fetchMe = async () => {
  if (inFlight) return inFlight;
  cachedLoading = true;
  notify();

  inFlight = fetch("/api/auth/me")
    .then(async (res) => {
      if (!res.ok) return null;
      const body = await res.json().catch(() => ({}));
      return body?.user ?? null;
    })
    .catch(() => null)
    .finally(() => {
      cachedLoading = false;
    })
    .then((user) => {
      cachedUser = user;
      inFlight = null;
      notify();
      return user;
    });

  return inFlight;
};

export const refreshAuth = () => fetchMe();

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: cachedUser,
    loading: cachedLoading,
  });

  useEffect(() => {
    const listener = (next: AuthState) => setState(next);
    listeners.add(listener);
    if (cachedLoading) fetchMe();

    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    user: state.user,
    isLoading: state.loading,
    refresh: refreshAuth,
  };
};

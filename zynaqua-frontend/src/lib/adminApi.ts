import { authHeaders, clearToken } from "@/lib/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export class AdminApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...options.headers,
    },
  });

  if (res.status === 401) {

    clearToken();
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    throw new AdminApiError("Session expired", 401);
  }

  const body = await res.json();

  if (!res.ok) {
    throw new AdminApiError(body.message || "Something went wrong.", res.status);
  }

  return (body as ApiResponse<T>).data;
}

export const adminApi = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  put: <T>(path: string, payload: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(payload) }),
};
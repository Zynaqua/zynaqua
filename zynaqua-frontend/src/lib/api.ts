const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

interface ApiErrorPayload {
  success: false;
  message: string;
  fieldErrors?: Record<string, string>;
}

export class ApiError extends Error {
  fieldErrors?: Record<string, string>;
  status: number;

  constructor(message: string, status: number, fieldErrors?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const body = await res.json();

  if (!res.ok) {
    const errorBody = body as ApiErrorPayload;
    throw new ApiError(
      errorBody.message || "Something went wrong. Please try again.",
      res.status,
      errorBody.fieldErrors
    );
  }

  return (body as ApiResponse<T>).data;
}

export const api = {
  post: <T>(path: string, payload: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(payload) }),
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
};
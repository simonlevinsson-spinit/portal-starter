import { tokenRequest } from "./authConfig";
import { authService } from "./AuthService";

export const authenticatedFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  if (authService.app && authService.account) {
    const response = await authService.app.acquireTokenSilent({
      ...tokenRequest,
      account: authService.account,
    });

    const overrideHeaders = new Headers(init?.headers);
    overrideHeaders.set("Authorization", `Bearer ${response?.accessToken}`);
    return await fetch(input, {
      ...init,
      headers: overrideHeaders,
    });
  } else {
    try {
      return await fetch(input, {
        ...init,
        credentials: "include",
        redirect: "error",
      });
    } catch (exception) {
      location.reload();
      return;
    }
  }
};

export const authenticatedGet = (
  input: RequestInfo | URL,
  query?: string,
  init?: RequestInit | undefined
) => {
  const overrideHeaders = new Headers(init?.headers);
  const overrideInit = { ...init, method: "GET", headers: overrideHeaders };
  return authenticatedFetch(
    `${input}?${new URLSearchParams(query)}`,
    overrideInit
  );
};

export const authenticatedPost = (
  input: RequestInfo | URL,
  data: unknown,
  init?: RequestInit | undefined
) => {
  const overrideHeaders = new Headers(init?.headers);
  overrideHeaders.set("Content-Type", "application/json");
  const overrideInit = {
    ...init,
    method: "POST",
    body: data instanceof FormData ? data : JSON.stringify(data),
    headers: data instanceof FormData ? new Headers() : overrideHeaders,
  };

  return authenticatedFetch(input, overrideInit);
};

export const authenticatedPut = (
  input: RequestInfo | URL,
  data: unknown,
  init?: RequestInit | undefined
) => {
  const overrideHeaders = new Headers(init?.headers);
  overrideHeaders.set("Content-Type", "application/json");
  const overrideInit = {
    ...init,
    method: "PUT",
    body: JSON.stringify(data),
    headers: overrideHeaders,
  };

  return authenticatedFetch(input, overrideInit);
};

export const authenticatedDelete = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const overrideHeaders = new Headers(init?.headers);
  const overrideInit = { ...init, method: "DELETE", headers: overrideHeaders };

  return authenticatedFetch(input, overrideInit);
};

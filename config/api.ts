import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://moneytallyhq.com";

const STORAGE_KEYS = {
  CSRF_TOKEN: "csrf_token",
};

export const saveCsrfToken = async (token: string) => {
  await AsyncStorage.setItem(STORAGE_KEYS.CSRF_TOKEN, token);
};

export const getCsrfToken = async () => {
  return await AsyncStorage.getItem(STORAGE_KEYS.CSRF_TOKEN);
};

export const clearAuthStorage = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.CSRF_TOKEN);
};

export const fetchCsrfToken = async () => {
  const res = await fetch(`${BASE_URL}/auth/csrf-token`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch CSRF token");
  }

  const csrfToken = data?.csrfToken;

  if (!csrfToken) {
    throw new Error("CSRF token not returned by server");
  }

  await saveCsrfToken(csrfToken);

  return csrfToken;
};

export const signinRequest = async (email: string, password: string) => {
  let csrfToken = await getCsrfToken();

  if (!csrfToken) {
    csrfToken = await fetchCsrfToken();
  }

  if (!csrfToken) {
    throw new Error("CSRF token is required");
  }

  const res = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Signin failed");
  }

  return data;
};

export const signupRequest = async (
  name: string,
  email: string,
  password: string,
) => {
  let csrfToken = await getCsrfToken();

  if (!csrfToken) {
    csrfToken = await fetchCsrfToken();
  }

  if (!csrfToken) {
    throw new Error("CSRF token is required");
  }

  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Signup failed");
  }

  return data;
};

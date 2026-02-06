/** Extract auth token from cookie header (server-side) */
export function getTokenFromCookies(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/auth_token=([^;]+)/);
  return match ? match[1] : null;
}

/** Validate JWT token against the API (server-side) */
export async function validateToken(token: string): Promise<any | null> {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

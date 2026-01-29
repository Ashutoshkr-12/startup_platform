

export async function getMe() {
  const res = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include", // THIS IS NOT OPTIONAL
  });

  if (!res.ok) return null;

  const data = await res.json();
  
  return data.data;
}

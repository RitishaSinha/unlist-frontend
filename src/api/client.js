const BASE = import.meta.env.VITE_API_BASE;
export async function apiPost(path, body, token) {
const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    mode: "cors",
    headers: {
"Content-Type": "application/json",
...(token ? { Authorization: `Bearer ${token}` } : {}),
},
body: JSON.stringify(body),
});
if (!res.ok) {
const err = await res.json().catch(() => ({}));
throw new Error(err.detail || "Something went wrong. Please try again.");
}
return res.json();
}
export async function apiGet(path, token) {
const res = await fetch(`${BASE}${path}`, {
    mode: "cors",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
});
if (!res.ok) {
throw new Error("Something went wrong. Please try again.");
}
return res.json();
}

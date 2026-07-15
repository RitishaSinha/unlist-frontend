import { useState } from "react";
import { apiPost } from "../api/client";
export default function AuthModal({ onSuccess, onClose }) {
const [tab, setTab] = useState("login"); // login | register
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
async function handleSubmit() {
if (!email || !password) { setError("Please fill in all fields"); return; }
if (tab === "register" && !name) { setError("Please enter your name"); return; }
setError(""); setLoading(true);
try {
const path = tab === "login" ? "/auth/login" : "/auth/register";
const body = tab === "login"
? { email, password }
: { email, password, name };
const data = await apiPost(path, body);
onSuccess(data.token, data.user);
} catch (e) {
setError(e.message);
} finally {
setLoading(false);
}
}
function handleGoogleLogin() {
window.location.href =
"https://unlist-backend-s280.onrender.com/auth/login";
}
return (
<div style={{
position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
background: "rgba(0,0,0,0.7)", display: "flex",
alignItems: "center", justifyContent: "center", zIndex: 1000
}}>
<div className="card" style={{ width: "380px", padding: "28px", position: "relative" }}>
{/* Close button */}
<div onClick={onClose} style={{
position: "absolute", top: "14px", right: "16px",
cursor: "pointer", color: "var(--text-secondary)", fontSize: "20px"
}}>x</div>
<h3 style={{ marginTop: 0 }}>
{tab === "login" ? "Sign In" : "Create Account"}
</h3>
{/* Google login button */}
<button onClick={handleGoogleLogin} style={{
width: "100%", padding: "12px", borderRadius: "var(--radius)",
border: "1px solid var(--border)", background: "var(--surface)",
color: "var(--text-primary)", cursor: "pointer", marginBottom: "16px",
display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
fontSize: "14px", fontWeight: "500"
}}>
<svg width="18" height="18" viewBox="0 0 48 48">
<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.6
2 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48
-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.9
2 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2
.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
</svg>
Continue with Google
</button>
<div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
<hr style={{ flex: 1, borderColor: "var(--border)" }} />
<span className="text-secondary" style={{ fontSize: "12px" }}>or</span>
<hr style={{ flex: 1, borderColor: "var(--border)" }} />
</div>
{/* Tab toggle */}
<div className="tab-toggle" style={{ marginBottom: "16px", marginTop: 0 }}>
<div className={`tab-btn ${tab === "login" ? "active" : ""}`}
onClick={() => { setTab("login"); setError(""); }}>Sign In</div>
<div className={`tab-btn ${tab === "register" ? "active" : ""}`}
onClick={() => { setTab("register"); setError(""); }}>Register</div>
</div>
{tab === "register" && (
<input type="text" placeholder="Your name" value={name}
onChange={(e) => setName(e.target.value)} style={{ marginBottom: "10px" }} />
)}
<input type="email" placeholder="Email" value={email}
onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: "10px" }} />
<input type="password" placeholder="Password (8+ chars, 1 uppercase, 1 number)"
value={password} onChange={(e) => setPassword(e.target.value)} />
{error && <div className="error-box" style={{ marginTop: "10px" }}>{error}</div>}
<button className="btn-amber" onClick={handleSubmit} disabled={loading}
style={{ width: "100%", marginTop: "16px" }}>
{loading ? "Please wait..." : tab === "login" ? "Sign In" : "Create Account"}
</button>
</div>
</div>
);
}
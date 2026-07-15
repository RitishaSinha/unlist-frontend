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
<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
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

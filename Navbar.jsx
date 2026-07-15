export default function Navbar({ onLogoClick, onSignIn, user, onLogout }) {
function scrollToHowItWorks() {
const el = document.getElementById("how-it-works");
if (el) el.scrollIntoView({ behavior: "smooth" });
}
function scrollToFooter() {
const el = document.getElementById("footer");
if (el) el.scrollIntoView({ behavior: "smooth" });
}
return (
<div className="navbar">
<div className="logo" onClick={onLogoClick}>Unlist</div>
<div className="links" style={{ alignItems: "center" }}>
<span style={{ cursor: "pointer", color: "#d9d9d9"}} onClick={onLogoClick}>Home</span>
<span style={{ cursor: "pointer", color: "#d9d9d9"}} onClick={scrollToHowItWorks}>About Us</span>
<span style={{ cursor: "pointer", color: "#d9d9d9"}} onClick={scrollToFooter}>Contact</span>
{user ? (
<div style={{ display: "flex", alignItems: "center", gap: "10px",color:"#d9d9d9" }}>
{user.picture && (
<img src={user.picture} alt="avatar"
style={{ width: "28px", height: "28px", borderRadius: "50%" }} />
)}
<span style={{ fontSize: "14px" }}>{user.name || user.email}</span>
<span onClick={onLogout} style={{
cursor: "pointer", color: "var(--text-secondary)", fontSize: "13px"
}}>Sign out</span>
</div>
) : (
<button className="btn-outline" onClick={onSignIn}
style={{ padding: "8px 16px", fontSize: "13px" }}>
Sign In
</button>
)}
</div>
</div>
);
}
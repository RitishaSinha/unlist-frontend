import { useState } from "react";
import { apiPost } from "../api/client";
export default function Home({ onAnalysed, onCompared }) {
const [mode, setMode] = useState("analyse");
const [singleUrl, setSingleUrl] = useState("");
const [urls, setUrls] = useState(["", "", "", ""]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
async function handleAnalyse() {
if (!singleUrl.trim()) { setError("Paste a listing URL to get started"); return; }
setError(""); setLoading(true);
try {
const report = await apiPost("/analyse", { url: singleUrl.trim() });
onAnalysed(report);
} catch (e) {
setError(e.message);
} finally {
setLoading(false);
}
}
async function handleCompare() {
const filled = urls.map((u) => u.trim()).filter(Boolean);
if (filled.length < 2) { setError("Enter at least 2 URLs to compare"); return; }
setError(""); setLoading(true);
try {
const result = await apiPost("/compare", { urls: filled });
onCompared(result);
} catch (e) {
setError(e.message);
} finally {
setLoading(false);
}
}
function updateUrl(index, value) {
const next = [...urls];
next[index] = value;
setUrls(next);
}
return (
<div className="container">
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <div style={{ flex: 1 }}>
    <p className="text-amber" style={{ letterSpacing: "1px", fontSize: "13px" }}>FREE CAR AUDIT TOOL</p>
    <h1 style={{ fontSize: "44px", lineHeight: 1.2 }}>
      <span className="text-amber">UNLIST</span> shows you what the listing{" "}
      <span className="text-amber">isn't</span> showing
    </h1>
    <p className="text-secondary" style={{ fontSize: "16px" }}>Know what's wrong before you buy</p>
  </div>
  <div style={{ flex: 1, textAlign: "right" }}>
    <img src="./car.png" alt="car" style={{ width: "320px" }} />
  </div>
</div>
<div className="card" style={{ border: "1px solid var(--amber)",  }}>
<p className="text-amber" style={{ margin: 0 }}>
Paste a Spinny or Cars24 listing. We read the full inspection report,
classify every fault, and hand you a checklist for the test drive.
</p>
</div>
<div className="tab-toggle">
<div className={`tab-btn ${mode === "analyse" ? "active" : ""}`} onClick={() => setMode("analyse")}
>Analyse</div>
<div className={`tab-btn ${mode === "compare" ? "active" : ""}`} onClick={() => setMode("compare")}
>Compare</div>
</div>
{mode === "analyse" ? (
<div>
<input type="url" placeholder="Enter URL" value={singleUrl}
onChange={(e) => setSingleUrl(e.target.value)} />
<button className="btn-amber" onClick={handleAnalyse} disabled={loading}>
{loading ? "Analysing listing..." : "Analyse"}
</button>
</div>
) : (
<div>
{urls.map((u, i) => (
<input key={i} type="url" placeholder="Enter URL" value={u}
onChange={(e) => updateUrl(i, e.target.value)} />
))}
<button className="btn-amber" onClick={handleCompare} disabled={loading}>
{loading ? "Comparing listings..." : "Compare"}
</button>
</div>
)}
{error && <div className="error-box">{error}</div>}
<h2 id="how-it-works" style={{ textAlign: "center", marginTop: "60px", padding: "20px 0"}}>HOW IT WORKS</h2>
<div className="flex-row">
<div className="card flex-1" style={{ border: "1px solid var(--amber)" }}>
<p className="text-amber" style={{ fontSize: "12px" }}>01 SCRAPE</p>
<h3>Full Listing Extracted</h3>
<p className="text-amber">We read the complete page, including collapsed sections. No fault is missed.</p>
</div>
<div className="card flex-1" style={{ border: "1px solid var(--amber)" }}>
<p className="text-amber" style={{ fontSize: "12px" }}>02 CLASSIFY</p>
<h3>Faults ranked by severity</h3>
<p className="text-amber">Each fault sentence is classified as minor, moderate or major.</p>
</div>
<div className="card flex-1" style={{ border: "1px solid var(--amber)" }}>
<p className="text-amber" style={{ fontSize: "12px" }}>03 CHECKLIST</p>
<h3>Check it Live</h3>
<p className="text-amber">Pull up your personalised test drive checklist on your phone at the
showroom.</p>
</div>
</div>
<div id="footer" style={{
  marginTop: "60px",
  padding: "40px 0",
}}>
  <h2 style={{ textAlign: "center", marginBottom: "40px" }}>CONTACT US</h2>
  <div style={{
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "40px"
  }}>
    <div style={{ textAlign: "center" }}>
      <p style={{ fontWeight: "600", marginBottom: "16px" }}>Ritisha Sinha</p>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", alignItems: "center" }}>
  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" style={{ color: "var(--amber)", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "15px", fontWeight: "500" }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--amber)" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="2" fill="var(--amber)"/>
      <path d="M7 10H5V19H7V10ZM6 9C6.55228 9 7 8.55228 7 8C7 7.44772 6.55228 7 6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9ZM19 19H17V14.5C17 13.1193 15.8807 12 14.5 12C13.1193 12 12 13.1193 12 14.5V19H10V10H12V11.5C12.6728 10.5869 13.7761 10 15 10C17.2091 10 19 11.7909 19 14V19Z" fill="#0F0F0F" stroke="#0F0F0F" strokeWidth="0.4"/>
    </svg>
    LinkedIn
  </a>
  <a href="https://github.com/yourgithub" target="_blank" rel="noreferrer" style={{ color: "var(--amber)", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "15px", fontWeight: "500" }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--amber)" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
    GitHub
  </a>
  <a href="mailto:youremail@gmail.com" style={{ color: "var(--amber)", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "15px", fontWeight: "500" }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="var(--amber)" strokeWidth="2" fill="none"/>
      <polyline points="2,4 12,13 22,4" stroke="var(--amber)" strokeWidth="2" fill="none"/>
    </svg>
    Mail
  </a>
</div>
    </div>

    <div style={{ textAlign: "center" }}>
      <p style={{ fontWeight: "600", marginBottom: "16px" }}>Sudhanshu Sharma</p>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", alignItems: "center" }}>
  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" style={{ color: "var(--amber)", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "15px", fontWeight: "500" }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--amber)" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="var(--amber)"/>
      <path d="M7 10H5V19H7V10ZM6 9C6.55228 9 7 8.55228 7 8C7 7.44772 6.55228 7 6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9ZM19 19H17V14.5C17 13.1193 15.8807 12 14.5 12C13.1193 12 12 13.1193 12 14.5V19H10V10H12V11.5C12.6728 10.5869 13.7761 10 15 10C17.2091 10 19 11.7909 19 14V19Z" fill="#0F0F0F"  stroke="#0F0F0F" strokeWidth="0.4"/>
    </svg>
    LinkedIn
  </a>
  <a href="https://github.com/yourgithub" target="_blank" rel="noreferrer" style={{ color: "var(--amber)", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "15px", fontWeight: "500" }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--amber)" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
    GitHub
  </a>
  <a href="mailto:youremail@gmail.com" style={{ color: "var(--amber)", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "15px", fontWeight: "500" }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="var(--amber)" strokeWidth="2" fill="none"/>
      <polyline points="2,4 12,13 22,4" stroke="var(--amber)" strokeWidth="2" fill="none"/>
    </svg>
    Mail
  </a>
</div>
    </div>
  </div>

  {/* <p className="text-secondary" style={{ textAlign: "center", fontSize: "12px", marginTop: "40px" }}>
    © 2026 Unlist. Built for Indian used car buyers.
  </p> */}
</div>
</div>
);
}

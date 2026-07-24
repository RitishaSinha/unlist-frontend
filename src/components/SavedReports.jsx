import { useState, useEffect } from "react";
import { apiGet, apiPost } from "../api/client";
export default function SavedReports({ token, onViewReport, onBack }) {
const [reports, setReports] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
useEffect(() => {
if (!token) return;
apiGet("/saved", token)
.then((data) => { setReports(data); setLoading(false); })
.catch(() => { setError("Failed to load saved reports."); setLoading(false); });
}, [token]);
async function handleDelete(id) {
try {
await fetch(
`${import.meta.env.VITE_API_BASE}/saved/${id}`,
{ method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
);
setReports(reports.filter((r) => r.id !== id));
} catch (e) {
console.error("Delete failed", e);
}
}
function formatDate(dateStr) {
const d = new Date(dateStr);
return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
if (loading) return (
<div className="container" style={{ paddingTop: "40px" }}>
<p className="text-secondary">Loading saved reports...</p>
</div>
);
return (
<div className="container" style={{ paddingTop: "20px" }}>
<p onClick={onBack} className="text-secondary" style={{ cursor: "pointer" }}>
&larr; Back
</p>
<h2>Saved Reports</h2>
{error && <div className="error-box">{error}</div>}
{reports.length === 0 && !error && (
<div className="card" style={{ textAlign: "center", padding: "40px" }}>
<p className="text-secondary">No saved reports yet.</p>
<p className="text-secondary" style={{ fontSize: "13px" }}>
Analyse or compare a listing and click "Save report" to save it here.
</p>
</div>
)}
{reports.map((item) => {
const report = item.report;
const isSingle = !report.cars;
const car = isSingle
? report.car
: report.cars?.find(c => !c.error)?.car;
return (
<div key={item.id} className="card" style={{
display: "flex", justifyContent: "space-between",
alignItems: "center", marginBottom: "12px"
}}>
<div>
<p style={{ margin: "0 0 4px 0", fontWeight: "600" }}>
{item.title || car?.title || "Saved Report"}
</p>
<p className="text-secondary" style={{ margin: 0, fontSize: "13px" }}>
{isSingle ? "Single report" : "Comparison"} &middot; Saved {formatDate(item.saved_at)}
</p>
</div>
<div style={{ display: "flex", gap: "10px" }}>
<button className="btn-amber" onClick={() => onViewReport(report, isSingle)}>
View
</button>
<button className="btn-outline" onClick={() => handleDelete(item.id)}
style={{ color: "var(--major)", borderColor: "var(--major)" }}>
Delete
</button>
</div>
</div>
);
})}
</div>
);
}
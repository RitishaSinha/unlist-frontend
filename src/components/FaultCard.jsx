function severityClass(score) {
if (score >= 4) return "tag-major";
if (score >= 2) return "tag-moderate";
return "tag-minor";
}
export default function FaultCard({ fault }) {
return (
<div className="card" style={{ marginBottom: "10px" }}>
<p style={{ margin: "0 0 6px 0" }}>
<span className={severityClass(fault.severity)}></span>
<b>{fault.part}</b>
</p>
<p className="text-secondary" style={{ fontStyle: "italic", margin: "0 0 6px 0" }}>
"{fault.status}"
</p>
<p className="text-amber" style={{ fontSize: "13px", margin: 0 }}>
Check: {fault.part} — {fault.status}
</p>
</div>
);
}

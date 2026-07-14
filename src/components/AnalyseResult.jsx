import { useState } from "react";
import { apiPost } from "../api/client";
import FaultCard from "./FaultCard";
import ChecklistCard from "./ChecklistCard";
export default function AnalyseResult({ report, onShared, onBack }) {
const [tab, setTab] = useState("faults");
async function handleShare() {
const result = await apiPost("/share", { report });
onShared({ id: result.id, report });
}
return (
<div className="container">
<p onClick={onBack} className="text-secondary" style={{ cursor: "pointer" }}>&larr; Back to search</p
>
<h2 style={{ marginBottom: 0 }}>{report.car.title}</h2>
<p className="text-secondary">
{report.car.km.toLocaleString()} km · {report.car.fuel} ·  &#8377;{report.car.price.toLocaleString()} · {
report.platform}
</p>
<div className="card">
<p className="text-secondary" style={{ margin: 0 }}>RED FLAG SCORE</p>
<h1 className="text-amber" style={{ margin: "4px 0" }}>{report.red_flag_score}</h1>
<p>{report.summary}</p>
</div>
<div className="tab-toggle" style={{ justifyContent: "flex-start" }}>
<div className={`tab-btn ${tab === "faults" ? "active" : ""}`} onClick={() => setTab("faults")}>Faults</div>
<div className={`tab-btn ${tab === "checklist" ? "active" : ""}`} onClick={() => setTab("checklist"
)}>Test drive checklist</div>
</div>
{tab === "faults" && (
<div>
<h3>Critical imperfections ({report.critical_imperfections.length})</h3>
{report.critical_imperfections.map((f, i) => <FaultCard key={i} fault={f} />)}
<h3>Non-critical imperfections ({report.non_critical_imperfections.length})</h3>
{report.non_critical_imperfections.map((f, i) => <FaultCard key={i} fault={f} />)}
{report.restored_imperfections && report.restored_imperfections.length > 0 && (
<>
<h3>Restored imperfections ({report.restored_imperfections.length})</h3>
{report.restored_imperfections.map((f, i) => <FaultCard key={i} fault={f} />)}
</>
)}
{report.replaced_parts && report.replaced_parts.length > 0 && (
<>
<h3>Replaced parts ({report.replaced_parts.length})</h3>
{report.replaced_parts.map((f, i) => <FaultCard key={i} fault={f} />)}
</>
)}
</div>
)}
{tab === "checklist" && (
<ChecklistCard checklist={report.checklist} onShare={handleShare} />
)}
</div>
);
}

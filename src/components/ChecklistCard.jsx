import { useState } from "react";
export default function ChecklistCard({ checklist, onShare }) {
const [checked, setChecked] = useState({});
const [copied, setCopied] = useState(false);
function toggle(i) {
setChecked({ ...checked, [i]: !checked[i] });
}
function copyChecklist() {
  navigator.clipboard.writeText(checklist.join("\n"));
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
}
return (
<div className="card">
<h3 style={{ marginTop: 0 }}>Test drive checklist</h3>
<p className="text-secondary">Tap items as you check them at the showroom</p>
{checklist.map((item, i) => (
<label key={i} style={{ display: "block", margin: "8px 0", fontSize: "14px" }}>
<input type="checkbox" checked={!!checked[i]} onChange={() => toggle(i)} style={{ marginRight: "8px" }} />
{item}
</label>
))}
<div className="flex-row" style={{ marginTop: "14px" }}>
<button className="btn-amber" onClick={copyChecklist}
  style={{ background: copied ? "#4CAF50" : "" }}>
  {copied ? "Copied ✓" : "Copy checklist"}
</button>
<button className="btn-outline" onClick={onShare}>Share report</button>
</div>
</div>
);
}

import { apiPost } from "../api/client";
import CompareCard from "./CompareCard";
export default function CompareResult({ result, onShared, onBack }) {
async function handleShare() {
const shared = await apiPost("/share", { report: result });
onShared({ id: shared.id, report: result });
}
const recommended = result.verdict && result.verdict.recommended_index !== null
? result.cars.filter((c) => !c.error)[result.verdict.recommended_index]
: null;
return (
<div className="container">
<p onClick={onBack} className="text-secondary" style={{ cursor: "pointer" }}>&larr; Back to search</p
>
<h2>Compare listings</h2>
<div className="flex-row">
{result.cars.map((car, i) => <CompareCard key={i} car={car} />)}
</div>
{result.verdict && (
<div className="card" style={{ border: "1px solid var(--amber)" }}>
{recommended ? (
<p style={{ margin: 0 }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--amber)" style={{ marginRight: "6px", verticalAlign: "middle" }}>
  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/>
</svg>
 <b>Lower fault risk: {recommended.car.title}</b><br />
<span className="text-secondary">{result.verdict.reason}</span>
</p>
) : (
<p className="text-secondary" style={{ margin: 0 }}>{result.verdict.reason}</p>
)}
</div>
)}
<div className="flex-row" style={{ marginTop: "16px" }}>
<button className="btn-outline" onClick={handleShare}>Share comparison</button>
</div>
</div>
);
}

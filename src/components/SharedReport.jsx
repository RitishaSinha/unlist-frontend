export default function SharedReport({ data, onAnalyseAnother }) {
const link = `${window.location.origin}/?report=${data.id}`;
const car = data.report.car || (data.report.cars && data.report.cars[0].car);
function copyLink() {
navigator.clipboard.writeText(link);
}
return (
<div className="container" style={{ textAlign: "center", maxWidth: "500px" }}>
{/* <p style={{ fontSize: "40px" , color: "var(--amber)" }}>⬡</p> */}
<h2>Report link created</h2>
<p className="text-secondary">Anyone with this link can view the full fault report. No account needed
.</p>
<div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center"
}}>
<span className="text-amber" style={{ fontSize: "13px" }}>{link}</span>
<button className="btn-outline" onClick={copyLink}>Copy</button>
</div>
<p className="text-secondary" style={{ fontSize: "12px" }}>This link expires in 7 days.</p>
{car && (
<div className="card" style={{ textAlign: "left" }}>
<p className="text-secondary" style={{ fontSize: "12px" }}>SHARED REPORT PREVIEW</p>
<p style={{ margin: 0 }}><b>{car.title}</b></p>
<p className="text-secondary" style={{ fontSize: "13px" }}>
{car.km.toLocaleString()} km ·  &#8377;{car.price.toLocaleString()}
</p>
</div>
)}
<button className="btn-amber" onClick={onAnalyseAnother}>Analyse another</button>
</div>
);
}
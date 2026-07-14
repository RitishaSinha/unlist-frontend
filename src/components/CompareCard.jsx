export default function CompareCard({ car }) {
if (car.error) {
return <div className="card error-box">{car.error}</div>;
}
return (
<div className="card flex-1">
<p style={{ margin: 0 }}><b>{car.car.title}</b></p>
<p className="text-secondary" style={{ fontSize: "13px" }}>
{car.car.km.toLocaleString()} km ·  &#8377;{car.car.price.toLocaleString()} · {car.platform}
</p>
<hr style={{ borderColor: "var(--border)" }} />
<p>Red flag score <b className="text-amber" style={{ float: "right" }}>{car.red_flag_score}</b></p>
<p>Faults found <b style={{ float: "right" }}>{car.faults.length}</b></p>
</div>
);
}
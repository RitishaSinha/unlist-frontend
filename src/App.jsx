import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AnalyseResult from "./components/AnalyseResult";
import CompareResult from "./components/CompareResult";
import SharedReport from "./components/SharedReport";
import { apiGet } from "./api/client";
export default function App() {
const [view, setView] = useState("home");
const [activeReport, setActiveReport] = useState(null);
const [activeCompare, setActiveCompare] = useState(null);
const [shareData, setShareData] = useState(null);
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const reportId = params.get("report");
  if (reportId) {
    apiGet(`/report/${reportId}`).then((data) => {
      if (data.cars) {
        setActiveCompare(data);
        setView("compareResult");
      } else {
        setActiveReport(data);
        setView("analyseResult");
      }
    }).catch(() => {
      console.log("Failed to load shared report");
    });
  }
}, []);
function goHome() {
window.history.pushState({}, "", "/");
setView("home");
}
return (
<div>
<Navbar onLogoClick={goHome} />
{view === "home" && (
<Home
onAnalysed={(report) => { setActiveReport(report); setView("analyseResult"); }}
onCompared={(result) => { setActiveCompare(result); setView("compareResult"); }}
/>
)}
{view === "analyseResult" && (
<AnalyseResult
report={activeReport}
onBack={goHome}
onShared={(data) => { setShareData(data); setView("shared"); }}
/>
)}
{view === "compareResult" && (
<CompareResult
result={activeCompare}
onBack={goHome}
onShared={(data) => { setShareData(data); setView("shared"); }}
/>
)}
{view === "shared" && (
<SharedReport data={shareData} onAnalyseAnother={goHome} />
)}
</div>
);
}

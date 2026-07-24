import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AnalyseResult from "./components/AnalyseResult";
import CompareResult from "./components/CompareResult";
import SharedReport from "./components/SharedReport";
import AuthModal from "./components/AuthModal";
import SavedReports from "./components/SavedReports";
import { apiGet } from "./api/client";
export default function App() {
const [view, setView] = useState("home");
const [activeReport, setActiveReport] = useState(null);
const [activeCompare, setActiveCompare] = useState(null);
const [shareData, setShareData] = useState(null);
const [showAuth, setShowAuth] = useState(false);
const [token, setToken] = useState(
() => localStorage.getItem("unlist_token") || null
);
const [user, setUser] = useState(() => {
const u = localStorage.getItem("unlist_user");
return u ? JSON.parse(u) : null;
});
function saveAuth(tok, usr) {
localStorage.setItem("unlist_token", tok);
localStorage.setItem("unlist_user", JSON.stringify(usr));
setToken(tok);
setUser(usr);
setShowAuth(false);
}
function logout() {
localStorage.removeItem("unlist_token");
localStorage.removeItem("unlist_user");
setToken(null);
setUser(null);
}
useEffect(() => {
const params = new URLSearchParams(window.location.search);
const reportId = params.get("report");
if (reportId) {
apiGet(`/report/${reportId}`).then((data) => {
if (data.cars) { setActiveCompare(data); setView("compareResult"); }
else { setActiveReport(data); setView("analyseResult"); }
}).catch(() => console.log("Failed to load shared report"));
}
const authToken = params.get("token");
if (authToken) {
saveAuth(authToken, {
name: params.get("name"),
email: params.get("email"),
picture: params.get("picture"),
});
window.history.replaceState({}, "", "/");
}
}, []);
function goHome() {
window.history.pushState({}, "", "/");
setView("home");
}
function handleViewSaved(report, isSingle) {
if (isSingle) { setActiveReport(report); setView("analyseResult"); }
else { setActiveCompare(report); setView("compareResult"); }
}
return (
<div>
<Navbar
onLogoClick={goHome}
onSignIn={() => setShowAuth(true)}
user={user}
onLogout={logout}
onSaved={() => setView("saved")}
/>
{showAuth && (
<AuthModal onSuccess={saveAuth} onClose={() => setShowAuth(false)} />
)}
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
token={token}
onShared={(data) => { setShareData(data); setView("shared"); }}
/>
)}
{view === "compareResult" && (
<CompareResult
result={activeCompare}
onBack={goHome}
token={token}
onShared={(data) => { setShareData(data); setView("shared"); }}
/>
)}
{view === "shared" && (
<SharedReport data={shareData} onAnalyseAnother={goHome} />
)}
{view === "saved" && (
<SavedReports
token={token}
onViewReport={handleViewSaved}
onBack={goHome}
/>
)}
</div>
);
}

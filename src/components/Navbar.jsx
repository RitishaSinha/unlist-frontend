export default function Navbar({ onLogoClick }) {
  function scrollToHowItWorks() {
    const el = document.getElementById("how-it-works");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToFooter() {
    const el = document.getElementById("footer");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="navbar">
      <div className="logo" onClick={onLogoClick}>Unlist</div>
      <div className="links">
        <span style={{ cursor: "pointer", color: "#d9d9d9" }} onClick={onLogoClick}>Home</span>
        <span style={{ cursor: "pointer", color: "#d9d9d9" }} onClick={scrollToHowItWorks}>About Us</span>
        <span style={{ cursor: "pointer", color: "#d9d9d9" }} onClick={scrollToFooter}>Contact Us</span>
      </div>
    </div>
  );
}
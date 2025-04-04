
function Sidenav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="btn btn-primary"
        style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000 }}
        onClick={toggleSidebar}
      >
        ☰ Open Sidebar
      </button>

      {/* Sidebar */}
      <div
        className="sidebar"
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? "0" : "-250px", // Slide in/out effect
          width: "250px",
          height: "100%",
          backgroundColor: "#333",
          color: "white",
          transition: "right 0.3s ease-in-out",
          padding: "20px",
          zIndex: 999,
        }}
      >
        <button
          className="btn btn-danger mb-3"
          onClick={toggleSidebar}
          style={{ width: "100%" }}
        >
          ✖ Close
        </button>
        <ul className="list-unstyled">
          <li><a href="#" className="text-light">Home</a></li>
          <li><a href="#" className="text-light">About</a></li>
          <li><a href="#" className="text-light">Contact</a></li>
        </ul>
      </div>
    </>
  );
}

export default Sidenav;

import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav style={{
      background: "#0a3d62",
      padding: "15px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white"
    }}>
      

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white" }}>Inicio</Link>
        <Link to="/nosotros" style={{ color: "white" }}>Nosotros</Link>
        <Link to="/servicios" style={{ color: "white" }}>Servicios</Link>
        <Link to="/especialidades" style={{ color: "white" }}>Especialidades</Link>
        <Link to="/contacto" style={{ color: "white" }}>Contacto</Link>
      </div>
    </nav>
  );
}

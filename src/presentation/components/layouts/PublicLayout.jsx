import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";

export default function PublicLayout() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <header className="public-header">
        <div className="header-container">
          {/* Logo */}
          <div className="logo">💙 CMMSalud</div>

          {/* Menu */}
          <nav className="menu">
            <Link to="/">Inicio</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/servicios">Servicios</Link>
            <Link to="/especialidades">Especialidades</Link>
            <Link to="/contacto">Contacto</Link>
          </nav>

          {/* Auth */}
          <div className="auth">
            <button
              className="nav-login"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>

            <button
              className="register"
              onClick={() => setShowRegister(true)}
            >
              Regístrate
            </button>
          </div>
        </div>
      </header>

      {/* LOGIN MODAL */}
      <Login
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />

      {/* REGISTER MODAL */}
      <Register
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />

      <main className="public-content">
        <Outlet />
      </main>
    </>
  );
}

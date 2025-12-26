import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://localhost:54786/api/Medicos";

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codigoMedico, setCodigoMedico] = useState(""); // Nuevo campo para médicos
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMedicoLogin, setIsMedicoLogin] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isMedicoLogin) {
      // Login de médico por numeroColegiado
      try {
        const res = await fetch(API_URL);
        const medicos = await res.json();
        const medico = medicos.find(m => m.numeroColegiado === codigoMedico);

        if (!medico) {
          setError("Código de médico inválido");
          setLoading(false);
          return;
        }

        const sessionMedico = {
          name: medico.nombreCompleto,
          role: "medico",
          idMedico: medico.idMedico,
          numeroColegiado: medico.numeroColegiado
        };
        localStorage.setItem("sessionMedico", JSON.stringify(sessionMedico));
        setLoading(false);
        onClose();
        navigate("/dashboard/homeMed");
      } catch (err) {
        console.error(err);
        setError("Error al validar código de médico");
        setLoading(false);
      }
    } else {
      // Login de paciente (simulado)
      if (!email || !password) {
        setError("Por favor, ingresa tus credenciales");
        setLoading(false);
        return;
      }
      const session = {
        name: "Juan Pérez", // luego dinámico desde API
        role: "paciente",
        email,
      };
      localStorage.setItem("session", JSON.stringify(session));
      setLoading(false);
      onClose();
      navigate("/dashboard/home");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>
        <h2 style={styles.title}>Bienvenido a CMMSalud</h2>
        <p style={styles.subtitle}>Ingresa a tu cuenta</p>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            <input
              type="checkbox"
              checked={isMedicoLogin}
              onChange={() => setIsMedicoLogin(!isMedicoLogin)}
            /> Ingresar como médico
          </label>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {isMedicoLogin ? (
            <input
              type="text"
              placeholder="Código de médico"
              value={codigoMedico}
              onChange={(e) => setCodigoMedico(e.target.value)}
              style={styles.input}
              required
            />
          ) : (
            <>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ ...styles.input, marginBottom: 0 }}
                  required
                />
                <button
                  type="button"
                  style={styles.showBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </>
          )}

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>

        {!isMedicoLogin && (
          <p style={styles.registerText}>
            ¿No tienes cuenta?{" "}
            <button onClick={onSwitchToRegister} style={styles.registerLink}>
              Regístrate
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 },
  modal: { background: "#fff", padding: "2rem", borderRadius: "15px", width: "360px", maxWidth: "90%", boxShadow: "0 8px 30px rgba(0,0,0,0.3)", position: "relative", textAlign: "center", fontFamily: "'Segoe UI', sans-serif" },
  closeBtn: { position: "absolute", top: "10px", right: "10px", background: "transparent", border: "none", fontSize: "1.2rem", cursor: "pointer" },
  title: { marginBottom: "0.2rem" },
  subtitle: { marginBottom: "1rem", color: "#555", fontSize: "0.9rem" },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  input: { padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem", outline: "none" },
  passwordContainer: { position: "relative", display: "flex", alignItems: "center" },
  showBtn: { position: "absolute", right: "10px", background: "transparent", border: "none", cursor: "pointer", fontSize: "1rem" },
  submitBtn: { padding: "0.8rem", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer", transition: "background 0.3s" },
  error: { color: "red", fontSize: "0.85rem", marginTop: "-0.5rem" },
  registerText: { marginTop: "1rem", fontSize: "0.9rem" },
  registerLink: { background: "none", border: "none", color: "#4f46e5", cursor: "pointer" },
};

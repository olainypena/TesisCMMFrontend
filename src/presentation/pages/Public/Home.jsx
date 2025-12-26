import { useState, useEffect } from "react";

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  // Efecto parallax al hacer scroll
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "100vh",
        padding: "20px",
        overflow: "hidden",
        background: "#f0f4f8",
        position: "relative",
        color: "#111",
      }}
    >
      {/* Imagen del lado izquierdo con efecto parallax */}
      <div
        style={{
          flex: "1",
          minHeight: "400px",
          backgroundImage: "url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&h=600&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: `center ${offsetY * 0.2}px`,
          borderRadius: "30px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          transition: "background-position 0.2s",
          marginRight: "20px",
        }}
      ></div>

      {/* Contenido textual */}
      <div style={{ flex: "1", maxWidth: "600px", textAlign: "left" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "900",
            lineHeight: "1.1",
            marginBottom: "20px",
            background: "linear-gradient(90deg, #3b82f6, #06b6d4, #10b981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientText 3s ease infinite",
          }}
        >
          Cuidando tu salud, en cada rincón
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "30px",
            lineHeight: "1.6",
            color: "#334155",
            animation: "fadeInText 1.5s ease forwards",
          }}
        >
          Bienvenido a <strong>CMMSalud</strong>, tu aliado en salud en República Dominicana.  
          Explora especialistas, servicios y agenda tu cita de forma fácil y segura.  
          Nuestra plataforma es moderna, dinámica y diseñada para tu comodidad.
        </p>

        <button
          onClick={() => setShowInfo(!showInfo)}
          style={{
            padding: "14px 36px",
            fontSize: "1.1rem",
            borderRadius: "12px",
            border: "none",
            background: "#3b82f6",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "700",
            boxShadow: "0 10px 20px rgba(59,130,246,0.4)",
            transition: "all 0.3s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#2563eb";
            e.currentTarget.style.boxShadow = "0 14px 25px rgba(37,99,235,0.5)";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "#3b82f6";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(59,130,246,0.4)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {showInfo ? "Ocultar info" : "Saber más"}
        </button>

        {showInfo && (
          <div
            style={{
              marginTop: "30px",
              background: "rgba(59,130,246,0.05)",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
              animation: "fadeInScale 0.5s ease forwards",
            }}
          >
            <p style={{ marginBottom: "12px", color: "#1e293b" }}>
              CMMSalud conecta a los pacientes con médicos especialistas de manera eficiente y confiable.
            </p>
            <p style={{ color: "#1e293b" }}>
              Explora nuestras especialidades y servicios con una experiencia moderna y amigable.
            </p>
          </div>
        )}
      </div>

      {/* Animaciones */}
      <style>
        {`
          @keyframes fadeInText {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes gradientText {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          h1 {
            background-size: 200% 200%;
          }

          @media (max-width: 1024px) {
            section {
              flex-direction: column-reverse;
              text-align: center;
            }
            div[style*="flex: 1; minHeight: 400px;"] {
              margin-right: 0;
              width: 80%;
              height: 300px;
              margin-top: 20px;
            }
          }
        `}
      </style>
    </section>
  );
} 

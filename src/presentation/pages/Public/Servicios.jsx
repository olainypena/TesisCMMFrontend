import { useState } from "react";
import {
  Activity, AlertTriangle, Baby, Eye, FlaskConical, Heart, Pill, Scan, Stethoscope, UserCheck
} from "lucide-react";

const services = [
  {
    icon: AlertTriangle,
    title: "Área de emergencia",
    description:
      "Atención médica inmediata las 24 horas. Disponible para responder a cualquier emergencia médica con personal especializado.",
    color: "#dc2626",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=300&h=200&auto=format&fit=crop",
  },
  {
    icon: Stethoscope,
    title: "Salas de cirugía",
    description:
      "Quirófanos modernos equipados con tecnología de punta. Realizamos procedimientos quirúrgicos con los más altos estándares de calidad.",
    color: "#2563eb",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=300&h=200&fit=crop&crop=center",
  },
  {
    icon: FlaskConical,
    title: "Laboratorio clínico (ISO 9001:2015)",
    description:
      "Análisis clínicos precisos y confiables. Laboratorio certificado con tecnología avanzada para diagnósticos exactos.",
    color: "#16a34a",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=300&h=200&auto=format&fit=crop",
  },
];

const additionalServices = [
  {
    icon: UserCheck,
    title: "Medicina Preventiva",
    description: "Chequeos médicos completos, vacunación y programas de prevención de enfermedades.",
    color: "#0f766e",
  },
  {
    icon: Baby,
    title: "Pediatría y Neonatología",
    description: "Atención médica especializada para recién nacidos, niños y adolescentes.",
    color: "#db2777",
  },
  {
    icon: Eye,
    title: "Oftalmología",
    description: "Cuidado integral de la salud ocular, cirugías y tratamientos especializados.",
    color: "#06b6d4",
  },
];

export default function Servicios() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section style={{ padding: "50px 20px", backgroundColor: "#f9fafb", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "40px", color: "#111827" }}>
          ¿Qué Ofrecemos?
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px"
        }}>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} style={{
                background: "#fff",
                borderRadius: "15px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.3s",
              }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0px)"}>
                
                <div style={{ position: "relative", height: "200px" }}>
                  <img src={service.image} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "10px",
                    padding: "10px"
                  }}>
                    <Icon size={24} color={service.color} />
                  </div>
                </div>

                <div style={{ padding: "20px" }}>
                  <h3 style={{ fontSize: "1.25rem", marginBottom: "10px", color: "#111827" }}>{service.title}</h3>
                  <p style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: "1.6" }}>{service.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button onClick={() => setShowModal(true)} style={{
            padding: "12px 30px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "2px solid #2563eb",
            backgroundColor: "#fff",
            color: "#2563eb",
            cursor: "pointer",
            transition: "all 0.3s"
          }} onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = "#2563eb";
            e.currentTarget.style.color = "#fff";
          }} onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = "#fff";
            e.currentTarget.style.color = "#2563eb";
          }}>
            Ver más
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}>
            <div style={{
              background: "#fff",
              borderRadius: "15px",
              maxWidth: "600px",
              width: "90%",
              padding: "30px",
              maxHeight: "80vh",
              overflowY: "auto",
              position: "relative",
            }}>
              <button onClick={() => setShowModal(false)} style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                fontSize: "1.5rem",
                background: "transparent",
                border: "none",
                cursor: "pointer"
              }}>×</button>

              <h3 style={{ fontSize: "1.8rem", textAlign: "center", marginBottom: "15px", color: "#111827" }}>
                Servicios Adicionales
              </h3>
              <p style={{ textAlign: "center", color: "#4b5563", marginBottom: "25px" }}>
                Descubre todos los servicios médicos especializados que ofrecemos
              </p>

              <div style={{ display: "grid", gap: "15px" }}>
                {additionalServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div key={index} style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#f9fafb",
                      padding: "15px",
                      borderRadius: "10px",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                      transition: "transform 0.3s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0px)"}>
                      <div style={{
                        backgroundColor: "#e5e7eb",
                        borderRadius: "10px",
                        padding: "10px",
                        marginRight: "15px"
                      }}>
                        <Icon size={24} color={service.color} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: "1.1rem", marginBottom: "5px", color: "#111827" }}>{service.title}</h4>
                        <p style={{ fontSize: "0.9rem", color: "#4b5563" }}>{service.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

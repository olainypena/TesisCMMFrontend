import { useState } from "react";
import { Heart, Brain, Bone, Eye, Baby, UserCheck, Stethoscope, Activity, Pill, HeartHandshake, Microscope, Zap } from "lucide-react";

const specialties = [
  { 
    name: "Anestesiología", 
    color: "#3b82f6",
    icon: Zap,
    image: "https://www.clinicasharonmedicalgroup.com/assets/media/anesteciologia.jpg",
    detailedDescription: "La anestesiología es la especialidad médica dedicada al cuidado perioperatorio del paciente. Nuestros anestesiólogos se encargan de proporcionar anestesia segura durante cirugías, manejo del dolor agudo y crónico, y cuidados críticos. Utilizamos técnicas modernas de anestesia general, regional y local, monitoreando constantemente los signos vitales para garantizar la seguridad del paciente durante todo el procedimiento quirúrgico."
  },
  { 
    name: "Cardiología", 
    color: "#dc2626",
    icon: Heart,
    image: "https://d3puay5pkxu9s4.cloudfront.net/curso/12441/800_imagen.jpg",
    detailedDescription: "Nuestra unidad de cardiología ofrece diagnóstico y tratamiento integral de enfermedades cardiovasculares. Realizamos ecocardiogramas, electrocardiogramas, pruebas de esfuerzo, y cateterismos cardíacos. Nuestro equipo trata condiciones como hipertensión arterial, insuficiencia cardíaca, arritmias, enfermedad coronaria y valvulopatías. Contamos con tecnología de vanguardia para procedimientos de cardiología intervencionista y cirugía cardiovascular."
  },
  { 
    name: "Dermatología", 
    color: "#16a34a",
    icon: UserCheck,
    image: "https://onskin.mx/wp-content/uploads/2023/08/hero-home-1536x918.jpg",
    detailedDescription: "El servicio de dermatología se especializa en el diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas. Ofrecemos consultas para acné, psoriasis, dermatitis, cáncer de piel, y otros trastornos cutáneos. Realizamos biopsias, cirugías dermatológicas menores, tratamientos láser, y procedimientos estéticos. Nuestros dermatólogos están capacitados en dermatopatología y cirugía dermatológica para brindar atención integral."
  },
];

const additionalSpecialties = [
  { icon: Brain, name: "Neurología", description: "Diagnóstico y tratamiento de trastornos del sistema nervioso central y periférico.", color: "#8b5cf6" },
  { icon: Bone, name: "Ortopedia y Traumatología", description: "Atención especializada en lesiones del sistema musculoesquelético y fracturas.", color: "#f97316" },
  { icon: Eye, name: "Oftalmología", description: "Cuidado integral de la salud ocular, cirugías y tratamientos especializados.", color: "#06b6d4" },
  { icon: Baby, name: "Pediatría", description: "Atención médica especializada para recién nacidos, niños y adolescentes.", color: "#db2777" },
];

export default function Especialidades() {
  const [showModal, setShowModal] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const handleSpecialtyClick = (specialty) => {
    setSelectedSpecialty(specialty);
    setShowModal(true);
  }

  return (
    <section style={{ padding: "50px 20px", backgroundColor: "#f0f9ff", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "40px", color: "#111827" }}>
          Nuestras Especialidades
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {specialties.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <div key={index} style={{
                background: "#fff",
                borderRadius: "15px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                cursor: "pointer",
                transition: "transform 0.3s"
              }}
              onClick={() => handleSpecialtyClick(spec)}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0px)"}
              >
                <div style={{ height: "150px", overflow: "hidden", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
                  <img src={spec.image} alt={spec.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "15px", textAlign: "center" }}>
                  <Icon size={24} color={spec.color} />
                  <h3 style={{ marginTop: "10px", fontSize: "1.2rem", color: "#111827" }}>{spec.name}</h3>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button onClick={() => setShowModal(true)} style={{
            padding: "12px 30px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "2px solid #3b82f6",
            backgroundColor: "#fff",
            color: "#3b82f6",
            cursor: "pointer",
            transition: "all 0.3s"
          }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#3b82f6"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = "#3b82f6"; }}>
            Ver todas
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex", justifyContent: "center", alignItems: "center",
            zIndex: 1000,
          }}>
            <div style={{
              background: "#fff", borderRadius: "15px",
              maxWidth: "700px", width: "90%", padding: "30px",
              maxHeight: "80vh", overflowY: "auto", position: "relative"
            }}>
              <button onClick={() => setShowModal(false)} style={{
                position: "absolute", top: "15px", right: "15px",
                fontSize: "1.5rem", background: "transparent", border: "none", cursor: "pointer"
              }}>×</button>

              <h3 style={{ textAlign: "center", fontSize: "1.8rem", marginBottom: "20px", color: "#111827" }}>
                Todas Nuestras Especialidades
              </h3>

              <div style={{ display: "grid", gap: "15px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                {additionalSpecialties.map((spec, index) => {
                  const Icon = spec.icon;
                  return (
                    <div key={index} style={{
                      display: "flex", alignItems: "center",
                      background: "#f9fafb", padding: "15px",
                      borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                      transition: "transform 0.3s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0px)"}
                    >
                      <div style={{ marginRight: "10px" }}>
                        <Icon size={24} color={spec.color} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: "1rem", marginBottom: "5px", color: "#111827" }}>{spec.name}</h4>
                        <p style={{ fontSize: "0.85rem", color: "#4b5563" }}>{spec.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Modal de detalle individual */}
        {selectedSpecialty && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex", justifyContent: "center", alignItems: "center",
            zIndex: 1001,
          }}>
            <div style={{
              background: "#fff", borderRadius: "15px",
              maxWidth: "600px", width: "90%", padding: "30px",
              maxHeight: "80vh", overflowY: "auto", position: "relative"
            }}>
              <button onClick={() => setSelectedSpecialty(null)} style={{
                position: "absolute", top: "15px", right: "15px",
                fontSize: "1.5rem", background: "transparent", border: "none", cursor: "pointer"
              }}>×</button>

              <h3 style={{ fontSize: "1.5rem", marginBottom: "15px", textAlign: "center", color: "#111827" }}>
                <selectedSpecialty.icon size={24} color={selectedSpecialty.color} /> {selectedSpecialty.name}
              </h3>
              <div style={{ marginBottom: "20px" }}>
                <img src={selectedSpecialty.image} alt={selectedSpecialty.name} style={{ width: "100%", borderRadius: "10px", objectFit: "cover" }} />
              </div>
              <p style={{ color: "#4b5563", lineHeight: "1.6" }}>{selectedSpecialty.detailedDescription}</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

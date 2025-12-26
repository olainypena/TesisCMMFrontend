"use client";

import { useEffect, useState } from "react";

export default function MedicoHome() {
  const session = JSON.parse(localStorage.getItem("sessionMedico"));
  const [citas, setCitas] = useState(() => JSON.parse(localStorage.getItem("citas")) || []);
  const [completadas, setCompletadas] = useState(() => JSON.parse(localStorage.getItem("citasCompletadas")) || []);
  const [comentariosTemp, setComentariosTemp] = useState({});
  const [pdfTemp, setPdfTemp] = useState({});

  useEffect(() => {
    if (!session) window.location.href = "/";
  }, [session]);

  const marcarCompletada = (citaId) => {
    const cita = citas.find(c => c.id === citaId);
    if (!cita) return alert("Cita no encontrada");
    if (!comentariosTemp[citaId] || !pdfTemp[citaId]) {
      return alert("Agrega comentarios y receta PDF");
    }

    const nuevasCitas = citas.filter(c => c.id !== citaId);
    const nuevasCompletadas = [
      ...completadas,
      {
        ...cita,
        comentarios: comentariosTemp[citaId],
        recetaURL: pdfTemp[citaId]
      }
    ];

    setCitas(nuevasCitas);
    setCompletadas(nuevasCompletadas);
    localStorage.setItem("citas", JSON.stringify(nuevasCitas));
    localStorage.setItem("citasCompletadas", JSON.stringify(nuevasCompletadas));

    alert("Cita marcada como completada ✅");
  };

  const handlePdfChange = (citaId, file) => {
    const url = URL.createObjectURL(file);
    setPdfTemp(prev => ({ ...prev, [citaId]: url }));
  };

  return (
    <>
      <div className="medico-home">

        {/* HEADER */}
        <header className="top-bar">
          <div className="title-area">
            <span className="badge">CMMSalud</span>
            <h1>👨‍⚕️ Dr. {session?.name}</h1>
            <p>Panel de gestión médica</p>
          </div>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("sessionMedico");
              window.location.reload();
            }}
          >
            ⏻ Cerrar sesión
          </button>
        </header>

        {/* CONTENIDO */}
        <div className="citas-section">

          <h2>Citas Programadas</h2>

          {citas.length === 0 ? (
            <p>No tienes citas programadas</p>
          ) : (
            <div className="citas-list">
              {citas.map(c => (
                <div key={c.id} className="cita-card compact">
                  <div className="cita-info">
                    <p><strong>Paciente:</strong> {c.paciente}</p>
                    <p><strong>Especialidad:</strong> {c.medico.especialidad}</p>
                    <p><strong>Fecha:</strong> {c.fecha}</p>
                  </div>

                  <label>Comentarios médicos</label>
                  <textarea
                    rows="2"
                    value={comentariosTemp[c.id] || ""}
                    onChange={(e) =>
                      setComentariosTemp(prev => ({ ...prev, [c.id]: e.target.value }))
                    }
                  />

                  <label>Receta médica (PDF)</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handlePdfChange(c.id, e.target.files[0])}
                  />

                  {pdfTemp[c.id] && (
                    <embed
                      src={pdfTemp[c.id]}
                      type="application/pdf"
                      className="pdf-mini"
                    />
                  )}

                  <button
                    className="submit-btn"
                    onClick={() => marcarCompletada(c.id)}
                  >
                    Finalizar consulta
                  </button>
                </div>
              ))}
            </div>
          )}

          <h2>Citas Completadas</h2>

          {completadas.length === 0 ? (
            <p>No hay citas completadas</p>
          ) : (
            <div className="citas-list">
              {completadas.map(c => (
                <div key={c.id} className="cita-card compact completed">
                  <p><strong>Paciente:</strong> {c.paciente}</p>
                  <p><strong>Especialidad:</strong> {c.medico.especialidad}</p>
                  <p><strong>Fecha:</strong> {c.fecha}</p>
                  <p><strong>Comentarios:</strong> {c.comentarios}</p>

                  {c.recetaURL && (
                    <>
                      <embed
                        src={c.recetaURL}
                        type="application/pdf"
                        className="pdf-mini"
                      />
                      <a
                        href={c.recetaURL}
                        download
                        className="download-btn"
                      >
                        Descargar receta
                      </a>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .medico-home {
          min-height:100vh;
          background:#e5e7eb;
          padding:20px;
          font-family:'Segoe UI', system-ui, sans-serif;
          color:#1f2937;
        }

        .top-bar {
          display:flex;
          justify-content:space-between;
          align-items:center;
          background:#fff;
          padding:20px;
          border-radius:14px;
          box-shadow:0 8px 20px rgba(0,0,0,0.08);
          margin-bottom:25px;
        }

        .badge {
          background:#2563eb;
          color:#fff;
          padding:5px 14px;
          border-radius:20px;
          font-weight:bold;
          font-size:0.8rem;
        }

        .logout-btn {
          background:#ef4444;
          color:#fff;
          border:none;
          padding:10px 16px;
          border-radius:10px;
          cursor:pointer;
          font-weight:600;
          transition:0.3s;
        }

        .logout-btn:hover {
          background:#dc2626;
        }

        .citas-section {
          max-width:900px;
          margin:auto;
        }

        .citas-list {
          display:flex;
          flex-direction:column;
          gap:14px;
          margin-bottom:30px;
        }

        .cita-card {
          background:#fff;
          padding:15px;
          border-radius:12px;
          box-shadow:0 6px 18px rgba(0,0,0,0.06);
        }

        .compact {
          max-width:100%;
        }

        textarea {
          width:100%;
          border-radius:8px;
          border:1px solid #d1d5db;
          padding:6px;
          resize:none;
        }

        input[type="file"] {
          margin:6px 0;
        }

        .pdf-mini {
          width:100%;
          height:160px;
          margin-top:8px;
          border-radius:8px;
          border:1px solid #d1d5db;
        }

        .submit-btn {
          background:#2563eb;
          color:#fff;
          border:none;
          padding:8px 14px;
          border-radius:8px;
          cursor:pointer;
          margin-top:8px;
        }

        .completed {
          border-left:5px solid #22c55e;
        }

        .download-btn {
          display:inline-block;
          margin-top:6px;
          background:#10b981;
          color:#fff;
          padding:6px 12px;
          border-radius:8px;
          text-decoration:none;
          font-size:0.9rem;
        }
      `}</style>
    </>
  );
}

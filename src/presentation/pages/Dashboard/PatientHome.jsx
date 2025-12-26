"use client";
import { useEffect, useState } from "react";

export default function PatientHome() {
  const session = JSON.parse(localStorage.getItem("session"));
  const [modalOpen, setModalOpen] = useState(false);
  const [medicosData, setMedicosData] = useState([]);
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const [citas, setCitas] = useState(() => JSON.parse(localStorage.getItem("citas")) || []);
  const [canceladas, setCanceladas] = useState(() => JSON.parse(localStorage.getItem("citasCanceladas")) || []);
  const [completadas, setCompletadas] = useState(() => JSON.parse(localStorage.getItem("citasCompletadas")) || []);

  useEffect(() => {
    if (!session) window.location.href = "/";
    fetch("https://localhost:54786/api/Medicos")
      .then(res => res.json())
      .then(data => setMedicosData(data));
  }, [session]);

  const agendarCita = () => {
    if (!selectedMedico || !selectedDate) return alert("Selecciona médico y fecha");
    const existe = citas.find(c => c.medico.idMedico === selectedMedico.idMedico && c.fecha === selectedDate);
    if (existe) return alert("Ese horario ya está ocupado");

    const nueva = { id: Date.now(), medico: selectedMedico, fecha: selectedDate, paciente: session.name };
    const nuevas = [...citas, nueva];
    setCitas(nuevas);
    localStorage.setItem("citas", JSON.stringify(nuevas));
    setModalOpen(false);
    setSelectedMedico(null);
    setSelectedDate("");
  };

  
  const cancelarCita = (id) => {
    const cita = citas.find(c => c.id === id);
    const nuevas = citas.filter(c => c.id !== id);
    const nuevasCanceladas = [...canceladas, cita];
    setCitas(nuevas);
    setCanceladas(nuevasCanceladas);
    localStorage.setItem("citas", JSON.stringify(nuevas));
    localStorage.setItem("citasCanceladas", JSON.stringify(nuevasCanceladas));
  };

  const modificarCita = (id, fecha) => {
    const nuevas = citas.map(c => c.id === id ? { ...c, fecha } : c);
    setCitas(nuevas);
    localStorage.setItem("citas", JSON.stringify(nuevas));
  };

  return (
    <>
      <div className="patient-home">

        {/* HEADER */}
        <header className="top-bar">
          <div>
            <span className="badge">CMMSalud</span>
            <h1>👋 {session?.name}</h1>
            <p>Panel del paciente</p>
          </div>

          <div className="top-actions">
            <button className="primary-btn" onClick={() => setModalOpen(true)}>📅 Agendar cita</button>
            <button className="logout-btn" onClick={() => { localStorage.removeItem("session"); window.location.reload(); }}>
              ⏻ Cerrar sesión
            </button>
          </div>
        </header>

        {/* CONTENIDO */}
        <div className="citas-section">

          <h2>Mis Citas Agendadas</h2>
          {citas.length === 0 ? <p>No tienes citas</p> :
            citas.map(c => (
              <div key={c.id} className="cita-card compact">
                <p><strong>Médico:</strong> {c.medico.nombreCompleto}</p>
                <p><strong>Especialidad:</strong> {c.medico.especialidad}</p>
                <input type="datetime-local" value={c.fecha} onChange={e => modificarCita(c.id, e.target.value)} />
                <button className="danger-btn" onClick={() => cancelarCita(c.id)}>Cancelar</button>
              </div>
            ))
          }

          <h2>Citas Canceladas</h2>
          {canceladas.length === 0 ? <p>No hay citas canceladas</p> :
            canceladas.map(c => (
              <div key={c.id} className="cita-card compact canceled">
                <p><strong>Médico:</strong> {c.medico.nombreCompleto}</p>
                <p><strong>Fecha:</strong> {c.fecha}</p>
                <span className="label">Cancelada</span>
              </div>
            ))
          }

          <h2>Citas Completadas</h2>
          {completadas.length === 0 ? <p>No hay citas completadas</p> :
            completadas.map(c => (
              <div key={c.id} className="cita-card compact completed">
                <p><strong>Médico:</strong> {c.medico.nombreCompleto}</p>
                <p><strong>Especialidad:</strong> {c.medico.especialidad}</p>
                <p><strong>Comentarios:</strong> {c.comentarios}</p>
                <embed src={c.recetaURL} type="application/pdf" className="pdf-mini" />
                <a href={c.recetaURL} download className="download-btn">Descargar receta</a>
              </div>
            ))
          }
        </div>
      </div>

      {/* MODAL AGENDAR */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-large">
            <button className="close-btn" onClick={() => setModalOpen(false)}>✕</button>
            <h2>Agendar Cita</h2>

            <div className="modal-content">
              <div className="medicos-list">
                {medicosData.map(m => (
                  <button
                    key={m.idMedico}
                    className={`medico-btn ${selectedMedico?.idMedico === m.idMedico ? "active" : ""}`}
                    onClick={() => setSelectedMedico(m)}
                  >
                    <strong>{m.nombreCompleto}</strong><br />
                    <span>{m.especialidad}</span>
                  </button>
                ))}
              </div>

              <div className="cita-detalle">
                {selectedMedico && (
                  <>
                    <input disabled value={session.name} />
                    <input type="datetime-local" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
                    <button className="primary-btn" onClick={agendarCita}>Confirmar cita</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .patient-home { background:#e5e7eb; min-height:100vh; padding:20px; font-family:Segoe UI,sans-serif; }
        .top-bar { background:#fff; padding:20px; border-radius:14px; display:flex; justify-content:space-between; align-items:center; box-shadow:0 8px 20px rgba(0,0,0,0.08); }
        .badge { background:#2563eb; color:#fff; padding:5px 14px; border-radius:20px; font-weight:bold; }
        .top-actions { display:flex; gap:10px; }
        .primary-btn { background:#2563eb; color:#fff; border:none; padding:10px 14px; border-radius:10px; cursor:pointer; }
        .logout-btn { background:#ef4444; color:#fff; border:none; padding:10px 14px; border-radius:10px; cursor:pointer; }
        .citas-section { max-width:900px; margin:30px auto; }
        .cita-card { background:#fff; padding:14px; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.06); margin-bottom:10px; }
        .compact { font-size:0.95rem; }
        .danger-btn { background:#ef4444; color:#fff; border:none; padding:6px 10px; border-radius:8px; margin-top:6px; }
        .completed { border-left:5px solid #22c55e; }
        .canceled { border-left:5px solid #ef4444; }
        .pdf-mini { width:100%; height:160px; margin-top:8px; border-radius:8px; }
        .download-btn { display:inline-block; margin-top:6px; background:#10b981; color:#fff; padding:6px 10px; border-radius:8px; text-decoration:none; }
        .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); display:flex; justify-content:center; align-items:center; }
        .modal-large { background:#fff; padding:2rem; width:80%; max-width:1000px; border-radius:16px; }
        .medico-btn { width:100%; padding:10px; border-radius:8px; border:1px solid #ccc; margin-bottom:6px; cursor:pointer; }
        .medico-btn:hover, .medico-btn.active { background:#2563eb; color:#fff; }
      `}</style>
    </>
  );
}

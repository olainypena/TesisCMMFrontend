import { useEffect, useState } from "react";

const API_URL = "https://localhost:54786/api/Medicos";

export default function AgendarCitaPaciente() {
  const [medicos, setMedicos] = useState([]);
  const [medico, setMedico] = useState(null);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setMedicos(data))
      .catch(() => alert("Error cargando médicos"));
  }, []);

  // Convierte "Lunes-Viernes|08:00-14:00" en horas
  const generarHoras = (horario) => {
    if (!horario) return [];
    const [, rango] = horario.split("|");
    const [inicio, fin] = rango.split("-");
    let horas = [];

    let hi = parseInt(inicio.split(":")[0]);
    let hf = parseInt(fin.split(":")[0]);

    for (let h = hi; h < hf; h++) {
      horas.push(`${h.toString().padStart(2, "0")}:00`);
      horas.push(`${h.toString().padStart(2, "0")}:30`);
    }
    return horas;
  };

  const confirmarCita = () => {
    if (!fecha || !hora) {
      alert("Debe seleccionar fecha y hora");
      return;
    }

    alert(`
CITA AGENDADA (SIMULADA)

👨‍⚕️ Médico: ${medico.nombreCompleto}
🩺 Especialidad: ${medico.especialidad}
📅 Fecha: ${fecha}
⏰ Hora: ${hora}
    `);

    setMedico(null);
    setFecha("");
    setHora("");
  };

  return (
    <>
      <style>{`
        body {
          background: #f1f5f9;
        }

        .container {
          max-width: 1000px;
          margin: auto;
          padding: 30px;
          font-family: system-ui, sans-serif;
        }

        h1 {
          color: #0a4db8;
          margin-bottom: 10px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .card {
          background: white;
          padding: 20px;
          border-radius: 18px;
          box-shadow: 0 20px 40px rgba(0,0,0,.08);
        }

        .card h3 {
          margin: 0;
          color: #1e293b;
        }

        .badge {
          display: inline-block;
          background: #e0edff;
          color: #0a4db8;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-top: 8px;
        }

        button {
          background: #0a4db8;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 15px;
        }

        button:hover {
          background: #083a8f;
        }

        .form {
          margin-top: 30px;
          background: white;
          padding: 25px;
          border-radius: 18px;
          box-shadow: 0 20px 40px rgba(0,0,0,.08);
        }

        label {
          font-size: 14px;
          color: #475569;
          font-weight: 600;
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin-top: 6px;
          border-radius: 10px;
          border: 1px solid #cbd5f5;
        }

        .confirm {
          background: #16a34a;
        }
      `}</style>

      <div className="container">
        <h1>Agendar Cita Médica</h1>
        <p>Seleccione un médico para agendar su cita</p>

        <div className="grid">
          {medicos.map(m => (
            <div className="card" key={m.idMedico}>
              <h3>{m.nombreCompleto}</h3>
              <div className="badge">{m.especialidad}</div>
              <p>🕒 {m.horario}</p>
              <button onClick={() => setMedico(m)}>
                Seleccionar
              </button>
            </div>
          ))}
        </div>

        {medico && (
          <div className="form">
            <h3>Agendar con {medico.nombreCompleto}</h3>

            <label>Fecha de la cita</label>
            <input
              type="date"
              value={fecha}
              onChange={e => setFecha(e.target.value)}
            />

            <br /><br />

            <label>Hora disponible</label>
            <select value={hora} onChange={e => setHora(e.target.value)}>
              <option value="">Seleccione una hora</option>
              {generarHoras(medico.horario).map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>

            <button className="confirm" onClick={confirmarCita}>
              Confirmar cita
            </button>
          </div>
        )}
      </div>
    </>
  );
}

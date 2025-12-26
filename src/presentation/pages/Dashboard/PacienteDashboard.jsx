import { useEffect, useState } from "react";

const API_URL = "https://localhost:54786/api/Pacientes";

export default function PacienteDashboard() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error al conectar con el backend");
        return res.json();
      })
      .then((data) => {
        setPersonas(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <style>{`
        .dashboard {
          background: #f1f5f9;
          min-height: 100vh;
          padding: 30px;
          font-family: system-ui, sans-serif;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .dashboard-header h1 {
          font-size: 26px;
          color: #0a4db8;
        }

        .dashboard-header p {
          color: #64748b;
          font-size: 14px;
        }

        .total-badge {
          background: #e0edff;
          color: #0a4db8;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
        }

        .card {
          background: white;
          border-radius: 18px;
          box-shadow: 0 20px 40px rgba(0,0,0,.08);
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #f8fafc;
        }

        th {
          text-align: left;
          padding: 14px;
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
        }

        td {
          padding: 14px;
          border-top: 1px solid #e5e7eb;
          font-size: 14px;
        }

        tr:hover {
          background: #f0f7ff;
        }

        .name {
          font-weight: 600;
          color: #1e293b;
        }

        .sub {
          font-size: 12px;
          color: #64748b;
        }

        .state {
          padding: 60px;
          text-align: center;
          font-weight: 500;
          color: #475569;
        }

        .error {
          color: #dc2626;
        }
      `}</style>

      <section className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Pacientes</h1>
            <p>Listado clínico general de pacientes registrados</p>
          </div>
          <div className="total-badge">
            Total: {personas.length}
          </div>
        </div>

        <div className="card">
          {loading && <div className="state">Cargando pacientes...</div>}
          {error && <div className="state error">{error}</div>}

          {!loading && !error && personas.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Paciente</th>
                  <th>Documento</th>
                  <th>Teléfono</th>
                  <th>Celular</th>
                  <th>Email</th>
                  <th>Dirección</th>
                </tr>
              </thead>
              <tbody>
                {personas.map((p) => (
                  <tr key={p.idPersona}>
                    <td>#{p.idPersona}</td>
                    <td>
                      <div className="name">
                        {p.nombres} {p.apellidos}
                      </div>
                      <div className="sub">Paciente activo</div>
                    </td>
                    <td>{p.numeroIdentificacion}</td>
                    <td>{p.telefono || "—"}</td>
                    <td>{p.celular || "—"}</td>
                    <td>{p.email}</td>
                    <td>{p.direccion || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}

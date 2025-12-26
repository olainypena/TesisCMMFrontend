export default function MedicoCard({ medico, onSelect }) {
  return (
    <div className="medico-card">
      <h3>{medico.nombre}</h3>

      <div className="especialidades">
        {medico.especialidades.map((e) => (
          <span key={e} className="badge">
            {e}
          </span>
        ))}
      </div>

      <button onClick={() => onSelect(medico)}>
        Ver disponibilidad
      </button>
    </div>
  );
}

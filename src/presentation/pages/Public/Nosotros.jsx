export default function Nosotros() {
  return (
    <section style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '50px 20px',
      backgroundColor: '#f5faff',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '1200px',
        width: '100%',
        gap: '40px',
        alignItems: 'center',
        flexWrap: 'wrap' // permite que se adapte a pantallas pequeñas
      }}>
        <div style={{
          flex: '1 1 400px',
          textAlign: 'center'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center" 
            alt="Centro Médico Moderno"
            style={{
              width: '100%',
              borderRadius: '15px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div style={{
          flex: '1 1 400px'
        }}>
          <h2 style={{ fontSize: '2.2rem', color: '#0077b6', marginBottom: '10px' }}>
            Bienvenido a Centro Médico Moderno
          </h2>
          <h3 style={{ fontSize: '1.5rem', color: '#023e8a', marginBottom: '20px' }}>
            Un Buen Lugar Para Recibir Atención
          </h3>
          <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#333' }}>
            El Centro Médico Moderno abrió sus puertas al público el 7 de julio del 2007
            con el propósito de ofrecer un servicio de calidad en el sector salud. Cuenta
            con un gran equipo de profesionales de las distintas especialidades médicas
            comprometidos con brindar las mejores atenciones a sus usuarios y a los
            residentes de la zona.
          </p>
        </div>
      </div>
    </section>
  );
}

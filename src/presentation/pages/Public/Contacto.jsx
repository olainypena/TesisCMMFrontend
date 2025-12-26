import { useState } from "react";
import emailjs from "emailjs-com";
import { Phone, Mail } from "lucide-react";

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Por favor, complete todos los campos");
      return;
    }

    emailjs
      .send( "service_rxosb4e", // Service ID
       "template_wleqxhp", // Template ID
        { from_name: formData.name,
             email: formData.email, 
             to_email: formData.email, 
             reply_to: formData.email, 
             message: formData.message,
            }, 
             "Pk4wBdIHNkrSKw7P1" // Public Key 
             )
      .then(() => {
        alert("Mensaje enviado correctamente. Gracias por contactarnos.");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        alert("Hubo un error al enviar el mensaje. Inténtelo nuevamente.");
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="contact-container">

        {/* INFORMACIÓN */}
        <div className="contact-info">
          <h2>Solicita Información</h2>
          <p>
            ¿Tienes preguntas o necesitas asistencia médica?
            Escríbenos y con gusto te ayudamos.
          </p>

          <div className="contact-item">
            <Mail size={20} />
            <span>servicios@cmmsalud.com</span>
          </div>

          <div className="contact-item">
            <Phone size={20} />
            <span>809-548-3131</span>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="contact-form">
          <h3>Enviar mensaje</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Mensaje"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Enviar mensaje</button>
          </form>
        </div>

      </div>
   {/* MAPA */}
      <div className="map-container">
        <iframe
          title="Ubicación CMMSalud"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5515616329444!2d-69.931212!3d18.483402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea5620eaa4b9c57%3A0x5b77cbb5e32f4c6!2sSanto%20Domingo!5e0!3m2!1ses!2sdo!4v1710000000000"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
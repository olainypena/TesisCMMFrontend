import { useState } from "react";

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    documentId: "",
    idTipoIdentificacion: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Obtener usuarios existentes
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Validar email único
    const exists = users.find((u) => u.email === formData.email);
    if (exists) {
      alert("Este correo ya está registrado");
      return;
    }

    const newUser = {
      id: Date.now(),
      role: "PACIENTE",
      firstName: formData.firstName,
      lastName: formData.lastName,
      documentId: formData.documentId,
      email: formData.email,
      phone: formData.phone,
      mobile: formData.mobile,
      password: formData.password,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Cuenta creada exitosamente");

    onClose();
    onSwitchToLogin();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2>Crear Cuenta</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <input name="firstName" placeholder="Nombres" onChange={handleChange} required />
          <input name="lastName" placeholder="Apellidos" onChange={handleChange} required />

          <input name="documentId" placeholder="Número de Identificación" onChange={handleChange} required />

          <select name="idTipoIdentificacion" onChange={handleChange} required>
            <option value="">Tipo Identificación</option>
            <option value="1">Cédula</option>
            <option value="2">Pasaporte</option>
          </select>

          <input type="date" name="dateOfBirth" onChange={handleChange} required />

          <input name="phone" placeholder="Teléfono" onChange={handleChange} />
          <input name="mobile" placeholder="Celular" onChange={handleChange} />

          <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />

          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" onChange={handleChange} required />

          <button type="submit" className="register">
            Crear Cuenta
          </button>

          <p className="switch">
            ¿Ya tienes cuenta?
            <button type="button" onClick={onSwitchToLogin}>
              Inicia sesión
            </button>
          </p>

          <button type="button" className="close" onClick={onClose}>
            ✖
          </button>
        </form>
      </div>
    </div>
  );
}

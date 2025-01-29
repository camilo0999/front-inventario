import React, { useState } from 'react';
import '../../styles/UserModal.css'; // Estilos para el modal
import { CreateUser } from '../../service/UserService';

const UserModal = ({ isOpen, onClose }) => {
  // Estados para manejar los valores del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [direction, setDirection] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construir el JSON en el formato requerido
    const userData = {
      name: name,
      email: email,
      address: direction, // Asegúrate de que el campo se llame "address" en el JSON
      phone: phone,
      role: role,
      ...(role === 'admin' && { password: password }), // Incluir contraseña solo si es administrador
    };

    try {
      // Enviar los datos a la API usando el servicio CreateUser
      const response = await CreateUser(userData);
      console.log('Usuario creado:', response.data);

      // Actualizar el mensaje de éxito
      setSuccessMessage('¡Usuario creado exitosamente!');

      // Limpiar el mensaje de éxito después de unos segundos
      setTimeout(() => {
        setSuccessMessage('');
        // Cerrar el modal después de enviar
        onClose();
      }, 3000);

      // Limpiar el formulario
      setName('');
      setEmail('');
      setDirection('');
      setPhone('');
      setRole('user');
      setPassword('');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose} aria-label="Cerrar modal">
          &times;
        </button>
        <h2>Registrar nuevo usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="direction">Dirección:</label>
            <input
              type="text"
              id="direction"
              name="direction"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Teléfono:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="role">Rol</label>
            <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Administrador</option>
              <option value="user">Cliente</option>
            </select>
          </div>
          {role === 'admin' && (
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" className="modal-submit-button">
            Registrar Cliente
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default UserModal;

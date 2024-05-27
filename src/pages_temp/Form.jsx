import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // Importar el archivo CSS

function Form() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    numeroContacto: '',
    identificacionFiscal: '',
    tipoIdentificacion: 'cedula',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Inicializar useNavigate para manejar la navegación

  // Recuperar datos del formulario desde localStorage al montar el componente
  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem('formData'));
    if (savedForm) {
      setForm(savedForm);
    }
  }, []);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Función para validar el formulario
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!form.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.email) newErrors.email = 'El email es obligatorio';
    else if (!emailRegex.test(form.email)) newErrors.email = 'El email no es válido';

    if (!form.numeroContacto) newErrors.numeroContacto = 'El número de contacto es obligatorio';
    else if (!phoneRegex.test(form.numeroContacto)) newErrors.numeroContacto = 'El número de contacto no es válido';

    if (!form.identificacionFiscal) newErrors.identificacionFiscal = 'La identificación fiscal es obligatoria';
    
    return newErrors;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      console.log('Formulario enviado:', form);
      // Almacenar los datos del formulario en localStorage
      localStorage.setItem('formData', JSON.stringify(form));
      // Aquí puedes enviar los datos a un servidor o realizar otras acciones
      navigate('/formulariodos'); // Redirige a FormTwo
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Datos del cliente</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del cliente:</label>
          <input 
            type="text" 
            name="nombre" 
            value={form.nombre} 
            onChange={handleChange} 
            placeholder="Ingrese un nombre" 
            className={errors.nombre ? 'input-error' : ''}
          />
          {errors.nombre && <span className="error">{errors.nombre}</span>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            placeholder="Ingrese correo" 
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Número de contacto:</label>
          <input 
            type="text" 
            name="numeroContacto" 
            value={form.numeroContacto} 
            onChange={handleChange} 
            placeholder="Ingrese un número" 
            className={errors.numeroContacto ? 'input-error' : ''}
          />
          {errors.numeroContacto && <span className="error">{errors.numeroContacto}</span>}
        </div>
        <div className="form-group">
          <label>Identificación fiscal:</label>
          <input 
            type="text" 
            name="identificacionFiscal" 
            value={form.identificacionFiscal} 
            onChange={handleChange} 
            placeholder="Ingrese identificación" 
            className={errors.identificacionFiscal ? 'input-error' : ''}
          />
          {errors.identificacionFiscal && <span className="error">{errors.identificacionFiscal}</span>}
        </div>
        <div className="form-group">
          <label>Tipo de identificación:</label>
          <select 
            name="tipoIdentificacion" 
            value={form.tipoIdentificacion} 
            onChange={handleChange}
          >
            <option value="cedula">Cédula</option>
            <option value="ruc">RUC</option>
            <option value="pasaporte">Pasaporte</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Siguiente</button>
      </form>
    </div>
  );
}

export default Form;

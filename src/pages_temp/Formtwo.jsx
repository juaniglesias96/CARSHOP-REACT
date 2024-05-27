import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // Importar el archivo CSS

function VehicleForm() {
  const [form, setForm] = useState({
    marca: '',
    modelo: '',
    placa: '',
    nivelGasolina: '',
    detalles: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Recuperar datos del formulario desde localStorage al montar el componente
  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem('vehicleFormData'));
    if (savedForm) {
      setForm(savedForm);
    }
  }, []);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const updatedForm = {
        ...prevForm,
        [name]: value,
      };
      // Almacenar los datos del formulario en localStorage
      localStorage.setItem('vehicleFormData', JSON.stringify(updatedForm));
      return updatedForm;
    });
  };

  // Función para validar el formulario
  const validate = () => {
    const newErrors = {};
    if (!form.marca) newErrors.marca = 'La marca es obligatoria';
    if (!form.modelo) newErrors.modelo = 'El modelo es obligatorio';
    if (!form.placa) newErrors.placa = 'La placa es obligatoria';
    if (!form.nivelGasolina) newErrors.nivelGasolina = 'El nivel de gasolina es obligatorio';
    return newErrors;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      console.log('Formulario de vehículo enviado:', form);
      // Aquí puedes enviar los datos a un servidor o realizar otras acciones
      navigate('/tienda'); // Redirige a la página deseada después de enviar el formulario
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="form-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>🡰</button>
        <h1 className="form-title">Datos del Vehículo</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Marca:</label>
          <input type="text" name="marca" value={form.marca} onChange={handleChange} placeholder="Ingrese la marca" />
          {errors.marca && <span className="error">{errors.marca}</span>}
        </div>
        <div className="form-group">
          <label>Modelo:</label>
          <input type="text" name="modelo" value={form.modelo} onChange={handleChange} placeholder="Ingrese el modelo" />
          {errors.modelo && <span className="error">{errors.modelo}</span>}
        </div>
        <div className="form-group">
          <label>Placa:</label>
          <input type="text" name="placa" value={form.placa} onChange={handleChange} placeholder="Ingrese la placa" />
          {errors.placa && <span className="error">{errors.placa}</span>}
        </div>
        <div className="form-group">
          <label>Nivel del tanque de gasolina:</label>
          <input type="text" name="nivelGasolina" value={form.nivelGasolina} onChange={handleChange} placeholder="Ingrese el nivel de gasolina" />
          {errors.nivelGasolina && <span className="error">{errors.nivelGasolina}</span>}
        </div>
        <div className="form-group">
          <label>Detalles del estado exterior:</label>
          <textarea name="detalles" value={form.detalles} onChange={handleChange} placeholder="Ingrese detalles del estado exterior"></textarea>
        </div>
        <button type="submit" className="submit-button">Siguiente</button>
      </form>
    </div>
  );
}

export default VehicleForm;

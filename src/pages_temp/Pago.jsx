import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // Importar el archivo CSS

const Pago = () => {
  const [formOneData, setFormOneData] = useState({});
  const [formTwoData, setFormTwoData] = useState({});
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedFormOneData = JSON.parse(localStorage.getItem('formData'));
    const savedFormTwoData = JSON.parse(localStorage.getItem('vehicleFormData'));
    const savedCartData = JSON.parse(localStorage.getItem('allProducts'));
    const savedTotal = JSON.parse(localStorage.getItem('total'));

    if (savedFormOneData) {
      setFormOneData(savedFormOneData);
    } else {
      navigate('/'); // Redirige al primer formulario si no hay datos
    }

    if (savedFormTwoData) {
      setFormTwoData(savedFormTwoData);
    } else {
      navigate('/formtwo'); // Redirige al segundo formulario si no hay datos
    }

    if (savedCartData) {
      setCartData(savedCartData);
    }

    if (savedTotal) {
      setTotal(savedTotal);
    }

    // Calcular el tiempo de entrega
    const currentTime = new Date();
    const deliveryTime = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);
    const formattedCurrentTime = currentTime.toLocaleTimeString([], { day:'2-digit',month:'2-digit',year:'2-digit', hour: '2-digit', minute: '2-digit' });
    const formattedDeliveryTime = deliveryTime.toLocaleTimeString([], { day:'2-digit',month:'2-digit',year:'2-digit', hour: '2-digit', minute: '2-digit' });
    setDeliveryTime(`${formattedCurrentTime} - ${formattedDeliveryTime}`);
  }, [navigate]);

  const handlePay = () => {
    // Regresa a la primera página si se hace clic en "Pagar"
    navigate('/');
  };

  const handleGoBack = () => {
    // Navega a la tercera página si se hace clic en "Regresar"
    navigate('/tienda');
  };

  return (
    <div className="pago-container">
      <h1 className="pago-title">Orden de trabajo</h1>
      <div className="pago-summary">
        <p><strong>Nombre del cliente:</strong> {formOneData.nombre}</p>
        <p><strong>Email:</strong> {formOneData.email}</p>
        <p><strong>Número de contacto:</strong> {formOneData.numeroContacto}</p>
        <p><strong>Identificación fiscal:</strong> {formOneData.identificacionFiscal}</p>
        <p><strong>Tipo de identificación:</strong> {formOneData.tipoIdentificacion}</p>
      </div>
      <div className="pago-summary">
        <p><strong>Marca:</strong> {formTwoData.marca}</p>
        <p><strong>Modelo:</strong> {formTwoData.modelo}</p>
        <p><strong>Placa:</strong> {formTwoData.placa}</p>
        <p><strong>Nivel de gasolina:</strong> {formTwoData.nivelGasolina}</p>
        <p><strong>Detalles:</strong> {formTwoData.detalles}</p>
      </div>
      <div className="pago-summary">
        <h2>Resumen del Carrito</h2>
        {cartData.length ? (
          <div>
            {cartData.map((product) => (
              <div key={product.id}>
                <p><strong>{product.nameProduct}</strong> - {product.quantity} x ${product.price}</p>
              </div>
            ))}
            <h3>Total a Pagar: ${total}</h3>
          </div>
        ) : (
          <p>El carrito está vacío</p>
        )}
      </div>
      <div className="pago-summary">
        <h2>Tiempo de Entrega Estimado</h2>
        <p>{deliveryTime}</p>
      </div>
      <button type="button" className="submit-button" onClick={handleGoBack}>Regresar</button>
      <button type="button" className="submit-button" onClick={handlePay}>Pagar</button>
    </div>
  );
};

export default Pago;


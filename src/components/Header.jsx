import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const Header = ({ allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts }) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  // Cargar datos del carrito desde localStorage al montar el componente
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
    const savedTotal = JSON.parse(localStorage.getItem('total')) || 0;
    const savedCountProducts = JSON.parse(localStorage.getItem('countProducts')) || 0;

    setAllProducts(savedProducts);
    setTotal(savedTotal);
    setCountProducts(savedCountProducts);
  }, [setAllProducts, setTotal, setCountProducts]);

  // Guardar datos del carrito en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
    localStorage.setItem('total', JSON.stringify(total));
    localStorage.setItem('countProducts', JSON.stringify(countProducts));
  }, [allProducts, total, countProducts]);

  const onDeleteProduct = (product) => {
    const results = allProducts.filter((item) => item.id !== product.id);

    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };

  const OnCleanCart = () => {
    setAllProducts([]);
    setTotal(0); // Set total to 0
    setCountProducts(0);
  };

  return (
    <header>
      <button className="back-button" onClick={() => navigate(-1)}>🡰</button>

      <div className="container-icon">
        <div className="container-cart-icon" onClick={() => setActive(!active)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon-cart"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <div className="count-products">
            <span id="contador-productos">{countProducts}</span>
          </div>
        </div>

        <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
          {allProducts.length ? (
            <>
              <div className="row-product">
                {allProducts.map((product) => (
                  <div className="cart-product" key={product.id}>
                    <div className="info-cart-product">
                      <span className="cantidad-producto-carrito">{product.quantity}</span>
                      <p className="titulo-producto-carrito">{product.nameProduct}</p>
                      <p className="precio-producto-carrito">${product.price}</p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <h3>Total:</h3>
                <span className="total-pagar">${total}</span>
              </div>
              <button className="btn-pay-all" onClick={() => navigate('/pago')}>Comprar</button>
              <button className="btn-clear-all" onClick={OnCleanCart}>Vaciar el carrito</button>
            </>
          ) : (
            <p className="cart-empty">El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
  );
};

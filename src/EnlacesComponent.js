import React, { useState } from 'react';
import './EnlacesComponent.css'; // Importa el archivo CSS

const EnlacesComponent = () => {
  const [placa, setPlaca] = useState('');
  const [enlacesInput, setEnlacesInput] = useState('');
  const [enlaceAdicional, setEnlaceAdicional] = useState('');
  const [enlaces, setEnlaces] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [isVisualized, setIsVisualized] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    const enlacesDivididos = enlacesInput.split(',').map(enlace => enlace.trim());
    setEnlaces(enlacesDivididos);
    if (enlaceAdicional) {
      setEnlaces(prevEnlaces => [...prevEnlaces, enlaceAdicional.trim()]);
      setEnlaceAdicional('');
    }
    setIsAdded(true);
  };

  const visualizarContenidoEnlaces = () => {
    enlaces.forEach(enlace => {
      window.open(enlace, '_blank');
    });
    setIsVisualized(true);
  };

  const limpiarCampos = () => {
    setPlaca('');
    setEnlacesInput('');
    setEnlaceAdicional('');
    setEnlaces([]);
    setIsAdded(false);
    setIsVisualized(false);
  };

  return (
    <div className="container">
      <h1>Agregar Placa y Enlaces</h1>
      <form onSubmit={manejarEnvio}>
        <div>
          <label>
            Placa:
            <input
              type="text"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Perfil:
            <input
              type="text"
              value={enlaceAdicional}
              onChange={(e) => setEnlaceAdicional(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Enlaces (separados por comas):
            <input
              type="text"
              value={enlacesInput}
              onChange={(e) => setEnlacesInput(e.target.value)}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: isAdded ? '#4CAF50' : '#f44336',
            color: 'white',
          }}
        >
          {isAdded ? 'Agregado' : 'Agregar'}
        </button>
      </form>

      {placa && <h2>Placa: {placa}</h2>}
      {enlaces.length > 0 && (
        <>
          <h3>Enlaces:</h3>
          <ul>
            {enlaces.map((enlace, index) => (
              <li key={index}>
                <a href={enlace} target="_blank" rel="noopener noreferrer">{enlace}</a>
              </li>
            ))}
          </ul>
          <button
            onClick={visualizarContenidoEnlaces}
            style={{
              backgroundColor: isVisualized ? '#4CAF50' : '#f44336',
              color: 'white',
            }}
          >
            {isVisualized ? 'Visualizado' : 'Visualizar contenido de enlaces'}
          </button>
        </>
      )}
      <button onClick={limpiarCampos} className="limpiar" style={{ marginTop: '20px', marginLeft: '10px', backgroundColor: '#e78603', color: 'white' }}>
        Limpiar
      </button>
    </div>
  );
};

export default EnlacesComponent;
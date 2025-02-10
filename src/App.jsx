import './App.css';
import { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import Modal from 'react-modal';
import arrowImage from './assets/rayo-gatorade.png';

const initialData = {
  bogota: [
    { option: '1' },
    { option: '2' },
    { option: '3' },
    { option: '4' },
    { option: '5' },
    { option: '6' },
    { option: '7' },
    { option: '8' },
  ],
  itagui: [
    { option: '1' },
    { option: '2' },
    { option: '3' },
    { option: '4' },
  ],
  bello: [
    { option: '1' },
    { option: '2' },
    { option: '3' },
    { option: '4' },
  ],
  barranquilla: [
    { option: '1' },
    { option: '2' },
    { option: '3' },
    { option: '4' },
  ],
};

const cityNames = {
  bogota: 'Bogotá',
  itagui: 'Itagüí',
  bello: 'Bello',
  barranquilla: 'Barranquilla',
};

Modal.setAppElement('#root');

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedCity, setSelectedCity] = useState('bogota');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(initialData[selectedCity]);

  useEffect(() => {
    setData(initialData[selectedCity]);
  }, [selectedCity]);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="roulette-container">
        <div className="city-selector">
          <label htmlFor="city">Selecciona una ciudad: </label>
          <select
            id="city"
            className='city-select-input'
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {Object.keys(initialData).map((city) => (
              <option key={city} value={city}>
                {cityNames[city]}
              </option>
            ))}
          </select>
        </div>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={['#FFF', '#FF6B00']}
          onStopSpinning={handleStopSpinning}
          pointerProps={{ src: arrowImage, alt: 'custom-arrow', style: { width: '25%' } }}
        />
        <button onClick={handleSpinClick} disabled={mustSpin}>
          Girar la Ruleta
        </button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Número Generado"
          className="modal"
          overlayClassName="overlay"
        >
          <h2 className='modal-h2'>Número Generado</h2>
          <p className='modal-number'>{data[prizeNumber].option}</p>
          <button onClick={closeModal}>Cerrar</button>
        </Modal>
      </div>
    </>
  );
}

export default App;
import './App.css';
import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import Modal from 'react-modal';
import arrowImage from './assets/rayo-gatorade.png';

const data = [
  { option: '' },
  { option: '' },
  { option: '' },
  { option: '' },
  { option: '' },
  { option: '' },
  { option: '' },
  { option: '' },
  { option: '' },
  { option: '' },
];

const cityRanges = {
  bogota: 870,
  itagui: 175,
  bello: 255,
  barranquilla: 195,
};

const cityNames = {
  bogota: 'Bogotá',
  itagui: 'Itagüí',
  bello: 'Bello',
  barranquilla: 'Barranquilla',
};

Modal.setAppElement('#root'); // Asegúrate de que el modal se monte en el elemento correcto

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [randomNumber, setRandomNumber] = useState(null);
  const [selectedCity, setSelectedCity] = useState('bogota');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    const maxNumber = cityRanges[selectedCity];
    const generatedNumber = Math.floor(Math.random() * maxNumber) + 1;
    setRandomNumber(generatedNumber);
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
            {Object.keys(cityRanges).map((city) => (
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
          <p className='modal-number'>{randomNumber}</p>
          <button onClick={closeModal}>Cerrar</button>
        </Modal>
      </div>
    </>
  );
}

export default App;
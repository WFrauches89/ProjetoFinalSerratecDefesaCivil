import { useEffect, useState } from 'react';
import './styles.css';
import { GlobalStyle } from '../GlobalStyle';

export default function TamanhoFont() {
  const [fontSize, setFontSize] = useState(
    localStorage.getItem('fonteSize')
      ? parseInt(localStorage.getItem('fonteSize'), 10)
      : 21,
  );

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fonteSize', fontSize);
  }, [fontSize]);

  const aumentarFont = () => {
    if (fontSize < 25) {
      setFontSize((prevSize) => prevSize + 1);
    }
  };

  const diminuirFont = () => {
    if (fontSize > 18) {
      setFontSize((prevSize) => prevSize - 1);
    }
  };

  return (
    <div id="containerTamanhoFont">
      <div id="tamanhoFontBox">
        <button className="botao-diminuir" onClick={diminuirFont}>
          -
        </button>
        <div id="tamanho">{fontSize} </div>
        <button className="botao-aumentar" onClick={aumentarFont}>
          +
        </button>
      </div>
      <p style={{ fontSize: '1.2rem' }}>AJUSTE DE FONTE</p>
      <GlobalStyle fontSize={fontSize} />
    </div>
  );
}

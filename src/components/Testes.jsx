import React, { useState } from 'react';

function ComponenteADuplicar({num}) {
  return (
    <div>
      {/* Seu componente aqui */}
      <p>Componente {num}</p>
    </div>
  );
}

function Testes() {
  const [contador, setContador] = useState(1); // Inicialmente, temos uma instância do componente

  const duplicarComponente = () => {
    setContador(contador + 1); // Aumenta o contador toda vez que o botão é clicado
  };

  return (
    <div>
      <h1>Exemplo de duplicação de componente</h1>
      <button onClick={duplicarComponente}>Duplicar Componente</button>
      {/* Use um loop para renderizar múltiplas instâncias do componente */}
      {Array.from({ length: contador }, (_, index) => (
        <ComponenteADuplicar key={index} num={index} />
      ))}
    </div>
  );
}

export default Testes;

import { React, useState, useEffect } from 'react';
import './App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import * as metamask from '../../utils/metamask';
import ConexaoMetamask from '../ConexaoMetamask/ConexaoMetamask';

function App() {
  const [conectadoAoMetamask, setConectadoAoMetamask] = useState(true);

  useEffect(() => {
    async function verificaConexaoMetamask() {
      await metamask.verificaConexao().then((resposta) => {
        setConectadoAoMetamask(resposta);
      });
    }
    
    verificaConexaoMetamask();
  }, []);

  return (
    <>
      <div className="container text-center principal">
        <div className="row">
          <div className="col">
            <h1 className="titulo">Forca D-App <FontAwesomeIcon icon={faSkullCrossbones} /></h1>
            {!conectadoAoMetamask && <ConexaoMetamask setConectadoAoMetamask={setConectadoAoMetamask}/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
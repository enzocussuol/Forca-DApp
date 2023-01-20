import { React, useState, useEffect } from 'react';
import './App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import * as metamask from '../../utils/metamask';
import ConexaoMetamask from '../ConexaoMetamask/ConexaoMetamask';
import Forca from './../Forca/Forca';
import Loading from '../Loading/Loading';

function App() {
  const [conectadoAoMetamask, setConectadoAoMetamask] = useState(null);

  /**
   * Verifica se o usuário está conectado ao MetaMask a cada 1 segundo.
   * 
   * Se não estiver, seta a variável conectadoAoMetamask como false, renderizando o componente ConexaoMetamask.
   * Se estiver, seta a variável conectadoAoMetamask como true, renderizando o componente Forca.
   * 
   * Ao estabelecer a conexão com o MetaMask, os contratos são carregados.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      async function verificaConexaoMetamask() {
        await metamask.verificaConexao().then((resposta) => {
          setConectadoAoMetamask(resposta);
        });
      }
      
      verificaConexaoMetamask();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container text-center principal">
        <div className="row">
          <div className="col">
            <h1 className="titulo">Forca D-App <FontAwesomeIcon icon={faSkullCrossbones} /></h1>
            {conectadoAoMetamask === null ? (
              <Loading />
            ) : (
              !conectadoAoMetamask ? (
                <ConexaoMetamask setConectadoAoMetamask={setConectadoAoMetamask}/>
              ) : (
                <Forca />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
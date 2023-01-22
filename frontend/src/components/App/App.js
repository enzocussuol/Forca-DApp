import { React, useState, useEffect } from 'react';
import './App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import * as metamask from '../../utils/metamask';
import Loading from '../Loading/Loading';
import ConexaoMetamask from '../ConexaoMetamask/ConexaoMetamask';
import CriacaoForca from '../CriacaoForca/CriacaoForca';
import ForcasDisponiveis from '../ForcasDisponiveis/ForcasDisponiveis';
import JogoAtivo from '../JogoAtivo/JogoAtivo';

function App() {
  const [conectadoAoMetamask, setConectadoAoMetamask] = useState(null);
  const [jogoAtivo, setJogoAtivo] = useState(null);
  
  /**
   * Refresh principal da aplicação realizado a cada segundo.
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
                <div className="container text-center">
                  <div className="row">
                    <div className="col">
                      <CriacaoForca />
                      <ForcasDisponiveis setJogoAtivo={setJogoAtivo}/>
                    </div>
                    <div className="col">
                      <JogoAtivo forca={jogoAtivo} />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
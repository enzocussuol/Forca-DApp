import { React, useState, useEffect } from 'react';
import './App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import * as metamask from '../../utils/metamask';
import Loading from '../Loading/Loading';
import ConexaoMetamask from '../ConexaoMetamask/ConexaoMetamask';
import CriacaoForca from '../CriacaoForca/CriacaoForca';
import ForcasDisponiveis from '../ForcasDisponiveis/ForcasDisponiveis';
import JogoAtivo from '../JogoAtivo/JogoAtivo';
import BoasVindas from '../BoasVindas/BoasVindas';
import Ranking from '../Ranking/Ranking';

function App() {
  const [conectadoAoMetamask, setConectadoAoMetamask] = useState(null);
  const [saldo, setSaldo] = useState(0);
  const [jogoAtivo, setJogoAtivo] = useState(null);
  
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

  useEffect(() => {
    async function inicializaSaldo() {
      try {
        let s = await metamask.contratoForcaCoin.balanceOf(metamask.conta.getAddress());
        s = (Number(s) / (10 ** 18)).toFixed(8).replace(/\.?0+$/,"");
        setSaldo(s);
      } catch(e) {
        alert("Erro ao inicializar o saldo: " + e.message);
      }
    }

    if (conectadoAoMetamask != null && conectadoAoMetamask) {
      inicializaSaldo();
    }
  }, [conectadoAoMetamask]);

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
                <ConexaoMetamask setConectadoAoMetamask={setConectadoAoMetamask} />
              ) : (
                <div className="container text-center">
                  <BoasVindas setSaldo={setSaldo}/>
                  <div className="row">
                    <div className="col">
                      <div className="caixaSaldo">
                        <h2>Saldo: {saldo} FCs<span className="iconeForcaCoin"><FontAwesomeIcon icon={faCoins} /></span></h2>
                      </div>
                      <CriacaoForca />
                      <ForcasDisponiveis setJogoAtivo={setJogoAtivo} />
                    </div>
                    <div className="col align-self-center">
                      <JogoAtivo forca={jogoAtivo} setForca={setJogoAtivo} />
                    </div>
                  </div>
                  <Ranking />
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
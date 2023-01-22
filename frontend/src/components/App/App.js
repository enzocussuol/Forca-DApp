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
import { Forca } from '../../objects/Forca';

function App() {
  const [conectadoAoMetamask, setConectadoAoMetamask] = useState(null);
  const [forcas, setForcas] = useState([]);

  /**
   * Refresh principal da aplicação realizado a cada segundo.
   * 
   * Assegura conexão com o MetaMask;
   * Assegura que os contratos estão carregados;
   * Atualiza lista de forcas disponíveis.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      async function verificaConexaoMetamask() {
        await metamask.verificaConexao().then((resposta) => {
          setConectadoAoMetamask(resposta);
        });

        try {
          await metamask.contratoFabricaForca.getForcas().then((forcasBuscadas) => {
            let forcasCorrigidas = [];
            let forca;

            for (let i = 0; i < forcasBuscadas.length; i++) {
              forca = new Forca(forcasBuscadas[i].id, 
                forcasBuscadas[i].tema, forcasBuscadas[i].palavraSecreta);
              forca.corrige(forcasBuscadas[i].dono, forcasBuscadas[i].status);

              forcasCorrigidas.push(forca);
            }

            setForcas(forcasCorrigidas);
          });
        } catch (e) {
          alert("Erro ao listar forcas: " + e.message);
        }
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
                    </div>
                    <div className="col">
                      <ForcasDisponiveis forcas={forcas}/>
                    </div>
                    <div className="col">
                      <JogoAtivo />
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
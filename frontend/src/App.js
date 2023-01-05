import { ethers } from 'ethers';
import { CONTRATO_FORCA_COIN_ENDERECO, CONTRATO_FORCA_COIN_ABI, CONTRATO_FABRICA_FORCA_ENDERECO, CONTRATO_FABRICA_FORCA_ABI } from './config';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'

function App() {
  let metamask;
  let contaMetamask;

  let contratoForcaCoin;
  let contratoFabricaForca;

  function conectaMetamaskEContratos() {
    metamask = new ethers.providers.Web3Provider(window.ethereum);
    metamask.send("eth_requestAccounts", []).then(() => {
      metamask.listAccounts().then((accounts) => {
        contaMetamask = metamask.getSigner(accounts[0]);

        contratoForcaCoin = new ethers.Contract(
          CONTRATO_FORCA_COIN_ENDERECO,
          CONTRATO_FORCA_COIN_ABI,
          contaMetamask
        );

        contratoFabricaForca = new ethers.Contract(
          CONTRATO_FABRICA_FORCA_ENDERECO,
          CONTRATO_FABRICA_FORCA_ABI,
          contaMetamask
        );
      });
    });
  }

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <h1>Forca D-App <FontAwesomeIcon icon={faSkullCrossbones} /></h1>
            <button onClick={conectaMetamaskEContratos}>Iniciar!</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
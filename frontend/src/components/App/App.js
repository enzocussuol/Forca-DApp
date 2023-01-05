import { React } from 'react';
import './App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import Config from '../../utils/config';
import ConexaoMetamaskEContatos from '../ConexaoMetamaskEContratos/ConexaoMetamaskEContratos';

function App() {
  return (
    <>
      <div className="container text-center principal">
        <div className="row">
          <div className="col">
            <h1 className="titulo">Forca D-App <FontAwesomeIcon icon={faSkullCrossbones} /></h1>
            {/* { (config.CONTA_METAMASK === undefined || config.CONTA_METAMASK === null) ? <ConexaoMetamaskEContatos /> : null } */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
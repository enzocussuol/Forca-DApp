import { React } from 'react';
import './ForcaDisponivel.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons'

export default function ForcaDisponivel({forca, setJogoAtivo}) {
    async function iniciaForca() {
        setJogoAtivo(forca);
    }

    return (
        <>
            <div className="caixaForcaDisponivel">
                <div>
                    Tema: {forca.tema}<br></br>
                    Dono: {forca.dono}
                </div>
                <div className="align-self-center">
                    <button type="button" className="btn btn-success" onClick={iniciaForca}><FontAwesomeIcon icon={faPlay} /></button>
                </div>
            </div>
        </>
    )
}
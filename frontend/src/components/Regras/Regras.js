import { React } from 'react';
import './Regras.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons'

export default function Regras() {
    return(
        <>
            <div className="row">
                <div className="cabecalhoRegras">
                    <h2 className="tituloRegras">Regras <FontAwesomeIcon icon={faScaleBalanced} /></h2>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">O custo de criação de uma forca é de 5 FCs</li>
                        <li className="list-group-item">A palavra secreta só pode conter letras sem acentos e espaços</li>
                        <li className="list-group-item">Todos os espaços da palavra secreta são transformados em hífens (-)</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
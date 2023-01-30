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
                        <li className="list-group-item">A palavra secreta só pode conter letras (sem acentos) e espaços</li>
                        <li className="list-group-item">Todos os espaços da palavra secreta são transformados em hífens (-)</li>
                        <li className="list-group-item">O custo para jogar uma forca também é de 5 FCs</li>
                        <li className="list-group-item">Se o jogador não acertar a palavra secreta, tanto as FCs dele quanto as do criador são perdidas</li>
                        <li className="list-group-item">
                            Se o jogador acertar a palavra secreta:
                                <ol>
                                    <li>O jogador recebe 10 FCs e o criador recebe seus 5 FCs de volta</li>
                                    <li>
                                        Para estimular palavras secretas interessantes (difíceis mas não impossíveis), o criador irá ganhar 1 FC a mais
                                        a cada erro do jogador. Ou seja, se o jogador acertou depois de 5 erros, o criador
                                        irá ganhar 5 + 5 = 10 FCs
                                    </li>
                                </ol>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
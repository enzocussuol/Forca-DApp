import { React } from 'react';
import './ForcaDisponivel.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import * as metamask from '../../utils/metamask';

export default function ForcaDisponivel({forca, forcas, setForcas, jogoAtivo, setJogoAtivo}) {
    async function iniciaForca() {
        if (jogoAtivo !== null) {
            alert("Antes de iniciar uma nova forca, termine o jogo que está em andamento.");
            return;
        }

        const jogador = await metamask.conta.getAddress();

        try {
            const transaction = await metamask.contratoFabricaJogo.iniciaForca(forca.id, jogador);
            transaction.wait();

            setJogoAtivo(forca);

            for (let i = 0; i < forcas.length; i++) {
                if (forcas[i].id === forca.id) {
                    forcas.splice(i, 1);
                    break;
                }
            }
            setForcas(forcas);
        } catch (e) {
            alert("Erro ao iniciar uma forca: " + e.message);
        }
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
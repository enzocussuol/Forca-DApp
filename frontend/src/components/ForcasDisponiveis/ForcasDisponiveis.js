import { React } from 'react';
import './ForcasDisponiveis.css'
import ForcaDisponivel from '../ForcaDisponivel/ForcaDisponivel';
import { Status } from '../../objects/Forca';

export default function ForcasDisponiveis({ forcas, jogoAtivo, setJogoAtivo }) {
    return (
        <>
            <div className="caixaCabecalho">
                <div>
                    <h2>Forcas disponíveis</h2>
                </div>
            </div>
            <div className="overflow-auto caixaForcasDisponiveis">
                {forcas.map(forca => {
                    if (forca.status === Status.ABERTA) {
                        return <ForcaDisponivel forca={forca} jogoAtivo={jogoAtivo} setJogoAtivo={setJogoAtivo} key={forca.id} />
                    }

                    return null;
                })}
            </div>
        </>
    )
}
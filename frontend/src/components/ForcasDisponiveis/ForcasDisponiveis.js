import { React } from 'react';
import './ForcasDisponiveis.css'
import ForcaDisponivel from '../ForcaDisponivel/ForcaDisponivel';
import { Status } from '../../objects/Forca';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

export default function ForcasDisponiveis({forcas}) {
    return (
        <>
            <div className="caixaCabecalho">
                <div>
                    <h2>Forcas disponíveis</h2>
                </div>
                <div>
                    <button type="button" className="btn btn-primary btnAtualizarForcas"><FontAwesomeIcon icon={faRotateRight} /></button>
                </div>
            </div>
            <div className="overflow-auto caixaForcasDisponiveis">
                {forcas.map(forca => {
                    if (forca.status === Status.ABERTA) {
                        return <ForcaDisponivel forca={forca} key={forca.id} />
                    }

                    return null;
                })}
            </div>
        </>
    )
}
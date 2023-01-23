import { React, useState, useEffect, useCallback } from 'react';
import './ForcasDisponiveis.css'
import ForcaDisponivel from '../ForcaDisponivel/ForcaDisponivel';
import { Status } from '../../objects/Forca';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { Forca } from '../../objects/Forca';
import * as metamask from '../../utils/metamask';

export default function ForcasDisponiveis({ setJogoAtivo }) {
    const [forcas, setForcas] = useState([]);

    const atualizaForcasDisponiveis = useCallback(async () => {
        try {
            await metamask.contratoFabricaJogo.getForcas().then((forcasBuscadas) => {
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
    }, []);

    useEffect(() => {
        atualizaForcasDisponiveis();
    }, [atualizaForcasDisponiveis])

    return (
        <>
            <div className="caixaCabecalho">
                <div>
                    <h2>Forcas disponíveis</h2>
                </div>
                <div>
                    <button type="button" className="btn btn-primary btnAtualizarForcas" onClick={atualizaForcasDisponiveis}><FontAwesomeIcon icon={faRotateRight} /></button>
                </div>
            </div>
            <div className="overflow-auto caixaForcasDisponiveis">
                {forcas.map(forca => {
                    if (forca.status === Status.ABERTA) {
                        return <ForcaDisponivel forca={forca} setJogoAtivo={setJogoAtivo} key={forca.id} />
                    }

                    return null;
                })}
            </div>
        </>
    )
}
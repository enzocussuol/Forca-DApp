import { React } from 'react'
import './Saldo.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import * as metamask from '../../utils/metamask';

export default function Saldo({ saldo, setSaldo }) {
    async function atualizaSaldo() {
        try {
            let s = await metamask.contratoFabricaJogo.balanceOf(metamask.conta.getAddress());
            s = (Number(s) / (10 ** 18)).toFixed(8).replace(/\.?0+$/,"");
            setSaldo(s);
        } catch(e) {
            alert("Erro ao atualizar o saldo: " + e.message);
        }
    }

    return (
        <>
            <div className="caixaSaldo">
                <h2>Saldo: {saldo} FCs<span className="iconeForcaCoin"><FontAwesomeIcon icon={faCoins} /></span></h2>
                <div className="align-self-center">
                    <button type="button" className="btn btn-primary" onClick={atualizaSaldo}><FontAwesomeIcon icon={faRotateRight} /></button>
                </div>
            </div>
        </>
    )
}
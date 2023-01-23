import { React } from 'react';
import './BoasVindas.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'
import * as metamask from '../../utils/metamask';

export default function BoasVindas({setSaldo}) {
    async function sacar() {
        try {
            const transaction = await metamask.contratoForcaCoin.saqueInicial();
            transaction.wait();

            setSaldo(100);
        } catch(e) {
            alert("Erro ao realizar saque inicial: " + e.message);
        }
    }

    return (
        <>
            <div className="row justify-content-center caixaBoasVindas">
                <h5>Bem vindo(a) ao Forca D-App... Jogue para ganhar ForcaCoins (FCs)!</h5>
                <h5>É novo(a) e/ou está zerado(a)? Saque o saldo inicial de FCs (100) no botão abaixo</h5>
                <button type="button" className="btn btn-warning btnSacar" onClick={sacar}>
                    Sacar <FontAwesomeIcon icon={faSackDollar} />
                </button>
            </div>
        </>
    )
}
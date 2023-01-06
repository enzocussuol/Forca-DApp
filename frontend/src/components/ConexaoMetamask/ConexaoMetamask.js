import { React } from 'react';
import './ConexaoMetamaskEContratos.css'
import * as metamask from '../../utils/metamask';

export default function ConexaoMetamask({setConectadoAoMetamask}) {
    async function conectaAoMetamask() {
        await metamask.realizaConexao();

        const conectadoAoMetamask = await metamask.verificaConexao();
        if (conectadoAoMetamask) {
            setConectadoAoMetamask(true);
        } else {
            setConectadoAoMetamask(false);
        }
    }

    return (
        <>
            <h3>Oops... Parece que você não está conectado(a) ao MetaMask.</h3>
            <h3>Para começar a jogar, conecte-se agora mesmo clicando no botão abaixo.</h3>
            <button type="button" className="btn btn-success botaoConectar" onClick={conectaAoMetamask}>Conectar!</button>
        </>
    )
}
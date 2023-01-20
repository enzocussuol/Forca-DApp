import { React } from 'react';
import * as metamask from '../../utils/metamask';

export default function Forca() {
    async function criaNovoJogo() {
        try {
            const transacao = await metamask.contratoFabricaForca.criaForca();
            await transacao.wait();
        } catch (e) {
            console.log("Erro ao criar forca: " + e);
        }
    }

    return (
        <>
            <h3>No momento, não há nenhum jogo em andamento...</h3>
            <button type="button" className="btn btn-primary" onClick={criaNovoJogo}>Criar novo jogo</button>
        </>
    )
}
import { React } from 'react';
import './CriacaoForca.css'
import { Forca } from '../../objects/Forca';
import * as metamask from '../../utils/metamask';
import { v4 as uuid } from 'uuid';

export default function CriacaoForca() {
    async function criaForca() {
        const tema = document.querySelector(".tema");
        const palavraSecreta = document.querySelector(".palavraSecreta");

        const forca = new Forca(uuid().slice(0, 8), tema.value, palavraSecreta.value.toUpperCase());
        await forca.setDono();

        try {
            const transaction = await metamask.contratoFabricaJogo.criaJogo(forca.id, forca.dono, 
                forca.tema, forca.palavraSecreta);
            transaction.wait();
        } catch (e) {
            alert("Erro ao criar uma forca: " + e.message);
        }

        palavraSecreta.value = null;
    }

    return (
        <>
            <h2 className="txtCrieNovaForca">Crie uma nova forca!</h2>
            <div className="caixaFormulario">
                <label htmlFor="tema" className="form-label">Tema</label>
                <select className="form-select tema" aria-label="Default select example" id="tema">
                    <option defaultValue="Animais">Animais</option>
                    <option value="Séries">Séries</option>
                    <option value="Times de futebol">Times de futebol</option>
                </select>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label labelPalavraSecreta">Palavra secreta</label>
                    <input type="text" className="form-control palavraSecreta" id="exampleFormControlInput1"></input>
                </div>
                <button type="button" className="btn btn-success" onClick={criaForca}>Criar</button>
            </div>
        </>
    )
}
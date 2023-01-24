import { React } from 'react';
import './CriacaoForca.css'
import { Forca } from '../../objects/Forca';
import * as metamask from '../../utils/metamask';
import { v4 as uuid } from 'uuid';

export default function CriacaoForca() {
    async function criaForca() {
        const tema = document.querySelector(".tema");
        let palavraSecreta = document.querySelector(".palavraSecreta");

        if (palavraSecreta.value.length < 2 || palavraSecreta.value.length > 30) {
            alert("Palavra secreta inválida. Palavras secretas devem ter entre 2 e 30 caracteres");
            palavraSecreta.value = null;
            return;
        }

        if (!palavraSecreta.value.match(/^[a-zA-Z\s]*$/)) {
            alert("Palavra secreta inválida. Por favor use somente letras sem acentos e espaços.");
            palavraSecreta.value = null;
            return;
        }

        let palavraSecretaCorrigida = palavraSecreta.value.replace(" ", "-");
        palavraSecretaCorrigida = palavraSecretaCorrigida.toUpperCase();

        const forca = new Forca(uuid().slice(0, 8), tema.value, palavraSecretaCorrigida);
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
                    <option value="Séries e filmes">Séries</option>
                    <option value="Times de futebol">Times de futebol</option>
                    <option value="Cores">Cores</option>
                    <option value="Objetos">Objetos</option>
                    <option value="Frutas">Frutas</option>
                    <option value="Partes do corpo humano">Partes do corpo humano</option>
                    <option value="Países">Países</option>
                    <option value="Marcas">Marcas</option>
                    <option value="Esportes">Esportes</option>
                </select>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label labelPalavraSecreta">Palavra secreta</label>
                    <input type="text" className="form-control palavraSecreta" id="exampleFormControlInput1" pattern="[A-Za-z]"></input>
                </div>
                <button type="button" className="btn btn-success" onClick={criaForca}>Criar</button>
            </div>
        </>
    )
}
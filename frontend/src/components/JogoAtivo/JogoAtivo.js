import { React, useEffect } from 'react';
import './JogoAtivo.css';
import * as metamask from '../../utils/metamask';

export default function JogoAtivo({ forca, setForca }) {
    useEffect(() => {
        function desenhaBonecoForca() {
            if (parteCorpo === 0) { // Suporte
                context.strokeStyle = '#444';
                context.lineWidth = 10;
                context.beginPath();
                context.moveTo(175, 225);
                context.lineTo(5, 225);
                context.moveTo(40, 225);
                context.lineTo(25, 5);
                context.lineTo(100, 5);
                context.lineTo(100, 25);
                context.stroke();
            } else if (parteCorpo === 1) { // Cabeca
                context.lineWidth = 5;
                context.beginPath();
                context.arc(100, 50, 25, 0, Math.PI * 2, true);
                context.closePath();
                context.stroke();
            } else if (parteCorpo === 2) { // Corpo
                context.beginPath();
                context.moveTo(100, 75);
                context.lineTo(100, 140);
                context.stroke();
            } else if (parteCorpo === 3) { // Braco Direito
                context.beginPath();
                context.moveTo(100, 85);
                context.lineTo(60, 100);
                context.stroke();
            } else if (parteCorpo === 4) { // Braco Esquerdo
                context.beginPath();
                context.moveTo(100, 85);
                context.lineTo(140, 100);
                context.stroke();
            } else if (parteCorpo === 5) { // Perna Direita
                context.beginPath();
                context.moveTo(100, 140);
                context.lineTo(80, 190);
                context.stroke();
            } else if (parteCorpo === 6) { // Perna Esquerda
                context.beginPath();
                context.moveTo(100, 140);
                context.lineTo(125, 190);
                context.stroke();
            }

            parteCorpo++;
        }

        function criaBotoesLetras() {
            const alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
                'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '-'];

            const caixaBotoesLetra = document.querySelector(".caixaBotoesLetra");

            for (let i = 0; i < alfabeto.length; i++) {
                const botao = document.createElement("button");

                botao.type = "button";
                botao.className = "btn btn-dark btnLetra";
                botao.innerHTML = alfabeto[i];
                botao.onclick = function () {
                    processaJogada(botao.innerHTML);
                    botao.disabled = true;
                };

                caixaBotoesLetra.appendChild(botao);
            }
        }

        function criaPalavraSecreta() {
            const caixaPalavraSecreta = document.querySelector(".caixaPalavraSecreta");

            for (let i = 0; i < forca.palavraSecreta.length; i++) {
                const caracterPalavraSecreta = document.createElement("span");

                caracterPalavraSecreta.innerHTML = "_";
                caracterPalavraSecreta.className = "caracterPalavraSecreta";

                caixaPalavraSecreta.appendChild(caracterPalavraSecreta);
            }
        }

        async function processaJogada(palpite) {
            const caracteres = document.querySelector(".caixaPalavraSecreta");

            let acertou = false;
            let letrasAcertadasRodada = 0;

            for (let i = 0; i < forca.palavraSecreta.length; i++) {
                const letra = forca.palavraSecreta[i];

                if (palpite === letra) {
                    acertou = true;
                    letrasAcertadasRodada++;

                    caracteres.children[i].innerHTML = palpite;
                }
            }

            letrasAcertadas += letrasAcertadasRodada;

            if (!acertou) {
                desenhaBonecoForca();
            }

            if (letrasAcertadas === forca.palavraSecreta.length) {
                finalizaForca(true, parteCorpo - 1);
            } else if (parteCorpo > 6) {
                finalizaForca(false, parteCorpo - 1);
            }
        }

        async function finalizaForca(vitoria, numErros) {
            const botoes = document.querySelector(".caixaBotoesLetra").children;
            for (let i = 0; i < botoes.length; i++) {
                botoes[i].disabled = true;
            }

            try {
                const recompensaCriador = numErros + 5;

                const transaction = await metamask.contratoFabricaJogo.finalizaForca(forca.id, vitoria, recompensaCriador);
                transaction.wait();

                if (vitoria) {
                    alert("Parab??ns, voc?? ganhou! Voc?? recebeu 10 FCs e o criador recebeu "
                        + recompensaCriador + " FCs.");
                } else {
                    alert("Que pena, voc?? perdeu... Suas FCs e as do criador foram perdidas. A palavra secreta era: " + forca.palavraSecreta + ".");
                }

                setForca(null);
            } catch (e) {
                alert("Erro ao finalizar a forca: " + e.message);
            }
        }

        if (forca === null) return;

        const canvas = document.querySelector(".bonecoForca");
        const context = canvas.getContext("2d");

        let parteCorpo = 0;
        let letrasAcertadas = 0;

        desenhaBonecoForca();
        criaPalavraSecreta();
        criaBotoesLetras();
    }, [forca, setForca]);

    return (
        <>
            {forca === null ? (
                <div>
                    <img className="hangman" src="images/hangman.png" alt="hangman"></img>
                    <h3>Nenhuma forca selecionada... Selecione uma forca dispon??vel para jogar!</h3>
                </div>
            ) : (
                <div className="align-self-center">
                    <h4 className="temaForca">Tema: {forca.tema}</h4>
                    <div className="caixaBonecoForca">
                        <canvas className="bonecoForca" width="180" height="250"></canvas>
                    </div>
                    <div className="caixaPalavraSecreta"></div>
                    <div className="caixaBotoesLetra"></div>
                </div>
            )}
        </>
    )
}
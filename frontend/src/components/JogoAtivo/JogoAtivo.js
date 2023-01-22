import { React, useEffect } from 'react';
import './JogoAtivo.css';

export default function JogoAtivo({ forca }) {
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
            } else if (parteCorpo === 7) { // Pe Direito
                context.beginPath();
                context.moveTo(82, 190);
                context.lineTo(70, 185);
                context.stroke();
            } else if (parteCorpo === 8) { // Pe Esquerdo
                context.beginPath();
                context.moveTo(122, 190);
                context.lineTo(135, 185);
                context.stroke();
            }

            parteCorpo++;
        }

        function criaBotoesLetras() {
            const alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                't', 'u', 'v', 'w', 'x', 'y', 'z'];

            const caixaBotoesLetra = document.querySelector(".caixaBotoesLetra");

            for (let i = 0; i < alfabeto.length; i++) {
                const botao = document.createElement("button");

                botao.type = "button";
                botao.className = "btn btn-dark btnLetra";
                botao.innerHTML = alfabeto[i];
                botao.onclick = function() {
                    botao.disabled = true;

                    const caracteres = document.querySelector(".caixaPalavraSecreta");
                    const palpite = botao.innerHTML;
                    let acertou = false;
                    
                    for (let i = 0; i < forca.palavraSecreta.length; i++) {
                        const letra = forca.palavraSecreta[i];

                        if (palpite === letra) {
                            acertou = true;

                            caracteres.children[i].innerHTML = palpite;
                        }
                    }

                    if (!acertou) {
                        desenhaBonecoForca();
                    }
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

        if (forca === null) return;

        const canvas = document.querySelector(".bonecoForca");
        const context = canvas.getContext("2d");
        let parteCorpo = 0;

        desenhaBonecoForca();
        criaPalavraSecreta();
        criaBotoesLetras();
    }, [forca]);

    return (
        <>
            {forca === null ? (
                <h2>Nenhuma forca selecionada... Selecione uma forca disponível para jogar!</h2>
            ) : (
                <div className="align-self-center">
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
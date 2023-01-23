// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./Jogo.sol";

contract FabricaJogo {
    Jogo[] public jogos;

    function criaJogo(string memory id, address dono, string memory tema, string memory palavraSecreta) public {
        jogos.push(new Jogo(id, dono, tema, palavraSecreta));
    }

    function getJogoPorId(string memory id) public view returns(Jogo) {
        for (uint i = 0; i < jogos.length; i++) {
            LibForca.Forca memory forca = jogos[i].getForca();
            if (keccak256(bytes(forca.id)) == keccak256(bytes(id))) {
                return jogos[i];
            }
        }

        revert("Jogo nao encontrado");
    }

    function getForcas() public view returns (LibForca.Forca[] memory) {
        LibForca.Forca[] memory forcas = new LibForca.Forca[](jogos.length);

        for (uint i = 0; i < forcas.length; i++) {
            forcas[i] = jogos[i].getForca();
        }

        return forcas;
    }

    function iniciaForca(string memory id, address jogador) public {
        Jogo jogo = getJogoPorId(id);
        jogo.iniciaForca(jogador);
    }

    function finalizaForca(string memory id) public {
        Jogo jogo = getJogoPorId(id);
        jogo.finalizaForca();
    }
}
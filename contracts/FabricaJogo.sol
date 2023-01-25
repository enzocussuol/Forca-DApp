// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./ForcaCoin.sol";
import "./Jogo.sol";
import "hardhat/console.sol";

contract FabricaJogo {
    ForcaCoin forcaCoin;
    Jogo[] public jogos;

    constructor() {
        forcaCoin = new ForcaCoin();
    }

    function getUsuarios() public view returns (address[] memory) {
        return forcaCoin.getUsuarios();
    }

    function saqueInicial(address endereco) public {
        return forcaCoin.saqueInicial(endereco);
    }

    function balanceOf(address endereco) public view returns (uint){
        return forcaCoin.balanceOf(endereco);
    }

    function criaJogo(string memory id, address dono, string memory tema, string memory palavraSecreta) public {
        forcaCoin.pagaCriacaoForca(dono);
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
        forcaCoin.pagaIniciacaoForca(jogador);
    }

    function finalizaForca(string memory id, bool vitoria, uint recompensaCriador) public {
        Jogo jogo = getJogoPorId(id);
        jogo.finalizaForca();

        if (vitoria) {
            LibForca.Forca memory forca = jogo.getForca();
            console.log(recompensaCriador);
            forcaCoin.recompensaVitoriaForca(forca.jogador, forca.dono, recompensaCriador);
        }
    }
}
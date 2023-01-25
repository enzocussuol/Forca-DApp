// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

library LibForca {
    enum Status {
        ABERTA, EM_JOGO, FINALIZADA
    }

    struct Forca {
        string id;
        address dono;
        address jogador;
        string tema;
        string palavraSecreta;
        Status status;
    }
}

contract Jogo {
    address private fabrica;
    LibForca.Forca private forca;

    constructor(string memory id, address dono, string memory tema, string memory palavraSecreta) {
        fabrica = msg.sender;
        forca = LibForca.Forca(id, dono, address(0), tema, palavraSecreta, LibForca.Status.ABERTA);
    }

    modifier apenasFabrica() {
        require(msg.sender == fabrica, "Voce precisa utilizar a fabrica");
        _;
    }

    modifier permissaoIniciaForca(address jogador) {
        require(forca.dono != jogador, "Voce nao pode jogar a sua propria forca");
        require(forca.status == LibForca.Status.ABERTA, "Nao e possivel iniciar uma forca que nao esteja aberta... Por favor, atualize a lista de forcas disponiveis");
        _;
    }

    function getForca() public view returns (LibForca.Forca memory) {
        return forca;
    }

    function iniciaForca(address jogador) public apenasFabrica permissaoIniciaForca(jogador) {
        forca.jogador = jogador;
        forca.status = LibForca.Status.EM_JOGO;
    }

    function finalizaForca() public apenasFabrica {
        forca.status = LibForca.Status.FINALIZADA;
    }
}

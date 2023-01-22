// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

library LibForca {
    enum Status {
        ABERTA, EM_JOGO, FINALIZADA
    }

    struct Objeto {
        string id;
        address dono;
        address jogador;
        string tema;
        string palavraSecreta;
        Status status;
    }
}

contract Forca {
    address private fabrica;
    LibForca.Objeto private forca;

    constructor(string memory i, address d, string memory t, string memory pS) {
        fabrica = msg.sender;
        forca = LibForca.Objeto(i, d, address(0), t, pS, LibForca.Status.ABERTA);
    }

    modifier apenasFabrica() {
        require(msg.sender == fabrica, "Voce precisa utilizar a fabrica");
        _;
    }

    function getForca() public view returns (LibForca.Objeto memory) {
        return forca;
    }
}

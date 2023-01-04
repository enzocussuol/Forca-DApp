// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Forca {
    address private dono;
    address private fabrica;

    constructor(address donoInformado) {
        dono = donoInformado;
        fabrica = msg.sender;
    }

    modifier apenasDono(address chamador) {
        require(chamador == dono, "Voce nao e o dono do contrato");
        _;
    }

    modifier apenasFabrica() {
        require(msg.sender == fabrica, "Voce precisa utilizar a fabrica");
        _;
    }
}

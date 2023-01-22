// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./Forca.sol";

contract FabricaForca {
    Forca[] public forcas;

    function criaForca(string memory id, address dono, string memory tema, string memory palavraSecreta) public {
        forcas.push(new Forca(id, dono, tema, palavraSecreta));
    }

    function getForcas() public view returns (LibForca.Objeto[] memory) {
        LibForca.Objeto[] memory f = new LibForca.Objeto[](forcas.length);

        for (uint i = 0; i < forcas.length; i++) {
            f[i] = forcas[i].getForca();
        }

        return f;
    }

    function getForcaPorId(string memory id) public view returns(LibForca.Objeto memory) {
        for (uint i = 0; i < forcas.length; i++) {
            LibForca.Objeto memory forca = forcas[i].getForca();
            if (keccak256(bytes(forca.id)) == keccak256(bytes(id))) {
                return forca;
            }
        }

        revert("Forca nao encontrada");
    }
}
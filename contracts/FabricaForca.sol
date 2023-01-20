// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./Forca.sol";

contract FabricaForca {
    Forca[] public forcas;

    function criaForca() public {
        forcas.push(new Forca(msg.sender));
    }

    function getForcas() public view returns(Forca[] memory) {
        return forcas;
    }
}
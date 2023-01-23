// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ForcaCoin is ERC20 {
    address[] private usuarios;

    constructor() ERC20("ForcaCoin", "FC") {
        
    }

    modifier permissaoSaqueInicial {
        for (uint i = 0; i < usuarios.length; i++) {
            if (usuarios[i] == msg.sender) {
                uint saldo = balanceOf(usuarios[i]);
                require(saldo == 0, "O saque inicial so e liberado para contas com 0 de saldo");
            }
        }
        
        _;
    }

    function usuarioJaCadastrado() private view returns (bool){
        bool jaCadastrado = false;

        for (uint i = 0; i < usuarios.length; i++) {
            if (usuarios[i] == msg.sender) {
                jaCadastrado = true;
            }
        }

        return jaCadastrado;
    }

    function saqueInicial() public permissaoSaqueInicial {
        _mint(msg.sender, 100*10**18);

        if (!usuarioJaCadastrado()) {
            usuarios.push(msg.sender);
        }
    }

    function getUsuarios() public view returns (address[] memory) {
        return usuarios;
    }
}
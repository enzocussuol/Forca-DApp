// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ForcaCoin is ERC20 {
    address[] usuarios;
    mapping(address => uint) saldosUsuarios;

    constructor() ERC20("ForcaCoin", "FC") {
        
    }

    modifier permissaoSaqueInicial(address endereco) {
        require(saldosUsuarios[endereco] == 0, "O saque inicial so e liberado para contas com 0 de saldo");
        _;
    }

    modifier permissaoPagaCriacaoForca(address endereco) {
        require(saldosUsuarios[endereco] >= 5, "Para criar uma forca, voce precisa de ao menos 5 FCS");
        _;
    }

    function balanceOf(address endereco) public override view returns (uint256 balance) {
        return saldosUsuarios[endereco];
    }

    function getUsuarios() public view returns (address[] memory) {
        return usuarios;
    }

    function saqueInicial(address endereco) public permissaoSaqueInicial(endereco) {
        saldosUsuarios[endereco] = 100*10**18;
        usuarios.push(endereco);
    }

    function pagaCriacaoForca(address endereco) public permissaoPagaCriacaoForca(endereco) {
        saldosUsuarios[endereco] -= 5*10**18;
    }
}
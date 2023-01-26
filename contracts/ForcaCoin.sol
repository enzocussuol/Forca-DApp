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
        require(saldosUsuarios[endereco] >= 5, "Para criar uma forca, voce precisa de ao menos 5 FCs");
        _;
    }

    function balanceOf(address endereco) public override view returns (uint256 balance) {
        return saldosUsuarios[endereco];
    }

    function getUsuarios() public view returns (address[] memory) {
        return usuarios;
    }

    function saqueInicial(address endereco) public permissaoSaqueInicial(endereco) returns (uint) {
        saldosUsuarios[endereco] = 100*10**18;
        usuarios.push(endereco);

        return saldosUsuarios[endereco];
    }

    function pagaCriacaoForca(address endereco) public permissaoPagaCriacaoForca(endereco) returns (uint) {
        saldosUsuarios[endereco] -= 5*10**18;

        return saldosUsuarios[endereco];
    }

    function pagaIniciacaoForca(address endereco) public returns (uint) {
        if (saldosUsuarios[endereco] < 5) {
            revert("Para iniciar uma forca, voce precisa de ao menos 5 FCs");
        }

        saldosUsuarios[endereco] -= 5*10**18;
        return saldosUsuarios[endereco];
    }

    function recompensaCriadorForca(address criador, uint recompensaCriador) public returns (uint) {
        saldosUsuarios[criador] += recompensaCriador*10**18;

        return saldosUsuarios[criador];
    }

    function recompensaJogadorForca(address jogador) public returns (uint) {
        saldosUsuarios[jogador] += 10*10**18;

        return saldosUsuarios[jogador];
    }
}
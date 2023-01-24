import * as metamask from '../utils/metamask';

export class Usuario {
    constructor(endereco) {
        let strEnderecoCorrigida = "";

        strEnderecoCorrigida += endereco.slice(0, 6);
        strEnderecoCorrigida += "...";
        strEnderecoCorrigida += endereco.slice(endereco.length - 4, endereco.length);

        this.endereco = strEnderecoCorrigida;
        this.saldo = 0;
    }

    async setSaldo() {
        let s = await metamask.contratoFabricaJogo.balanceOf(metamask.conta.getAddress());
        s = (Number(s) / (10 ** 18)).toFixed(8).replace(/\.?0+$/,"");
        this.saldo = s;
    }
}
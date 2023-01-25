import * as metamask from '../utils/metamask';

export class Usuario {
    constructor(endereco) {
        this.endereco = endereco;
        this.saldo = 0;
    }

    async setSaldo() {
        let s = await metamask.contratoFabricaJogo.balanceOf(this.endereco);
        s = (Number(s) / (10 ** 18)).toFixed(8).replace(/\.?0+$/,"");
        this.saldo = s;
    }

    corrigeEndereco() {
        let strEnderecoCorrigida = "";

        strEnderecoCorrigida += this.endereco.slice(0, 6);
        strEnderecoCorrigida += "...";
        strEnderecoCorrigida += this.endereco.slice(this.endereco.length - 4, this.endereco.length);

        this.endereco = strEnderecoCorrigida;
    }
}
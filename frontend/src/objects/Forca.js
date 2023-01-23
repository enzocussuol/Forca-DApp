import * as metamask from '../utils/metamask';

export const Status = {
    ABERTA : "ABERTA",
    EM_JOGO : "EM_JOGO",
    FINALIZADA : "FINALIZADA"
}

export class Forca {
    /**
     * Construtor usado ao criar uma forca pelo formulário
     */
    constructor(id, tema, palavraSecreta) {
        this.id = id;
        this.dono = null;
        this.jogador = null;
        this.tema = tema;
        this.palavraSecreta = palavraSecreta;
        this.status = Status.ABERTA;
    }

    /**
     * Corrige uma forca, pois o objeto Forca retornado pelo contrato é levemente diferente
     * do objeto Forca usado pelo frontend.
     */
    corrige(dono, status) {
        let strDonoCorrigida = "";

        strDonoCorrigida += dono.slice(0, 6);
        strDonoCorrigida += "...";
        strDonoCorrigida += dono.slice(dono.length - 4, dono.length);

        this.dono = strDonoCorrigida;

        if (status === 0) {
            this.status = Status.ABERTA;
        } else if (status === 1) {
            this.status = Status.EM_JOGO;
        } else {
            this.status = Status.FINALIZADA;
        }
    }

    async setDono() {
        this.dono = await metamask.conta.getAddress();
    }
}
import { ethers } from 'ethers';

export default class Config {
    constructor() {
        this.contaMetamask = null;

        this.contratoForcaCoin = null;
        this.contratoForcaCoinEndereco = "";
        this.contratoForcaCoinABI = [];

        this.contratoFabricaForca = null;
        this.contratoFabricaForcaEndereco = "";
        this.contratoFabricaForcaABI = [];

        this.conectado = false;
    }

    async realizaConexao() {
        let provider;

        provider = new ethers.providers.Web3Provider(window.ethereum);
        provider.send("eth_requestAccounts", []).then(() => {
            provider.listAccounts().then((accounts) => {
                if (accounts.length > 0) {
                    this.contaMetamask = provider.getSigner(accounts[0]);

                    this.contratoForcaCoin = new ethers.Contract(
                        this.contratoForcaCoinEndereco,
                        this.contratoForcaCoinABI,
                        this.contaMetamask
                    );

                    this.contratoFabricaForca = new ethers.Contract(
                        this.contratoFabricaForcaEndereco,
                        this.contratoFabricaForcaABI,
                        this.contaMetamask
                    );

                    this.conectado = true;
                } else {
                    this.conectado = false;
                }
            });
        });
    }
}
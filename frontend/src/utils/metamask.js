import { ethers } from 'ethers';

let provider = new ethers.providers.Web3Provider(window.ethereum);

let contaMetamask;

let contratoForcaCoin;
const contratoForcaCoinEndereco = "";
const contratoForcaCoinABI = [];

let contratoFabricaForca;
const contratoFabricaForcaEndereco = "";
const contratoFabricaForcaABI = [];

export async function verificaConexao() {
    let contaDetectada = false;

    await provider.listAccounts().then((accounts) => {
        if (accounts.length > 0) {
            contaDetectada = true;
        }
    });
    
    return new Promise((resolve, reject) => {
        resolve(contaDetectada);
    });
}

export async function realizaConexao() {
    await provider.send("eth_requestAccounts", []).then(() => {
        provider.listAccounts().then((accounts) => {
            contaMetamask = provider.getSigner(accounts[0]);

            contratoForcaCoin = new ethers.Contract(
                contratoForcaCoinEndereco,
                contratoForcaCoinABI,
                contaMetamask
            );
        
            contratoFabricaForca = new ethers.Contract(
                contratoFabricaForcaEndereco,
                contratoFabricaForcaABI,
                contaMetamask
            );
        });
    });
}
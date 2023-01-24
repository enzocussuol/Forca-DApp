import { ethers } from 'ethers';
import FabricaJogo from '../artifacts/contracts/FabricaJogo.sol/FabricaJogo.json';

let provider = new ethers.providers.Web3Provider(window.ethereum);

export let conta = null;

export let contratoFabricaJogo = null;
const FABRICA_JOGO_ENDERECO = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

export async function verificaConexao() {
    let contaDetectada = false;
    conta = null;

    await provider.listAccounts().then((accounts) => {
        if (accounts.length > 0) {
            contaDetectada = true;
            conta = provider.getSigner(accounts[0]);
            carregaContratos();
        }
    });

    return new Promise((resolve, reject) => {
        resolve(contaDetectada);
    });
}

export async function realizaConexao() {
    await provider.send("eth_requestAccounts", []).then(async () => {
        await provider.listAccounts().then((accounts) => {
            conta = provider.getSigner(accounts[0]);
            carregaContratos();
        });
    });
}

export function carregaContratos() {
    if (conta != null) {
        contratoFabricaJogo = new ethers.Contract(FABRICA_JOGO_ENDERECO, FabricaJogo.abi, conta);
    } else {
        console.log("Impossível carregar os contratos sem que haja uma conta MetaMask conectada");
    }
}
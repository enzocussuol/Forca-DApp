import { ethers } from 'ethers';
import FabricaForca from '../artifacts/contracts/FabricaForca.sol/FabricaForca.json';

let provider = new ethers.providers.Web3Provider(window.ethereum);

export let conta = null;

export let contratoFabricaForca = null;
const FABRICA_FORCA_ENDERECO = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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
        contratoFabricaForca = new ethers.Contract(FABRICA_FORCA_ENDERECO, FabricaForca.abi, conta);
    } else {
        console.log("Impossível carregar os contratos sem que haja uma conta MetaMask conectada");
    }
}
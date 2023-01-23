import { ethers } from 'ethers';
import FabricaJogo from '../artifacts/contracts/FabricaJogo.sol/FabricaJogo.json';
import ForcaCoin from '../artifacts/contracts/ForcaCoin.sol/ForcaCoin.json'

let provider = new ethers.providers.Web3Provider(window.ethereum);

export let conta = null;

export let contratoForcaCoin = null;
const FORCA_COIN_ENDERECO = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export let contratoFabricaJogo = null;
const FABRICA_JOGO_ENDERECO = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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
        contratoForcaCoin = new ethers.Contract(FORCA_COIN_ENDERECO, ForcaCoin.abi, conta);
        contratoFabricaJogo = new ethers.Contract(FABRICA_JOGO_ENDERECO, FabricaJogo.abi, conta);
    } else {
        console.log("Impossível carregar os contratos sem que haja uma conta MetaMask conectada");
    }
}
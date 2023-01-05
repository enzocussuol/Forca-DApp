// import { React } from 'react';
// import './ConexaoMetamaskEContratos.css'
// import { ethers } from 'ethers';
// import * as config from '../../utils/config';

// export default function ConexaoMetamaskEContratos() {
//     

//     function conectaMetamaskEContratos() {
//         provider = new ethers.providers.Web3Provider(window.ethereum);
//         provider.send("eth_requestAccounts", []).then(() => {
//             provider.listAccounts().then((accounts) => {
//                 config.setContaMetamask(provider.getSigner(accounts[0]));

//                 const contratoForcaCoin = new ethers.Contract(
//                     config.CONTRATO_FORCA_COIN_ENDERECO,
//                     config.CONTRATO_FORCA_COIN_ABI,
//                     config.CONTA_METAMASK
//                 );
//                 config.setContratoForcaCoin(contratoForcaCoin);

//                 const contratoFabricaForca = new ethers.Contract(
//                     config.CONTRATO_FABRICA_FORCA_ENDERECO,
//                     config.CONTRATO_FABRICA_FORCA_ABI,
//                     config.CONTA_METAMASK
//                 );
//                 config.setContratoFabricaForca(contratoFabricaForca);

//                 window.location.reload(false);
//             });
//         });
//     }

//     return (
//         <>
//             <h3>Oops... Parece que você não está conectado(a) ao MetaMask.</h3>
//             <h3>Para começar a jogar, conecte-se agora mesmo clicando no botão abaixo.</h3>
//             <button type="button" className="btn btn-success botaoConectar" onClick={conectaMetamaskEContratos}>Conectar!</button>
//         </>
//     )
// }
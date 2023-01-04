import './App.css';
import { ethers } from 'ethers';

function App() {
  let contratoForcaCoin;
  const contratoForcaCoinEndereco = "";
  const contratoForcaCoinABI = [];

  let contratoFabricaForca;
  const contratoFabricaForcaEndereco = "";
  const contratoFabricaForcaABI = [];

  let metamask;
  let contaMetamask;

  async function conectaMetamaskEContratos() {
    metamask = new ethers.providers.Web3Provider(window.ethereum);
    metamask.send("eth_requestAccounts", []).then(() => {
      metamask.listAccounts().then((accounts) => {
          contaMetamask = metamask.getSigner(accounts[0]);

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

  conectaMetamaskEContratos();

  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;
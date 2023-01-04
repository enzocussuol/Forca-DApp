import './App.css';
import { ethers } from 'ethers';

function App() {
  let fabricaForcaContrato;
  const fabricaForcaContratoEndereco = "";
  const fabricaForcaContratoABI = [];

  async function conectaCarteira() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts", []).then(() => {
      provider.listAccounts().then((accounts) => {
        const signer = provider.getSigner(accounts[0]);

        fabricaForcaContrato = new ethers.Contract(
          fabricaForcaContratoEndereco,
          fabricaForcaContratoABI,
          signer
        );
      });
    });
  }

  conectaCarteira();

  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;